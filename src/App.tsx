import React, { useState, useEffect } from 'react';
import { ActivePage, InvestigationState } from './types';
import { Header } from './components/Header';
import { PageOneAbejas } from './components/PageOneAbejas';
import { PageTwoReloj } from './components/PageTwoReloj';
import { PageThreeManuscrito } from './components/PageThreeManuscrito';
import { JournalModal } from './components/JournalModal';
import { CertificateModal } from './components/CertificateModal';
import { sound } from './utils/audio';
import { BookOpen, Compass, Shield, QrCode } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('page1');
  const [journalOpen, setJournalOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // Investigation State with localStorage recovery
  const [state, setState] = useState<InvestigationState>(() => {
    try {
      const saved = localStorage.getItem('clave_vega_investigation');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      page1Solved: false,
      page1DiscoveredBees: [],
      page2Solved: false,
      page2Levers: [0, 0, 0, 0], // Levers start at base
      page3Solved: false,
      page3ElementsPlaced: [],
      guardianName: 'Elena "Kraken" y Bruno',
      soundEnabled: true,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('clave_vega_investigation', JSON.stringify(state));
    } catch {}
  }, [state]);

  const unlockedCount =
    (state.page1Solved ? 1 : 0) +
    (state.page2Solved ? 1 : 0) +
    (state.page3Solved ? 1 : 0);

  const toggleSound = () => {
    const next = !state.soundEnabled;
    sound.setMuted(!next);
    setState((prev) => ({ ...prev, soundEnabled: next }));
  };

  const handleDiscoverBee = (id: number) => {
    setState((prev) => {
      if (prev.page1DiscoveredBees.includes(id)) return prev;
      return {
        ...prev,
        page1DiscoveredBees: [...prev.page1DiscoveredBees, id],
      };
    });
  };

  const handleSolvePage1 = () => {
    setState((prev) => ({ ...prev, page1Solved: true }));
  };

  const handleLeverChange = (leverIdx: number, newPos: number) => {
    setState((prev) => {
      const updated = [...prev.page2Levers];
      updated[leverIdx] = newPos;
      return { ...prev, page2Levers: updated };
    });
  };

  const handleSolvePage2 = () => {
    setState((prev) => ({ ...prev, page2Solved: true }));
  };

  const handleSolvePage3 = () => {
    setState((prev) => ({ ...prev, page3Solved: true }));
  };

  const handleSetGuardianName = (name: string) => {
    setState((prev) => ({ ...prev, guardianName: name }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1920] text-[#ede6d6] selection:bg-[#c89b3c]/30 selection:text-[#faedd0]">
      {/* 3-Zone Header adhering to Top Bar Contract */}
      <Header
        activePage={activePage}
        onNavigate={(p) => setActivePage(p)}
        unlockedCount={unlockedCount}
        onOpenJournal={() => setJournalOpen(true)}
        soundEnabled={state.soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Investigation Workspace */}
      <main className="flex-1">
        {activePage === 'page1' && (
          <PageOneAbejas
            isSolved={state.page1Solved}
            discoveredBees={state.page1DiscoveredBees}
            onSolve={handleSolvePage1}
            onDiscoverBee={handleDiscoverBee}
            onNavigateToNext={() => setActivePage('page2')}
          />
        )}

        {activePage === 'page2' && (
          <PageTwoReloj
            isSolved={state.page2Solved}
            levers={state.page2Levers}
            onSolve={handleSolvePage2}
            onLeverChange={handleLeverChange}
            onNavigateToNext={() => setActivePage('page3')}
          />
        )}

        {activePage === 'page3' && (
          <PageThreeManuscrito
            isSolved={state.page3Solved}
            page1Solved={state.page1Solved}
            page2Solved={state.page2Solved}
            guardianName={state.guardianName}
            onSetGuardianName={handleSetGuardianName}
            onSolve={handleSolvePage3}
            onOpenCertificate={() => setCertificateOpen(true)}
          />
        )}
      </main>

      {/* Journal Modal */}
      <JournalModal
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
        state={state}
        onNavigate={(p) => setActivePage(p)}
        onOpenCertificate={() => {
          setJournalOpen(false);
          setCertificateOpen(true);
        }}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        guardianName={state.guardianName}
        onSetName={handleSetGuardianName}
      />

      {/* Editorial Footer */}
      <footer className="mt-12 border-t border-[#c89b3c]/30 bg-[#0a1318] py-8 text-xs text-[#9fb3c2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#162732] border border-[#c89b3c]/40 flex items-center justify-center text-[#dfb15b]">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-cinzel font-bold text-[#faedd0]">
                Clave Vega: Expedición Bahía Roca
              </span>
              <span className="block text-[11px] text-[#718797]">
                Trilogía Editorial Infantil · Libros físicos + Acertijos QR interactivos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-center md:text-right">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb15b] block">
                EDITORIAL
              </span>
              <span className="font-editorial text-sm font-bold text-[#faedd0]">
                Líberi Editorial
              </span>
            </div>
            <div className="h-6 w-px bg-[#c89b3c]/30" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb15b] block">
                PERSONAJES PRINCIPALES
              </span>
              <span className="text-xs text-[#bed0de]">
                Elena (Kraken), Bruno & Aislin el Relojero
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
