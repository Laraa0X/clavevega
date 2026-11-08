import React, { useState } from 'react';
import { Award, CheckCircle2, Shield, Sparkles, BookOpen, Key, Compass, Printer } from 'lucide-react';
import { sound } from '../utils/audio';

interface PageThreeProps {
  isSolved: boolean;
  page1Solved: boolean;
  page2Solved: boolean;
  guardianName: string;
  onSetGuardianName: (name: string) => void;
  onSolve: () => void;
  onOpenCertificate: () => void;
}

// Four Elements from the wall in Book 3
const FOUR_ELEMENTS = [
  { id: 'earth', name: 'Tierra', symbol: '⛰️', desc: 'Montañas y roca firme' },
  { id: 'water', name: 'Agua', symbol: '🌊', desc: 'Olas de Bahía Roca' },
  { id: 'fire', name: 'Fuego', symbol: '🔥', desc: 'Llama del faro antiguo' },
  { id: 'air', name: 'Aire', symbol: '🌀', desc: 'Vientos del acantilado' },
];

export const PageThreeManuscrito: React.FC<PageThreeProps> = ({
  isSolved,
  page1Solved,
  page2Solved,
  guardianName,
  onSetGuardianName,
  onSolve,
  onOpenCertificate,
}) => {
  const [selectedElements, setSelectedElements] = useState<string[]>(['earth', 'water', 'fire', 'air']);
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggleElement = (id: string) => {
    if (isSolved) return;
    sound.tick();
    if (selectedElements.includes(id)) {
      setSelectedElements(selectedElements.filter((e) => e !== id));
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleRevealSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = secretCodeInput.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Accept "AISLIN", "ZINGARO", "EL ZINGARO", "GUARDIAN", "BAHIA ROCA", "RELOJERO"
    const validCodes = ['AISLIN', 'ZINGARO', 'EL ZINGARO', 'GUARDIAN', 'BAHIA ROCA', 'RELOJERO', 'KRAKEN'];
    const elementsComplete = selectedElements.length === 4;

    if (elementsComplete || validCodes.includes(clean)) {
      sound.guardianVictory();
      setErrorMessage('');
      onSolve();
    } else {
      sound.gearClick();
      setErrorMessage('Los cuatro elementos deben estar alineados o introduce el nombre secreto del creador de la expedición.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* 1. Header & Identity */}
      <div className="text-center space-y-2 border-b border-[#c89b3c]/30 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#101c24] border border-[#c89b3c]/40 text-[#dfb15b] text-xs font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-[#dfb15b]" />
          <span>EXPEDICIÓN BAHÍA ROCA · LIBRO 3 · GRAN DESENLACE</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#faedd0]">
          CLAVE VEGA · ARCHIVO DE INVESTIGACIÓN
        </h1>
        <p className="font-editorial italic text-base sm:text-lg text-[#bed0de]">
          El Manuscrito de los Cuatro Elementos
        </p>
      </div>

      {/* 2. Main Symbol Card: Manuscrito y los Cuatro Elementos */}
      <div className="relative rounded-lg parchment-dark border border-[#c89b3c]/40 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Main Symbol */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg bg-[#0e1920] border-2 border-[#dfb15b]/80 p-2 shadow-2xl relative group overflow-hidden">
              <img
                src="/assets/panels/elements_gears.jpg"
                alt="Los cuatro elementos grabados en engranajes de piedra"
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
            <span className="mt-2 text-xs text-[#dfb15b] font-cinzel">Los Cuatro Elementos</span>
          </div>

          {/* Title & Introduction */}
          <div className="space-y-3.5 text-center md:text-left flex-1">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-[#dfb15b] bg-[#162a36] px-2.5 py-0.5 rounded border border-[#c89b3c]/30">
              ARCHIVO FINAL · REVELACIÓN
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#faedd0]">
              El secreto de los guardianes
            </h2>
            <p className="text-sm sm:text-base text-[#d8e2ea] leading-relaxed">
              Has llegado al último archivo. Reúne las pistas que encontraste y descubre quién creó esta expedición.
            </p>
            <div className="p-3.5 rounded bg-[#101c24]/90 border border-[#c89b3c]/30 text-xs sm:text-sm text-[#bed0de] italic font-editorial">
              «Elena sostenía la llave de bronce mientras Bruno alumbraba el muro subterráneo bajo el faro: &ldquo;Los cuatro elementos deben unirse para abrir el cofre del fundador. Pero alguien viene por el túnel...&rdquo;»
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section to Gather Previous Clues from Books 1 & 2 */}
      <div className="rounded-lg bg-[#14232c] border border-[#c89b3c]/40 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="border-b border-[#c89b3c]/20 pb-3">
          <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#faedd0] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#dfb15b]" />
            Cámara de Enlace: Reunión de Pistas Anteriores
          </h3>
          <p className="text-xs text-[#9fb3c2]">
            El manuscrito requiere las llaves y saberes recogidos en los dos libros anteriores de la trilogía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Slot 1: Book 1 Clue */}
          <div
            className={`p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
              page1Solved
                ? 'border-[#2d4f3b] bg-[#162720]/80'
                : 'border-[#c89b3c]/30 bg-[#162530]/50'
            }`}
          >
            <div className="w-12 h-12 rounded bg-[#0e1920] border border-[#c89b3c]/40 overflow-hidden shrink-0">
              <img
                src="/assets/panels/symbol_bee_chalk.jpg"
                alt="Abeja de piedra"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#dfb15b] uppercase">PISTA 01 · LIBRO 1</span>
                {page1Solved && (
                  <span className="text-[10px] text-[#6ee7b7] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Conectada
                  </span>
                )}
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#faedd0]">
                Abejas de Piedra & El Tiempo
              </h4>
              <p className="text-xs text-[#bed0de]">
                «Cuando la última abeja despierte, el tiempo dejará de avanzar.» Señala al observatorio.
              </p>
            </div>
          </div>

          {/* Slot 2: Book 2 Clue */}
          <div
            className={`p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
              page2Solved
                ? 'border-[#2d4f3b] bg-[#162720]/80'
                : 'border-[#c89b3c]/30 bg-[#162530]/50'
            }`}
          >
            <div className="w-12 h-12 rounded bg-[#0e1920] border border-[#c89b3c]/40 overflow-hidden shrink-0">
              <img
                src="/assets/panels/symbol_bronze_key.jpg"
                alt="Llave de bronce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#dfb15b] uppercase">PISTA 02 · LIBRO 2</span>
                {page2Solved && (
                  <span className="text-[10px] text-[#6ee7b7] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Conectada
                  </span>
                )}
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#faedd0]">
                La Llave de Bronce del Observatorio
              </h4>
              <p className="text-xs text-[#bed0de]">
                La llave custodiada en el reloj revela el pasadizo subterráneo bajo el faro de la costa.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Elements interactive disk activation */}
        <div className="mt-4 pt-4 border-t border-[#c89b3c]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-cinzel text-xs font-bold text-[#dfb15b] uppercase tracking-wider">
              Alineación de los Cuatro Engranajes Elementales:
            </span>
            <span className="text-xs font-mono text-[#9fb3c2]">
              {selectedElements.length} de 4 activos
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FOUR_ELEMENTS.map((el) => {
              const active = selectedElements.includes(el.id);
              return (
                <button
                  key={el.id}
                  onClick={() => handleToggleElement(el.id)}
                  disabled={isSolved}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    active
                      ? 'border-[#dfb15b] bg-[#243d34] text-[#faedd0] shadow-md scale-[1.02]'
                      : 'border-[#c89b3c]/30 bg-[#101c24] text-[#718797] hover:border-[#c89b3c]/60'
                  }`}
                >
                  <span className="text-2xl block mb-1">{el.symbol}</span>
                  <span className="font-cinzel text-xs font-bold block">{el.name}</span>
                  <span className="text-[10px] opacity-80 block">{el.desc}</span>
                  <span className={`text-[9px] font-mono mt-1 inline-block px-1.5 py-0.2 rounded ${
                    active ? 'bg-[#6ee7b7]/20 text-[#6ee7b7]' : 'bg-black/30 text-slate-400'
                  }`}>
                    {active ? 'ACTIVADO' : 'INACTIVO'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Form: Answer Input & Button "REVELAR EL SECRETO" */}
      <div className="rounded-lg parchment-texture p-6 sm:p-8 text-[#2a2214] border-2 border-[#c89b3c] shadow-2xl">
        <form onSubmit={handleRevealSecret} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="clue-answer-3"
              className="font-cinzel text-sm sm:text-base font-bold text-[#3d2f1c] block"
            >
              ¿Quién es el misterioso creador de la expedición y las pistas?
            </label>
            <p className="text-xs text-[#6e5d44]">
              Introduce el nombre del relojero o el seudónimo con el que firmaba las cartas secretas:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              id="clue-answer-3"
              type="text"
              value={secretCodeInput}
              onChange={(e) => {
                setSecretCodeInput(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Escribe aquí (ej: AISLIN o EL ZÍNGARO)"
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
              <Sparkles className="w-4 h-4 text-[#dfb15b]" />
              {isSolved ? 'SECRETO REVELADO ✓' : 'REVELAR EL SECRETO'}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs font-semibold text-[#b91c1c] animate-shake">
              ⚠️ {errorMessage}
            </p>
          )}
        </form>
      </div>

      {/* 5. Visual Revelation: Aislin es El Zíngaro */}
      {isSolved && (
        <div className="space-y-8 animate-fade-in">
          {/* The Big Revelation Box */}
          <div className="rounded-lg parchment-dark border-2 border-[#dfb15b] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#dfb15b]/40 pb-4">
              <div className="w-10 h-10 rounded-full bg-[#243d34] border border-[#6ee7b7] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#6ee7b7]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfb15b] block">
                  REVELACIÓN HISTÓRICA DE BAHÍA ROCA
                </span>
                <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-[#faedd0]">
                  ¡Aislin es El Zíngaro, el creador de la expedición!
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Aislin Revelation Artwork from Book 3 */}
              <div className="relative rounded-lg overflow-hidden border-2 border-[#c89b3c]/60 bg-[#0e1920] shadow-2xl aspect-[4/3] group">
                <img
                  src="/assets/panels/aislin_reveal.jpg"
                  alt="Aislin el relojero revelando que él es El Zíngaro"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-center">
                  <span className="text-xs font-cinzel font-bold text-[#dfb15b] drop-shadow">
                    Aislin el Relojero se quita el sombrero
                  </span>
                </div>
              </div>

              {/* Dialogue & Manuscript Lore */}
              <div className="space-y-4">
                <div className="p-5 rounded-lg parchment-texture text-[#2b2112] border border-[#b59458] shadow-inner space-y-3">
                  <div className="text-xs font-mono text-[#8c6a25] border-b border-[#b59458]/40 pb-2">
                    DECLARACIÓN FINAL · CRIPTA DEL FARO
                  </div>
                  <blockquote className="font-editorial text-lg sm:text-xl leading-relaxed italic text-[#382b17]">
                    «Soy Aislin, el relojero. El Zíngaro era mi nombre secreto. Creé las pistas para encontrar a quienes protegieran la historia del pueblo. ¡Por eso todo estaba conectado!»
                  </blockquote>
                  <p className="text-xs text-[#6e593c] text-right font-handwriting text-base">
                    — Aislin, Custodio de Bahía Roca
                  </p>
                </div>

                <div className="p-4 rounded bg-[#162720] border border-[#2d4f3b] text-sm text-[#e2f7ed] space-y-1">
                  <p className="font-bold text-[#6ee7b7]">
                    Elena y Bruno aceptaron la misión:
                  </p>
                  <p className="text-xs text-[#bed0de]">
                    «¡La historia de Bahía Roca no se perderá! Pero sin más relojes congelados.»
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Final Victory Screen: "¡Felicidades! Ahora eres guardián de Bahía Roca" */}
          <div className="rounded-lg bg-gradient-to-br from-[#10241c] via-[#162e24] to-[#0e1920] border-2 border-[#dfb15b] p-6 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#dfb15b]/20 border-2 border-[#dfb15b] flex items-center justify-center text-[#dfb15b] shadow-lg shadow-[#dfb15b]/30 animate-pulse">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-mono tracking-widest uppercase text-[#dfb15b] block">
                EXPEDICIÓN COMPLETADA CON ÉXITO
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#faedd0] tracking-wide">
                ¡Felicidades! Ahora eres guardián de Bahía Roca
              </h2>
              <p className="text-sm sm:text-base text-[#bed0de] font-editorial text-lg leading-relaxed">
                Has resuelto los enigmas de las abejas de piedra, el reloj de arena y los cuatro elementos. La memoria de Bahía Roca queda a salvo en tus manos.
              </p>
            </div>

            {/* 7. Explorer Recognition Diploma / Carnet */}
            <div className="max-w-xl mx-auto rounded-lg parchment-texture p-6 sm:p-8 text-[#2a2214] border-4 border-[#b59458] shadow-2xl space-y-5 text-left relative overflow-hidden">
              {/* Gold watermark */}
              <div className="absolute top-3 right-3 opacity-15 pointer-events-none">
                <Compass className="w-32 h-32 text-[#8c6a25]" />
              </div>

              <div className="flex items-center justify-between border-b-2 border-[#b59458]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#8c6a25]" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#6e521b]">
                    ORDEN DE LOS GUARDIANES DE BAHÍA ROCA
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#8c6a25]">#BR-1892</span>
              </div>

              <div className="text-center space-y-2 py-2">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#8c6a25] block">
                  ESTE DIPLOMA Y CARNET OFICIAL ACREDITA A:
                </span>

                {/* Editable reader name */}
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => onSetGuardianName(e.target.value)}
                    placeholder="Escribe aquí tu nombre de explorador"
                    className="w-full text-center font-cinzel text-xl sm:text-2xl font-bold text-[#2a2214] border-b-2 border-[#8c6a25] bg-transparent focus:outline-none focus:border-[#dfb15b] py-1"
                  />
                  <span className="text-[10px] text-[#6e593c] italic block mt-0.5">
                    (Haz clic para personalizar tu nombre en el carnet)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4a3b25] font-editorial italic pt-2">
                  Por haber demostrado valor, agudeza y respeto a la historia al descifrar los tres archivos secretos de la expedición.
                </p>
              </div>

              {/* Badges & Signatures */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#b59458]/40 text-center text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#8c6a25] uppercase block">FECHA</span>
                  <span className="font-editorial font-bold text-sm">2026 · Bahía Roca</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8c6a25] uppercase block">RANGO</span>
                  <span className="font-cinzel font-bold text-xs text-[#8c6a25]">Guardián Mayor</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8c6a25] uppercase block">FIRMA</span>
                  <span className="font-handwriting text-base font-bold text-[#382b17]">Aislin & Elena Vega</span>
                </div>
              </div>

              {/* Print / Save button */}
              <div className="pt-3 text-center">
                <button
                  onClick={() => {
                    sound.tick();
                    onOpenCertificate();
                  }}
                  className="px-5 py-2.5 rounded bg-[#8c6a25] hover:bg-[#6e521b] text-[#fff8ea] font-cinzel font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Descargar Carnet de Guardián</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
