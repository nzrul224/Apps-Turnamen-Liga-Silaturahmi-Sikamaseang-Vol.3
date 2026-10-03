import React, { useState } from 'react';
import { TournamentProvider, useTournament } from './context/TournamentContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/Toast';
import { DashboardView } from './views/DashboardView';
import { TeamsAndGroupsView } from './views/TeamsAndGroupsView';
import { ScheduleView } from './views/ScheduleView';
import { StandingsView } from './views/StandingsView';
import { BracketView } from './views/BracketView';
import { ManagementView } from './views/ManagementView';
import { TeamModal } from './components/modals/TeamModal';
import { MatchResultModal } from './components/modals/MatchResultModal';
import { EventLogModal } from './components/modals/EventLogModal';
import { Team, Match } from './types/tournament';

const MainContent: React.FC = () => {
  const { activeTab, matches, addTeam, updateTeam } = useTournament();

  // Modal states
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);

  const [isMatchResultModalOpen, setIsMatchResultModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const [isEventLogModalOpen, setIsEventLogModalOpen] = useState(false);
  const [eventLogMatch, setEventLogMatch] = useState<Match | null>(null);

  const handleOpenAddTeamModal = () => {
    setTeamToEdit(null);
    setIsTeamModalOpen(true);
  };

  const handleOpenEditTeamModal = (team: Team) => {
    setTeamToEdit(team);
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = (teamData: Omit<Team, 'id'>) => {
    if (teamToEdit) {
      updateTeam(teamToEdit.id, teamData);
    } else {
      addTeam(teamData);
    }
  };

  const handleOpenMatchResultModal = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      setSelectedMatch(match);
      setIsMatchResultModalOpen(true);
    }
  };

  const handleOpenEventLogModal = (match: Match) => {
    setEventLogMatch(match);
    setIsEventLogModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff] text-[#121b2e]">
      <Header />

      <main className="flex-1 pt-20 pb-20 w-full overflow-x-hidden">
        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenAddTeamModal={handleOpenAddTeamModal}
            onOpenMatchResultModal={handleOpenMatchResultModal}
          />
        )}

        {activeTab === 'tim-dan-grup' && (
          <TeamsAndGroupsView
            onOpenAddModal={handleOpenAddTeamModal}
            onEditTeam={handleOpenEditTeamModal}
          />
        )}

        {activeTab === 'jadwal-dan-hasil' && (
          <ScheduleView
            onOpenMatchResultModal={handleOpenMatchResultModal}
            onOpenEventLogModal={handleOpenEventLogModal}
          />
        )}

        {activeTab === 'klasemen-dan-fairplay' && <StandingsView />}

        {activeTab === 'final-dan-trofeo' && <BracketView />}

        {activeTab === 'laporan-dan-pengaturan' && <ManagementView />}
      </main>

      <BottomNav />
      <ToastContainer />

      {/* Modals */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSave={handleSaveTeam}
        teamToEdit={teamToEdit}
      />

      <MatchResultModal
        isOpen={isMatchResultModalOpen}
        onClose={() => setIsMatchResultModalOpen(false)}
        match={selectedMatch}
      />

      <EventLogModal
        isOpen={isEventLogModalOpen}
        onClose={() => setIsEventLogModalOpen(false)}
        match={eventLogMatch}
      />
    </div>
  );
};

export default function App() {
  return (
    <TournamentProvider>
      <MainContent />
    </TournamentProvider>
  );
}
