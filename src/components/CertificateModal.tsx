import React from 'react';
import { X, Printer, Shield, Compass, Award, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  guardianName: string;
  onSetName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  guardianName,
  onSetName,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.tick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-xl bg-[#14232c] border-2 border-[#c89b3c] shadow-2xl text-[#ede6d6] print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Top Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#0e1920] border-b border-[#c89b3c]/40 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#dfb15b]" />
            <span className="font-cinzel text-sm font-bold text-[#faedd0]">
              RECONOCIMIENTO OFICIAL DE GUARDIÁN
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-[#c89b3c] hover:bg-[#dfb15b] text-[#0e1920] font-cinzel font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={() => {
                sound.tick();
                onClose();
              }}
              className="p-1 rounded text-[#9fb3c2] hover:text-[#faedd0] hover:bg-white/5 cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-6 sm:p-10">
          <div className="relative rounded-lg parchment-texture p-6 sm:p-10 text-[#2a2214] border-8 border-double border-[#8c6a25] shadow-2xl space-y-6 text-center overflow-hidden">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 text-[#8c6a25] text-xs font-serif font-black select-none">✦</div>
            <div className="absolute top-2 right-2 text-[#8c6a25] text-xs font-serif font-black select-none">✦</div>
            <div className="absolute bottom-2 left-2 text-[#8c6a25] text-xs font-serif font-black select-none">✦</div>
            <div className="absolute bottom-2 right-2 text-[#8c6a25] text-xs font-serif font-black select-none">✦</div>

            {/* Header Lockup */}
            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#8c6a25]/10 border-2 border-[#8c6a25] flex items-center justify-center text-[#8c6a25]">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8c6a25] font-bold block">
                EXPEDICIÓN BAHÍA ROCA · CLAVE VEGA
              </span>
              <h2 className="font-cinzel text-xl sm:text-3xl font-extrabold text-[#382b17] tracking-wider uppercase">
                Título de Guardián Honorario
              </h2>
              <div className="w-24 h-0.5 bg-[#8c6a25] mx-auto my-2" />
            </div>

            {/* Recipient Statement */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-editorial text-[#524128] italic">
                Por disposición de Aislin el Relojero y el Consejo de Custodios de la Bahía, se confiere este título a:
              </p>

              {/* Reader Name */}
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => onSetName(e.target.value)}
                  placeholder="Tu Nombre de Investigador"
                  className="w-full text-center font-cinzel text-2xl sm:text-3xl font-bold text-[#2a2214] border-b-2 border-[#8c6a25] bg-transparent focus:outline-none focus:border-[#dfb15b] py-1"
                />
              </div>

              <p className="text-xs sm:text-sm font-editorial text-[#4a3b25] max-w-lg mx-auto leading-relaxed">
                Por haber descifrado con éxito los tres códices sagrados: <em>El Secreto de las Abejas de Piedra</em>, <em>El Enigma del Reloj de Arena</em> y <em>El Manuscrito de los Cuatro Elementos</em>, garantizando que la memoria de Bahía Roca nunca se perderá.
              </p>
            </div>

            {/* 3 Badges */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#b59458]/60 text-center">
              <div className="space-y-1">
                <span className="text-xl block">🐝</span>
                <span className="text-[10px] font-mono font-bold uppercase text-[#8c6a25] block">
                  CÓDICE I
                </span>
                <span className="text-[11px] font-cinzel font-semibold text-[#382b17] block">
                  Abejas de Piedra
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xl block">⏳</span>
                <span className="text-[10px] font-mono font-bold uppercase text-[#8c6a25] block">
                  CÓDICE II
                </span>
                <span className="text-[11px] font-cinzel font-semibold text-[#382b17] block">
                  Reloj de Arena
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xl block">🗝️</span>
                <span className="text-[10px] font-mono font-bold uppercase text-[#8c6a25] block">
                  CÓDICE III
                </span>
                <span className="text-[11px] font-cinzel font-semibold text-[#382b17] block">
                  Cuatro Elementos
                </span>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="flex items-end justify-between pt-2 text-left">
              <div>
                <span className="text-[10px] font-mono text-[#8c6a25] uppercase block">FECHA DE EMISIÓN</span>
                <span className="font-editorial text-sm font-bold text-[#382b17]">Año 2026</span>
                <span className="text-[10px] text-[#6e593c] block">Bahía Roca</span>
              </div>

              {/* Gold Wax Seal SVG */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfb15b] to-[#8c6a25] border-2 border-white/60 shadow-lg flex items-center justify-center text-[#1c1407] font-bold text-xs select-none">
                <div className="text-center">
                  <span className="font-cinzel text-[9px] block">SELLO</span>
                  <Compass className="w-4 h-4 mx-auto" />
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#8c6a25] uppercase block">FIRMA DEL CUSTODIO</span>
                <span className="font-handwriting text-lg font-bold text-[#382b17] block">
                  Aislin el Relojero
                </span>
                <span className="text-[10px] text-[#6e593c] block">(El Zíngaro)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
