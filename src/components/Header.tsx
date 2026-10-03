import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { TOURNAMENT_EMBLEM } from '../data/initialData';

export const Header: React.FC = () => {
  const { activeTab } = useTournament();

  const getSubheaderTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'tim-dan-grup':
        return 'Tim Dan Grup';
      case 'jadwal-dan-hasil':
        return 'Jadwal Dan Hasil';
      case 'klasemen-dan-fairplay':
        return 'Klasemen Dan Fairplay';
      case 'final-dan-trofeo':
        return 'Final Dan Trofeo';
      case 'laporan-dan-pengaturan':
        return 'Laporan Dan Pengaturan';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#111c2e] text-white pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
      <div className="h-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <img
            alt="PitchMaster Tournament Emblem"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={TOURNAMENT_EMBLEM}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] text-[17px] md:text-[18px] text-white tracking-tight font-bold truncate">
                PITCHMASTER PRO
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Live
              </span>
            </div>
            <span className="text-[10px] md:text-[11px] text-[#79849a] truncate font-medium">
              Football Tournament Management System • {getSubheaderTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-[#f9bc45]/20 text-[#f9bc45] text-[11px] font-bold uppercase tracking-wide">
            Super Admin
          </span>
          <div className="w-8 h-8 rounded-full bg-black/60 border border-slate-700/80 flex items-center justify-center text-white cursor-pointer hover:bg-black transition-colors" title="Super Admin Account">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
