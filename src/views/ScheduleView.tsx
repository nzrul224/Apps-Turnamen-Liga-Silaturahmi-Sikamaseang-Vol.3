import React, { useState, useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';
import { Match } from '../types/tournament';

interface ScheduleViewProps {
  onOpenMatchResultModal: (matchId: string) => void;
  onOpenEventLogModal: (match: Match) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  onOpenMatchResultModal,
  onOpenEventLogModal
}) => {
  const {
    teams,
    matches,
    quickAddLiveScore,
    quickAddCard,
    startMatch,
    finishMatch,
    generateRoundRobin,
    shuffleSchedule,
    showToast
  } = useTournament();

  const [groupFilter, setGroupFilter] = useState<'all' | 'grup-a' | 'grup-b' | 'final'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'selesai' | 'mendatang'>('all');

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchGroup = groupFilter === 'all' || m.group === groupFilter;
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;
      return matchGroup && matchStatus;
    });
  }, [matches, groupFilter, statusFilter]);

  const liveMatchesCount = useMemo(() => matches.filter((m) => m.status === 'live').length, [matches]);
  const selesaiMatchesCount = useMemo(() => matches.filter((m) => m.status === 'selesai').length, [matches]);
  const mendatangMatchesCount = useMemo(() => matches.filter((m) => m.status === 'mendatang').length, [matches]);

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 gap-4">
      {/* Header & Export Hub */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#111c2e] text-white flex items-center justify-center shadow-md flex-shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#f9bc45]">sports_and_outdoors</span>
            </div>
            <div className="min-w-0">
              <span className="font-['Space_Grotesk'] text-[18px] md:text-[20px] font-bold text-[#111c2e] truncate block">
                Jadwal & Match Center
              </span>
              <span className="text-[11px] text-[#45474c] flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#006e2d]"></span>
                Piala Nusantara U-17 • {teams.length} Tim Terdaftar
              </span>
            </div>
          </div>

          <button
            onClick={() => showToast('Mengunduh jadwal resmi turnamen (Format PDF & Excel)...', 'file_download')}
            className="px-3 py-1.5 rounded-lg bg-[#f1f3ff] hover:bg-[#e1e8ff] text-[#111c2e] text-[12px] font-bold shadow-xs flex items-center gap-1 transition-all active:scale-95 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006e2d]">file_download</span>
            <span>Ekspor</span>
          </button>
        </div>

        {/* Quick Tool Action Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={generateRoundRobin}
            className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-[#111c2e] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all hover:bg-[#1d2d47]"
          >
            <span className="material-symbols-outlined text-[#f9bc45] text-[17px]">bolt</span>
            <span>Generate Round Robin</span>
          </button>
          <button
            onClick={shuffleSchedule}
            className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-white border border-[#e1e8ff] text-[#111c2e] text-[12px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[#75777d] text-[17px]">shuffle</span>
            <span>Acak Jadwal</span>
          </button>
          <button
            onClick={() => showToast('Penetapan slot stadion & lapangan otomatis disimpan.', 'stadium')}
            className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-white border border-[#e1e8ff] text-[#111c2e] text-[12px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[#75777d] text-[17px]">stadium</span>
            <span>Plot Lapangan</span>
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex flex-col gap-2 bg-[#f9f9ff] py-1">
        {/* Group Stage Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setGroupFilter('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              groupFilter === 'all'
                ? 'bg-[#111c2e] text-white shadow-sm'
                : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Semua Laga
          </button>
          <button
            onClick={() => setGroupFilter('grup-a')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              groupFilter === 'grup-a'
                ? 'bg-[#111c2e] text-white shadow-sm'
                : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Grup A
          </button>
          <button
            onClick={() => setGroupFilter('grup-b')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              groupFilter === 'grup-b'
                ? 'bg-[#111c2e] text-white shadow-sm'
                : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Grup B
          </button>
          <button
            onClick={() => setGroupFilter('final')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              groupFilter === 'final'
                ? 'bg-[#111c2e] text-white shadow-sm'
                : 'bg-[#f1f3ff] text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Babak Knockout
          </button>
        </div>

        {/* Status Tabs Counters */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#f1f3ff] rounded-xl border border-[#e1e8ff]">
          <button
            onClick={() => setStatusFilter('all')}
            className={`py-1.5 rounded-lg text-center text-[11px] transition-all font-bold ${
              statusFilter === 'all'
                ? 'bg-white text-[#111c2e] shadow-xs'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Semua ({matches.length})
          </button>
          <button
            onClick={() => setStatusFilter('live')}
            className={`py-1.5 rounded-lg text-center text-[11px] transition-all flex items-center justify-center gap-1 font-bold ${
              statusFilter === 'live'
                ? 'bg-white text-[#ba1a1a] shadow-xs'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
            Live ({liveMatchesCount})
          </button>
          <button
            onClick={() => setStatusFilter('selesai')}
            className={`py-1.5 rounded-lg text-center text-[11px] transition-all font-bold ${
              statusFilter === 'selesai'
                ? 'bg-white text-[#006e2d] shadow-xs'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Selesai ({selesaiMatchesCount})
          </button>
          <button
            onClick={() => setStatusFilter('mendatang')}
            className={`py-1.5 rounded-lg text-center text-[11px] transition-all font-bold ${
              statusFilter === 'mendatang'
                ? 'bg-white text-[#111c2e] shadow-xs'
                : 'text-[#45474c] hover:text-[#121b2e]'
            }`}
          >
            Mendatang ({mendatangMatchesCount})
          </button>
        </div>
      </section>

      {/* Fixtures Stream */}
      <section className="flex flex-col gap-3">
        {filteredMatches.length === 0 ? (
          <div className="py-12 bg-white rounded-xl text-center text-[#75777d] text-[13px] border border-[#e1e8ff]">
            Tidak ada pertandingan pada filter ini.
          </div>
        ) : (
          filteredMatches.map((m) => {
            const home = getTeam(m.homeTeamId);
            const away = getTeam(m.awayTeamId);

            // LIVE MATCH CARD
            if (m.status === 'live') {
              return (
                <div
                  key={m.id}
                  className="relative bg-white rounded-xl p-4 shadow-md border border-[#e1e8ff] overflow-hidden flex flex-col gap-3"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ba1a1a] via-[#f9bc45] to-[#ba1a1a]"></div>

                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] uppercase font-bold flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        LIVE {m.liveMinute || 67}'
                      </span>
                      <span className="text-[11px] text-[#45474c] font-medium">
                        {m.pitch}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e1e8ff] text-[#111c2e]">
                      {m.stageName}
                    </span>
                  </div>

                  {/* Teams & Scoreboard Live */}
                  <div className="grid grid-cols-7 items-center gap-2 py-1">
                    {/* Home */}
                    <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-[#e9edff] p-1 flex items-center justify-center shadow-xs overflow-hidden">
                        {home?.logo ? (
                          <img src={home.logo} alt={home.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#111c2e] text-white font-bold flex items-center justify-center">
                            {home?.shortName || 'HM'}
                          </div>
                        )}
                      </div>
                      <span className="text-[13px] text-[#121b2e] font-bold truncate w-full">
                        {home?.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-3.5 bg-[#f9bc45] rounded-[2px] inline-block shadow-xs"></span>
                        <span className="text-[10px] text-[#45474c] font-semibold">
                          FP: -{m.homeYellow * 1 + m.homeRed * 4}
                        </span>
                      </div>
                    </div>

                    {/* Live Score */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 font-['Space_Grotesk'] text-3xl font-bold text-[#ba1a1a] tracking-tight">
                        <span>{m.homeScore}</span>
                        <span>-</span>
                        <span>{m.awayScore}</span>
                      </div>
                      <span className="text-[10px] text-[#006e2d] uppercase font-bold mt-0.5">
                        Babak II
                      </span>
                    </div>

                    {/* Away */}
                    <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-[#e9edff] p-1 flex items-center justify-center shadow-xs overflow-hidden">
                        {away?.logo ? (
                          <img src={away.logo} alt={away.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#ffdea8] text-[#271900] font-bold flex items-center justify-center">
                            {away?.shortName || 'AW'}
                          </div>
                        )}
                      </div>
                      <span className="text-[13px] text-[#121b2e] font-bold truncate w-full">
                        {away?.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-3.5 bg-[#ba1a1a] rounded-[2px] inline-block shadow-xs"></span>
                        <span className="text-[10px] text-[#45474c] font-semibold">
                          FP: -{m.awayYellow * 1 + m.awayRed * 4}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Mini Banner */}
                  <div className="bg-[#f1f3ff] rounded-lg p-2 flex items-center justify-between text-[#121b2e]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-[16px] text-[#006e2d]">sports_soccer</span>
                      <span className="text-[11px] truncate font-medium">
                        Gol: Aldy (19', 54') • Reza (42')
                      </span>
                    </div>
                    <span className="text-[11px] text-[#ba1a1a] font-bold flex-shrink-0 animate-pulse">
                      Menit {m.liveMinute || 67}
                    </span>
                  </div>

                  {/* Quick Controls */}
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    <button
                      onClick={() => quickAddLiveScore(m.id, 'home')}
                      className="py-2 px-1 rounded-lg bg-[#006e2d] text-white text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#007230]"
                    >
                      <span className="material-symbols-outlined text-[15px]">sports_soccer</span>
                      <span>+ Gol</span>
                    </button>
                    <button
                      onClick={() => quickAddCard(m.id, 'home', 'yellow')}
                      className="py-2 px-1 rounded-lg bg-[#e1e8ff] text-[#111c2e] text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#d9e2fc]"
                    >
                      <span className="w-2.5 h-3 bg-[#f9bc45] rounded-[2px]"></span>
                      <span>+ Kuning</span>
                    </button>
                    <button
                      onClick={() => quickAddCard(m.id, 'away', 'red')}
                      className="py-2 px-1 rounded-lg bg-[#e1e8ff] text-[#111c2e] text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#d9e2fc]"
                    >
                      <span className="w-2.5 h-3 bg-[#ba1a1a] rounded-[2px]"></span>
                      <span>+ Merah</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Konfirmasi peluit panjang & selesaikan laga?')) {
                          finishMatch(m.id);
                        }
                      }}
                      className="py-2 px-1 rounded-lg bg-[#111c2e] text-white text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#1d2d47]"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#7ffc97]">check_circle</span>
                      <span>Selesai</span>
                    </button>
                  </div>
                </div>
              );
            }

            // COMPLETED MATCH CARD
            if (m.status === 'selesai') {
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#7cf994]/30 text-[#007230] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">done_all</span>
                        SELESAI
                      </span>
                      <span className="text-[#45474c] font-medium">{m.dateLabel} • {m.timeLabel}</span>
                    </div>
                    <span className="text-[#75777d] font-semibold">{m.pitch}</span>
                  </div>

                  <div className="grid grid-cols-7 items-center gap-2">
                    {/* Home */}
                    <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#111c2e] font-['Space_Grotesk'] text-base font-bold shadow-xs p-1 overflow-hidden">
                        {home?.logo ? (
                          <img src={home.logo} alt={home.name} className="w-full h-full object-contain" />
                        ) : (
                          home?.shortName
                        )}
                      </div>
                      <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                        {home?.name}
                      </span>
                      <span className="text-[10px] text-[#006e2d] font-bold">
                        {m.homeScore > m.awayScore ? '+3 Poin' : m.homeScore === m.awayScore ? '+1 Poin' : '0 Poin'}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#111c2e] tracking-tight">
                        {m.homeScore} - {m.awayScore}
                      </div>
                      <span className="text-[10px] text-[#75777d] font-bold">FT</span>
                    </div>

                    {/* Away */}
                    <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#111c2e] font-['Space_Grotesk'] text-base font-bold shadow-xs p-1 overflow-hidden">
                        {away?.logo ? (
                          <img src={away.logo} alt={away.name} className="w-full h-full object-contain" />
                        ) : (
                          away?.shortName
                        )}
                      </div>
                      <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                        {away?.name}
                      </span>
                      <span className="text-[10px] text-[#006e2d] font-bold">
                        {m.awayScore > m.homeScore ? '+3 Poin' : m.homeScore === m.awayScore ? '+1 Poin' : '0 Poin'}
                      </span>
                    </div>
                  </div>

                  {/* Events Detail Banner */}
                  <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex flex-col gap-1 text-[11px]">
                    <div className="flex items-start justify-between text-[#121b2e] font-medium">
                      <span className="flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-[14px] text-[#006e2d]">sports_soccer</span>
                        {m.homeScore > 0 ? 'Gol babak reguler' : '0 Gol'}
                      </span>
                      <span className="flex items-center gap-1 truncate text-[#45474c]">
                        {m.awayScore > 0 ? 'Gol tandang' : '0 Gol'}
                        <span className="material-symbols-outlined text-[14px] text-[#006e2d]">sports_soccer</span>
                      </span>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px] text-[#75777d] border-t border-[#e9edff]/60 mt-0.5">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-3 bg-[#f9bc45] rounded-[2px] inline-block"></span>
                        <span>{home?.shortName} -{m.homeYellow} FP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-3 bg-[#f9bc45] rounded-[2px] inline-block"></span>
                        <span>{away?.shortName} -{m.awayYellow} FP</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenEventLogModal(m)}
                      className="flex-1 py-2 rounded-lg bg-[#f1f3ff] hover:bg-[#e1e8ff] text-[#111c2e] text-[12px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#111c2e]">format_list_bulleted</span>
                      <span>Match Events</span>
                    </button>
                    <button
                      onClick={() => onOpenMatchResultModal(m.id)}
                      className="flex-1 py-2 rounded-lg bg-[#111c2e] hover:bg-[#1d2d47] text-white text-[12px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#f9bc45]">edit_square</span>
                      <span>Edit Skor</span>
                    </button>
                  </div>
                </div>
              );
            }

            // UPCOMING MATCH CARD
            return (
              <div
                key={m.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdea8] text-[#271900] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      BELUM MAIN
                    </span>
                    <span className="text-[#45474c] font-medium">{m.dateLabel} • {m.timeLabel}</span>
                  </div>
                  <span className="text-[#75777d] font-semibold">{m.pitch}</span>
                </div>

                <div className="grid grid-cols-7 items-center gap-2 py-1">
                  <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#111c2e] font-['Space_Grotesk'] text-base font-bold shadow-xs p-1 overflow-hidden">
                      {home?.logo ? (
                        <img src={home.logo} alt={home.name} className="w-full h-full object-contain" />
                      ) : (
                        home?.shortName
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                      {home?.name}
                    </span>
                    <span className="text-[10px] text-[#75777d]">Grup {home?.group}</span>
                  </div>

                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#45474c] text-[12px] font-bold">
                      VS
                    </div>
                    <span className="text-[10px] text-[#75777d] mt-1 font-semibold">{m.timeLabel}</span>
                  </div>

                  <div className="col-span-3 flex flex-col items-center text-center gap-1 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#111c2e] font-['Space_Grotesk'] text-base font-bold shadow-xs p-1 overflow-hidden">
                      {away?.logo ? (
                        <img src={away.logo} alt={away.name} className="w-full h-full object-contain" />
                      ) : (
                        away?.shortName
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#121b2e] truncate w-full">
                      {away?.name}
                    </span>
                    <span className="text-[10px] text-[#75777d]">Grup {away?.group}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#f1f3ff]">
                  <button
                    onClick={() => startMatch(m.id)}
                    className="flex-1 py-2 rounded-lg bg-[#006e2d] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm hover:bg-[#007230]"
                  >
                    <span className="material-symbols-outlined text-[17px]">play_circle</span>
                    <span>Mulai Kick-off</span>
                  </button>
                  <button
                    onClick={() => onOpenMatchResultModal(m.id)}
                    className="flex-1 py-2 rounded-lg bg-[#f1f3ff] hover:bg-[#e1e8ff] text-[#111c2e] text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#006e2d]">input</span>
                    <span>Input Skor Cepat</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Fairplay Penalty Rules Card */}
      <section className="mt-2 bg-[#111c2e] rounded-xl p-4 text-white shadow-md border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f9bc45] text-[20px]">policy</span>
            <span className="font-['Space_Grotesk'] text-[16px] font-bold">Aturan Penalti Fairplay PSSI</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[#ffdea8] text-[10px] font-bold">
            Regulasi Resmi
          </span>
        </div>
        <p className="text-[12px] text-[#79849a]">
          Poin Fairplay menjadi penentu posisi klasemen jika selisih gol & agresivitas gol imbang.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-white/5 rounded-lg p-2.5 text-center flex flex-col items-center border border-white/5">
            <span className="w-3 h-4 bg-[#f9bc45] rounded-[2px] inline-block mb-1 shadow-sm"></span>
            <span className="text-[12px] font-bold text-[#f9bc45]">-1 Poin</span>
            <span className="text-[10px] text-[#79849a]">Kuning</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 text-center flex flex-col items-center border border-white/5">
            <div className="flex gap-0.5 mb-1">
              <span className="w-3 h-4 bg-[#f9bc45] rounded-[2px] inline-block shadow-sm"></span>
              <span className="w-3 h-4 bg-[#ba1a1a] rounded-[2px] inline-block shadow-sm"></span>
            </div>
            <span className="text-[12px] font-bold text-white">-3 Poin</span>
            <span className="text-[10px] text-[#79849a]">2x Kuning</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 text-center flex flex-col items-center border border-white/5">
            <span className="w-3 h-4 bg-[#ba1a1a] rounded-[2px] inline-block mb-1 shadow-sm"></span>
            <span className="text-[12px] font-bold text-[#ffdad6]">-4 Poin</span>
            <span className="text-[10px] text-[#79849a]">Merah Langsung</span>
          </div>
        </div>
      </section>
    </div>
  );
};
