import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { TOURNAMENT_EMBLEM } from '../data/initialData';

interface DashboardViewProps {
  onOpenAddTeamModal: () => void;
  onOpenMatchResultModal: (matchId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenAddTeamModal,
  onOpenMatchResultModal
}) => {
  const {
    teams,
    matches,
    settings,
    standingsA,
    standingsB,
    totalGoals,
    totalYellowCards,
    totalRedCards,
    completedMatchesCount,
    remainingMatchesCount,
    quickAddLiveScore,
    showToast,
    setActiveTab,
    autoDrawTeams
  } = useTournament();

  const [activeSubTab, setActiveSubTab] = useState<'ringkasan' | 'jadwal' | 'wasit'>('ringkasan');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live match
  const liveMatch = matches.find((m) => m.status === 'live') || matches[0];
  const liveHome = teams.find((t) => t.id === liveMatch?.homeTeamId);
  const liveAway = teams.find((t) => t.id === liveMatch?.awayTeamId);

  // Next match
  const nextMatch = matches.find((m) => m.status === 'mendatang') || matches[matches.length - 1];
  const nextHome = teams.find((t) => t.id === nextMatch?.homeTeamId);
  const nextAway = teams.find((t) => t.id === nextMatch?.awayTeamId);

  // Leaders
  const leaderA = standingsA[0];
  const leaderB = standingsB[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Sinkronisasi data turnamen selesai!', 'sync');
    }, 600);
  };

  const handleSimulateGoal = () => {
    if (liveMatch) {
      quickAddLiveScore(liveMatch.id, 'home');
    }
  };

  const avgGoals = matches.length > 0 ? (totalGoals / Math.max(1, completedMatchesCount + 1)).toFixed(2) : '3.25';

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Tournament Hero Card */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pt-4">
        <div className="relative overflow-hidden rounded-xl bg-[#111c2e] text-white p-4 md:p-6 shadow-md border border-slate-800">
          {/* Ambient Glow & Watermark Pattern */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#006e2d]/25 blur-3xl pointer-events-none"></div>
          <div className="absolute right-4 top-4 opacity-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[100px] leading-none text-white">sports_soccer</span>
          </div>

          <div className="relative z-10 flex items-start gap-3 md:gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 p-1 flex items-center justify-center shadow-inner flex-shrink-0 backdrop-blur-xs">
              <img
                alt="Piala Nusantara Emblem"
                className="w-full h-full object-contain"
                src={TOURNAMENT_EMBLEM}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#006e2d] text-white text-[11px] font-bold tracking-wide uppercase">
                  {settings.season}
                </span>
                <span className="text-[11px] text-[#79849a] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[13px] text-[#f9bc45]">verified</span>
                  {settings.federation}
                </span>
              </div>
              <h1 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-white tracking-tight mt-1 truncate">
                {settings.name}
              </h1>
              <div className="flex items-center gap-1 text-[#79849a] text-[11px] mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#7ffc97]">stadium</span>
                <span className="truncate">{settings.venue}</span>
              </div>
            </div>
          </div>

          {/* Quick Tournament Metric Footer Bar */}
          <div className="mt-4 pt-2.5 bg-white/5 rounded-lg p-2.5 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#7ffc97] animate-ping"></span>
              <span className="text-[11px] md:text-[12px] text-white font-semibold truncate">
                {settings.matchdayTag}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] md:text-[11px] text-[#79849a]">Update: Baru saja</span>
              <button
                onClick={handleRefresh}
                className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-transform active:rotate-180"
                title="Sinkronkan Data"
              >
                <span className={`material-symbols-outlined text-[15px] text-white ${isRefreshing ? 'animate-spin' : ''}`}>
                  sync
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Subtabs */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full mt-4">
        <div className="bg-[#f1f3ff] p-1 rounded-xl flex items-center gap-1 shadow-sm border border-[#e1e8ff]">
          <button
            onClick={() => setActiveSubTab('ringkasan')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-bold text-center transition-all ${
              activeSubTab === 'ringkasan'
                ? 'bg-white text-[#111c2e] shadow-sm'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => setActiveSubTab('jadwal')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-bold text-center transition-all ${
              activeSubTab === 'jadwal'
                ? 'bg-white text-[#111c2e] shadow-sm'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Jadwal Hari Ini
          </button>
          <button
            onClick={() => setActiveSubTab('wasit')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-bold text-center transition-all ${
              activeSubTab === 'wasit'
                ? 'bg-white text-[#111c2e] shadow-sm'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Log Wasit
          </button>
        </div>
      </section>

      {/* SUBTAB 1: Ringkasan */}
      {activeSubTab === 'ringkasan' && (
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          {/* LIVE MATCH CENTER */}
          {liveMatch && (
            <section className="px-4 md:px-8 w-full mt-4">
              <div className="relative overflow-hidden rounded-xl bg-white p-4 md:p-5 shadow-sm border border-[#e1e8ff]">
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-[11px] uppercase tracking-wider font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                    {liveMatch.periodLabel}
                  </div>
                  <span className="text-[11px] text-[#45474c] flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px] text-[#006e2d]">sports</span>
                    Wasit: {liveMatch.referee || 'H. Santoso'}
                  </span>
                </div>

                {/* Scoreboard Cluster */}
                <div className="flex items-center justify-between py-2">
                  {/* Home */}
                  <div className="flex flex-col items-center flex-1 text-center min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#e9edff] p-2 flex items-center justify-center mb-1 shadow-sm overflow-hidden">
                      {liveHome?.logo ? (
                        <img src={liveHome.logo} alt={liveHome.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="material-symbols-outlined text-[#111c2e] text-[24px]">shield</span>
                      )}
                    </div>
                    <span className="text-[13px] text-[#121b2e] font-bold truncate w-full">
                      {liveHome?.name || 'Persikabo M.'}
                    </span>
                    <span className="text-[11px] text-[#006e2d] font-semibold">Grup A</span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center px-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#111c2e]">
                        {liveMatch.homeScore}
                      </span>
                      <span className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#c5c6cd]">
                        :
                      </span>
                      <span className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#111c2e]">
                        {liveMatch.awayScore}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#e1e8ff] text-[#45474c] text-[10px] font-semibold mt-1">
                      {liveMatch.pitch}
                    </span>
                  </div>

                  {/* Away */}
                  <div className="flex flex-col items-center flex-1 text-center min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#e9edff] p-2 flex items-center justify-center mb-1 shadow-sm overflow-hidden">
                      {liveAway?.logo ? (
                        <img src={liveAway.logo} alt={liveAway.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="material-symbols-outlined text-[#006e2d] text-[24px]">flag</span>
                      )}
                    </div>
                    <span className="text-[13px] text-[#121b2e] font-bold truncate w-full">
                      {liveAway?.name || 'Rajawali Utd'}
                    </span>
                    <span className="text-[11px] text-[#006e2d] font-semibold">Grup A</span>
                  </div>
                </div>

                {/* Match Scorers Box */}
                <div className="mt-2 bg-[#f1f3ff] rounded-lg p-2.5">
                  <div className="flex items-start justify-between text-[11px] text-[#45474c]">
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="flex items-center gap-1 truncate text-[#121b2e] font-medium">
                        <span className="material-symbols-outlined text-[13px] text-[#006e2d]">sports_soccer</span>
                        Ahmad 24'
                      </span>
                      <span className="flex items-center gap-1 truncate text-[#121b2e] font-medium">
                        <span className="material-symbols-outlined text-[13px] text-[#006e2d]">sports_soccer</span>
                        Doni 58'
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-1 min-w-0">
                      <span className="flex items-center gap-1 truncate text-[#121b2e] font-medium">
                        Rizky 41'
                        <span className="material-symbols-outlined text-[13px] text-[#006e2d]">sports_soccer</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disciplinary & Live Update Button */}
                <div className="mt-3 flex items-center justify-between gap-2 pt-1 border-t border-[#e9edff]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#45474c] font-semibold">Disiplin:</span>
                    <div className="flex items-center gap-1 bg-[#f1f3ff] px-2 py-1 rounded">
                      <span className="w-2.5 h-3.5 rounded-[2px] bg-[#f9bc45] inline-block shadow-xs"></span>
                      <span className="text-[11px] font-bold text-[#121b2e]">{liveMatch.homeYellow}</span>
                      <span className="text-[#c5c6cd] text-[11px] mx-0.5">-</span>
                      <span className="text-[11px] font-bold text-[#121b2e]">{liveMatch.awayYellow}</span>
                      <span className="w-2.5 h-3.5 rounded-[2px] bg-[#f9bc45] inline-block ml-0.5 shadow-xs"></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSimulateGoal}
                      className="px-3 py-1.5 rounded-lg bg-[#006e2d] text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-sm hover:bg-[#007230]"
                    >
                      <span className="material-symbols-outlined text-[14px]">sports_soccer</span>
                      + Gol
                    </button>
                    <button
                      onClick={() => onOpenMatchResultModal(liveMatch.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#111c2e] text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-sm hover:bg-[#1d2d47]"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit_note</span>
                      Update Match Event
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Indikator Turnamen (4 Metrics) */}
          <section className="px-4 md:px-8 w-full mt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
                Indikator Turnamen
              </h2>
              <span className="text-[11px] text-[#45474c] font-medium">Statistik Resmi</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Stat 1 */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#45474c] font-medium">Total Peserta</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#111c2e]">
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#121b2e]">
                    {teams.length} <span className="text-[12px] font-normal text-[#45474c]">Tim</span>
                  </div>
                  <span className="text-[10px] text-[#006e2d] font-bold">2 Grup • Standar PSSI</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#45474c] font-medium">Pertandingan</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#006e2d]">
                    <span className="material-symbols-outlined text-[16px]">scoreboard</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#121b2e]">
                    {matches.length} <span className="text-[12px] font-normal text-[#45474c]">Total</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#45474c]">
                    <span className="text-[#006e2d] font-bold">{completedMatchesCount} Selesai</span>
                    <span>•</span>
                    <span className="text-[#ac7b00] font-bold">{remainingMatchesCount} Sisa</span>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#45474c] font-medium">Produktivitas Gol</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#f9bc45]">
                    <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#121b2e]">
                    {totalGoals} <span className="text-[12px] font-normal text-[#45474c]">Gol</span>
                  </div>
                  <span className="text-[10px] text-[#45474c]">
                    Rata-rata <strong className="text-[#121b2e] font-bold">{avgGoals}</strong> /laga
                  </span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#45474c] font-medium">Fairplay Cards</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-3.5 rounded-[2px] bg-[#f9bc45] inline-block shadow-xs"></span>
                      <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#121b2e]">{totalYellowCards}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-3.5 rounded-[2px] bg-[#ba1a1a] inline-block shadow-xs"></span>
                      <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#ba1a1a]">{totalRedCards}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#45474c] font-medium">Sanksi Poin Terapan</span>
                </div>
              </div>
            </div>
          </section>

          {/* Group Leaders Quick Glance (Klasemen Mini) */}
          <section className="px-4 md:px-8 w-full mt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
                Pemimpin Klasemen
              </h2>
              <button
                onClick={() => setActiveTab('klasemen-dan-fairplay')}
                className="text-[11px] font-bold text-[#006e2d] flex items-center hover:underline"
              >
                Detail Klasemen
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Leader A */}
              {leaderA && (
                <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#006e2d]/10 text-[#006e2d] flex items-center justify-center font-['Space_Grotesk'] text-base font-bold flex-shrink-0">
                      A1
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-[#121b2e] truncate">
                        {leaderA.team.name}
                      </span>
                      <span className="text-[11px] text-[#45474c] truncate">
                        {leaderA.played} Main • {leaderA.won} Menang • {leaderA.drawn} Seri
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[12px] font-bold text-[#111c2e]">
                        {leaderA.points} Poin
                      </span>
                      <span className="text-[10px] text-[#006e2d] font-semibold">
                        {leaderA.goalDiff > 0 ? `+${leaderA.goalDiff}` : leaderA.goalDiff} SG • FP {leaderA.fairplayScore}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#006e2d] text-[20px]">military_tech</span>
                  </div>
                </div>
              )}

              {/* Leader B */}
              {leaderB && (
                <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#111c2e]/10 text-[#111c2e] flex items-center justify-center font-['Space_Grotesk'] text-base font-bold flex-shrink-0">
                      B1
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-[#121b2e] truncate">
                        {leaderB.team.name}
                      </span>
                      <span className="text-[11px] text-[#45474c] truncate">
                        {leaderB.played} Main • {leaderB.won} Menang • Rekor Sempurna
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[12px] font-bold text-[#111c2e]">
                        {leaderB.points} Poin
                      </span>
                      <span className="text-[10px] text-[#006e2d] font-semibold">
                        {leaderB.goalDiff > 0 ? `+${leaderB.goalDiff}` : leaderB.goalDiff} SG • FP {leaderB.fairplayScore}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#f9bc45] text-[20px]">military_tech</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Laga Berikutnya Spotlight */}
          {nextMatch && (
            <section className="px-4 md:px-8 w-full mt-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
                  Laga Berikutnya
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#e1e8ff] text-[#45474c] text-[10px] font-semibold">
                  Match #{nextMatch.matchNumber}
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] relative overflow-hidden">
                <div className="flex items-center justify-between text-[#45474c] text-[11px] pb-2 border-b border-[#f1f3ff]">
                  <span className="flex items-center gap-1 font-semibold text-[#111c2e]">
                    <span className="material-symbols-outlined text-[14px] text-[#f9bc45]">schedule</span>
                    {nextMatch.dateLabel} • {nextMatch.timeLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f1f3ff] text-[#121b2e] text-[10px] font-bold">
                    {nextMatch.periodLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#f1f3ff] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-[#111c2e]">sports_soccer</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#121b2e] truncate">
                      {nextHome?.name || 'Bintang Timur FC'}
                    </span>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-[#f1f3ff] text-[11px] font-bold text-[#45474c] flex-shrink-0 mx-2">
                    VS
                  </div>

                  <div className="flex items-center justify-end gap-2 flex-1 min-w-0 text-right">
                    <span className="text-[13px] font-bold text-[#121b2e] truncate">
                      {nextAway?.name || 'Elang Jawa FC'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#f1f3ff] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-[#006e2d]">sports_soccer</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 flex items-center justify-between text-[11px] text-[#45474c] bg-[#f1f3ff] rounded-lg px-2.5 py-1.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">location_on</span>
                    {nextMatch.pitch}
                  </span>
                  <span className="text-[#006e2d] font-bold">Grup B Decider</span>
                </div>
              </div>
            </section>
          )}

          {/* Operational Quick Actions (Aksi Cepat Panitia) */}
          <section className="px-4 md:px-8 w-full mt-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
                Aksi Cepat Panitia
              </h2>
              <span className="text-[11px] text-[#45474c] font-medium">Shortcut Manajemen</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                onClick={onOpenAddTeamModal}
                className="bg-white p-3 rounded-xl text-left flex items-start gap-2.5 shadow-sm border border-[#e1e8ff] active:scale-98 transition-transform hover:border-[#006e2d]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#e1e8ff] text-[#111c2e] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">group_add</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#121b2e] truncate">Tambah Tim</span>
                  <span className="text-[10px] text-[#45474c] truncate">Registrasi peserta</span>
                </div>
              </button>

              <button
                onClick={autoDrawTeams}
                className="bg-white p-3 rounded-xl text-left flex items-start gap-2.5 shadow-sm border border-[#e1e8ff] active:scale-98 transition-transform hover:border-[#006e2d]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#e1e8ff] text-[#006e2d] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">shuffle</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#121b2e] truncate">Bagi Grup</span>
                  <span className="text-[10px] text-[#45474c] truncate">Undian otomatis</span>
                </div>
              </button>

              <button
                onClick={() => {
                  if (liveMatch) onOpenMatchResultModal(liveMatch.id);
                  else showToast('Pilih laga dari tab Jadwal.');
                }}
                className="bg-white p-3 rounded-xl text-left flex items-start gap-2.5 shadow-sm border border-[#e1e8ff] active:scale-98 transition-transform hover:border-[#006e2d]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#e1e8ff] text-[#f9bc45] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sports</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#121b2e] truncate">Input Skor</span>
                  <span className="text-[10px] text-[#45474c] truncate">Skor & disiplin wasit</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('final-dan-trofeo')}
                className="bg-white p-3 rounded-xl text-left flex items-start gap-2.5 shadow-sm border border-[#e1e8ff] active:scale-98 transition-transform hover:border-[#006e2d]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#e1e8ff] text-[#ac7b00] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#121b2e] truncate">Final & Trofeo</span>
                  <span className="text-[10px] text-[#45474c] truncate">Generate fase gugur</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setActiveTab('klasemen-dan-fairplay')}
              className="w-full mt-3 bg-[#111c2e] text-white py-3 px-4 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all hover:bg-[#1d2d47]"
            >
              <span className="material-symbols-outlined text-[18px]">table_rows</span>
              <span>Buka Klasemen Lengkap & Aturan Tie-Breaker</span>
            </button>
          </section>
        </div>
      )}

      {/* SUBTAB 2: Jadwal Hari Ini */}
      {activeSubTab === 'jadwal' && (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 gap-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
              Jadwal & Hasil Hari Ini
            </h2>
            <span className="text-[11px] text-[#006e2d] font-bold">4 Pertandingan</span>
          </div>

          {/* Match 1 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#45474c]">08:30 WIB • Match 8 (Grup A)</span>
              <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#121b2e] font-bold">SELESAI (FT)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#121b2e] flex-1">Nusantara Putra</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#111c2e] px-3">0 - 2</span>
              <span className="text-[13px] font-bold text-[#121b2e] flex-1 text-right">Garuda Muda FC</span>
            </div>
          </div>

          {/* Match 2 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#ba1a1a] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                13:45 WIB • LIVE 67'
              </span>
              <span className="px-2 py-0.5 rounded bg-[#ba1a1a]/10 text-[#ba1a1a] font-bold">BABAK 2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#121b2e] flex-1">Persikabo Muda</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#111c2e] px-3">2 - 1</span>
              <span className="text-[13px] font-bold text-[#121b2e] flex-1 text-right">Rajawali Utd</span>
            </div>
          </div>

          {/* Match 3 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#45474c]">15:30 WIB • Match 10 (Grup B)</span>
              <span className="px-2 py-0.5 rounded bg-[#006e2d]/10 text-[#006e2d] font-bold">KICKOFF SEGERA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#121b2e] flex-1">Bintang Timur FC</span>
              <span className="text-[13px] text-[#45474c] px-3 font-semibold">VS</span>
              <span className="text-[13px] font-bold text-[#121b2e] flex-1 text-right">Elang Jawa FC</span>
            </div>
          </div>

          {/* Match 4 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e8ff] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#45474c]">19:30 WIB • Match 11 (Grup B)</span>
              <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#45474c] font-semibold">MALAM INI</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#121b2e] flex-1">Bhayangkara Stars</span>
              <span className="text-[13px] text-[#45474c] px-3 font-semibold">VS</span>
              <span className="text-[13px] font-bold text-[#121b2e] flex-1 text-right">Cenderawasih FC</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Log Wasit */}
      {activeSubTab === 'wasit' && (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 gap-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#121b2e]">
              Log Laporan Wasit & Disiplin
            </h2>
            <span className="text-[11px] text-[#45474c] font-medium">Sinkron Real-time</span>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ba1a1a]/15 text-[#ba1a1a] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#121b2e]">Gol Disahkan: Doni (Persikabo)</span>
                  <span className="text-[11px] text-[#45474c] font-semibold">58'</span>
                </div>
                <p className="text-[11px] text-[#45474c] mt-0.5">Tendangan first-time dari luar kotak penalti. Assist oleh Budi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#f1f3ff]">
              <div className="w-8 h-8 rounded-full bg-[#f9bc45]/20 text-[#ac7b00] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">warning</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#121b2e]">Kartu Kuning: #17 M. Fajar</span>
                  <span className="text-[11px] text-[#45474c] font-semibold">51'</span>
                </div>
                <p className="text-[11px] text-[#45474c] mt-0.5">Rajawali United • Pelanggaran taktis menghentikan serangan balik cepat.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#f1f3ff]">
              <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#121b2e]">Kartu Merah Langsung (Match 8)</span>
                  <span className="text-[11px] text-[#45474c] font-semibold">88'</span>
                </div>
                <p className="text-[11px] text-[#45474c] mt-0.5">Nusantara Putra #4 • Pelanggaran keras professional foul. Sanksi 2 laga.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
