export type GroupId = 'A' | 'B' | 'NONE';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  logo: string;
  jerseyColor: string;
  jerseyColorClass: string;
  captain: string;
  manager: string;
  phone: string;
  group: GroupId;
}

export type MatchStatus = 'live' | 'selesai' | 'mendatang';

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
  teamId: string;
  playerName: string;
  description?: string;
}

export interface Match {
  id: string;
  matchNumber: number;
  group: 'grup-a' | 'grup-b' | 'final';
  stageName: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  liveMinute?: number;
  periodLabel: string; // e.g. "LIVE 67'", "FT", "15:30"
  dateLabel: string;   // e.g. "Sabtu, 10 Mei 2025"
  timeLabel: string;   // e.g. "08:00 WIB"
  pitch: string;       // e.g. "Lap. 1 Utama • Grup A"
  referee?: string;
  events: MatchEvent[];
  homeYellow: number;
  homeRed: number;
  awayYellow: number;
  awayRed: number;
}

export interface TeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  fairplayScore: number;
  rank: number;
  statusLabel: 'Grand Final' | '2nd Final' | '3rd Final' | 'Gugur';
  statusColor: string;
}

export interface TournamentSettings {
  name: string;
  season: string;
  federation: string;
  venue: string;
  matchdayTag: string;
  publicLivePortal: boolean;
  competitionFormat: string;
  tiebreakRule: 'penalti' | 'extra' | 'panitia';
  halfDurationMinutes: number;
  breakDurationMinutes: number;
  yellowCardSuspensionLimit: number;
  redCardSuspensionLimit: number;
  isStandingsLocked: boolean;
}

export interface FinalMatchStage {
  id: 'grand-final' | 'second-final' | 'third-final';
  title: string;
  subtitle: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  pitch: string;
  tiebreakMethod: string;
  isCompleted: boolean;
  winnerTeamId?: string;
  badgeAccent: string;
}
