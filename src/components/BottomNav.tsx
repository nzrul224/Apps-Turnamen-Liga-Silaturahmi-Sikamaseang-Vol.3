import React from 'react';
import { useTournament } from '../context/TournamentContext';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'sports_score' },
  { id: 'tim-dan-grup', label: 'Tim & Grup', icon: 'groups' },
  { id: 'jadwal-dan-hasil', label: 'Jadwal', icon: 'event_available' },
  { id: 'klasemen-dan-fairplay', label: 'Klasemen', icon: 'format_list_numbered' },
  { id: 'final-dan-trofeo', label: 'Braket', icon: 'emoji_events' },
  { id: 'laporan-dan-pengaturan', label: 'Kelola', icon: 'tune' }
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useTournament();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e9edff] shadow-[0_-2px_12px_rgba(17,28,46,0.06)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-1 md:px-6">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center flex-1 h-14 transition-colors ${
                isActive
                  ? 'text-[#111c2e] font-bold'
                  : 'text-[#75777d] hover:text-[#121b2e]'
              }`}
            >
              <div className="relative">
                <span className={`material-symbols-outlined text-[22px] transition-transform ${isActive ? 'scale-110 text-[#006e2d]' : ''}`}>
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#006e2d]"></span>
                )}
              </div>
              <span className="text-[10px] md:text-[11px] truncate tracking-tight mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
