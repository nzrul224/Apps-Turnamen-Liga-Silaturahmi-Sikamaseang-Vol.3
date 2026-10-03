import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { TeamStanding } from '../types/tournament';

export const StandingsView: React.FC = () => {
  const {
    settings,
    standingsA,
    standingsB,
    standingsCombined,
    lockStandingsToggle,
    showToast
  } = useTournament();

  const [activeTab, setActiveTab] = useState<'grup-a' | 'grup-b' | 'gabungan' | 'fairplay'>('grup-a');

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csv = "Grup,Pos,Klub,Kota,Main,Menang,Seri,Kalah,GM,GK,SG,Poin,Fairplay\n";
    standingsA.forEach((s) => {
      csv += `A,${s.rank},${s.team.name},${s.team.city},${s.played},${s.won},${s.drawn},${s.lost},${s.goalsFor},${s.goalsAgainst},${s.goalDiff},${s.points},${s.fairplayScore}\n`;
    });
    standingsB.forEach((s) => {
      csv += `B,${s.rank},${s.team.name},${s.team.city},${s.played},${s.won},${s.drawn},${s.lost},${s.goalsFor},${s.goalsAgainst},${s.goalDiff},${s.points},${s.fairplayScore}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Klasemen-Resmi-Piala-Nusantara-2025.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Klasemen CSV berhasil diunduh.', 'file_download');
  };

  const renderStandingsTable = (list: TeamStanding[], groupLabel: string) => {
    const totalGoals = list.reduce((sum, s) => sum + s.goalsFor, 0);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#111c2e] text-white font-['Space_Grotesk'] text-base font-bold">
              {groupLabel}
            </span>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#121b2e]">
                Klasemen Grup {groupLabel}
              </h3>
              <p className="text-[11px] text-[#45474c]">Seluruh 6 pertandingan penyisihan rampung</p>
            </div>
          </div>
          <span className="text-[11px] text-[#006e2d] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px]">sync</span> Terverifikasi
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#f1f3ff] text-[#45474c] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 w-8 text-center">Pos</th>
                  <th className="py-3 px-3">Klub</th>
                  <th className="py-3 px-2 text-center" title="Main">M</th>
                  <th className="py-3 px-2 text-center" title="Menang-Seri-Kalah">M-S-K</th>
                  <th className="py-3 px-2 text-center" title="Gol Masuk - Gol Kemasukan">GM-GK</th>
                  <th className="py-3 px-2 text-center font-bold" title="Selisih Gol">SG</th>
                  <th className="py-3 px-3 text-center text-[#111c2e] font-bold" title="Poin">P</th>
                  <th className="py-3 px-2 text-center" title="Fairplay Score">FP</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3ff] text-[13px]">
                {list.map((item, idx) => (
                  <tr
                    key={item.team.id}
                    className={`hover:bg-[#f1f3ff]/50 transition-colors ${
                      idx === 0 ? 'bg-white' : idx === 1 ? 'bg-[#f1f3ff]/30' : idx === 2 ? 'bg-white' : 'bg-[#f1f3ff]/10 opacity-80'
                    }`}
                  >
                    <td className={`py-3 px-3 text-center font-['Space_Grotesk'] text-base font-bold ${
                      idx === 0 ? 'text-[#006e2d]' : idx === 1 ? 'text-[#111c2e]' : idx === 2 ? 'text-[#f9bc45]' : 'text-[#75777d]'
                    }`}>
                      {item.rank}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#f1f3ff] flex items-center justify-center flex-shrink-0 p-1 overflow-hidden shadow-xs">
                          {item.team.logo ? (
                            <img src={item.team.logo} alt={item.team.name} className="w-full h-full object-contain" />
                          ) : (
                            item.team.shortName
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-bold text-[#121b2e] truncate">
                            {item.team.name}
                          </span>
                          <span className="text-[10px] text-[#75777d]">
                            {item.team.city}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-['Space_Grotesk'] font-bold text-[#121b2e]">
                      {item.played}
                    </td>
                    <td className="py-3 px-2 text-center text-[#45474c] text-[12px]">
                      {item.won}-{item.drawn}-{item.lost}
                    </td>
                    <td className="py-3 px-2 text-center text-[#45474c] text-[12px]">
                      {item.goalsFor}-{item.goalsAgainst}
                    </td>
                    <td className={`py-3 px-2 text-center font-bold ${
                      item.goalDiff > 0 ? 'text-[#006e2d]' : item.goalDiff < 0 ? 'text-[#ba1a1a]' : 'text-[#75777d]'
                    }`}>
                      {item.goalDiff > 0 ? `+${item.goalDiff}` : item.goalDiff}
                    </td>
                    <td className="py-3 px-3 text-center font-['Space_Grotesk'] text-base font-bold text-[#111c2e]">
                      {item.points}
                    </td>
                    <td className="py-3 px-2 text-center text-[12px] font-bold text-[#ba1a1a]">
                      {item.fairplayScore}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          idx === 0 ? 'bg-[#006e2d]' : idx === 1 ? 'bg-[#111c2e]' : idx === 2 ? 'bg-[#f9bc45]' : 'bg-[#75777d]'
                        }`}></span>
                        {item.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary callout */}
        <div className="p-3 bg-white rounded-xl border border-[#e1e8ff] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2 text-[#121b2e]">
            <span className="material-symbols-outlined text-[#006e2d] text-[18px]">sports_soccer</span>
            <span>Total Gol Grup {groupLabel}: <strong className="font-bold">{totalGoals} Gol</strong> ({(totalGoals / 6).toFixed(1)} gol/laga)</span>
          </div>
          <button
            onClick={() => showToast(`Rincian statistik gol Grup ${groupLabel} ditampilkan.`)}
            className="text-[11px] text-[#006e2d] font-bold hover:underline"
          >
            Detail Skor
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 gap-4">
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#111c2e] text-white">
            <span className="material-symbols-outlined text-[17px]">verified</span>
          </span>
          <h2 className="font-['Space_Grotesk'] text-[18px] md:text-[20px] font-bold text-[#121b2e]">
            Klasemen & Disiplin Fairplay
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#006e2d] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          Matchday 3/3
        </span>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex p-1 bg-[#f1f3ff] rounded-xl gap-1 border border-[#e1e8ff] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('grup-a')}
          className={`flex-1 min-w-[90px] py-1.5 px-3 rounded-lg text-[12px] font-bold text-center transition-all ${
            activeTab === 'grup-a'
              ? 'bg-white text-[#111c2e] shadow-sm'
              : 'text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          Grup A
        </button>
        <button
          onClick={() => setActiveTab('grup-b')}
          className={`flex-1 min-w-[90px] py-1.5 px-3 rounded-lg text-[12px] font-bold text-center transition-all ${
            activeTab === 'grup-b'
              ? 'bg-white text-[#111c2e] shadow-sm'
              : 'text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          Grup B
        </button>
        <button
          onClick={() => setActiveTab('gabungan')}
          className={`flex-1 min-w-[95px] py-1.5 px-3 rounded-lg text-[12px] font-bold text-center transition-all ${
            activeTab === 'gabungan'
              ? 'bg-white text-[#111c2e] shadow-sm'
              : 'text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          Gabungan
        </button>
        <button
          onClick={() => setActiveTab('fairplay')}
          className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-[12px] font-bold text-center transition-all flex items-center justify-center gap-1 ${
            activeTab === 'fairplay'
              ? 'bg-white text-[#111c2e] shadow-sm'
              : 'text-[#45474c] hover:text-[#121b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-[#f9bc45]">shield</span>
          Fairplay
        </button>
      </div>

      {/* Regulation & Tie-Breaker Directive Card */}
      <div className="bg-[#111c2e] text-white rounded-xl p-4 md:p-5 shadow-md flex flex-col gap-2 relative overflow-hidden border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#7ffc97] text-[18px]">policy</span>
            <span className="text-[13px] text-white font-bold tracking-wide">
              Regulasi Klasemen & Kualifikasi
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#7ffc97] bg-[#7ffc97]/15 px-2 py-0.5 rounded">
            Pasal 14 PSSI
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5 pt-1 text-[12px] text-[#79849a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#7ffc97] flex-shrink-0">check_circle</span>
            <span><strong className="text-white font-semibold">Format Poin:</strong> Menang 3 Poin | Seri 1 Poin | Kalah 0 Poin</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#f9bc45] flex-shrink-0 mt-0.5">swap_vert</span>
            <span><strong className="text-white font-semibold">Tie-breaker:</strong> Poin &gt; SG &gt; GM &gt; Head-to-Head &gt; Fairplay (FP)</span>
          </div>
        </div>

        {/* Progression Key Indicators */}
        <div className="mt-1 pt-2 flex flex-wrap gap-2 text-[10px] font-semibold border-t border-white/10">
          <span className="flex items-center gap-1 bg-[#006e2d]/30 text-[#7ffc97] px-2 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-[#7cf994]"></span>
            Pos 1: Grand Final
          </span>
          <span className="flex items-center gap-1 bg-[#d9e2fc]/20 text-[#edf0ff] px-2 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-[#d9e2fc]"></span>
            Pos 2: 2nd Final
          </span>
          <span className="flex items-center gap-1 bg-[#f9bc45]/20 text-[#ffdea8] px-2 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-[#f9bc45]"></span>
            Pos 3: 3rd Final
          </span>
        </div>
      </div>

      {/* TAB PANEL 1: GRUP A */}
      {activeTab === 'grup-a' && renderStandingsTable(standingsA, 'A')}

      {/* TAB PANEL 2: GRUP B */}
      {activeTab === 'grup-b' && renderStandingsTable(standingsB, 'B')}

      {/* TAB PANEL 3: GABUNGAN */}
      {activeTab === 'gabungan' && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#121b2e]">
                Klasemen Gabungan (Overall Seeding)
              </h3>
              <p className="text-[11px] text-[#45474c]">Penentuan seeding silang untuk babak Final & Trofeo</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#e1e8ff] text-[#111c2e] text-[11px] font-bold">
              8 Tim
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e1e8ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#006e2d]"></span>
                <div>
                  <div className="text-[13px] text-[#121b2e] font-bold">Grand Final (Juara 1 & 2 Turnamen)</div>
                  <div className="text-[11px] text-[#45474c]">Juara Grup A vs Juara Grup B</div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-[#7cf994]/30 text-[#007230] px-2.5 py-1 rounded-lg">
                {standingsA[0]?.team.shortName || 'GM'} vs {standingsB[0]?.team.shortName || 'BS'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e1e8ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#111c2e]"></span>
                <div>
                  <div className="text-[13px] text-[#121b2e] font-bold">2nd Final (Peringkat 3 & 4 Turnamen)</div>
                  <div className="text-[11px] text-[#45474c]">Runner-up Grup A vs Runner-up Grup B</div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-[#d9e2fc] text-[#111c2e] px-2.5 py-1 rounded-lg">
                {standingsA[1]?.team.shortName || 'PK'} vs {standingsB[1]?.team.shortName || 'BT'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e1e8ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#f9bc45]"></span>
                <div>
                  <div className="text-[13px] text-[#121b2e] font-bold">3rd Final (Peringkat 5 & 6 Turnamen)</div>
                  <div className="text-[11px] text-[#45474c]">Peringkat 3 Grup A vs Peringkat 3 Grup B</div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-[#ffdea8] text-[#271900] px-2.5 py-1 rounded-lg">
                {standingsA[2]?.team.shortName || 'RU'} vs {standingsB[2]?.team.shortName || 'EJ'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* TAB PANEL 4: FAIRPLAY & DISCIPLINARY */}
      {activeTab === 'fairplay' && (
        <section className="flex flex-col gap-3">
          {/* Header Banner */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#271900] text-[#f9bc45] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-[#121b2e]">
                    Disciplinary & Fairplay Control
                  </h3>
                  <p className="text-[11px] text-[#45474c]">Parameter Tie-Breaker Ketat & Penghargaan Fairplay Team</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ffdea8] text-[#271900] text-[10px] font-bold">
                Sistem Negatif
              </span>
            </div>

            <div className="p-2.5 bg-[#f1f3ff] rounded-lg text-[12px] text-[#45474c]">
              <strong className="text-[#121b2e]">Prinsip Kalkulasi:</strong> Nilai Fairplay (FP) dihitung berdasarkan akumulasi poin penalti negatif selama fase grup. Tim dengan nilai <strong className="text-[#006e2d] font-bold">mendekati angka 0</strong> menempati peringkat kedisiplinan terbaik.
            </div>
          </div>

          {/* Scale Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#111c2e] text-white flex items-center justify-between">
              <span className="text-[12px] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#7ffc97] text-[16px]">gavel</span>
                Tabel Standar Penalti Fairplay PSSI
              </span>
              <span className="text-[10px] text-[#79849a]">Standar Regulasi Teknis</span>
            </div>

            <div className="p-3 flex flex-col gap-1.5 text-[12px]">
              <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#f1f3ff]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-4 rounded-[2px] bg-[#f9bc45] inline-block shadow-xs"></span>
                  <span className="text-[#121b2e]">Kartu Kuning (1x Cautions)</span>
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-[#ba1a1a]">-1 Poin</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#f1f3ff]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <span className="w-3 h-4 rounded-[2px] bg-[#f9bc45] inline-block shadow-xs"></span>
                    <span className="w-3 h-4 rounded-[2px] bg-[#f9bc45] inline-block shadow-xs"></span>
                  </div>
                  <span className="text-[#121b2e]">Akumulasi 2 KK (Larangan 1 Babak)</span>
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-[#ba1a1a]">-3 Poin</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#f1f3ff]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-4 rounded-[2px] bg-[#ba1a1a] inline-block shadow-xs"></span>
                  <span className="text-[#121b2e]">Kartu Merah Langsung (Direct Red)</span>
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-[#ba1a1a]">-4 Poin</span>
              </div>

              <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#f1f3ff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-[#75777d]">record_voice_over</span>
                  <span className="text-[#121b2e]">Protes Berlebihan (Kapten: -1 | Non-Kapten: -2)</span>
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-[#ba1a1a]">-1 s/d -2 Poin</span>
              </div>
            </div>
          </div>

          {/* Fairplay Leaderboard */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-['Space_Grotesk'] text-[15px] font-bold text-[#121b2e]">
                Klasemen Fairplay Keseluruhan
              </h4>
              <span className="text-[11px] text-[#006e2d] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">military_tech</span> Calon Trofi Fairplay
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-3 bg-[#006e2d]/5 rounded-xl flex items-center justify-between border border-[#006e2d]/15">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#006e2d] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  <div>
                    <div className="text-[13px] text-[#121b2e] font-bold flex items-center gap-1.5">
                      Bhayangkara Stars
                      <span className="material-symbols-outlined text-[15px] text-[#f9bc45]">emoji_events</span>
                    </div>
                    <div className="text-[11px] text-[#45474c]">1 Kartu Kuning • 0 Pelanggaran Berat</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-lg text-[#006e2d] font-bold">-1</span>
                  <span className="block text-[10px] text-[#006e2d] font-bold">Paling Bersih</span>
                </div>
              </div>

              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#d9e2fc] text-[#121b2e] text-[11px] flex items-center justify-center font-bold">2</span>
                  <div>
                    <div className="text-[13px] text-[#121b2e] font-bold">Rajawali United</div>
                    <div className="text-[11px] text-[#45474c]">1 Kartu Kuning • 0 Protes</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-lg text-[#121b2e] font-bold">-1</span>
                  <span className="block text-[10px] text-[#75777d]">Fair</span>
                </div>
              </div>

              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e1e8ff] text-[#121b2e] text-[11px] flex items-center justify-center font-bold">3</span>
                  <div>
                    <div className="text-[13px] text-[#121b2e] font-bold">Garuda Muda FC</div>
                    <div className="text-[11px] text-[#45474c]">2 Kartu Kuning</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-lg text-[#121b2e] font-bold">-2</span>
                  <span className="block text-[10px] text-[#75777d]">Fair</span>
                </div>
              </div>

              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e1e8ff] text-[#121b2e] text-[11px] flex items-center justify-center font-bold">4</span>
                  <div>
                    <div className="text-[13px] text-[#121b2e] font-bold">Persikabo Muda</div>
                    <div className="text-[11px] text-[#45474c]">1 KK + 1 Peringatan Protes Non-Kapten</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-lg text-[#ba1a1a] font-bold">-3</span>
                  <span className="block text-[10px] text-[#ba1a1a] font-semibold">Perlu Evaluasi</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Action Footer */}
      <div className="mt-2 bg-white p-4 rounded-xl shadow-md border border-[#e1e8ff] flex flex-col gap-3">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#45474c] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e2d] text-[18px]">verified</span>
            Status Pengesahan:{' '}
            <strong className="text-[#006e2d] font-bold">
              {settings.isStandingsLocked ? 'Klasemen Resmi Disahkan ✅' : 'Menunggu Finalisasi'}
            </strong>
          </span>
          <span className="text-[11px] text-[#75777d]">v2.4 Live</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={lockStandingsToggle}
            className={`flex-1 py-3 px-4 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all ${
              settings.isStandingsLocked
                ? 'bg-[#111c2e] text-white hover:bg-[#1d2d47]'
                : 'bg-[#006e2d] text-white hover:bg-[#007230]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {settings.isStandingsLocked ? 'check_circle' : 'lock'}
            </span>
            <span>
              {settings.isStandingsLocked ? 'Klasemen Resmi Disahkan!' : 'Kunci & Sahkan Klasemen Penyisihan'}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none py-3 px-4 bg-[#111c2e] text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all hover:bg-[#1d2d47]"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Cetak PDF</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none py-3 px-4 bg-[#f1f3ff] text-[#111c2e] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all hover:bg-[#e1e8ff] border border-[#e1e8ff]"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
