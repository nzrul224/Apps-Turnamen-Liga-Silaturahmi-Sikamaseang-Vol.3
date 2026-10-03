import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';

export const ManagementView: React.FC = () => {
  const {
    settings,
    updateSettings,
    togglePublicPortal,
    resetAllStats,
    showToast,
    totalGoals,
    totalYellowCards,
    totalRedCards,
    completedMatchesCount
  } = useTournament();

  const [activeSubTab, setActiveSubTab] = useState<'laporan' | 'statistik' | 'pengaturan' | 'publik'>('laporan');

  // Form local states for settings
  const [tournamentName, setTournamentName] = useState(settings.name);
  const [competitionFormat, setCompetitionFormat] = useState(settings.competitionFormat);
  const [tiebreakRule, setTiebreakRule] = useState(settings.tiebreakRule);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: tournamentName,
      competitionFormat,
      tiebreakRule
    });
  };

  const handleDownloadFile = (fileName: string, type: string) => {
    const dummyContent = `Dokumen Resmi PitchMaster Pro: ${fileName}\nTurnamen: ${settings.name}\nWaktu Unduh: ${new Date().toLocaleString()}\nStatus: Tervalidasi Komisi Disiplin & Pengawas Laga.`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Mengunduh ${fileName} (${type})...`, 'download');
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan publik live view berhasil disalin ke papan klip!', 'link');
    } else {
      showToast('Tautan publik aktif.', 'link');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 gap-4">
      {/* Top Segmented Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveSubTab('laporan')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
            activeSubTab === 'laporan'
              ? 'bg-[#111c2e] text-white shadow-sm'
              : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">assignment</span>
          <span>Laporan & Ekspor</span>
        </button>

        <button
          onClick={() => setActiveSubTab('statistik')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
            activeSubTab === 'statistik'
              ? 'bg-[#111c2e] text-white shadow-sm'
              : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">insights</span>
          <span>Statistik</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pengaturan')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
            activeSubTab === 'pengaturan'
              ? 'bg-[#111c2e] text-white shadow-sm'
              : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">settings</span>
          <span>Pengaturan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('publik')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
            activeSubTab === 'publik'
              ? 'bg-[#111c2e] text-white shadow-sm'
              : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">public</span>
          <span>Mode Publik</span>
        </button>
      </div>

      {/* Operational Status Card */}
      <div className="p-4 md:p-5 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#7cf994]/20 pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006e2d] animate-ping"></div>
            <span className="text-[11px] font-bold text-[#006e2d] uppercase tracking-wider">
              Turnamen Berjalan • Putaran 3
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#f1f3ff] text-[#45474c] text-[10px] font-bold">
            Matchday 2/4
          </span>
        </div>

        <div>
          <h2 className="font-['Space_Grotesk'] text-[18px] md:text-[20px] font-bold text-[#111c2e]">
            {settings.name}
          </h2>
          <p className="text-[12px] text-[#45474c]">
            Pusat Komando Resmi Federasi Daerah & Pengawas Pertandingan
          </p>
        </div>

        {/* Public portal live toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] mt-1 border border-[#e1e8ff]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#006e2d] text-[22px]">cell_tower</span>
            <div>
              <div className="text-[12px] font-bold text-[#111c2e]">Portal Suporter & Media Publik</div>
              <div className={`text-[11px] font-semibold ${settings.publicLivePortal ? 'text-[#006e2d]' : 'text-[#ba1a1a]'}`}>
                {settings.publicLivePortal ? 'Siaran Langsung Aktif (Online)' : 'Portal Ditutup Sementara (Offline)'}
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.publicLivePortal}
              onChange={togglePublicPortal}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006e2d]"></div>
          </label>
        </div>
      </div>

      {/* SUBTAB 1: LAPORAN & EKSPOR */}
      {activeSubTab === 'laporan' && (
        <div className="flex flex-col gap-4">
          {/* Custom Filter */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#111c2e]">
                <span className="material-symbols-outlined text-[18px] text-[#111c2e]">filter_alt</span>
                <span className="text-[13px] font-bold">Parameter Ekspor Data</span>
              </div>
              <button
                onClick={() => showToast('Filter grup dan rentang tanggal diatur ulang.', 'restart_alt')}
                className="text-[#75777d] hover:text-[#111c2e] text-[11px] underline"
              >
                Reset Filter
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#45474c] mb-1">Grup Kompetisi</label>
                <select className="w-full bg-[#f1f3ff] text-[#121b2e] text-[12px] font-semibold rounded-lg px-2.5 py-2 border border-[#e1e8ff] focus:outline-none">
                  <option value="all">Semua Grup (A & B)</option>
                  <option value="A">Grup A Saja</option>
                  <option value="B">Grup B Saja</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#45474c] mb-1">Rentang Tanggal</label>
                <select className="w-full bg-[#f1f3ff] text-[#121b2e] text-[12px] font-semibold rounded-lg px-2.5 py-2 border border-[#e1e8ff] focus:outline-none">
                  <option value="all">Semua Hari Laga</option>
                  <option value="today">Hari Ini (Matchday 2)</option>
                  <option value="yesterday">Kemarin (Matchday 1)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Official Tournament Documents */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-[#45474c] uppercase tracking-wider">
                Dokumen Resmi Turnamen
              </span>
              <span className="text-[11px] text-[#006e2d] font-bold">Tervalidasi Komdis</span>
            </div>

            {/* Doc 1 */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center flex-shrink-0 text-[#111c2e]">
                  <span className="material-symbols-outlined text-[22px]">menu_book</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#111c2e] truncate">Buku Panduan & Jadwal Resmi</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] text-[9px] uppercase font-bold">PDF</span>
                  </div>
                  <p className="text-[11px] text-[#45474c] truncate">Jadwal matchday 1-4, regulasi, dan daftar wasit terdaftar</p>
                  <span className="text-[10px] text-[#75777d] mt-0.5">Rev 1.4 • 4.2 MB • Diperbarui 2 jam lalu</span>
                </div>
              </div>
              <button
                onClick={() => handleDownloadFile('Buku-Panduan-Jadwal-Resmi.pdf', 'PDF')}
                className="h-9 px-3 rounded-lg bg-[#111c2e] text-white text-[12px] font-bold flex items-center gap-1 flex-shrink-0 shadow-sm active:scale-95 transition-transform hover:bg-[#1d2d47]"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span className="hidden sm:inline">Unduh</span>
              </button>
            </div>

            {/* Doc 2 */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#7cf994]/20 flex items-center justify-center flex-shrink-0 text-[#006e2d]">
                  <span className="material-symbols-outlined text-[22px]">table_chart</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#111c2e] truncate">Rekap Klasemen & Head-to-Head</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#7ffc97] text-[#002109] text-[9px] uppercase font-bold">XLS/PDF</span>
                  </div>
                  <p className="text-[11px] text-[#45474c] truncate">Matriks selisih gol, rekor poin pertemuan, & proyeksi lolos</p>
                  <span className="text-[10px] text-[#75777d] mt-0.5">Otomatis Terkalkulasi • 1.1 MB</span>
                </div>
              </div>
              <button
                onClick={() => handleDownloadFile('Rekap-Klasemen-HeadToHead.xlsx', 'Excel')}
                className="h-9 px-3 rounded-lg bg-[#f1f3ff] text-[#111c2e] text-[12px] font-bold flex items-center gap-1 flex-shrink-0 shadow-sm active:scale-95 transition-transform hover:bg-[#e1e8ff]"
              >
                <span className="material-symbols-outlined text-[16px]">table_view</span>
                <span className="hidden sm:inline">Excel</span>
              </button>
            </div>

            {/* Doc 3 */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffdea8]/30 flex items-center justify-center flex-shrink-0 text-[#ac7b00]">
                  <span className="material-symbols-outlined text-[22px]">warning</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#111c2e] truncate">Rekap Disiplin & Fairplay Lengkap</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#e9edff] text-[#111c2e] text-[9px] uppercase font-bold">CSV</span>
                  </div>
                  <p className="text-[11px] text-[#45474c] truncate">Poin sanksi kartu kuning/merah & akumulasi larangan bertanding</p>
                  <span className="text-[10px] text-[#75777d] mt-0.5">{totalYellowCards} Kartu Kuning • {totalRedCards} Merah • Update Realtime</span>
                </div>
              </div>
              <button
                onClick={() => handleDownloadFile('Disiplin-Fairplay-Lengkap.csv', 'CSV')}
                className="h-9 px-3 rounded-lg bg-[#f1f3ff] text-[#111c2e] text-[12px] font-bold flex items-center gap-1 flex-shrink-0 shadow-sm active:scale-95 transition-transform hover:bg-[#e1e8ff]"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>

            {/* Doc 4 */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center flex-shrink-0 text-[#111c2e]">
                  <span className="material-symbols-outlined text-[22px]">military_tech</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#111c2e] truncate">Berita Acara & Match Report</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#f9bc45]/40 text-[#271900] text-[9px] uppercase font-bold">Official</span>
                  </div>
                  <p className="text-[11px] text-[#45474c] truncate">Template penandatanganan pengawas laga & manajer tim</p>
                  <span className="text-[10px] text-[#75777d] mt-0.5">Format Standar PSSI Terpadu • PDF Siap Cetak</span>
                </div>
              </div>
              <button
                onClick={() => handleDownloadFile('Berita-Acara-Match-Report.pdf', 'PDF')}
                className="h-9 px-3 rounded-lg bg-[#111c2e] text-white text-[12px] font-bold flex items-center gap-1 flex-shrink-0 shadow-sm active:scale-95 transition-transform hover:bg-[#1d2d47]"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span className="hidden sm:inline">Cetak</span>
              </button>
            </div>
          </div>

          {/* Backup Database Card */}
          <div className="p-4 rounded-xl bg-[#111c2e] text-white flex flex-col gap-2 shadow-md border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">database</span>
                <span className="text-[13px] font-bold">Master Archive & Backup</span>
              </div>
              <span className="text-[10px] text-[#79849a]">Dump v2.4</span>
            </div>
            <p className="text-[12px] text-[#79849a]">
              Amankan snapshot database turnamen lengkap (profil tim, riwayat gol menit ke menit, dan log wasit).
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => showToast('Menyiapkan backup snapshot database SQL...', 'storage')}
                className="flex-1 py-2 rounded-lg bg-white text-[#111c2e] text-[12px] font-bold flex items-center justify-center gap-1 shadow-sm active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">storage</span>
                <span>Ekspor SQL</span>
              </button>
              <button
                onClick={() => showToast('Membuat archive bundel JSON turnamen...', 'data_object')}
                className="flex-1 py-2 rounded-lg bg-white/10 text-white text-[12px] font-bold flex items-center justify-center gap-1 active:scale-98 transition-transform hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-[16px]">data_object</span>
                <span>Ekspor JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: STATISTIK */}
      {activeSubTab === 'statistik' && (
        <div className="flex flex-col gap-4">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#75777d] font-bold uppercase tracking-wider">Rasio Gol/Laga</span>
                <span className="material-symbols-outlined text-[18px] text-[#006e2d]">sports_soccer</span>
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#111c2e] tracking-tight">
                {(totalGoals / Math.max(1, completedMatchesCount + 1)).toFixed(2)}
              </div>
              <span className="text-[11px] text-[#006e2d] flex items-center gap-0.5 font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +0.4 dari pekan lalu
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#75777d] font-bold uppercase tracking-wider">Distribusi Kartu</span>
                <span className="material-symbols-outlined text-[18px] text-[#ac7b00]">style</span>
              </div>
              <div className="flex items-baseline gap-2 pt-0.5">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-3.5 rounded-[2px] bg-[#f9bc45] inline-block shadow-sm"></span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#111c2e]">{totalYellowCards}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-3.5 rounded-[2px] bg-[#ba1a1a] inline-block shadow-sm"></span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#ba1a1a]">{totalRedCards}</span>
                </div>
              </div>
              <span className="text-[11px] text-[#45474c] font-medium">Fairplay Index: 88%</span>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#75777d] font-bold uppercase tracking-wider">Paling Produktif</span>
                <span className="material-symbols-outlined text-[18px] text-[#006e2d]">bolt</span>
              </div>
              <div className="pt-2">
                <div className="text-[13px] font-bold text-[#111c2e] truncate">Garuda Muda FC</div>
                <div className="text-[11px] text-[#006e2d] font-bold">7 Total Gol (Grup A)</div>
              </div>
              <div className="w-full bg-[#f1f3ff] rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-[#006e2d] h-1.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#75777d] font-bold uppercase tracking-wider">Pertahanan Terbaik</span>
                <span className="material-symbols-outlined text-[18px] text-[#111c2e]">shield</span>
              </div>
              <div className="pt-2">
                <div className="text-[13px] font-bold text-[#111c2e] truncate">Bhayangkara Stars</div>
                <div className="text-[11px] text-[#006e2d] font-bold">0 Kebobolan (Clean Sheet)</div>
              </div>
              <div className="w-full bg-[#f1f3ff] rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-[#111c2e] h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* Top Scorer Leaderboard Widget */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#ac7b00]">military_tech</span>
                <span className="text-[13px] font-bold text-[#111c2e]">Klasemen Top Scorer (Sepatu Emas)</span>
              </div>
              <span className="text-[11px] text-[#75777d]">Update Matchday 2</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f1f3ff]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-[#f9bc45]/40 text-[#271900] font-['Space_Grotesk'] text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-[#121b2e] truncate">Dimas Prasetyo</span>
                    <span className="text-[10px] text-[#75777d] truncate">Garuda Muda FC • Forward #9</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Space_Grotesk'] text-xl font-bold text-[#121b2e]">4</span>
                  <span className="text-[11px] text-[#75777d]">Gol</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f9f9ff]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-[#e9edff] text-[#45474c] font-['Space_Grotesk'] text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-[#121b2e] truncate">Doni Ardiansyah</span>
                    <span className="text-[10px] text-[#75777d] truncate">Persikabo Muda • Winger #11</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Space_Grotesk'] text-xl font-bold text-[#121b2e]">3</span>
                  <span className="text-[11px] text-[#75777d]">Gol</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f9f9ff]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-[#e9edff] text-[#45474c] font-['Space_Grotesk'] text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-[#121b2e] truncate">Eko Wahyudi</span>
                    <span className="text-[10px] text-[#75777d] truncate">Bhayangkara Stars • Midfield #8</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Space_Grotesk'] text-xl font-bold text-[#121b2e]">3</span>
                  <span className="text-[11px] text-[#75777d]">Gol</span>
                </div>
              </div>
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
            <span className="text-[13px] font-bold text-[#111c2e]">Sebaran Gol Berdasarkan Interval Menit</span>
            <div className="w-full h-28 flex items-end justify-between gap-2 pt-2 px-1">
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#45474c] font-bold">2 Gol</span>
                <div className="w-full bg-[#e9edff] rounded-t-md" style={{ height: '30%' }}></div>
                <span className="text-[9px] text-[#75777d]">0'-10'</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#006e2d] font-bold">5 Gol</span>
                <div className="w-full bg-[#7cf994] rounded-t-md" style={{ height: '65%' }}></div>
                <span className="text-[9px] text-[#75777d]">11'-20'</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#45474c] font-bold">3 Gol</span>
                <div className="w-full bg-[#e9edff] rounded-t-md" style={{ height: '42%' }}></div>
                <span className="text-[9px] text-[#75777d]">21'-30'</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#006e2d] font-bold">8 Gol</span>
                <div className="w-full bg-[#006e2d] rounded-t-md" style={{ height: '95%' }}></div>
                <span className="text-[9px] text-[#111c2e] font-bold">31'-40'</span>
              </div>
            </div>
            <p className="text-[11px] text-[#75777d] text-center">
              Menit akhir babak kedua memiliki frekuensi gol tertinggi (50% laga tercipta gol penentu).
            </p>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PENGATURAN */}
      {activeSubTab === 'pengaturan' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-[#f1f3ff] text-[#121b2e] flex items-start gap-3 border border-[#e1e8ff]">
            <div className="w-9 h-9 rounded-lg bg-[#111c2e] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#111c2e]">Akses Super Administrator Aktif</span>
                <span className="px-1.5 py-0.5 rounded bg-[#7cf994]/40 text-[#007230] text-[10px] font-bold">Terverifikasi</span>
              </div>
              <p className="text-[11px] text-[#45474c]">Hak penuh: Pengesahan klasemen otomatis, durasi pertandingan, dan reset bagan turnamen.</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#111c2e] mb-1">Nama Turnamen Resmi</label>
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                className="w-full bg-[#f1f3ff] text-[#121b2e] text-[13px] font-semibold rounded-lg px-3 py-2.5 border border-[#e1e8ff] focus:outline-none focus:border-[#006e2d]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold text-[#111c2e] mb-1">Format Babak</label>
                <select
                  value={competitionFormat}
                  onChange={(e) => setCompetitionFormat(e.target.value)}
                  className="w-full bg-[#f1f3ff] text-[#121b2e] text-[12px] font-semibold rounded-lg px-2.5 py-2.5 border border-[#e1e8ff] focus:outline-none"
                >
                  <option value="2-group">2 Grup (Round Robin)</option>
                  <option value="4-group">4 Grup (Sistem Gugur Lanjutan)</option>
                  <option value="knockout">Sistem Gugur Murni</option>
                  <option value="trofeo">Trofeo Mini Tournament</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#111c2e] mb-1">Regulasi Hasil Seri</label>
                <select
                  value={tiebreakRule}
                  onChange={(e) => setTiebreakRule(e.target.value as any)}
                  className="w-full bg-[#f1f3ff] text-[#121b2e] text-[12px] font-semibold rounded-lg px-2.5 py-2.5 border border-[#e1e8ff] focus:outline-none"
                >
                  <option value="penalti">Langsung Adu Penalti</option>
                  <option value="extra">Extra Time (2x10')</option>
                  <option value="panitia">Regulasi Khusus Panitia</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#111c2e] mb-1">Durasi Pertandingan</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f1f3ff] border border-[#e1e8ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#45474c]">timer</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#75777d]">Waktu Tiap Babak</span>
                    <span className="text-[12px] font-bold text-[#111c2e]">{settings.halfDurationMinutes} x 2 Menit</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f1f3ff] border border-[#e1e8ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#45474c]">free_cancellation</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#75777d]">Waktu Istirahat</span>
                    <span className="text-[12px] font-bold text-[#111c2e]">{settings.breakDurationMinutes} Menit</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#111c2e] mb-1">Ambang Batas Sanksi Komdis</label>
              <div className="p-3 rounded-lg bg-[#f1f3ff] flex flex-col gap-2 border border-[#e1e8ff] text-[12px]">
                <div className="flex items-center justify-between text-[#121b2e]">
                  <span>Akumulasi Kartu Kuning (Larangan 1 Laga)</span>
                  <span className="font-bold">2 Kartu</span>
                </div>
                <div className="flex items-center justify-between text-[#121b2e]">
                  <span>Kartu Merah Langsung</span>
                  <span className="font-bold text-[#ba1a1a]">Larangan 2 Laga</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2 border-t border-[#e9edff]">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#111c2e] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform hover:bg-[#1d2d47]"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Simpan Perubahan Regulasi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset seluruh poin, gol, dan riwayat pertandingan ke kondisi awal?')) {
                    resetAllStats();
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold flex items-center justify-center gap-1 active:scale-98 transition-transform hover:bg-[#ffb4ab]"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Reset Seluruh Poin & Klasemen</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBTAB 4: MODE PUBLIK */}
      {activeSubTab === 'publik' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#006e2d]"></span>
                <span className="text-[13px] font-bold text-[#111c2e]">Pratinjau Layar Suporter & Media</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded bg-[#f1f3ff] text-[#111c2e] text-[11px] font-bold flex items-center gap-1 hover:bg-[#e1e8ff]"
              >
                <span className="material-symbols-outlined text-[14px]">link</span> Salin Tautan
              </button>
            </div>
            <p className="text-[12px] text-[#45474c]">
              Berikut adalah tampilan yang dilihat penonton via ponsel atau proyektor mini di venue stadion.
            </p>
          </div>

          {/* Smartphone Simulator */}
          <div className="p-4 md:p-6 rounded-2xl bg-[#0f172a] text-[#f8fafc] shadow-2xl flex flex-col gap-4 border border-slate-800">
            {/* Public Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#006e2d] flex items-center justify-center text-white text-[12px] font-bold">
                  ⚽
                </div>
                <span className="font-['Space_Grotesk'] text-[15px] font-bold tracking-tight text-white">
                  PIALA NUSANTARA 2025
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] uppercase font-bold animate-pulse">
                ● LIVE SCORE
              </span>
            </div>

            {/* Featured Match Card */}
            <div className="p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm flex flex-col gap-2 border border-slate-700/60">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Stadion Utama Gelora Merdeka • Pitch 1</span>
                <span className="text-emerald-400 font-bold">Babak ke-2 (67')</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col items-center flex-1 text-center min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mb-1 shadow">
                    PK
                  </div>
                  <span className="text-[12px] text-white font-bold truncate w-full">Persikabo M.</span>
                </div>

                <div className="px-3 flex flex-col items-center flex-shrink-0">
                  <div className="font-['Space_Grotesk'] text-3xl font-bold tracking-wider text-white">
                    2 - 1
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold mt-0.5">Pertandingan Sengit</span>
                </div>

                <div className="flex flex-col items-center flex-1 text-center min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mb-1 shadow">
                    RU
                  </div>
                  <span className="text-[12px] text-white font-bold truncate w-full">Rajawali Utd</span>
                </div>
              </div>

              <div className="text-center bg-slate-900/80 py-1.5 rounded-lg text-slate-300 text-[11px] font-medium">
                ⚽ Ahmad (24'), Doni (58') — ⚽ Rizky (41')
              </div>
            </div>

            {/* Mini Standings Preview */}
            <div className="flex flex-col gap-2 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-300 text-[11px] font-bold">
                <span>KLASEMEN SEMENTARA - GRUP A</span>
                <span className="text-emerald-400 font-bold">Klasemen Resmi</span>
              </div>
              <div className="flex flex-col divide-y divide-slate-800 text-[12px]">
                <div className="py-1.5 flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-emerald-400 font-bold">1</span>
                    <span>Garuda Muda FC</span>
                  </div>
                  <div className="flex gap-3 text-slate-300">
                    <span>M:3</span>
                    <span className="text-white font-bold">P:7</span>
                  </div>
                </div>
                <div className="py-1.5 flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-emerald-400 font-bold">2</span>
                    <span>Persikabo Muda</span>
                  </div>
                  <div className="flex gap-3 text-slate-300">
                    <span>M:3</span>
                    <span className="text-white font-bold">P:6</span>
                  </div>
                </div>
                <div className="py-1.5 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-4">3</span>
                    <span>Rajawali United</span>
                  </div>
                  <div className="flex gap-3">
                    <span>M:3</span>
                    <span className="text-slate-200">P:3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Share Card */}
            <div className="p-3 rounded-xl bg-slate-800/60 flex items-center justify-between border border-slate-700/50">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-white">Buka di Ponsel Penonton</span>
                <span className="text-[11px] text-slate-400">Scan QR Code di tiket fisik untuk live feeds</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-900 shadow">
                <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
