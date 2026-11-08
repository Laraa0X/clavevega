import React from 'react';
import { ActivePage } from '../types';
import { BookOpen, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  unlockedCount: number;
  onOpenJournal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  unlockedCount,
  onOpenJournal,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0e1920]/95 backdrop-blur-md border-b border-[#c89b3c]/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Zone - Single text wordmark in display face */}
        <button
          onClick={() => {
            sound.tick();
            onNavigate('page1');
          }}
          className="flex items-center gap-2.5 text-left group transition-all shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded border border-[#c89b3c]/60 bg-[#162732] flex items-center justify-center text-[#dfb15b] group-hover:border-[#dfb15b] shadow-inner transition-colors">
            <Compass className="w-4 h-4 text-[#dfb15b]" />
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wider text-[#faedd0] group-hover:text-[#dfb15b] transition-colors whitespace-nowrap block">
              CLAVE VEGA
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#9fb3c2] -mt-1 block">
              ARCHIVO DE INVESTIGACIÓN
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium">
          <button
            onClick={() => {
              sound.tick();
              onNavigate('page1');
            }}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activePage === 'page1'
                ? 'text-[#dfb15b] border-[#c89b3c] font-semibold'
                : 'text-[#bed0de] border-transparent hover:text-[#faedd0] hover:border-[#c89b3c]/40'
            }`}
          >
            1. Abejas de Piedra
          </button>
          <button
            onClick={() => {
              sound.tick();
              onNavigate('page2');
            }}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activePage === 'page2'
                ? 'text-[#dfb15b] border-[#c89b3c] font-semibold'
                : 'text-[#bed0de] border-transparent hover:text-[#faedd0] hover:border-[#c89b3c]/40'
            }`}
          >
            2. Reloj de Arena
          </button>
          <button
            onClick={() => {
              sound.tick();
              onNavigate('page3');
            }}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activePage === 'page3'
                ? 'text-[#dfb15b] border-[#c89b3c] font-semibold'
                : 'text-[#bed0de] border-transparent hover:text-[#faedd0] hover:border-[#c89b3c]/40'
            }`}
          >
            3. Cuatro Elementos
          </button>
        </nav>

        {/* Zone 3: Primary Action & Sound toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
            aria-label="Alternar audio"
            className="p-2 rounded border border-[#c89b3c]/30 bg-[#162732] text-[#c89b3c] hover:text-[#dfb15b] hover:border-[#dfb15b] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              sound.tick();
              onOpenJournal();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-gradient-to-r from-[#243d34] to-[#1c3029] hover:from-[#2d4f3b] hover:to-[#243d34] border border-[#c89b3c]/50 text-[#faedd0] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-[#c89b3c]/20 hover:border-[#dfb15b] cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-[#dfb15b]" />
            <span className="hidden sm:inline">Diario de Pistas</span>
            <span className="bg-[#c89b3c] text-[#0e1920] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
              {unlockedCount}/3
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#c89b3c]/20 bg-[#122029] text-xs px-2 py-1.5 overflow-x-auto">
        <button
          onClick={() => {
            sound.tick();
            onNavigate('page1');
          }}
          className={`px-3 py-1 whitespace-nowrap rounded ${
            activePage === 'page1' ? 'bg-[#c89b3c]/20 text-[#dfb15b] font-bold' : 'text-[#a6bccb]'
          }`}
        >
          1. Abejas
        </button>
        <button
          onClick={() => {
            sound.tick();
            onNavigate('page2');
          }}
          className={`px-3 py-1 whitespace-nowrap rounded ${
            activePage === 'page2' ? 'bg-[#c89b3c]/20 text-[#dfb15b] font-bold' : 'text-[#a6bccb]'
          }`}
        >
          2. Reloj
        </button>
        <button
          onClick={() => {
            sound.tick();
            onNavigate('page3');
          }}
          className={`px-3 py-1 whitespace-nowrap rounded ${
            activePage === 'page3' ? 'bg-[#c89b3c]/20 text-[#dfb15b] font-bold' : 'text-[#a6bccb]'
          }`}
        >
          3. Elementos
        </button>
      </div>
    </header>
  );
};
