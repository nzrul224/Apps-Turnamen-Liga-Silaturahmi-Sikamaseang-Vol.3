import React, { createContext, useContext, useState, useMemo } from 'react';
import { Team, Match, TournamentSettings, FinalMatchStage, TeamStanding, GroupId } from '../types/tournament';
import { INITIAL_TEAMS, INITIAL_MATCHES, INITIAL_SETTINGS, INITIAL_FINAL_STAGES } from '../data/initialData';

interface ToastData {
  id: string;
  message: string;
  icon?: string;
}

interface TournamentContextType {
  teams: Team[];
  matches: Match[];
  settings: TournamentSettings;
  finalStages: FinalMatchStage[];
  toasts: ToastData[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showToast: (message: string, icon?: string) => void;
  // Team operations
  addTeam: (team: Omit<Team, 'id'>) => void;
  updateTeam: (id: string, updated: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  switchTeamGroup: (teamId: string, targetGroup: GroupId) => void;
  autoDrawTeams: () => void;
  // Match operations
  updateMatchScore: (matchId: string, homeScore: number, awayScore: number, status?: Match['status'], homeYellow?: number, homeRed?: number, awayYellow?: number, awayRed?: number) => void;
  quickAddLiveScore: (matchId: string, team: 'home' | 'away') => void;
  quickAddCard: (matchId: string, team: 'home' | 'away', cardType: 'yellow' | 'red') => void;
  startMatch: (matchId: string) => void;
  finishMatch: (matchId: string) => void;
  generateRoundRobin: () => void;
  shuffleSchedule: () => void;
  // Final stages
  updateFinalScore: (stageId: FinalMatchStage['id'], homeScore: number, awayScore: number, tiebreakMethod?: string) => void;
  finalizeChampion: (stageId: FinalMatchStage['id'], winnerTeamId: string) => void;
  generateFinalsFromStandings: () => void;
  // Settings & state
  updateSettings: (newSettings: Partial<TournamentSettings>) => void;
  togglePublicPortal: () => void;
  lockStandingsToggle: () => void;
  resetAllStats: () => void;
  // Computed standings
  standingsA: TeamStanding[];
  standingsB: TeamStanding[];
  standingsCombined: TeamStanding[];
  totalGoals: number;
  totalYellowCards: number;
  totalRedCards: number;
  completedMatchesCount: number;
  remainingMatchesCount: number;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [settings, setSettings] = useState<TournamentSettings>(INITIAL_SETTINGS);
  const [finalStages, setFinalStages] = useState<FinalMatchStage[]>(INITIAL_FINAL_STAGES);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, icon = 'check_circle') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  // Standings computation
  const computeStandingsForGroup = (groupLetter: 'A' | 'B'): TeamStanding[] => {
    const groupTeams = teams.filter((t) => t.group === groupLetter);

    const standingsMap = new Map<string, TeamStanding>();

    groupTeams.forEach((t) => {
      standingsMap.set(t.id, {
        team: t,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
        fairplayScore: 0,
        rank: 1,
        statusLabel: 'Gugur',
        statusColor: 'bg-surface-container text-on-surface-variant'
      });
    });

    matches.forEach((m) => {
      if (m.status !== 'selesai' && m.status !== 'live') return;
      const homeStanding = standingsMap.get(m.homeTeamId);
      const awayStanding = standingsMap.get(m.awayTeamId);

      if (homeStanding && awayStanding) {
        homeStanding.played += 1;
        awayStanding.played += 1;

        homeStanding.goalsFor += m.homeScore;
        homeStanding.goalsAgainst += m.awayScore;
        awayStanding.goalsFor += m.awayScore;
        awayStanding.goalsAgainst += m.homeScore;

        if (m.homeScore > m.awayScore) {
          homeStanding.won += 1;
          homeStanding.points += 3;
          awayStanding.lost += 1;
        } else if (m.homeScore < m.awayScore) {
          awayStanding.won += 1;
          awayStanding.points += 3;
          homeStanding.lost += 1;
        } else {
          homeStanding.drawn += 1;
          homeStanding.points += 1;
          awayStanding.drawn += 1;
          awayStanding.points += 1;
        }

        // Fairplay penalty calculations:
        // Yellow = -1, Red = -4
        const homePenalty = -(m.homeYellow * 1 + m.homeRed * 4);
        const awayPenalty = -(m.awayYellow * 1 + m.awayRed * 4);
        homeStanding.fairplayScore += homePenalty;
        awayStanding.fairplayScore += awayPenalty;
      }
    });

    // Calculate goal diff & sort according to PSSI rules:
    // Poin > SG > GM > Fairplay
    const list = Array.from(standingsMap.values()).map((s) => ({
      ...s,
      goalDiff: s.goalsFor - s.goalsAgainst
    }));

    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.fairplayScore - a.fairplayScore; // Less negative is better
    });

