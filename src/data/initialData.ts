import { Team, Match, TournamentSettings, FinalMatchStage } from '../types/tournament';

export const INITIAL_TEAMS: Team[] = [
  // Group A Teams
  {
    id: 'garuda-muda',
    name: 'Garuda Muda FC',
    shortName: 'GM',
    city: 'Sleman, DIY',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE8rUCgNLUv_RYlGVXqrNfVQUsSv3qYyuQhFXUDrey2mEDgeHRmTHL0iq2Ap2at-YLxNKMRsZvndM1E8IiMe171raE0vMd6H2Yd2Yknr2GV8FDVma65V3YrlHxqDo9DUdmkEBqa0EiG99AesEAsDWWcgqb0S_4iGcjT8jW5zFJjhOpyfLNqKF7ufPUBQF75PT80wb9V4cxs8wZMZBDH1V-1jrc-bKKRxbYDJLPgmQ3EF4sotjFfXo',
    jerseyColor: 'Merah-Putih (Utama)',
    jerseyColorClass: 'bg-red-600',
    captain: 'Dimas P. (C)',
    manager: 'Hendra S.',
    phone: '0812-3456-7890',
    group: 'A'
  },
  {
    id: 'persikabo-muda',
    name: 'Persikabo Muda',
    shortName: 'PK',
    city: 'Bogor',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADjeXk1WhXNFyZEow2PMSQoqLCbu4lHzNakHSTWYvTJSDn7vfVGeWmdtONxkFwgwCMuebIZC0d1-0HjxuJcxNw8dKQbhnpFOJyqNM5IGwZNZSYTWyBj0tYy5MfVR7tnghzVL7QxFA29lqePYn0Y6pxeVYw9Wd1J29B7p8CYn8yrcGUMfPJcLsQw7yRn6v1CAtFAcIRNbBQJ1xkOEy4agAbSjnsgzC9oEMFziNnZhdGyUGOZhzO_sU',
    jerseyColor: 'Hijau-Kuning (Utama)',
    jerseyColorClass: 'bg-emerald-600',
    captain: 'Rizal B. (C)',
    manager: 'Suryono',
    phone: '0813-9876-1234',
    group: 'A'
  },
  {
    id: 'rajawali-united',
    name: 'Rajawali United',
    shortName: 'RU',
    city: 'Bandung',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWNN0PfB_Lk8g4bk7m4J3vbX3E-03ScKNSS1e5H3nLlnSuBBaDvNmSC2K5SfTgyEpomwFZ8JptwZ3v9ZJELxyvy7VLmPR_yVkuKEQ7HWMvnsCDV3wpxo274nAHDdtCqXI21alnRSKhudyqtk0TKga5rz28314vdSxZUGSZh4U4Xf6gZ49ug-lU8V0fdD5ZCrL-cIaBlPylt9iVyWJEbrfuDY_XioJ8lKuAcqXTllSTLx18fphuzQ',
    jerseyColor: 'Biru Langit (Utama)',
    jerseyColorClass: 'bg-sky-500',
    captain: 'Bagas T. (C)',
    manager: 'Andi F.',
    phone: '0857-1122-3344',
    group: 'A'
  },
  {
    id: 'sriwijaya-junior',
    name: 'Sriwijaya Junior',
    shortName: 'SJ',
    city: 'Palembang',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4GfDKn3hYvVSi-CDPA0rEnIJ1aSaH1zO1IS3I3V8kfqW_9IQsqte1hqoN3KG9IF9xZHNkMzcdZRq-qggzxgCNsheJh_VePRPTHBugfPhut0WKkjO7yBIsj2Qd1LoptJN5SxpjufDyVmwwEW3jsg4rEkp-6stln4NRRYkVx0XW3E_0ObujKLlQEAmrMo8BpxlX4Y2x2tgYUSXijrQf8ve3V3fFyxDoqLC_xAwk3NB5Lg0o8GphlSQ',
    jerseyColor: 'Kuning Emas (Utama)',
    jerseyColorClass: 'bg-amber-400',
    captain: 'Fahri M. (C)',
    manager: 'Ridwan',
    phone: '0819-5566-7788',
    group: 'A'
  },

  // Group B Teams
  {
    id: 'bhayangkara-stars',
    name: 'Bhayangkara Stars',
    shortName: 'BS',
    city: 'Jakarta Selatan',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWxQo5t0AcUhqkFr2KH4y4qiK8-oBLCS6Ok5ZmF7jNYvValKoL0iGpOq03fjs-nbWFpxFBNgHeGcOC7qC_KJ2wanOvNfnEgefyP5Pnn2o0eXZcQCYPXrmqsBDwxQ5KS3SvPmP6iMODK2zilehWghlAf_cFWGhrxuC3ZwDQB205HSq9iSLUZytU6p6N_rgSwXqYuQcXghbA-XAsKOx2Ak0XqJSbH3k1cCR39rRkXg2C4Ydx_2uoqqQ',
    jerseyColor: 'Hitam-Emas (Utama)',
    jerseyColorClass: 'bg-slate-900',
    captain: 'Eko W. (C)',
    manager: 'Joko A.',
    phone: '0821-4455-6677',
    group: 'B'
  },
  {
    id: 'bintang-timur',
    name: 'Bintang Timur FC',
    shortName: 'BT',
    city: 'Surabaya',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLm6iwlVImur0uUHXeTzvVcMcuOUXG6wHPRlJhkYDLD5Eh2neE8NTCJFxD-vtzILcb4iQkM-t24PDixaENW_5XbGNyM5EU9OpxxW3OLfx2H4AUM7HFdizCIykNIFL6sb8E51FUBUhNbZQGrX0nyQqqgBAKawjtP4aJeg4gkhS0q94UZ1JNGV2ttNgA9-B4hCuAtfQG4ZNTYH29LLq3MFwWt0YT9oOMbk4VPYKddtK6F7pCIRBtmw',
    jerseyColor: 'Biru Navy (Utama)',
    jerseyColorClass: 'bg-blue-900',
    captain: 'Aris K. (C)',
    manager: 'Bambang',
    phone: '0812-7788-9900',
    group: 'B'
  },
  {
    id: 'elang-jawa',
    name: 'Elang Jawa FC',
    shortName: 'EJ',
    city: 'Semarang',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANO4_eovdnkKLPfLaxlAxDQlxNcvIJJ0NRCd8ivWhB00bqxAc_ubS_jRGjbwY720Fka_p2_Elw-xZBl-v1M_XVNoBpMDhTbewPPljdGUR4UpLSb0BCEgH5qPERGiRw67vP60-r3j_7_Q4Hi6K6Rjs8M4IHbYweYI7rvSVNZGGObAaTH3NQUnNY2pUHcEfnbLRgL0lFR78SryOSKloI6etZ8QHWU8AGrrci71oI1DyuUbuVwp32i2M',
    jerseyColor: 'Putih Garis Merah',
    jerseyColorClass: 'bg-red-500',
    captain: 'Taufiq H. (C)',
    manager: 'Gunawan',
    phone: '0813-2233-4455',
    group: 'B'
  },
  {
    id: 'cenderawasih-putra',
    name: 'Cenderawasih Putra',
    shortName: 'CP',
    city: 'Jayapura',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT-a5_uOaSC1zvAcojDrsbZjdJ2e8MS_JsitJ_3XP4XdqfHuQEeAY6vE-f3VwHNdVu9HOJVfjP0s4E9UR60gKY3k9SVZdIhT2WVCGIHmnjMD6eOlYqsiVAQtbNxnpVeLIwVxJPVjsrRM5MU39xCRt_LPJoieBCtA_DK5q2kOgEWs_UwLia4haBs5oEdHY5MFLwt0Re9_7yMtTEI-7UHooWXQ_BtNosmA1qz2_HM7uJPdfDLYVzIYs',
    jerseyColor: 'Merah-Hijau (Utama)',
    jerseyColorClass: 'bg-emerald-700',
    captain: 'Lukas W. (C)',
    manager: 'Yanuar',
    phone: '0896-7788-9911',
    group: 'B'
  }
];

