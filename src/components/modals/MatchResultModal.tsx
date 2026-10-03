import React, { useState, useEffect } from 'react';
import { Match } from '../../types/tournament';
import { useTournament } from '../../context/TournamentContext';

interface MatchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
}

interface GoalRow {
  id: string;
  playerName: string;
  minute: string;
}

export const MatchResultModal: React.FC<MatchResultModalProps> = ({ isOpen, onClose, match }) => {
  const { teams, updateMatchScore } = useTournament();

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeYellow, setHomeYellow] = useState(0);
  const [homeRed, setHomeRed] = useState(0);
  const [awayYellow, setAwayYellow] = useState(0);
  const [awayRed, setAwayRed] = useState(0);
  const [matchStatus, setMatchStatus] = useState<Match['status']>('selesai');
  const [goalRows, setGoalRows] = useState<GoalRow[]>([]);

  useEffect(() => {
    if (match) {
      setHomeScore(match.homeScore);
      setAwayScore(match.awayScore);
      setHomeYellow(match.homeYellow || 0);
      setHomeRed(match.homeRed || 0);
      setAwayYellow(match.awayYellow || 0);
      setAwayRed(match.awayRed || 0);
      setMatchStatus(match.status);

      const existingGoals = match.events
        .filter((e) => e.type === 'goal')
        .map((g) => ({
          id: g.id,
          playerName: g.playerName,
          minute: g.minute
        }));

      if (existingGoals.length > 0) {
        setGoalRows(existingGoals);
      } else {
        setGoalRows([
          { id: '1', playerName: 'Dimas (#9)', minute: "14'" }
        ]);
      }
    }
  }, [match, isOpen]);

  if (!isOpen || !match) return null;

  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);

  const handleAddGoal = () => {
    setGoalRows((prev) => [
      ...prev,
      { id: Date.now().toString(), playerName: `${homeTeam?.captain || 'Pemain'} (#10)`, minute: "45'" }
    ]);
  };

  const handleRemoveGoal = (id: string) => {
    setGoalRows((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSave = () => {
    updateMatchScore(
      match.id,
      homeScore,
      awayScore,
      matchStatus,
      homeYellow,
      homeRed,
      awayYellow,
      awayRed
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-0 md:p-4 bg-[#111c2e]/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header Handle */}
        <div className="p-4 pb-3 flex flex-col gap-2 relative bg-[#f1f3ff] border-b border-[#e9edff]">
          <div className="w-12 h-1 rounded-full bg-[#c5c6cd] self-center md:hidden"></div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[17px] font-bold text-[#111c2e]">
                {homeTeam?.name} vs {awayTeam?.name}
              </span>
              <span className="text-[11px] text-[#75777d]">
                {match.stageName} • Perhitungan Fairplay & PSSI Otomatis
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#45474c] hover:bg-[#e1e8ff] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-4 md:p-5 flex flex-col gap-4">
          {/* Score Stepper */}
          <div className="bg-[#f1f3ff] rounded-xl p-4 flex items-center justify-between shadow-inner">
            {/* Home */}
            <div className="flex flex-col items-center gap-1.5 w-32 text-center">
              <span className="text-[12px] font-bold text-[#111c2e] truncate w-full">
                {homeTeam?.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHomeScore((s) => Math.max(0, s - 1))}
                  className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111c2e] active:scale-90 font-bold text-lg hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#111c2e] min-w-[36px] text-center">
                  {homeScore}
                </span>
                <button
                  type="button"
                  onClick={() => setHomeScore((s) => s + 1)}
                  className="w-9 h-9 rounded-lg bg-[#006e2d] text-white shadow-sm flex items-center justify-center active:scale-90 font-bold text-lg hover:bg-[#007230] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#c5c6cd]">:</div>

            {/* Away */}
            <div className="flex flex-col items-center gap-1.5 w-32 text-center">
              <span className="text-[12px] font-bold text-[#111c2e] truncate w-full">
                {awayTeam?.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAwayScore((s) => Math.max(0, s - 1))}
                  className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111c2e] active:scale-90 font-bold text-lg hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#111c2e] min-w-[36px] text-center">
                  {awayScore}
                </span>
                <button
                  type="button"
                  onClick={() => setAwayScore((s) => s + 1)}
                  className="w-9 h-9 rounded-lg bg-[#006e2d] text-white shadow-sm flex items-center justify-center active:scale-90 font-bold text-lg hover:bg-[#007230] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pencetak Gol */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#111c2e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-[#006e2d]">sports_soccer</span>
                Pencetak Gol & Menit
              </span>
              <button
                type="button"
                onClick={handleAddGoal}
                className="text-[11px] text-[#006e2d] font-bold flex items-center gap-0.5 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">add</span> Tambah Gol
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {goalRows.map((goal, idx) => (
                <div key={goal.id} className="flex items-center gap-2 bg-[#f1f3ff] p-2 rounded-lg">
                  <input
                    type="text"
                    value={goal.playerName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGoalRows((prev) =>
                        prev.map((g, i) => (i === idx ? { ...g, playerName: val } : g))
                      );
                    }}
                    placeholder="Nama pemain (cth: Dimas #9)"
                    className="flex-1 bg-white p-2 rounded text-[12px] text-[#121b2e] border border-transparent focus:border-[#006e2d] outline-none"
                  />
                  <input
                    type="text"
                    value={goal.minute}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGoalRows((prev) =>
                        prev.map((g, i) => (i === idx ? { ...g, minute: val } : g))
                      );
                    }}
                    placeholder="Menit"
                    className="w-20 bg-white p-2 rounded text-[12px] text-center text-[#121b2e] border border-transparent focus:border-[#006e2d] outline-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGoal(goal.id)}
                    className="w-8 h-8 rounded flex items-center justify-center text-[#ba1a1a] hover:bg-red-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Kartu Fairplay & Disiplin */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#111c2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#f9bc45]">style</span>
              Pencatatan Kartu Fairplay & Disiplin
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Home Fairplay */}
              <div className="p-2.5 rounded-xl bg-[#f1f3ff] flex flex-col gap-2 border border-[#e1e8ff]">
                <span className="text-[11px] font-bold text-[#111c2e] truncate">
                  {homeTeam?.name}
                </span>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#45474c]">
                    <span className="w-2.5 h-3.5 bg-[#f9bc45] rounded-[2px] inline-block shadow-xs"></span>
                    Kuning (-1)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={homeYellow}
                    onChange={(e) => setHomeYellow(parseInt(e.target.value) || 0)}
                    className="w-12 p-1 bg-white rounded text-center font-bold text-[#121b2e] border border-[#d9e2fc]"
                  />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#45474c]">
                    <span className="w-2.5 h-3.5 bg-[#ba1a1a] rounded-[2px] inline-block shadow-xs"></span>
                    Merah (-4)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={homeRed}
                    onChange={(e) => setHomeRed(parseInt(e.target.value) || 0)}
                    className="w-12 p-1 bg-white rounded text-center font-bold text-[#121b2e] border border-[#d9e2fc]"
                  />
                </div>
              </div>

              {/* Away Fairplay */}
              <div className="p-2.5 rounded-xl bg-[#f1f3ff] flex flex-col gap-2 border border-[#e1e8ff]">
                <span className="text-[11px] font-bold text-[#111c2e] truncate">
                  {awayTeam?.name}
                </span>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#45474c]">
                    <span className="w-2.5 h-3.5 bg-[#f9bc45] rounded-[2px] inline-block shadow-xs"></span>
                    Kuning (-1)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={awayYellow}
                    onChange={(e) => setAwayYellow(parseInt(e.target.value) || 0)}
                    className="w-12 p-1 bg-white rounded text-center font-bold text-[#121b2e] border border-[#d9e2fc]"
                  />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#45474c]">
                    <span className="w-2.5 h-3.5 bg-[#ba1a1a] rounded-[2px] inline-block shadow-xs"></span>
                    Merah (-4)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={awayRed}
                    onChange={(e) => setAwayRed(parseInt(e.target.value) || 0)}
                    className="w-12 p-1 bg-white rounded text-center font-bold text-[#121b2e] border border-[#d9e2fc]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status Pertandingan */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#45474c] uppercase">Status Akhir Laga</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMatchStatus('selesai')}
                className={`p-2 rounded-lg text-center text-[12px] font-bold transition-all ${
                  matchStatus === 'selesai'
                    ? 'bg-[#006e2d] text-white shadow-sm'
                    : 'bg-[#f1f3ff] text-[#45474c] hover:bg-[#e1e8ff]'
                }`}
              >
                Selesai (FT)
              </button>
              <button
                type="button"
                onClick={() => setMatchStatus('live')}
                className={`p-2 rounded-lg text-center text-[12px] font-bold transition-all ${
                  matchStatus === 'live'
                    ? 'bg-[#ba1a1a] text-white shadow-sm'
                    : 'bg-[#f1f3ff] text-[#45474c] hover:bg-[#e1e8ff]'
                }`}
              >
                Live On-pitch
              </button>
              <button
                type="button"
                onClick={() => setMatchStatus('mendatang')}
                className={`p-2 rounded-lg text-center text-[12px] font-bold transition-all ${
                  matchStatus === 'mendatang'
                    ? 'bg-[#111c2e] text-white shadow-sm'
                    : 'bg-[#f1f3ff] text-[#45474c] hover:bg-[#e1e8ff]'
                }`}
              >
                Mendatang
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#7cf994]/20 text-[#007230] text-[11px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Klasemen Grup, Selisih Gol, & Fairplay akan diperbarui seketika.</span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 pt-2 bg-white border-t border-[#e9edff] flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-[#f1f3ff] text-[#45474c] text-[13px] font-bold hover:bg-[#e1e8ff] transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-[2] py-2.5 rounded-lg bg-[#111c2e] text-white text-[13px] font-bold flex items-center justify-center gap-2 active:scale-98 shadow-md hover:bg-[#1d2d47] transition-all"
          >
            <span className="material-symbols-outlined text-[17px] text-[#f9bc45]">save</span>
            <span>Simpan & Update Klasemen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
