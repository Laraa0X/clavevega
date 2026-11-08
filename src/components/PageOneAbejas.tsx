import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ArrowRight, Eye, RefreshCw, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface PageOneProps {
  isSolved: boolean;
  discoveredBees: number[];
  onSolve: () => void;
  onDiscoverBee: (id: number) => void;
  onNavigateToNext: () => void;
}

// 5 hidden chalk bees in the cathedral scene
const CATHEDRAL_BEES = [
  { id: 1, x: 26, y: 38, letter: 'T', clue: 'En el arco ojival izquierdo' },
  { id: 2, x: 49, y: 22, letter: 'I', clue: 'Bajo el gran rosetón central' },
  { id: 3, x: 74, y: 36, letter: 'E', clue: 'Junto a la gárgola de piedra' },
  { id: 4, x: 38, y: 64, letter: 'M', clue: 'En el friso del pórtico' },
  { id: 5, x: 62, y: 72, letter: 'P', clue: 'En la columna derecha desgastada' },
  { id: 6, x: 82, y: 80, letter: 'O', clue: 'Cerca del zócalo antiguo' },
];

export const PageOneAbejas: React.FC<PageOneProps> = ({
  isSolved,
  discoveredBees,
  onSolve,
  onDiscoverBee,
  onNavigateToNext,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [activeBeeClue, setActiveBeeClue] = useState<string | null>(null);

  const handleBeeClick = (id: number) => {
    sound.tick();
    if (!discoveredBees.includes(id)) {
      onDiscoverBee(id);
    }
    const found = CATHEDRAL_BEES.find((b) => b.id === id);
    if (found) {
      setActiveBeeClue(`¡Abeja revelada! Letra encontrada: "${found.letter}" (${found.clue})`);
    }
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = answerInput.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Accept "TIEMPO" or "EL TIEMPO"
    if (clean === 'TIEMPO' || clean === 'EL TIEMPO' || clean === 'ELTIEMPO') {
      sound.clueUnlocked();
      setErrorMessage('');
      onSolve();
    } else {
      sound.gearClick();
      setErrorMessage('Esa no es la palabra correcta. Revisa las letras que revelan las abejas de tiza en los muros.');
    }
  };

  const handleAutoFillRevealed = () => {
    sound.tick();
    // Fill letters found so far
    const sorted = [...discoveredBees].sort();
    const word = CATHEDRAL_BEES.map(b => discoveredBees.includes(b.id) ? b.letter : '_').join('');
    setAnswerInput(word.replace(/_/g, ''));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* 1. Header & Identity */}
      <div className="text-center space-y-2 border-b border-[#c89b3c]/30 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#101c24] border border-[#c89b3c]/40 text-[#dfb15b] text-xs font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-[#dfb15b]" />
          <span>EXPEDICIÓN BAHÍA ROCA · LIBRO 1</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#faedd0]">
          CLAVE VEGA · ARCHIVO DE INVESTIGACIÓN
        </h1>
        <p className="font-editorial italic text-base sm:text-lg text-[#bed0de]">
          El Secreto de las Abejas de Piedra
        </p>
      </div>

      {/* 2. Main Symbol Card: Chalk Bee */}
      <div className="relative rounded-lg parchment-dark border border-[#c89b3c]/40 p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Subtle background gear or watermark */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#c89b3c]/10 pointer-events-none animate-spin-slow" />

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Main Symbol: Glowing Chalk Bee */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg bg-[#0e1920] border-2 border-[#dfb15b]/80 p-2 shadow-2xl relative group overflow-hidden">
              <img
                src="/assets/panels/symbol_bee_chalk.jpg"
                alt="Abeja dibujada con tiza en piedra"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded filter contrast-125 brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 right-2 text-center">
                <span className="text-[10px] font-mono tracking-wider text-[#dfb15b] uppercase font-bold drop-shadow">
                  SÍMBOLO PRINCIPAL
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-[#dfb15b] font-cinzel">Abeja de Tiza Original</span>
          </div>

          {/* Title & Introduction */}
          <div className="space-y-3.5 text-center md:text-left flex-1">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-[#dfb15b] bg-[#162a36] px-2.5 py-0.5 rounded border border-[#c89b3c]/30">
              ACERTIJO DIGITAL Nº 01
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#faedd0]">
              La primera pista
            </h2>
            <p className="text-sm sm:text-base text-[#d8e2ea] leading-relaxed">
              ¡Has encontrado una señal oculta en la catedral! Ayuda a <strong className="text-[#dfb15b]">Elena y Bruno</strong> a descubrir qué significa.
            </p>
            <div className="p-3.5 rounded bg-[#101c24]/90 border border-[#c89b3c]/30 text-xs sm:text-sm text-[#bed0de] italic font-editorial">
              «Elena examinó la piedra fría: &ldquo;No es un dibujo cualquiera. Alguien quiere que lo encontremos... Las abejas forman una ruta que oculta una palabra clave.&rdquo;»
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visual Riddle: Interactive Cathedral Exploration */}
      <div className="rounded-lg bg-[#14232c] border border-[#c89b3c]/40 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#c89b3c]/20 pb-4">
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#faedd0] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#dfb15b]" />
              Inspección de la Catedral Gótica
            </h3>
            <p className="text-xs text-[#9fb3c2]">
              Toca o haz clic sobre las abejas de tiza ocultas en los muros de piedra para revelar las letras secretas.
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono text-[#dfb15b] bg-[#0e1920] px-3 py-1 rounded border border-[#c89b3c]/30">
              Abejas descubiertas: <strong className="text-[#faedd0]">{discoveredBees.length}</strong> / {CATHEDRAL_BEES.length}
            </span>
          </div>
        </div>

        {/* Interactive Cathedral Canvas */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border-2 border-[#c89b3c]/40 bg-[#0c161d] group select-none shadow-inner">
          {/* Authentic Cathedral Artwork */}
          <img
            src="/assets/panels/cathedral_arches.jpg"
            alt="Arcos góticos de la catedral de Bahía Roca"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />

          {/* Vignette & stone atmosphere overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#0e1920]/30 to-[#0a1217]/85 pointer-events-none" />

          {/* Interactive Chalk Bees on the wall */}
          {CATHEDRAL_BEES.map((bee) => {
            const isFound = discoveredBees.includes(bee.id);
            return (
              <button
                key={bee.id}
                onClick={() => handleBeeClick(bee.id)}
                style={{ left: `${bee.x}%`, top: `${bee.y}%` }}
                aria-label={`Abeja oculta ${bee.id}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all cursor-pointer ${
                  isFound
                    ? 'bg-[#dfb15b]/30 ring-2 ring-[#dfb15b] scale-110 shadow-lg shadow-[#dfb15b]/40'
                    : 'bg-black/40 hover:bg-[#dfb15b]/20 hover:scale-125 border border-white/40 animate-pulse'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {/* Chalk bee drawing SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-all ${
                      isFound
                        ? 'text-[#faedd0] filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.6 8 8.6 8.7 9.3C6.5 10.4 5 12.7 5 15.5C5 19 8.1 22 12 22C15.9 22 19 19 19 15.5C19 12.7 17.5 10.4 15.3 9.3C16 8.6 16.5 7.6 16.5 6.5C16.5 4 14.5 2 12 2ZM12 4C13.4 4 14.5 5.1 14.5 6.5C14.5 7.9 13.4 9 12 9C10.6 9 9.5 7.9 9.5 6.5C9.5 5.1 10.6 4 12 4ZM12 11C14.8 11 17 13 17 15.5C17 17.5 15.4 19.2 13.3 19.8L12 16L10.7 19.8C8.6 19.2 7 17.5 7 15.5C7 13 9.2 11 12 11Z" />
                  </svg>

                  {/* Letter badge if discovered */}
                  {isFound && (
                    <span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-[#c89b3c] text-[#0e1920] font-mono text-[11px] font-black flex items-center justify-center shadow">
                      {bee.letter}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Active tooltip on canvas */}
          {activeBeeClue && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto max-w-md bg-[#0e1920]/95 border border-[#dfb15b] p-2.5 rounded shadow-xl text-xs text-[#faedd0] flex items-center justify-between gap-2">
              <span>{activeBeeClue}</span>
              <button
                onClick={() => setActiveBeeClue(null)}
                className="text-[#9fb3c2] hover:text-white text-xs px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Revealed Letters Strip */}
        <div className="p-4 rounded-lg bg-[#0e1920] border border-[#c89b3c]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-[#9fb3c2] font-mono block">
              LETRAS DESCIFRADAS EN LA PIEDRA:
            </span>
            <div className="flex items-center gap-2">
              {CATHEDRAL_BEES.map((b) => {
                const found = discoveredBees.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`w-9 h-10 rounded border flex items-center justify-center font-cinzel text-lg font-bold transition-all ${
                      found
                        ? 'border-[#dfb15b] bg-[#243d34] text-[#faedd0] shadow-md'
                        : 'border-[#c89b3c]/30 bg-[#162732] text-[#5b7282]'
                    }`}
                  >
                    {found ? b.letter : '?'}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#dfb15b] hover:text-[#faedd0] underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
            </button>
            {discoveredBees.length > 0 && (
              <button
                onClick={handleAutoFillRevealed}
                className="px-2.5 py-1 text-xs rounded bg-[#1e3442] text-[#bed0de] hover:text-white hover:bg-[#264456] transition-colors cursor-pointer"
              >
                Copiar letras al campo
              </button>
            )}
          </div>
        </div>

        {/* Clue Hint callout */}
        {showHint && (
          <div className="p-3.5 rounded bg-[#1f3027] border border-[#2d4f3b] text-xs text-[#d1fae5] leading-relaxed">
            💡 <strong>Pista de Elena:</strong> Las 6 abejas forman la palabra de 6 letras que los relojes del pueblo están a punto de perder. Empieza con <strong>T</strong> y termina con <strong>O</strong>.
          </div>
        )}
      </div>

      {/* 4. Form: Answer Input & Button */}
      <div className="rounded-lg parchment-texture p-6 sm:p-8 text-[#2a2214] border-2 border-[#c89b3c] shadow-2xl">
        <form onSubmit={handleCheckAnswer} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="clue-answer-1"
              className="font-cinzel text-sm sm:text-base font-bold text-[#3d2f1c] block"
            >
              ¿Cuál es la palabra que guardan las abejas de piedra?
            </label>
            <p className="text-xs text-[#6e5d44]">
              Escribe la palabra secreta descubierta en los arcos de la catedral:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              id="clue-answer-1"
              type="text"
              value={answerInput}
              onChange={(e) => {
                setAnswerInput(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Escribe aquí tu respuesta (ej: TIEMPO)"
              disabled={isSolved}
              className="flex-1 px-4 py-3 rounded border-2 border-[#b59458] bg-white text-[#2a2214] font-cinzel text-base tracking-widest placeholder:text-[#9c8970] placeholder:font-sans focus:outline-none focus:border-[#8c6a25] focus:ring-2 focus:ring-[#c89b3c]/30 disabled:bg-[#ebe1cf]"
            />

            <button
              type="submit"
              disabled={isSolved}
              className={`px-6 py-3 rounded font-cinzel font-bold text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap ${
                isSolved
                  ? 'bg-[#264436] text-[#6ee7b7] cursor-default'
                  : 'bg-[#8c6a25] hover:bg-[#6e521b] text-[#fff8ea] active:scale-95 shadow-[#8c6a25]/30'
              }`}
            >
              {isSolved ? 'PISTA COMPROBADA ✓' : 'COMPROBAR PISTA'}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs font-semibold text-[#b91c1c] animate-shake">
              ⚠️ {errorMessage}
            </p>
          )}
        </form>
      </div>

      {/* 5. Unlocked Clue Section: Connects to the Hourglass */}
      {isSolved && (
        <div className="rounded-lg parchment-dark border-2 border-[#dfb15b] p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 border-b border-[#dfb15b]/40 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#243d34] border border-[#6ee7b7] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#6ee7b7]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfb15b] block">
                ¡ACERTIJO RESUELTO CON ÉXITO!
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#faedd0]">
                Pista Desbloqueada: El Diario del Fundador
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Grandfather Clock Preview from Book 1 */}
            <div className="relative rounded-lg overflow-hidden border border-[#c89b3c]/50 bg-[#0e1920] shadow-xl aspect-[3/4] max-w-xs mx-auto md:mx-0">
              <img
                src="/assets/panels/symbol_clock.jpg"
                alt="Antiguo reloj de péndulo en la pared de piedra"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[11px] font-cinzel font-bold text-[#dfb15b]">
                  El Reloj se ha Detenido
                </span>
              </div>
            </div>

            {/* Parchment Text from Founder */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 rounded-lg parchment-texture text-[#2b2112] border border-[#b59458] shadow-inner space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8c6a25] border-b border-[#b59458]/40 pb-2">
                  <span>PÁGINA 6 · DIARIO DE BAHÍA ROCA</span>
                  <span>SELLO DE EL ZÍNGARO</span>
                </div>
                <blockquote className="font-editorial text-lg sm:text-xl leading-relaxed italic text-[#382b17]">
                  «Cuando la última abeja despierte, el tiempo dejará de avanzar... Busca el antiguo observatorio en los acantilados donde un reloj de arena custodia los minutos perdidos.»
                </blockquote>
                <p className="text-xs text-[#6e593c] text-right font-handwriting text-base">
                  — Inscripción del fundador encontrada por Elena y Bruno
                </p>
              </div>

              {/* Final Success Message */}
              <div className="p-4 rounded bg-[#162720] border border-[#2d4f3b] text-sm text-[#e2f7ed] flex items-center justify-between gap-3">
                <p>
                  <strong className="text-[#6ee7b7]">¡Buen trabajo, investigador!</strong> Guarda esta pista para continuar la expedición.
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
                  <span>Continuar a la Página 2: El Enigma del Reloj</span>
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