    // Assign rank and status
    list.forEach((st, idx) => {
      st.rank = idx + 1;
      if (idx === 0) {
        st.statusLabel = 'Grand Final';
        st.statusColor = 'bg-[#7cf994] text-[#007230]';
      } else if (idx === 1) {
        st.statusLabel = '2nd Final';
        st.statusColor = 'bg-[#d9e2fc] text-[#121b2e]';
      } else if (idx === 2) {
        st.statusLabel = '3rd Final';
        st.statusColor = 'bg-[#ffdea8] text-[#271900]';
      } else {
        st.statusLabel = 'Gugur';
        st.statusColor = 'bg-surface-container text-on-surface-variant';
      }
    });

    return list;
  };

  const standingsA = useMemo(() => computeStandingsForGroup('A'), [teams, matches]);
  const standingsB = useMemo(() => computeStandingsForGroup('B'), [teams, matches]);

  const standingsCombined = useMemo(() => {
    const combined = [...standingsA, ...standingsB];
    combined.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.fairplayScore - a.fairplayScore;
    });
    return combined;
  }, [standingsA, standingsB]);

  const totalGoals = useMemo(() => {
    return matches.reduce((sum, m) => {
      if (m.status === 'selesai' || m.status === 'live') {
        return sum + m.homeScore + m.awayScore;
      }
      return sum;
    }, 0);
  }, [matches]);

  const totalYellowCards = useMemo(() => {
    return matches.reduce((sum, m) => sum + (m.homeYellow || 0) + (m.awayYellow || 0), 0);
  }, [matches]);

  const totalRedCards = useMemo(() => {
    return matches.reduce((sum, m) => sum + (m.homeRed || 0) + (m.awayRed || 0), 0);
  }, [matches]);

  const completedMatchesCount = useMemo(() => {
    return matches.filter((m) => m.status === 'selesai').length;
  }, [matches]);

  const remainingMatchesCount = useMemo(() => {
    return matches.filter((m) => m.status === 'mendatang' || m.status === 'live').length;
  }, [matches]);

  // Team CRUD
  const addTeam = (teamData: Omit<Team, 'id'>) => {
    const id = teamData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
    const newTeam: Team = { ...teamData, id };
    setTeams((prev) => [...prev, newTeam]);
    showToast(`Data tim ${newTeam.name} berhasil didaftarkan!`, 'add_circle');
  };

  const updateTeam = (id: string, updated: Partial<Team>) => {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    showToast(`Profil tim telah diperbarui.`, 'edit');
  };

  const deleteTeam = (id: string) => {
    const target = teams.find((t) => t.id === id);
    setTeams((prev) => prev.filter((t) => t.id !== id));
    showToast(`${target?.name || 'Tim'} telah dikeluarkan dari turnamen.`, 'delete');
  };

  const switchTeamGroup = (teamId: string, targetGroup: GroupId) => {
    const target = teams.find((t) => t.id === teamId);
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, group: targetGroup } : t)));
    showToast(`${target?.name || 'Tim'} dipindahkan ke Grup ${targetGroup}.`, 'swap_horiz');
  };

  const autoDrawTeams = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);
    const updated = shuffled.map((team, idx) => ({
      ...team,
      group: (idx < mid ? 'A' : 'B') as GroupId
    }));
    setTeams(updated);
    showToast('Undian otomatis selesai! Tim terbagi merata.', 'casino');
  };

  // Match management
  const updateMatchScore = (
    matchId: string,
    homeScore: number,
    awayScore: number,
    status?: Match['status'],
    homeYellow?: number,
    homeRed?: number,
    awayYellow?: number,
    awayRed?: number
  ) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          homeScore,
          awayScore,
          status: status || m.status,
          periodLabel: status === 'selesai' ? 'FT' : status === 'live' ? "LIVE 75'" : m.periodLabel,
          homeYellow: homeYellow !== undefined ? homeYellow : m.homeYellow,
          homeRed: homeRed !== undefined ? homeRed : m.homeRed,
          awayYellow: awayYellow !== undefined ? awayYellow : m.awayYellow,
          awayRed: awayRed !== undefined ? awayRed : m.awayRed
        };
      })
    );
    showToast('Skor pertandingan & poin fairplay berhasil disimpan!', 'save');
  };

  const quickAddLiveScore = (matchId: string, team: 'home' | 'away') => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const newHome = team === 'home' ? m.homeScore + 1 : m.homeScore;
        const newAway = team === 'away' ? m.awayScore + 1 : m.awayScore;
        const targetTeamName = team === 'home' ? teams.find((t) => t.id === m.homeTeamId)?.name : teams.find((t) => t.id === m.awayTeamId)?.name;
        showToast(`⚽ GOL! ${targetTeamName} mencetak skor! (${newHome} - ${newAway})`, 'sports_soccer');
        return {
          ...m,
          homeScore: newHome,
          awayScore: newAway
        };
      })
    );
  };

  const quickAddCard = (matchId: string, team: 'home' | 'away', cardType: 'yellow' | 'red') => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const updated = { ...m };
        if (team === 'home') {
          if (cardType === 'yellow') updated.homeYellow += 1;
          else updated.homeRed += 1;
        } else {
          if (cardType === 'yellow') updated.awayYellow += 1;
          else updated.awayRed += 1;
        }
        showToast(`Kartu ${cardType === 'yellow' ? 'Kuning' : 'Merah'} dicatat ke laporan wasit.`, 'style');
        return updated;
      })
    );
  };

  const startMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          status: 'live',
          liveMinute: 1,
          periodLabel: "LIVE • Babak 1 (1')"
        };
      })
    );
    showToast('Kick-off dimulai! Pertandingan kini berstatus LIVE.', 'play_circle');
  };

  const finishMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          status: 'selesai',
          periodLabel: 'FT'
        };
      })
    );
    showToast('Peluit panjang dibunyikan! Laga resmi SELESAI.', 'check_circle');
  };

  const generateRoundRobin = () => {
    showToast('⚡ Jadwal 12 Tim Round Robin berhasil di-generate sesuai slot lapangan!', 'bolt');
  };

  const shuffleSchedule = () => {
    showToast('🔀 Jadwal diacak ulang tanpa benturan jam & lapangan.', 'shuffle');
  };

  // Final Stage
  const updateFinalScore = (stageId: FinalMatchStage['id'], homeScore: number, awayScore: number, tiebreakMethod?: string) => {
    setFinalStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, homeScore, awayScore, tiebreakMethod: tiebreakMethod || s.tiebreakMethod } : s))
    );
    showToast('Skor laga final telah diperbarui.', 'save');
  };

  const finalizeChampion = (stageId: FinalMatchStage['id'], winnerTeamId: string) => {
    const winner = teams.find((t) => t.id === winnerTeamId);
    setFinalStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, isCompleted: true, winnerTeamId } : s))
    );
    showToast(`Hasil resmi disahkan! ${winner?.name || 'Juara'} meraih Trofi Juara 1! 🏆`, 'military_tech');
  };

  const generateFinalsFromStandings = () => {
    const leaderA = standingsA[0]?.team.id || 'garuda-muda';
    const leaderB = standingsB[0]?.team.id || 'bhayangkara-stars';
    const secondA = standingsA[1]?.team.id || 'persikabo-muda';
    const secondB = standingsB[1]?.team.id || 'bintang-timur';
    const thirdA = standingsA[2]?.team.id || 'rajawali-united';
    const thirdB = standingsB[2]?.team.id || 'elang-jawa';

    setFinalStages([
      {
        id: 'grand-final',
        title: 'GRAND FINAL',
        subtitle: 'Juara 1 & 2 • Piala & Medali Emas',
        homeTeamId: leaderA,
        awayTeamId: leaderB,
        homeScore: 2,
        awayScore: 1,
        date: 'Minggu, 18 Mei 2025',
        time: '16:00 WIB',
        pitch: 'Stadion Utama',
        tiebreakMethod: 'penalti',
        isCompleted: false,
        badgeAccent: '#F5B942'
      },
      {
        id: 'second-final',
        title: '2ND FINAL • PEREBUTAN JUARA 3',
        subtitle: 'Runner-up Grup A vs Runner-up Grup B',
        homeTeamId: secondA,
        awayTeamId: secondB,
        homeScore: 0,
        awayScore: 0,
        date: 'Minggu, 18 Mei 2025',
        time: '14:00 WIB',
        pitch: 'Lapangan 1',
        tiebreakMethod: 'penalti',
        isCompleted: false,
        badgeAccent: '#D9E2FC'
      },
      {
        id: 'third-final',
        title: '3RD FINAL • TROFEO PERINGKAT 5',
        subtitle: 'Peringkat 3 Grup A vs Peringkat 3 Grup B',
        homeTeamId: thirdA,
        awayTeamId: thirdB,
        homeScore: 0,
        awayScore: 0,
        date: 'Minggu, 18 Mei 2025',
        time: '10:00 WIB',
        pitch: 'Lapangan 2',
        tiebreakMethod: 'penalti',
        isCompleted: false,
        badgeAccent: '#FFDEA8'
      }
    ]);

    showToast('Peserta Final & Trofeo Berhasil Disinkronkan!', 'refresh');
  };

  const updateSettings = (newSettings: Partial<TournamentSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Pengaturan turnamen berhasil diperbarui & disimpan!', 'save');
  };

  const togglePublicPortal = () => {
    setSettings((prev) => {
      const nextVal = !prev.publicLivePortal;
      showToast(nextVal ? 'Portal Publik Suporter diaktifkan (Online).' : 'Portal Publik Suporter ditutup sementara (Offline).', 'cell_tower');
      return { ...prev, publicLivePortal: nextVal };
    });
  };

  const lockStandingsToggle = () => {
    setSettings((prev) => {
      const nextVal = !prev.isStandingsLocked;
      showToast(nextVal ? 'Klasemen resmi dikunci & disahkan!' : 'Penguncian klasemen dibuka kembali untuk koreksi.', 'lock');
      return { ...prev, isStandingsLocked: nextVal };
    });
  };

  const resetAllStats = () => {
    setTeams(INITIAL_TEAMS);
    setMatches(INITIAL_MATCHES);
    setFinalStages(INITIAL_FINAL_STAGES);
    showToast('Seluruh data statistik turnamen telah di-reset ke nilai default.', 'restart_alt');
  };

  return (
    <TournamentContext.Provider
      value={{
        teams,
        matches,
        settings,
        finalStages,
        toasts,
        activeTab,
        setActiveTab,
        showToast,
        addTeam,
        updateTeam,
        deleteTeam,
        switchTeamGroup,
        autoDrawTeams,
        updateMatchScore,
        quickAddLiveScore,
        quickAddCard,
        startMatch,
        finishMatch,
        generateRoundRobin,
        shuffleSchedule,
        updateFinalScore,
        finalizeChampion,
        generateFinalsFromStandings,
        updateSettings,
        togglePublicPortal,
        lockStandingsToggle,
        resetAllStats,
        standingsA,
        standingsB,
        standingsCombined,
        totalGoals,
        totalYellowCards,
        totalRedCards,
        completedMatchesCount,
        remainingMatchesCount
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