export const INITIAL_SETTINGS: TournamentSettings = {
  name: 'PIALA NUSANTARA 2025',
  season: 'Musim Aktif',
  federation: 'PSSI Regional',
  venue: 'Stadion Utama Gelora Merdeka, Jakarta',
  matchdayTag: 'Matchday 3 Fase Grup',
  publicLivePortal: true,
  competitionFormat: '2-group',
  tiebreakRule: 'penalti',
  halfDurationMinutes: 20,
  breakDurationMinutes: 5,
  yellowCardSuspensionLimit: 2,
  redCardSuspensionLimit: 2,
  isStandingsLocked: true
};

export const INITIAL_MATCHES: Match[] = [
  // Live Match
  {
    id: 'match-live-1',
    matchNumber: 9,
    group: 'grup-a',
    stageName: 'Matchday 3 • Grup A',
    homeTeamId: 'persikabo-muda',
    awayTeamId: 'rajawali-united',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    liveMinute: 67,
    periodLabel: "LIVE • Babak 2 (67')",
    dateLabel: 'Hari Ini',
    timeLabel: '13:45 WIB',
    pitch: 'Pitch 1 • Lap. Barat',
    referee: 'H. Santoso',
    homeYellow: 2,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 0,
    events: [
      { id: 'ev-1', minute: "24'", type: 'goal', teamId: 'persikabo-muda', playerName: 'Ahmad' },
      { id: 'ev-2', minute: "41'", type: 'goal', teamId: 'rajawali-united', playerName: 'Rizky' },
      { id: 'ev-3', minute: "51'", type: 'yellow_card', teamId: 'rajawali-united', playerName: '#17 M. Fajar', description: 'Pelanggaran taktis menghentikan serangan balik cepat' },
      { id: 'ev-4', minute: "58'", type: 'goal', teamId: 'persikabo-muda', playerName: 'Doni', description: 'Tendangan first-time dari luar kotak penalti' }
    ]
  },

  // Completed Match 1
  {
    id: 'match-done-1',
    matchNumber: 1,
    group: 'grup-a',
    stageName: 'Matchday 1 • Grup A',
    homeTeamId: 'garuda-muda',
    awayTeamId: 'rajawali-united',
    homeScore: 3,
    awayScore: 1,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Sabtu, 10 Mei 2025',
    timeLabel: '08:00 WIB',
    pitch: 'Lap. 1 Utama • Grup A',
    referee: 'W. Kusuma',
    homeYellow: 1,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 0,
    events: [
      { id: 'ev-d1', minute: "14'", type: 'goal', teamId: 'garuda-muda', playerName: 'Dimas' },
      { id: 'ev-d2', minute: "45'", type: 'goal', teamId: 'garuda-muda', playerName: 'Fajar' },
      { id: 'ev-d3', minute: "62'", type: 'goal', teamId: 'garuda-muda', playerName: 'Dimas' },
      { id: 'ev-d4', minute: "78'", type: 'goal', teamId: 'rajawali-united', playerName: 'Bagas' },
      { id: 'ev-d5', minute: "33'", type: 'yellow_card', teamId: 'garuda-muda', playerName: 'Dimas' },
      { id: 'ev-d6', minute: "54'", type: 'yellow_card', teamId: 'rajawali-united', playerName: 'Irfan' }
    ]
  },

  // Completed Match 2
  {
    id: 'match-done-2',
    matchNumber: 2,
    group: 'grup-b',
    stageName: 'Matchday 1 • Grup B',
    homeTeamId: 'bhayangkara-stars',
    awayTeamId: 'elang-jawa',
    homeScore: 2,
    awayScore: 0,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Sabtu, 10 Mei 2025',
    timeLabel: '09:30 WIB',
    pitch: 'Lap. 2 Barat • Grup B',
    referee: 'B. Setiawan',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 0,
    awayRed: 0,
    events: [
      { id: 'ev-b1', minute: "22'", type: 'goal', teamId: 'bhayangkara-stars', playerName: 'Ilham' },
      { id: 'ev-b2', minute: "68'", type: 'goal', teamId: 'bhayangkara-stars', playerName: 'Ricky' }
    ]
  },

  // Completed Match 3
  {
    id: 'match-done-3',
    matchNumber: 3,
    group: 'grup-a',
    stageName: 'Matchday 2 • Grup A',
    homeTeamId: 'garuda-muda',
    awayTeamId: 'sriwijaya-junior',
    homeScore: 4,
    awayScore: 1,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Sabtu, 10 Mei 2025',
    timeLabel: '14:00 WIB',
    pitch: 'Lap. 1 Utama • Grup A',
    homeYellow: 1,
    homeRed: 0,
    awayYellow: 2,
    awayRed: 0,
    events: []
  },

  // Completed Match 4
  {
    id: 'match-done-4',
    matchNumber: 4,
    group: 'grup-b',
    stageName: 'Matchday 2 • Grup B',
    homeTeamId: 'bhayangkara-stars',
    awayTeamId: 'bintang-timur',
    homeScore: 3,
    awayScore: 1,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Sabtu, 10 Mei 2025',
    timeLabel: '16:00 WIB',
    pitch: 'Lap. 2 Barat • Grup B',
    homeYellow: 1,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 0,
    events: []
  },

  // Completed Match 5
  {
    id: 'match-done-5',
    matchNumber: 5,
    group: 'grup-a',
    stageName: 'Matchday 2 • Grup A',
    homeTeamId: 'persikabo-muda',
    awayTeamId: 'sriwijaya-junior',
    homeScore: 2,
    awayScore: 1,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Sabtu, 10 Mei 2025',
    timeLabel: '17:30 WIB',
    pitch: 'Lap. 1 Utama • Grup A',
    homeYellow: 1,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 1,
    events: []
  },

  // Completed Match 6
  {
    id: 'match-done-6',
    matchNumber: 6,
    group: 'grup-b',
    stageName: 'Matchday 2 • Grup B',
    homeTeamId: 'bintang-timur',
    awayTeamId: 'elang-jawa',
    homeScore: 3,
    awayScore: 1,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Minggu, 11 Mei 2025',
    timeLabel: '08:30 WIB',
    pitch: 'Lap. 2 Barat • Grup B',
    homeYellow: 1,
    homeRed: 0,
    awayYellow: 2,
    awayRed: 0,
    events: []
  },

  // Completed Match 7
  {
    id: 'match-done-7',
    matchNumber: 7,
    group: 'grup-a',
    stageName: 'Matchday 3 • Grup A',
    homeTeamId: 'garuda-muda',
    awayTeamId: 'persikabo-muda',
    homeScore: 0,
    awayScore: 0,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Minggu, 11 Mei 2025',
    timeLabel: '10:00 WIB',
    pitch: 'Lap. 1 Utama • Grup A',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 0,
    events: []
  },

  // Completed Match 8
  {
    id: 'match-done-8',
    matchNumber: 8,
    group: 'grup-a',
    stageName: 'Matchday 3 • Grup A',
    homeTeamId: 'rajawali-united',
    awayTeamId: 'sriwijaya-junior',
    homeScore: 2,
    awayScore: 0,
    status: 'selesai',
    periodLabel: 'FT',
    dateLabel: 'Minggu, 11 Mei 2025',
    timeLabel: '13:00 WIB',
    pitch: 'Lap. 1 Utama • Grup A',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 1,
    awayRed: 0,
    events: []
  },

  // Upcoming Match 10 (Spotlight on Dashboard)
  {
    id: 'match-up-1',
    matchNumber: 10,
    group: 'grup-b',
    stageName: 'Matchday 3 • Grup B (Decider)',
    homeTeamId: 'bintang-timur',
    awayTeamId: 'elang-jawa',
    homeScore: 0,
    awayScore: 0,
    status: 'mendatang',
    periodLabel: 'Menunggu Kick-off',
    dateLabel: 'Hari Ini',
    timeLabel: '15:30 WIB',
    pitch: 'Lapangan 1 (Stadion Utama)',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 0,
    awayRed: 0,
    events: []
  },

  // Upcoming Match 11
  {
    id: 'match-up-2',
    matchNumber: 11,
    group: 'grup-b',
    stageName: 'Matchday 3 • Grup B',
    homeTeamId: 'bhayangkara-stars',
    awayTeamId: 'cenderawasih-putra',
    homeScore: 0,
    awayScore: 0,
    status: 'mendatang',
    periodLabel: 'Malam Ini',
    dateLabel: 'Hari Ini',
    timeLabel: '19:30 WIB',
    pitch: 'Lap. 2 Barat • Grup B',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 0,
    awayRed: 0,
    events: []
  },

  // Upcoming Match 12
  {
    id: 'match-up-3',
    matchNumber: 12,
    group: 'grup-b',
    stageName: 'Matchday 3 • Grup B',
    homeTeamId: 'elang-jawa',
    awayTeamId: 'cenderawasih-putra',
    homeScore: 0,
    awayScore: 0,
    status: 'mendatang',
    periodLabel: 'Jadwal Besok',
    dateLabel: 'Senin, 12 Mei 2025',
    timeLabel: '09:00 WIB',
    pitch: 'Lap. 1 Utama • Grup B',
    homeYellow: 0,
    homeRed: 0,
    awayYellow: 0,
    awayRed: 0,
    events: []
  }
];

