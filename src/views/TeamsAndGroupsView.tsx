import React, { useState, useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';
import { Team, GroupId } from '../types/tournament';

interface TeamsAndGroupsViewProps {
  onOpenAddModal: () => void;
  onEditTeam: (team: Team) => void;
}

export const TeamsAndGroupsView: React.FC<TeamsAndGroupsViewProps> = ({
  onOpenAddModal,
  onEditTeam
}) => {
  const {
    teams,
    deleteTeam,
    switchTeamGroup,
    autoDrawTeams,
    showToast
  } = useTournament();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<'ALL' | 'A' | 'B'>('ALL');

  // Filter teams based on search & dropdown
  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGroup = filterGroup === 'ALL' || t.group === filterGroup;
      return matchSearch && matchGroup;
    });
  }, [teams, searchQuery, filterGroup]);

  const teamsA = useMemo(() => filteredTeams.filter((t) => t.group === 'A'), [filteredTeams]);
  const teamsB = useMemo(() => filteredTeams.filter((t) => t.group === 'B'), [filteredTeams]);
  const teamsUnassigned = useMemo(() => filteredTeams.filter((t) => t.group === 'NONE'), [filteredTeams]);

  const handleDeletePrompt = (team: Team) => {
    if (window.confirm(`Hapus ${team.name} dari daftar tim turnamen?`)) {
      deleteTeam(team.id);
    }
  };

  const renderTeamCard = (team: Team, currentGroup: GroupId) => {
    const nextGroup = currentGroup === 'A' ? 'B' : 'A';

    return (
      <div
        key={team.id}
        className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] flex flex-col gap-3 relative transition-all hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#f1f3ff] flex items-center justify-center flex-shrink-0 p-1 overflow-hidden shadow-xs">
              {team.logo ? (
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="material-symbols-outlined text-[24px] text-[#111c2e]">shield</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#111c2e] truncate font-bold">
                {team.name}
              </span>
              <span className="text-[11px] text-[#45474c] flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${team.jerseyColorClass || 'bg-red-500'}`}></span>
                {team.jerseyColor}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onEditTeam(team)}
              className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#111c2e] hover:bg-[#e1e8ff] transition-colors"
              title="Edit Data Tim"
            >
              <span className="material-symbols-outlined text-[17px]">edit</span>
            </button>
            <button
              onClick={() => handleDeletePrompt(team)}
              className="w-8 h-8 rounded-lg bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
              title="Hapus Tim"
            >
              <span className="material-symbols-outlined text-[17px]">delete</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-[#f1f3ff]/60 rounded-lg p-2.5 text-[12px]">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#75777d] uppercase font-bold">Kapten</span>
            <span className="text-[12px] font-bold text-[#121b2e] truncate">{team.captain}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#75777d] uppercase font-bold">Manajer</span>
            <span className="text-[12px] font-bold text-[#121b2e] truncate">{team.manager}</span>
          </div>

          <div className="col-span-2 flex items-center justify-between pt-1 border-t border-[#e9edff]/60 mt-1">
            <span className="text-[11px] text-[#006e2d] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">call</span>
              {team.phone}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#75777d]">Pindah:</span>
              <button
                onClick={() => switchTeamGroup(team.id, nextGroup)}
                className="px-2 py-0.5 rounded bg-[#e9edff] text-[#111c2e] text-[11px] font-bold hover:bg-[#d9e2fc] active:scale-95 transition-all"
              >
                Ke Grup {nextGroup}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-12 gap-4">
      {/* View Title & Counts */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-['Space_Grotesk'] text-[20px] md:text-[22px] font-bold text-[#111c2e] tracking-tight">
              Data Tim & Grup
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#006e2d] text-white text-[11px] font-bold">
              {teams.length} Tim Terdaftar
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e9edff] text-[#45474c] text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#006e2d] animate-pulse"></span>
            2 Grup Aktif
          </div>
        </div>
        <p className="text-[12px] text-[#45474c]">
          Kelola registrasi skuat, ofisial, dan distribusi bagan turnamen resmi.
        </p>
      </div>

      {/* Primary Actions: Add Team & Auto Draw */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#111c2e] text-white text-[13px] font-bold shadow-sm hover:bg-[#1d2d47] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Tim</span>
        </button>

        <button
          onClick={autoDrawTeams}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#e1e8ff] text-[#111c2e] text-[13px] font-bold shadow-sm hover:bg-[#d9e2fc] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#f9bc45]">casino</span>
          <span>Undi Otomatis</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#75777d]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tim, manajer, atau kapten..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-[#121b2e] text-[13px] placeholder:text-[#75777d] border border-[#e1e8ff] shadow-sm focus:outline-none focus:border-[#006e2d] transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value as any)}
            className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white text-[#111c2e] text-[13px] font-bold border border-[#e1e8ff] shadow-sm focus:outline-none"
          >
            <option value="ALL">Semua</option>
            <option value="A">Grup A</option>
            <option value="B">Grup B</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-2.5 text-[18px] pointer-events-none text-[#75777d]">
            expand_more
          </span>
        </div>
      </div>

      {/* Format Notice Strip */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#111c2e] text-white shadow-sm border border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">sports_soccer</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-bold truncate">
              Format Kompetisi: 2 Grup (Setengah Kompetisi)
            </span>
            <span className="text-[11px] text-[#79849a] truncate">
              Juara & Runner-up otomatis lolos ke Semifinal
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#7ffc97] text-[20px] flex-shrink-0">verified</span>
      </div>

      {/* SEKSI GRUP A */}
      {(filterGroup === 'ALL' || filterGroup === 'A') && (
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#006e2d]"></span>
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#111c2e]">GRUP A</h2>
              <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#111c2e] text-[11px] font-bold">
                {teamsA.length} Kuota Penuh
              </span>
            </div>
            <span className="text-[11px] text-[#006e2d] font-bold uppercase tracking-wider">Pot 1 & 2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teamsA.map((t) => renderTeamCard(t, 'A'))}
          </div>
        </div>
      )}

      {/* SEKSI GRUP B */}
      {(filterGroup === 'ALL' || filterGroup === 'B') && (
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#f9bc45]"></span>
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#111c2e]">GRUP B</h2>
              <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#111c2e] text-[11px] font-bold">
                {teamsB.length} Kuota Penuh
              </span>
            </div>
            <span className="text-[11px] text-[#ac7b00] font-bold uppercase tracking-wider">Pot 1 & 2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teamsB.map((t) => renderTeamCard(t, 'B'))}
          </div>
        </div>
      )}

      {/* Unassigned Teams if any */}
      {teamsUnassigned.length > 0 && (
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-400"></span>
              <h2 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#111c2e]">Unassigned</h2>
              <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#111c2e] text-[11px] font-bold">
                {teamsUnassigned.length} Tim
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teamsUnassigned.map((t) => renderTeamCard(t, 'A'))}
          </div>
        </div>
      )}

      {/* Operasional Data & Dokumen */}
      <div className="mt-2 p-4 rounded-xl bg-white shadow-sm border border-[#e1e8ff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#111c2e]">Operasional Data & Dokumen</span>
          <span className="text-[11px] text-[#75777d]">Official PitchMaster Docs</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => showToast('Import file CSV/Excel berhasil. Seluruh data tim sinkron.', 'upload_file')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#f1f3ff] text-[#111c2e] text-[12px] font-bold hover:bg-[#e1e8ff] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Import Excel</span>
          </button>
          <button
            onClick={() => showToast('Laporan bagan grup PDF telah diunduh.', 'download')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#006e2d] text-white text-[12px] font-bold hover:bg-[#007230] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export PDF/XLS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
