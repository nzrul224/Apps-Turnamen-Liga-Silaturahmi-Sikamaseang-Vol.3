import React, { useState, useEffect } from 'react';
import { Team, GroupId } from '../../types/tournament';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teamData: Omit<Team, 'id'>) => void;
  teamToEdit?: Team | null;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, onSave, teamToEdit }) => {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [city, setCity] = useState('');
  const [captain, setCaptain] = useState('');
  const [manager, setManager] = useState('');
  const [phone, setPhone] = useState('');
  const [jerseyColor, setJerseyColor] = useState('');
  const [group, setGroup] = useState<GroupId>('A');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name);
      setShortName(teamToEdit.shortName);
      setCity(teamToEdit.city);
      setCaptain(teamToEdit.captain);
      setManager(teamToEdit.manager);
      setPhone(teamToEdit.phone);
      setJerseyColor(teamToEdit.jerseyColor);
      setGroup(teamToEdit.group);
      setLogo(teamToEdit.logo);
    } else {
      setName('');
      setShortName('');
      setCity('');
      setCaptain('');
      setManager('');
      setPhone('');
      setJerseyColor('Merah-Putih (Utama)');
      setGroup('A');
      setLogo('https://lh3.googleusercontent.com/aida-public/AB6AXuDE8rUCgNLUv_RYlGVXqrNfVQUsSv3qYyuQhFXUDrey2mEDgeHRmTHL0iq2Ap2at-YLxNKMRsZvndM1E8IiMe171raE0vMd6H2Yd2Yknr2GV8FDVma65V3YrlHxqDo9DUdmkEBqa0EiG99AesEAsDWWcgqb0S_4iGcjT8jW5zFJjhOpyfLNqKF7ufPUBQF75PT80wb9V4cxs8wZMZBDH1V-1jrc-bKKRxbYDJLPgmQ3EF4sotjFfXo');
    }
  }, [teamToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      shortName: shortName.trim() || name.substring(0, 2).toUpperCase(),
      city: city || 'Indonesia',
      logo: logo || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE8rUCgNLUv_RYlGVXqrNfVQUsSv3qYyuQhFXUDrey2mEDgeHRmTHL0iq2Ap2at-YLxNKMRsZvndM1E8IiMe171raE0vMd6H2Yd2Yknr2GV8FDVma65V3YrlHxqDo9DUdmkEBqa0EiG99AesEAsDWWcgqb0S_4iGcjT8jW5zFJjhOpyfLNqKF7ufPUBQF75PT80wb9V4cxs8wZMZBDH1V-1jrc-bKKRxbYDJLPgmQ3EF4sotjFfXo',
      jerseyColor: jerseyColor || 'Merah-Putih',
      jerseyColorClass: 'bg-emerald-600',
      captain: captain || 'Kapten Tim (C)',
      manager: manager || 'Ofisial Tim',
      phone: phone || '0812-0000-0000',
      group
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111c2e]/60 backdrop-blur-sm flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4">
      <div className="w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl max-h-[85vh] overflow-y-auto p-4 md:p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#e9edff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006e2d]/10 text-[#006e2d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">sports_soccer</span>
            </div>
            <span className="font-['Space_Grotesk'] text-[18px] font-bold text-[#111c2e]">
              {teamToEdit ? 'Perbarui Profil Tim' : 'Tambah Registrasi Tim'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#45474c] hover:bg-[#e1e8ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#45474c] uppercase">Nama Tim / Klub</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nusantara Football Academy"
              required
              className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Singkatan (2-3 Huruf)</label>
              <input
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                placeholder="Cth: NFA"
                maxLength={4}
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Kota Asal / Homebase</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cth: Sleman, DIY"
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#45474c] uppercase">Upload Logo / Lambang Klub</label>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f1f3ff]">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1 shadow-sm overflow-hidden flex-shrink-0">
                {logo ? (
                  <img src={logo} alt="Logo Preview" className="w-full h-full object-contain" />
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-slate-400">shield</span>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[12px] font-bold text-[#111c2e] truncate">Piala Nusantara Crest Asset</span>
                <span className="text-[10px] text-[#75777d]">Format PNG/SVG Transparan 256x256 px</span>
              </div>
              <label className="px-3 py-1.5 rounded-lg bg-[#111c2e] text-white text-[11px] font-bold cursor-pointer active:scale-95 transition-transform flex-shrink-0">
                Pilih
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setLogo(url);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Nama Manajer</label>
              <input
                type="text"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="Nama manajer tim"
                required
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Nama Kapten Tim</label>
              <input
                type="text"
                value={captain}
                onChange={(e) => setCaptain(e.target.value)}
                placeholder="Nama kapten (C)"
                required
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Kontak WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                required
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#45474c] uppercase">Warna Jersey Utama</label>
              <input
                type="text"
                value={jerseyColor}
                onChange={(e) => setJerseyColor(e.target.value)}
                placeholder="Cth: Merah-Putih"
                required
                className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-[#121b2e] text-[13px] focus:outline-none focus:bg-white border border-transparent focus:border-[#006e2d] shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#45474c] uppercase">Penempatan Grup Turnamen</label>
            <div className="grid grid-cols-3 gap-2">
              {(['A', 'B', 'NONE'] as GroupId[]).map((grp) => (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setGroup(grp)}
                  className={`p-2.5 rounded-lg text-[12px] font-bold transition-all text-center ${
                    group === grp
                      ? 'bg-[#111c2e] text-white shadow-sm'
                      : 'bg-[#f1f3ff] text-[#45474c] hover:bg-[#e1e8ff]'
                  }`}
                >
                  {grp === 'NONE' ? 'Unassigned' : `Grup ${grp}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-[#e9edff] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-[#f1f3ff] text-[#45474c] text-[13px] font-bold hover:bg-[#e1e8ff] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-[#006e2d] text-white text-[13px] font-bold shadow-md hover:bg-[#007230] transition-colors active:scale-98"
            >
              Simpan Profil Tim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
