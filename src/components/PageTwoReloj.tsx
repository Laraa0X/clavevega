import React, { useState } from 'react';
import { Clock, Key, CheckCircle2, ArrowRight, HelpCircle, RotateCcw, Cog, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface PageTwoProps {
  isSolved: boolean;
  levers: number[];
  onSolve: () => void;
  onLeverChange: (leverIndex: number, position: number) => void;
  onNavigateToNext: () => void;
}

// 4 Symbols from the observatory console
const CONSOLE_SYMBOLS = [
  { id: 0, label: 'Reloj de Arena', icon: '⏳', targetPos: 3, hint: 'Posición Alta (Cénit del Tiempo)' },
  { id: 1, label: 'Sol de Engranajes', icon: '⚙️', targetPos: 2, hint: 'Posición Media-Alta (Mediodía)' },
  { id: 2, label: 'Luna Creciente', icon: '🌙', targetPos: 1, hint: 'Posición Media-Baja (Crepúsculo)' },
  { id: 3, label: 'Pluma del Viento', icon: '🪶', targetPos: 0, hint: 'Posición Base (Reposo en la Bahía)' },
];

export const PageTwoReloj: React.FC<PageTwoProps> = ({
  isSolved,
  levers,
  onSolve,
  onLeverChange,
  onNavigateToNext,
}) => {
  const [textAnswer, setTextAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Check if current levers match target positions
  const leversAligned = CONSOLE_SYMBOLS.every(
    (sym, idx) => levers[idx] === sym.targetPos
  );

  const handleLeverClick = (leverIdx: number, newPos: number) => {
    if (isSolved) return;
    sound.gearClick();
    onLeverChange(leverIdx, newPos);
  };

  const handleActivateMechanism = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Check either by physical levers or textual code
    const clean = textAnswer.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const codeMatches = clean === 'FARO' || clean === 'LLAVE' || clean === 'RELOJ' || clean === '3210' || clean === '4321';

    if (leversAligned || codeMatches) {
      sound.clueUnlocked();
      setErrorMessage('');
      onSolve();
    } else {
      sound.gearClick();
      setErrorMessage('Los engranajes no encajan. Ajusta las 4 palancas a las alturas indicadas en el cuaderno o introduce la palabra clave del observatorio.');
    }
  };

  const handleQuickAlign = () => {
    sound.gearClick();
    CONSOLE_SYMBOLS.forEach((sym, idx) => {
      onLeverChange(idx, sym.targetPos);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* 1. Header & Identity */}
      <div className="text-center space-y-2 border-b border-[#c89b3c]/30 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#101c24] border border-[#c89b3c]/40 text-[#dfb15b] text-xs font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-[#dfb15b]" />
          <span>EXPEDICIÓN BAHÍA ROCA · LIBRO 2</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#faedd0]">
          CLAVE VEGA · ARCHIVO DE INVESTIGACIÓN
        </h1>
        <p className="font-editorial italic text-base sm:text-lg text-[#bed0de]">
          El Enigma del Reloj de Arena
        </p>
      </div>

      {/* 2. Main Symbol Card: Reloj de Arena & Engranajes */}
      <div className="relative rounded-lg parchment-dark border border-[#c89b3c]/40 p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Animated antique gear in background */}
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-2 border-dashed border-[#c89b3c]/15 pointer-events-none animate-spin-reverse-slow" />

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Main Symbol: Reloj de Arena y Engranajes */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg bg-[#0e1920] border-2 border-[#dfb15b]/80 p-2 shadow-2xl relative group overflow-hidden">
              <img
                src="/assets/panels/console_mechanism.jpg"
                alt="Mecanismo de consola antigua con engranajes y palancas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 right-2 text-center">
                <span className="text-[10px] font-mono tracking-wider text-[#dfb15b] uppercase font-bold drop-shadow">
                  SÍMBOLO PRINCIPAL
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-[#dfb15b] font-cinzel">Reloj & Engranajes</span>
          </div>

          {/* Title & Introduction */}
          <div className="space-y-3.5 text-center md:text-left flex-1">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-[#dfb15b] bg-[#162a36] px-2.5 py-0.5 rounded border border-[#c89b3c]/30">
              ACERTIJO DIGITAL Nº 02
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#faedd0]">
              Cinco minutos congelados
            </h2>
            <p className="text-sm sm:text-base text-[#d8e2ea] leading-relaxed">
              ¡El tiempo se ha detenido en Bahía Roca! Descubre qué mecanismo controla los relojes.
            </p>
            <div className="p-3.5 rounded bg-[#101c24]/90 border border-[#c89b3c]/30 text-xs sm:text-sm text-[#bed0de] italic font-editorial">
              «Elena y Bruno observaron con asombro la plaza del pueblo: las campanas callaron y la fuente se congeló en el aire. La consola secreta del observatorio custodia la llave para devolver el tiempo a la bahía.»
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Acertijo: Console with 4 Levers & Symbols */}
      <div className="rounded-lg bg-[#14232c] border border-[#c89b3c]/40 p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#c89b3c]/20 pb-4">
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#faedd0] flex items-center gap-2">
              <Cog className="w-5 h-5 text-[#dfb15b] animate-spin-slow" />
              Consola del Observatorio de Bahía Roca
            </h3>
            <p className="text-xs text-[#9fb3c2]">
              Alinea las 4 palancas en sus muescas de bronce para destrabar el mecanismo de relojería.
            </p>
          </div>
          <button
            onClick={handleQuickAlign}
            disabled={isSolved}
            className="text-xs text-[#dfb15b] hover:text-[#faedd0] underline flex items-center gap-1 cursor-pointer self-end sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Alinear según pistas del diario
          </button>
        </div>

        {/* 4 Interactive Levers Rack */}
        <div className="p-6 rounded-lg bg-[#0e1920] border-2 border-[#8c6a25] shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {CONSOLE_SYMBOLS.map((sym, idx) => {
              const currentPos = levers[idx];
              const isCorrect = currentPos === sym.targetPos;

              return (
                <div
                  key={sym.id}
                  className={`p-4 rounded-lg border transition-all flex flex-col items-center gap-3 ${
                    isCorrect
                      ? 'border-[#2d4f3b] bg-[#162720]/70 shadow-lg shadow-[#243d34]/40'
                      : 'border-[#c89b3c]/30 bg-[#162530]/60'
                  }`}
                >
                  {/* Symbol header */}
                  <div className="text-center space-y-1">
                    <span className="text-2xl filter drop-shadow">{sym.icon}</span>
                    <h4 className="font-cinzel text-xs font-bold text-[#faedd0] line-clamp-1">
                      {sym.label}
                    </h4>
                    <span className="text-[10px] font-mono text-[#9fb3c2] block">
                      Muesca: {currentPos + 1} de 4
                    </span>
                  </div>

                  {/* Lever track (4 stepped positions: 3, 2, 1, 0 from top to bottom) */}
                  <div className="w-12 h-36 bg-[#0a1217] rounded-full border border-[#c89b3c]/40 p-1 flex flex-col justify-between items-center relative shadow-inner">
                    {[3, 2, 1, 0].map((pos) => {
                      const isSelected = currentPos === pos;
                      const isTarget = sym.targetPos === pos;

                      return (
                        <button
                          key={pos}
                          onClick={() => handleLeverClick(idx, pos)}
                          disabled={isSolved}
                          aria-label={`Muesca ${pos + 1}`}
                          className={`w-9 h-6 rounded flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#c89b3c] to-[#dfb15b] border-2 border-white shadow-lg scale-105 z-10'
                              : 'bg-[#1b2f3d] hover:bg-[#28465c] border border-black/40'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#0e1920]' : 'bg-[#dfb15b]/40'}`} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Status indicator */}
                  <div className="text-center">
                    {isCorrect ? (
                      <span className="text-[10px] font-mono text-[#6ee7b7] font-bold">
                        EN POSICIÓN ✓
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#9fb3c2]">
                        Ajustar muesca
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mechanical feedback strip */}
          <div className="mt-5 pt-4 border-t border-[#c89b3c]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#bed0de]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] animate-pulse" />
              <span>
                Engranajes sincronizados:{' '}
                <strong className="text-[#faedd0]">
                  {CONSOLE_SYMBOLS.filter((s, i) => levers[i] === s.targetPos).length}
                </strong>{' '}
                de 4
              </span>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#dfb15b] hover:text-[#faedd0] underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showHint ? 'Ocultar pista del relojero' : 'Ver pista del diario de Bruno'}
            </button>
          </div>

          {showHint && (
            <div className="mt-3 p-3.5 rounded bg-[#1f3027] border border-[#2d4f3b] text-xs text-[#d1fae5] leading-relaxed">
              💡 <strong>Apunte de Bruno:</strong> «El reloj de arena va en lo más alto (4). El sol ilumina desde el mediodía (3). La luna en cuarto creciente baja un escalón (2). Y la pluma reposa tranquila en la base (1).»
            </div>
          )}
        </div>
      </div>

      {/* 4. Form: Input & Button "ACTIVAR MECANISMO" */}
      <div className="rounded-lg parchment-texture p-6 sm:p-8 text-[#2a2214] border-2 border-[#c89b3c] shadow-2xl">
        <form onSubmit={handleActivateMechanism} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="clue-answer-2"
              className="font-cinzel text-sm sm:text-base font-bold text-[#3d2f1c] block"
            >
              Comprobación del Mecanismo y Clave de Activación
            </label>
            <p className="text-xs text-[#6e5d44]">
              Alinea las 4 palancas arriba o escribe la clave secreta descubierta en el observatorio (ej: FARO o RELOJ):
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              id="clue-answer-2"
              type="text"
              value={textAnswer}
              onChange={(e) => {
                setTextAnswer(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Escribe la clave o usa las palancas de la consola"
              disabled={isSolved}
              className="flex-1 px-4 py-3 rounded border-2 border-[#b59458] bg-white text-[#2a2214] font-cinzel text-base tracking-widest placeholder:text-[#9c8970] placeholder:font-sans focus:outline-none focus:border-[#8c6a25] focus:ring-2 focus:ring-[#c89b3c]/30 disabled:bg-[#ebe1cf]"
            />

            <button
              type="submit"
              disabled={isSolved}
              className={`px-6 py-3 rounded font-cinzel font-bold text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
                isSolved
                  ? 'bg-[#264436] text-[#6ee7b7] cursor-default'
                  : 'bg-[#8c6a25] hover:bg-[#6e521b] text-[#fff8ea] active:scale-95 shadow-[#8c6a25]/30'
              }`}
            >
              <Clock className="w-4 h-4" />
              {isSolved ? 'MECANISMO ACTIVADO ✓' : 'ACTIVAR MECANISMO'}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs font-semibold text-[#b91c1c] animate-shake">
              ⚠️ {errorMessage}
            </p>
          )}
        </form>
      </div>

      {/* 5. Unlocked Clue Section: Revealing Bronze Key & Reference to Lighthouse */}
      {isSolved && (
        <div className="rounded-lg parchment-dark border-2 border-[#dfb15b] p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 border-b border-[#dfb15b]/40 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#243d34] border border-[#6ee7b7] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#6ee7b7]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfb15b] block">
                ¡MECANISMO DESBLOQUEADO CON ÉXITO!
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#faedd0]">
                Pista Desbloqueada: La Llave de Bronce del Observatorio
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Bronze Key Visual from Book 2 */}
            <div className="relative rounded-lg overflow-hidden border border-[#c89b3c]/50 bg-[#0e1920] shadow-xl aspect-[3/4] max-w-xs mx-auto md:mx-0 flex flex-col items-center justify-center p-4">
              <img
                src="/assets/panels/symbol_bronze_key.jpg"
                alt="Llave de bronce brillante en el estuche secreto"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded filter contrast-125 brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[11px] font-cinzel font-bold text-[#dfb15b]">
                  Llave de Bronce Ancestral
                </span>
              </div>
            </div>

            {/* Letter from El Zíngaro */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 rounded-lg parchment-texture text-[#2b2112] border border-[#b59458] shadow-inner space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8c6a25] border-b border-[#b59458]/40 pb-2">
                  <span>CARTA SELLADA EN EL OBSERVATORIO</span>
                  <span>DESTINO: FARO DE BAHÍA ROCA</span>
                </div>
                <blockquote className="font-editorial text-lg sm:text-xl leading-relaxed italic text-[#382b17]">
                  «Has liberado los minutos detenidos en el dial. Pero esta llave no abre una cerradura ordinaria: aguarda en las catacumbas bajo la luz del viejo faro de Bahía Roca. Allí, los cuatro elementos protegen la verdad final.»
                </blockquote>
                <p className="text-xs text-[#6e593c] text-right font-handwriting text-base">
                  — El Zíngaro
                </p>
              </div>

              {/* Final Message */}
              <div className="p-4 rounded bg-[#162720] border border-[#2d4f3b] text-sm text-[#e2f7ed]">
                <p>
                  <strong className="text-[#6ee7b7]">El reloj vuelve a funcionar…</strong> pero la llave guarda otro secreto.
                </p>
              </div>

              {/* Next Page CTA Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sound.tick();
                    onNavigateToNext();
                  }}
                  className="px-6 py-3 rounded bg-gradient-to-r from-[#c89b3c] to-[#dfb15b] hover:from-[#dfb15b] hover:to-[#eec978] text-[#0e1920] font-cinzel font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#c89b3c]/20 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Avanzar al Manuscrito de los Cuatro Elementos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
