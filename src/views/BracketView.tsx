import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';

export const BracketView: React.FC = () => {
  const {
    teams,
    finalStages,
    updateFinalScore,
    finalizeChampion,
    generateFinalsFromStandings,
    showToast,
    setActiveTab
  } = useTournament();

  const [isGenerating, setIsGenerating] = useState(false);

  const grandFinal = finalStages.find((s) => s.id === 'grand-final') || finalStages[0];
  const secondFinal = finalStages.find((s) => s.id === 'second-final') || finalStages[1];
  const thirdFinal = finalStages.find((s) => s.id === 'third-final') || finalStages[2];

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  const gfHome = getTeam(grandFinal?.homeTeamId);
  const gfAway = getTeam(grandFinal?.awayTeamId);

  const sfHome = getTeam(secondFinal?.homeTeamId);
  const sfAway = getTeam(secondFinal?.awayTeamId);

  const tfHome = getTeam(thirdFinal?.homeTeamId);
  const tfAway = getTeam(thirdFinal?.awayTeamId);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      generateFinalsFromStandings();
    }, 700);
  };

  const handleFinalize = () => {
    if (!grandFinal) return;
    const winnerId = grandFinal.homeScore >= grandFinal.awayScore ? grandFinal.homeTeamId : grandFinal.awayTeamId;
    finalizeChampion('grand-final', winnerId);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 gap-4">
      {/* Tournament Header & Hero Strip */}
      <div className="rounded-xl bg-[#111c2e] text-white p-4 md:p-6 shadow-md relative overflow-hidden border border-slate-800">
        <div className="absolute -right-6 -bottom-6 opacity-10 text-white select-none pointer-events-none">
          <span className="material-symbols-outlined text-[130px]">emoji_events</span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#006e2d] text-white text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            Klasemen Penyisihan Disahkan ✅
          </span>
          <span className="text-[#ffdea8] text-[10px] uppercase tracking-wider font-bold">
            Sistem Trofeo Pro
          </span>
        </div>

        <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold tracking-tight text-white mt-1">
          FINAL STAGE & TROFEO GENERATOR
        </h2>
        <p className="text-[12px] text-[#79849a] mt-0.5 mb-4">
          Pemetaan otomatis laga puncak 6 besar berdasarkan posisi klasemen resmi grup A & B.
        </p>

        {/* Generator Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 px-4 rounded-xl bg-[#f9bc45] hover:bg-[#ffc966] text-[#271900] text-[13px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all duration-150"
        >
          <span className={`material-symbols-outlined text-[18px] ${isGenerating ? 'animate-spin' : ''}`}>
            {isGenerating ? 'refresh' : 'bolt'}
          </span>
          <span>{isGenerating ? 'Menghubungkan Klasemen...' : 'Generate Otomatis Peserta Final'}</span>
        </button>
      </div>

      {/* Skema Babak Penentuan Explanatory Card */}
      <div className="rounded-xl bg-white p-4 md:p-5 shadow-sm border border-[#e1e8ff]">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#006e2d] text-[20px]">account_tree</span>
          <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-[#121b2e]">
            Skema Babak Penentuan (Trofeo)
          </h3>
        </div>
        <p className="text-[12px] text-[#45474c] mb-3">
          Sesuai regulasi kompetisi, penentuan peringkat 1 hingga 6 dimainkan secara silang antar-posisi:
        </p>

        <div className="space-y-2">
          {/* Rule 1 */}
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f1f3ff]">
            <div className="w-6 h-6 rounded bg-[#f9bc45]/30 text-[#ac7b00] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              🏆
            </div>
            <div className="min-w-0 flex-1 text-[12px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#121b2e] uppercase">Grand Final</span>
                <span className="text-[#006e2d] font-semibold">• Juara 1 & 2</span>
              </div>
              <p className="text-[#45474c] truncate mt-0.5">
                Juara Grup A <span className="font-bold text-[#121b2e]">({gfHome?.name})</span> vs Juara Grup B <span className="font-bold text-[#121b2e]">({gfAway?.name})</span>
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f1f3ff]">
            <div className="w-6 h-6 rounded bg-[#d9e2fc] text-[#121b2e] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              🥈
            </div>
            <div className="min-w-0 flex-1 text-[12px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#121b2e] uppercase">2nd Final</span>
                <span className="text-[#45474c] font-semibold">• Peringkat 3 & 4</span>
              </div>
              <p className="text-[#45474c] truncate mt-0.5">
                Pos 2 Grup A <span className="font-bold text-[#121b2e]">({sfHome?.name})</span> vs Pos 2 Grup B <span className="font-bold text-[#121b2e]">({sfAway?.name})</span>
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f1f3ff]">
            <div className="w-6 h-6 rounded bg-[#e9edff] text-[#45474c] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              🥉
            </div>
            <div className="min-w-0 flex-1 text-[12px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#121b2e] uppercase">3rd Final</span>
                <span className="text-[#45474c] font-semibold">• Peringkat 5 & 6</span>
              </div>
              <p className="text-[#45474c] truncate mt-0.5">
                Pos 3 Grup A <span className="font-bold text-[#121b2e]">({tfHome?.name})</span> vs Pos 3 Grup B <span className="font-bold text-[#121b2e]">({tfAway?.name})</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH 1: GRAND FINAL */}
      <div className="rounded-xl bg-white shadow-md overflow-hidden border border-[#e1e8ff]">
        {/* Gold prestige bar */}
        <div className="h-2 w-full bg-[#f9bc45]"></div>

        <div className="p-4 md:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#f9bc45] text-[22px]">emoji_events</span>
              <span className="font-['Space_Grotesk'] text-[15px] font-bold text-[#121b2e] uppercase tracking-wide">
                GRAND FINAL
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              grandFinal.isCompleted
                ? 'bg-[#f9bc45] text-[#271900]'
                : 'bg-[#7cf994]/30 text-[#007230]'
            }`}>
              {grandFinal.isCompleted ? 'Hasil Final Disahkan' : 'Siap Bertanding'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#45474c] text-[11px]">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            <span>{grandFinal.date}</span>
            <span>•</span>
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>{grandFinal.time}</span>
            <span>•</span>
            <span className="material-symbols-outlined text-[14px]">stadium</span>
            <span>{grandFinal.pitch}</span>
          </div>

          {/* Teams Scoreboard Layout */}
          <div className="rounded-xl bg-[#f1f3ff] p-4">
            <div className="flex items-center justify-between gap-2">
              {/* Home */}
              <div className="flex flex-col items-center flex-1 text-center min-w-0">
                <div className="w-12 h-12 rounded-full bg-[#111c2e] text-white flex items-center justify-center shadow-sm mb-1 p-1 overflow-hidden">
                  {gfHome?.logo ? (
                    <img src={gfHome.logo} alt={gfHome.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-[24px]">shield</span>
                  )}
                </div>
                <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                  {gfHome?.name}
                </span>
                <span className="text-[10px] text-[#75777d]">Juara Grup A</span>
              </div>

              {/* Score inputs */}
              <div className="flex flex-col items-center flex-shrink-0 px-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    value={grandFinal.homeScore}
                    onChange={(e) => updateFinalScore('grand-final', parseInt(e.target.value) || 0, grandFinal.awayScore)}
                    className="w-12 h-12 rounded-lg bg-white text-center font-['Space_Grotesk'] text-2xl font-bold text-[#111c2e] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006e2d] border border-[#d9e2fc]"
                  />
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#c5c6cd]">:</span>
                  <input
                    type="number"
                    min={0}
                    value={grandFinal.awayScore}
                    onChange={(e) => updateFinalScore('grand-final', grandFinal.homeScore, parseInt(e.target.value) || 0)}
                    className="w-12 h-12 rounded-lg bg-white text-center font-['Space_Grotesk'] text-2xl font-bold text-[#111c2e] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006e2d] border border-[#d9e2fc]"
                  />
                </div>
                <span className="text-[10px] text-[#75777d] mt-1 font-semibold">Full Time</span>
              </div>

              {/* Away */}
              <div className="flex flex-col items-center flex-1 text-center min-w-0">
                <div className="w-12 h-12 rounded-full bg-[#006e2d] text-white flex items-center justify-center shadow-sm mb-1 p-1 overflow-hidden">
                  {gfAway?.logo ? (
                    <img src={gfAway.logo} alt={gfAway.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-[24px]">sports_soccer</span>
                  )}
                </div>
                <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                  {gfAway?.name}
                </span>
                <span className="text-[10px] text-[#75777d]">Juara Grup B</span>
              </div>
            </div>
          </div>

          {/* Tiebreak selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#45474c] uppercase tracking-wider">
              Resolusi Jika Skor Seri
            </label>
            <div className="relative">
              <select
                value={grandFinal.tiebreakMethod}
                onChange={(e) => updateFinalScore('grand-final', grandFinal.homeScore, grandFinal.awayScore, e.target.value)}
                className="w-full h-11 px-3 pr-8 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[12px] font-semibold appearance-none border border-[#e1e8ff] focus:outline-none"
              >
                <option value="penalti">Adu Penalti (5 Penendang Utama)</option>
                <option value="extra">Extra Time (2 x 10 Menit)</option>
                <option value="panitia">Regulasi Khusus / Keputusan Panitia</option>
              </select>
              <span className="material-symbols-outlined text-[#75777d] absolute right-2.5 top-3 pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Finalize button */}
          <button
            onClick={handleFinalize}
            disabled={grandFinal.isCompleted}
            className={`w-full py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all ${
              grandFinal.isCompleted
                ? 'bg-[#e9edff] text-[#45474c] cursor-default'
                : 'bg-[#006e2d] hover:bg-[#007230] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">military_tech</span>
            <span>
              {grandFinal.isCompleted
                ? `Juara 1 Telah Ditetapkan (${gfHome?.name})`
                : 'Tetapkan Hasil & Juara 1'}
            </span>
          </button>
        </div>
      </div>

      {/* MATCH 2: 2ND FINAL */}
      <div className="rounded-xl bg-white p-4 shadow-sm border border-[#e1e8ff] relative overflow-hidden flex flex-col gap-2.5">
        <div className="h-1.5 w-full bg-[#d9e2fc] absolute top-0 left-0"></div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🥈</span>
            <span className="font-['Space_Grotesk'] text-[13px] font-bold text-[#121b2e] uppercase">
              2ND FINAL • PEREBUTAN JUARA 3
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#e1e8ff] text-[#45474c] text-[10px] font-bold">
            Terjadwal
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#45474c] text-[11px]">
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span>{secondFinal.date}</span>
          <span>•</span>
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span>{secondFinal.time}</span>
          <span>•</span>
          <span>{secondFinal.pitch}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3ff]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#e1e8ff] text-[#111c2e] flex items-center justify-center text-[11px] font-bold">
              A2
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#121b2e] truncate">{sfHome?.name}</p>
              <span className="text-[10px] text-[#75777d]">Peringkat 2 Grup A</span>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#e9edff] text-[#45474c] font-['Space_Grotesk'] text-[14px] font-bold">
            VS
          </div>
          <div className="flex items-center gap-2 min-w-0 text-right">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#121b2e] truncate">{sfAway?.name}</p>
              <span className="text-[10px] text-[#75777d]">Peringkat 2 Grup B</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#e1e8ff] text-[#111c2e] flex items-center justify-center text-[11px] font-bold">
              B2
            </div>
          </div>
        </div>
      </div>

      {/* MATCH 3: 3RD FINAL */}
      <div className="rounded-xl bg-white p-4 shadow-sm border border-[#e1e8ff] relative overflow-hidden flex flex-col gap-2.5">
        <div className="h-1.5 w-full bg-[#ffdea8] absolute top-0 left-0"></div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🥉</span>
            <span className="font-['Space_Grotesk'] text-[13px] font-bold text-[#121b2e] uppercase">
              3RD FINAL • TROFEO PERINGKAT 5
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#e1e8ff] text-[#45474c] text-[10px] font-bold">
            Terjadwal
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#45474c] text-[11px]">
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span>{thirdFinal.date}</span>
          <span>•</span>
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span>{thirdFinal.time}</span>
          <span>•</span>
          <span>{thirdFinal.pitch}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3ff]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#e1e8ff] text-[#111c2e] flex items-center justify-center text-[11px] font-bold">
              A3
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#121b2e] truncate">{tfHome?.name}</p>
              <span className="text-[10px] text-[#75777d]">Peringkat 3 Grup A</span>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#e9edff] text-[#45474c] font-['Space_Grotesk'] text-[14px] font-bold">
            VS
          </div>
          <div className="flex items-center gap-2 min-w-0 text-right">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#121b2e] truncate">{tfAway?.name}</p>
              <span className="text-[10px] text-[#75777d]">Peringkat 3 Grup B</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#e1e8ff] text-[#111c2e] flex items-center justify-center text-[11px] font-bold">
              B3
            </div>
          </div>
        </div>
      </div>

      {/* Podium & Trophy Simulation */}
      <div className="rounded-xl bg-white p-4 md:p-5 shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f9bc45] text-[22px]">workspace_premium</span>
            <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-[#121b2e]">
              Simulasi Podium & Gelar
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f3ff] text-[#45474c]">
            Proyeksi Final
          </span>
        </div>

        {/* Podium Pillars */}
        <div className="grid grid-cols-3 gap-2 pt-4 pb-2 items-end">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <span className="text-[20px] mb-1">🥈</span>
            <div className="w-full bg-[#d9e2fc] rounded-t-xl p-2 text-center flex flex-col items-center justify-end h-24 border-t-2 border-slate-300">
              <span className="text-[12px] font-bold text-[#121b2e] truncate w-full">
                {gfAway?.shortName || 'Bhayangkara'}
              </span>
              <span className="text-[10px] text-[#45474c] font-semibold">Juara 2</span>
              <span className="text-[9px] text-[#75777d]">Trophy Silver</span>
            </div>
          </div>

          {/* 1st Place (Elevated) */}
          <div className="flex flex-col items-center">
            <span className="text-[26px] mb-1 animate-bounce">🥇</span>
            <div className="w-full bg-[#ffdea8] rounded-t-xl p-2 text-center flex flex-col items-center justify-end h-32 shadow-sm border-t-4 border-[#f9bc45]">
              <span className="text-[13px] font-bold text-[#271900] truncate w-full">
                {gfHome?.name || 'Garuda Muda'}
              </span>
              <span className="text-[11px] text-[#5e4200] font-bold">JUARA 1</span>
              <span className="text-[9px] text-[#271900]">Piala + Medali</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <span className="text-[20px] mb-1">🥉</span>
            <div className="w-full bg-[#e9edff] rounded-t-xl p-2 text-center flex flex-col items-center justify-end h-20 border-t-2 border-amber-600/30">
              <span className="text-[12px] font-bold text-[#121b2e] truncate w-full">
                {sfHome?.shortName || 'Persikabo M.'}
              </span>
              <span className="text-[10px] text-[#45474c] font-semibold">Juara 3</span>
              <span className="text-[9px] text-[#75777d]">Trophy Bronze</span>
            </div>
          </div>
        </div>

        {/* Special Awards */}
        <div className="mt-1 pt-3 border-t border-[#f1f3ff] space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f1f3ff]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎖️</span>
              <div>
                <p className="text-[12px] font-bold text-[#121b2e]">Tim Fairplay Terbaik</p>
                <p className="text-[10px] text-[#75777d]">Kartu Terendah Disiplin</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[12px] font-bold text-[#006e2d]">Bhayangkara Stars</span>
              <p className="text-[10px] text-[#75777d]">-1 Poin Pelanggaran</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f1f3ff]">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <div>
                <p className="text-[12px] font-bold text-[#121b2e]">Top Scorer (Sepatu Emas)</p>
                <p className="text-[10px] text-[#75777d]">Gol Terbanyak Turnamen</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[12px] font-bold text-[#121b2e]">Ahmad Fauzi</span>
              <p className="text-[10px] text-[#75777d]">Garuda Muda (5 Gol)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => showToast('Menyiapkan file PDF Bagan Final & Trofeo...', 'picture_as_pdf')}
          className="w-full py-3 px-4 rounded-xl bg-white text-[#111c2e] text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm border border-[#e1e8ff] active:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          <span>Cetak Bagan Turnamen (PDF)</span>
        </button>

        <button
          onClick={() => {
            showToast('Bagan resmi berhasil dipublikasikan ke Portal Pengunjung!', 'public');
            setActiveTab('laporan-dan-pengaturan');
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#111c2e] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#1d2d47] active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">public</span>
          <span>Publikasikan ke Halaman Publik</span>
        </button>

        <button
          onClick={() => showToast('Mengunduh paket laporan teknis turnamen...', 'file_download')}
          className="w-full py-2.5 px-4 rounded-xl bg-[#f1f3ff] text-[#45474c] text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#e1e8ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>Export Laporan Final Lengkap (XLSX)</span>
        </button>
      </div>
    </div>
  );
};
