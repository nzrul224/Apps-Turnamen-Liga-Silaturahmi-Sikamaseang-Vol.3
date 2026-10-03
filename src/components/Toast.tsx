import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useTournament();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 inset-x-4 max-w-sm mx-auto z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-3 rounded-xl bg-[#273044] text-[#edf0ff] shadow-xl flex items-center gap-2.5 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="w-6 h-6 rounded-full bg-[#006e2d] text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[15px]">{toast.icon || 'check'}</span>
          </div>
          <span className="text-[12px] font-medium flex-1 truncate">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
