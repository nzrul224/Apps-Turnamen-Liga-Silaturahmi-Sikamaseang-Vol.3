import React from 'react';
import { Match } from '../../types/tournament';
import { useTournament } from '../../context/TournamentContext';

interface EventLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
}

export const EventLogModal: React.FC<EventLogModalProps> = ({ isOpen, onClose, match }) => {
  const { teams } = useTournament();

  if (!isOpen || !match) return null;

  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111c2e]/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        <div className="p-4 bg-[#111c2e] text-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-base font-bold">Match Events & Timeline</span>
            <span className="text-[11px] text-[#79849a]">
              {homeTeam?.shortName} vs {awayTeam?.shortName} • {match.stageName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {match.events.length === 0 ? (
            <div className="py-8 text-center text-[#75777d] text-[13px] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-slate-300">history</span>
              Belum ada log kartu atau gol khusus tercatat untuk laga ini.
            </div>
          ) : (
            match.events.map((ev) => {
              const team = teams.find((t) => t.id === ev.teamId);
              const isHome = ev.teamId === match.homeTeamId;

              return (
                <div
                  key={ev.id}
                  className={`p-3 rounded-xl flex items-start gap-2.5 ${
                    isHome ? 'bg-[#f1f3ff]' : 'bg-[#e9edff]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      ev.type === 'goal'
                        ? 'bg-[#006e2d]/10 text-[#006e2d]'
                        : ev.type === 'yellow_card'
                        ? 'bg-[#f9bc45]/20 text-[#271900]'
                        : 'bg-[#ba1a1a]/15 text-[#ba1a1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {ev.type === 'goal'
                        ? 'sports_soccer'
                        : ev.type === 'yellow_card'
                        ? 'warning'
                        : 'priority_high'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#111c2e]">
                        {ev.type === 'goal'
                          ? `Gol: ${ev.playerName}`
                          : ev.type === 'yellow_card'
                          ? `Kartu Kuning: ${ev.playerName}`
                          : `Kartu Merah: ${ev.playerName}`}
                      </span>
                      <span className="font-['Space_Grotesk'] text-[12px] font-bold text-[#006e2d]">
                        {ev.minute}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#45474c] block mt-0.5">
                      {team?.name} {ev.description ? `• ${ev.description}` : ''}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 bg-[#f1f3ff] border-t border-[#e9edff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#111c2e] text-white text-[12px] font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
