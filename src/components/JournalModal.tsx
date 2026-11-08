import React from 'react';
import { X, CheckCircle, Lock, BookOpen, Key, Compass, Award, ExternalLink } from 'lucide-react';
import { InvestigationState, ActivePage } from '../types';
import { sound } from '../utils/audio';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: InvestigationState;
  onNavigate: (page: ActivePage) => void;
  onOpenCertificate: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  state,
  onNavigate,
  onOpenCertificate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-lg bg-[#14232c] border border-[#c89b3c]/60 shadow-2xl text-[#ede6d6]">
        {/* Ornate Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0e1920] border-b border-[#c89b3c]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#264436] border border-[#c89b3c]/60 flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#dfb15b]" />
            </div>
            <div>
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#faedd0] tracking-wide">
                DIARIO DE EXPEDICIÓN · BAHÍA ROCA
              </h2>
              <p className="text-xs text-[#9fb3c2]">
                Registro de pistas físicas y digitales de Elena y Bruno Vega
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="p-1.5 rounded text-[#9fb3c2] hover:text-[#faedd0] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Cerrar diario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Explorer Card */}
          <div className="p-4 rounded border border-[#c89b3c]/30 bg-[#192b36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-[#dfb15b] bg-[#243d34] flex items-center justify-center text-xl font-bold text-[#dfb15b]">
                {state.guardianName ? state.guardianName.charAt(0).toUpperCase() : 'E'}
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#dfb15b] uppercase block">
                  INVESTIGADOR AUTORIZADO
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#faedd0]">
                  {state.guardianName || 'Elena "Kraken" y Bruno Vega'}
                </h3>
                <p className="text-xs text-[#9fb3c2]">
                  Expedición oficial en Bahía Roca · Acreditación Nº #BR-1892
                </p>
              </div>
            </div>

            {state.page3Solved && (
              <button
                onClick={() => {
                  sound.guardianVictory();
                  onOpenCertificate();
                }}
                className="px-3.5 py-1.5 rounded bg-[#c89b3c] hover:bg-[#dfb15b] text-[#0e1920] font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                Ver Carnet de Guardián
              </button>
            )}
          </div>

          {/* 3 Books Progression Track */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#dfb15b] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Estado de la Trilogía Editorial
            </h4>

            <div className="space-y-3.5">
              {/* Book 1 */}
              <div
                className={`p-4 rounded border transition-all ${
                  state.page1Solved
                    ? 'border-[#2d4f3b] bg-[#162720]/80'
                    : 'border-[#c89b3c]/20 bg-[#162530]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#101c24] text-[#dfb15b] font-mono">
                        LIBRO 1 · QR CATEDRAL
                      </span>
                      {state.page1Solved ? (
                        <span className="flex items-center gap-1 text-xs text-[#6ee7b7] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Pista descifrada
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-[#9fb3c2]">
                          <Lock className="w-3.5 h-3.5 text-[#c89b3c]" /> Acertijo pendiente
                        </span>
                      )}
                    </div>
                    <h5 className="font-cinzel text-sm sm:text-base font-semibold text-[#faedd0]">
                      El Secreto de las Abejas de Piedra
                    </h5>
                    <p className="text-xs text-[#bed0de] max-w-xl">
                      {state.page1Solved
                        ? 'Pista confirmada: "Cuando la última abeja despierte, el tiempo dejará de avanzar". Señala al viejo observatorio.'
                        : 'Encuentra las abejas de tiza en los arcos de la catedral gótica para averiguar la palabra secreta.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.tick();
                      onNavigate('page1');
                      onClose();
                    }}
                    className="px-3 py-1 text-xs rounded border border-[#c89b3c]/40 hover:border-[#dfb15b] text-[#dfb15b] hover:bg-[#c89b3c]/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Abrir Página 1
                  </button>
                </div>
              </div>

              {/* Book 2 */}
              <div
                className={`p-4 rounded border transition-all ${
                  state.page2Solved
                    ? 'border-[#2d4f3b] bg-[#162720]/80'
                    : 'border-[#c89b3c]/20 bg-[#162530]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#101c24] text-[#dfb15b] font-mono">
                        LIBRO 2 · QR OBSERVATORIO
                      </span>
                      {state.page2Solved ? (
                        <span className="flex items-center gap-1 text-xs text-[#6ee7b7] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Mecanismo activo
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-[#9fb3c2]">
                          <Lock className="w-3.5 h-3.5 text-[#c89b3c]" /> Acertijo pendiente
                        </span>
                      )}
                    </div>
                    <h5 className="font-cinzel text-sm sm:text-base font-semibold text-[#faedd0]">
                      El Enigma del Reloj de Arena
                    </h5>
                    <p className="text-xs text-[#bed0de] max-w-xl">
                      {state.page2Solved
                        ? 'Llave de bronce obtenida. La carta de El Zíngaro revela que la entrada secreta se oculta bajo el faro de Bahía Roca.'
                        : 'Alinea las 4 palancas de la consola en el observatorio abandonado para reactivar el tiempo de la ciudad.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.tick();
                      onNavigate('page2');
                      onClose();
                    }}
                    className="px-3 py-1 text-xs rounded border border-[#c89b3c]/40 hover:border-[#dfb15b] text-[#dfb15b] hover:bg-[#c89b3c]/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Abrir Página 2
                  </button>
                </div>
              </div>

              {/* Book 3 */}
              <div
                className={`p-4 rounded border transition-all ${
                  state.page3Solved
                    ? 'border-[#2d4f3b] bg-[#162720]/80'
                    : 'border-[#c89b3c]/20 bg-[#162530]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#101c24] text-[#dfb15b] font-mono">
                        LIBRO 3 · QR FARO Y MANUSCRITO
                      </span>
                      {state.page3Solved ? (
                        <span className="flex items-center gap-1 text-xs text-[#6ee7b7] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Secreto revelado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-[#9fb3c2]">
                          <Lock className="w-3.5 h-3.5 text-[#c89b3c]" /> Desafío final
                        </span>
                      )}
                    </div>
                    <h5 className="font-cinzel text-sm sm:text-base font-semibold text-[#faedd0]">
                      El Manuscrito de los Cuatro Elementos
                    </h5>
                    <p className="text-xs text-[#bed0de] max-w-xl">
                      {state.page3Solved
                        ? '¡Identidad descubierta! Aislin, el sabio relojero del pueblo, era El Zíngaro. Has sido consagrado como Guardián de Bahía Roca.'
                        : 'Reúne las pistas de los dos libros anteriores y alinea los 4 elementos en la cripta del faro.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.tick();
                      onNavigate('page3');
                      onClose();
                    }}
                    className="px-3 py-1 text-xs rounded border border-[#c89b3c]/40 hover:border-[#dfb15b] text-[#dfb15b] hover:bg-[#c89b3c]/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Abrir Página 3
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connection note */}
          <div className="p-4 rounded bg-[#0f1b22] border border-[#c89b3c]/20 text-xs text-[#9fb3c2] leading-relaxed">
            <span className="text-[#dfb15b] font-semibold block mb-1">
              🔗 Conexión Física + Digital (Phygital):
            </span>
            Cada libro impreso de la editorial contiene un código QR en la última página. Al escanearlo con el teléfono o tablet, los niños acceden a estas páginas interactivas diseñadas con la misma atmósfera ilustrada para resolver los acertijos y desbloquear la siguiente etapa de la expedición.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0e1920] border-t border-[#c89b3c]/30 flex items-center justify-between text-xs text-[#9fb3c2]">
          <span>Editorial Líberi · Clave Vega: Expedición Bahía Roca</span>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="px-4 py-1.5 rounded bg-[#c89b3c] hover:bg-[#dfb15b] text-[#0e1920] font-semibold transition-colors cursor-pointer"
          >
            Volver a la investigación
          </button>
        </div>
      </div>
    </div>
  );
};