export const INITIAL_FINAL_STAGES: FinalMatchStage[] = [
  {
    id: 'grand-final',
    title: 'GRAND FINAL',
    subtitle: 'Juara 1 & 2 • Piala & Medali Emas',
    homeTeamId: 'garuda-muda',
    awayTeamId: 'bhayangkara-stars',
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
    homeTeamId: 'persikabo-muda',
    awayTeamId: 'bintang-timur',
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
    homeTeamId: 'rajawali-united',
    awayTeamId: 'elang-jawa',
    homeScore: 0,
    awayScore: 0,
    date: 'Minggu, 18 Mei 2025',
    time: '10:00 WIB',
    pitch: 'Lapangan 2',
    tiebreakMethod: 'penalti',
    isCompleted: false,
    badgeAccent: '#FFDEA8'
  }
];

export const TOURNAMENT_EMBLEM = 'https://lh3.googleusercontent.com/aida/AEtjO1XUR1WiStGBHSd1q4wgUTYrjA7ahsayh82drYcQmg0nZ7SzShvWU0sDtZKN-PopJY9Wd8AC26qLIzVAY6zfnXkij84nCzQBxxTW7PKu6JkSr6Jm-VpIB8t8DWo54G3ftNhVuc-npgb_pGvszjd8mTN5AkIU4NLbNtLR7vWMb6Cq8GuoYQm08A8oBIXaIWzzTVgTgTuJVdmftKwIkajKz2G0kjfC9T9M3psnf6FPUZ2XQJP-FNJrGLsRng';
