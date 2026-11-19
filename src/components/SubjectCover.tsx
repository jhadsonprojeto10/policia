import React, { useState } from 'react';
import { Subject } from '../types';
import { Play } from 'lucide-react';

interface SubjectCoverProps {
  subject: Subject;
  moduleCount?: number;
  lessonCount?: number;
  completedPercent?: number;
  onClick?: () => void;
  hoverable?: boolean;
  priority?: boolean;
  className?: string;
}

export const SubjectCover: React.FC<SubjectCoverProps> = ({
  subject,
  moduleCount,
  lessonCount,
  completedPercent = 0,
  onClick,
  hoverable = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Render bespoke vector art for each discipline reference
  const renderVisualArtwork = () => {
    switch (subject.visualKey) {
      case 'portugues':
        // 1. LÍNGUA PORTUGUESA: livros, textos, letras e materiais de escrita
        return (
          <g opacity="0.85">
            {/* Ambient subtle glow */}
            <radialGradient id="grad-pt" cx="70%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#14141d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0a0a0f" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-pt)" />

            {/* Typography Glyphs in background */}
            <text x="75%" y="42%" fill="#ffffff" fillOpacity="0.04" fontSize="130" fontFamily="serif" fontWeight="bold">Ç</text>
            <text x="52%" y="78%" fill="#ffffff" fillOpacity="0.03" fontSize="110" fontFamily="serif">§</text>
            <text x="82%" y="85%" fill="#ffffff" fillOpacity="0.04" fontSize="90" fontFamily="serif">A</text>
            <text x="35%" y="30%" fill="#E50914" fillOpacity="0.06" fontSize="70" fontFamily="serif">¶</text>

            {/* Open Book & Quill Pen Illustration */}
            <g transform="translate(420, 90) scale(1.1)">
              {/* Parchment Book Pages */}
              <path d="M 20 180 Q 80 160 140 175 L 140 235 Q 80 220 20 240 Z" fill="#1c1d28" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.6" />
              <path d="M 140 175 Q 200 160 260 180 L 260 240 Q 200 220 140 235 Z" fill="#171822" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.6" />
              {/* Text lines on pages */}
              <line x1="38" y1="190" x2="120" y2="183" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="38" y1="202" x2="115" y2="195" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="38" y1="214" x2="105" y2="207" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="160" y1="183" x2="242" y2="190" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="160" y1="195" x2="238" y2="202" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="160" y1="207" x2="230" y2="214" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 3" />

              {/* Feather Quill Pen with crimson ink tip */}
              <path d="M 190 70 C 185 100 160 140 135 180 L 138 185 C 165 145 198 105 205 70 C 215 90 200 130 142 188 L 130 195 L 136 182 C 158 135 180 85 190 70 Z" fill="#E50914" fillOpacity="0.75" />
              <circle cx="130" cy="197" r="4" fill="#E50914" />
            </g>
          </g>
        );

      case 'informatica':
        // 2. INFORMÁTICA: computadores, tecnologia, códigos e circuitos digitais
        return (
          <g opacity="0.85">
            <radialGradient id="grad-inf" cx="75%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#00D2D3" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0c121d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#070a10" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-inf)" />

            {/* Circuit Traces */}
            <g stroke="#00D2D3" strokeOpacity="0.3" strokeWidth="2" fill="none">
              <path d="M 380 40 L 460 40 L 500 80 L 600 80" />
              <path d="M 420 120 L 480 120 L 520 160 L 640 160" />
              <path d="M 360 220 L 440 220 L 480 180 L 580 180" />
              <path d="M 480 260 L 550 260 L 590 300 L 640 300" />
              <circle cx="460" cy="40" r="4" fill="#00D2D3" />
              <circle cx="500" cy="80" r="4" fill="#00D2D3" />
              <circle cx="520" cy="160" r="4" fill="#E50914" />
              <circle cx="480" cy="180" r="4" fill="#00D2D3" />
              <circle cx="580" cy="180" r="4" fill="#00D2D3" />
            </g>

            {/* Binary Stream */}
            <text x="68%" y="25%" fill="#00D2D3" fillOpacity="0.12" fontSize="20" fontFamily="monospace">01001100 01101111 01100111</text>
            <text x="65%" y="38%" fill="#00D2D3" fillOpacity="0.10" fontSize="20" fontFamily="monospace">01010011 01000101 01000011</text>
            <text x="70%" y="85%" fill="#00D2D3" fillOpacity="0.10" fontSize="20" fontFamily="monospace">POLICIA_FED_SECURITY.SYS</text>

            {/* Central Microprocessor / Cyber Shield Motif */}
            <g transform="translate(460, 100)">
              <rect x="30" y="30" width="100" height="100" rx="12" fill="#131e2e" stroke="#00D2D3" strokeWidth="2" strokeOpacity="0.7" />
              <rect x="45" y="45" width="70" height="70" rx="8" fill="#080e18" stroke="#E50914" strokeWidth="1.5" />
              {/* CPU Core Badge */}
              <text x="80" y="87" fill="#00D2D3" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CPU·SEC</text>
            </g>
          </g>
        );

      case 'raciocinio-logico':
        // 3. RACIOCÍNIO LÓGICO: números, fórmulas, símbolos matemáticos e diagramas
        return (
          <g opacity="0.85">
            <radialGradient id="grad-rl" cx="70%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FF9F43" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#1a140f" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0b0a09" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-rl)" />

            {/* Logic Formulas */}
            <text x="60%" y="28%" fill="#FF9F43" fillOpacity="0.18" fontSize="32" fontFamily="serif" fontWeight="bold">p ∧ q → r</text>
            <text x="72%" y="50%" fill="#ffffff" fillOpacity="0.12" fontSize="28" fontFamily="serif">¬(p ∨ q) ≡ ¬p ∧ ¬q</text>
            <text x="55%" y="82%" fill="#FF9F43" fillOpacity="0.15" fontSize="26" fontFamily="serif">∀x ∈ A : P(x)</text>

            {/* Euler / Venn Diagram Circles overlapping */}
            <g transform="translate(450, 110)">
              <circle cx="50" cy="70" r="60" fill="#FF9F43" fillOpacity="0.12" stroke="#FF9F43" strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="110" cy="70" r="60" fill="#E50914" fillOpacity="0.12" stroke="#E50914" strokeWidth="2" strokeOpacity="0.6" />
              <text x="35" y="75" fill="#FF9F43" fontSize="18" fontWeight="bold">A</text>
              <text x="125" y="75" fill="#E50914" fontSize="18" fontWeight="bold">B</text>
              <text x="80" y="75" fill="#ffffff" fontSize="14" fontWeight="bold">A∩B</text>
            </g>
          </g>
        );

      case 'direito-administrativo':
        // 4. DIREITO ADMINISTRATIVO: documentos oficiais, Constituição, administração pública e símbolos jurídicos
        return (
          <g opacity="0.85">
            <radialGradient id="grad-da" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#54A0FF" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0e1622" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#080c14" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-da)" />

            {/* Administrative Pillars (LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência) */}
            <g stroke="#54A0FF" strokeOpacity="0.2" strokeWidth="2" fill="none">
              <rect x="420" y="70" width="30" height="150" />
              <rect x="480" y="70" width="30" height="150" />
              <rect x="540" y="70" width="30" height="150" />
              <rect x="600" y="70" width="30" height="150" />
              <path d="M 390 70 L 650 70 L 520 20 Z" fill="#54A0FF" fillOpacity="0.08" />
              <rect x="390" y="220" width="260" height="15" fill="#54A0FF" fillOpacity="0.12" />
            </g>

            {/* Official Seal / Stamp */}
            <g transform="translate(480, 110)">
              <circle cx="60" cy="60" r="50" fill="#0e1726" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.7" strokeDasharray="4 2" />
              <circle cx="60" cy="60" r="42" fill="none" stroke="#E50914" strokeWidth="1.5" strokeOpacity="0.8" />
              <text x="60" y="58" fill="#d4af37" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ESTADO</text>
              <text x="60" y="72" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" textAnchor="middle">PÚBLICO</text>
            </g>
          </g>
        );

      case 'direito-constitucional':
        // 5. DIREITO CONSTITUCIONAL: Constituição Federal brasileira, livro jurídico e símbolos da Justiça
        return (
          <g opacity="0.85">
            <radialGradient id="grad-dc" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#10AC84" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#0b1b16" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#070f0c" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-dc)" />

            {/* Brazilian Constitution Watermark Motif (Green, Gold & Crimson) */}
            <g transform="translate(450, 70)">
              {/* Heavy Codex Book */}
              <rect x="20" y="30" width="160" height="180" rx="8" fill="#0d261e" stroke="#d4af37" strokeWidth="3" />
              <rect x="35" y="45" width="130" height="150" rx="4" fill="#081813" stroke="#10AC84" strokeWidth="1" />
              <text x="100" y="90" fill="#d4af37" fontSize="18" fontFamily="serif" fontWeight="bold" textAnchor="middle">CF / 1988</text>
              <text x="100" y="112" fill="#ffffff" fillOpacity="0.75" fontSize="10" letterSpacing="2" textAnchor="middle">REPÚBLICA FEDERATIVA</text>
              <text x="100" y="126" fill="#10AC84" fontSize="9" letterSpacing="1" textAnchor="middle">DO BRASIL</text>
              {/* Supreme Court / Scales Emblem */}
              <path d="M 85 145 L 115 145 M 100 135 L 100 165 M 80 152 Q 85 160 90 152 Z M 110 152 Q 115 160 120 152 Z" stroke="#d4af37" strokeWidth="2" fill="none" />
              {/* Red Silk Ribbon Bookmark */}
              <path d="M 95 205 L 95 235 L 100 228 L 105 235 L 105 205 Z" fill="#E50914" />
            </g>
          </g>
        );

      case 'direito-penal':
        // 6. DIREITO PENAL: códigos penais, martelo da Justiça e elementos jurídicos
        return (
          <g opacity="0.85">
            <radialGradient id="grad-dp" cx="70%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#1a0d0e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d0607" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-dp)" />

            {/* Gavel & Judicial Hammer in the shadows */}
            <g transform="translate(440, 80) rotate(-15 100 100)">
              {/* Gavel Handle */}
              <rect x="90" y="50" width="14" height="150" rx="4" fill="#52241b" stroke="#d4af37" strokeWidth="1.5" />
              {/* Gavel Head */}
              <rect x="55" y="30" width="84" height="40" rx="6" fill="#3b1710" stroke="#d4af37" strokeWidth="2" />
              <rect x="50" y="35" width="10" height="30" rx="3" fill="#d4af37" />
              <rect x="134" y="35" width="10" height="30" rx="3" fill="#d4af37" />
              {/* Striking Base */}
              <ellipse cx="140" cy="190" rx="55" ry="16" fill="#29120e" stroke="#E50914" strokeWidth="2" strokeOpacity="0.8" />
            </g>

            {/* Latin maxims watermark */}
            <text x="65%" y="85%" fill="#E50914" fillOpacity="0.15" fontSize="18" fontFamily="serif" fontStyle="italic">Nullum crimen sine lege</text>
          </g>
        );

      case 'direito-processual-penal':
        // 7. DIREITO PROCESSUAL PENAL: investigação policial, documentos, evidências e procedimentos judiciais
        return (
          <g opacity="0.85">
            <radialGradient id="grad-dpp" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#181116" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0c080b" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-dpp)" />

            {/* Police Badge & Investigation Dossier */}
            <g transform="translate(460, 75)">
              {/* Evidence Folder */}
              <polygon points="20,40 180,40 190,190 10,190" fill="#2d1c1a" stroke="#d4af37" strokeWidth="1.5" />
              <text x="100" y="70" fill="#E50914" fontSize="13" fontWeight="bold" letterSpacing="2" textAnchor="middle">INQUÉRITO POLICIAL</text>
              {/* Magnifying Glass with Evidence Whorl */}
              <g transform="translate(40, 60)">
                <circle cx="55" cy="55" r="42" fill="#0d0607" fillOpacity="0.6" stroke="#d4af37" strokeWidth="3" />
                <line x1="85" y1="85" x2="125" y2="125" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" />
                {/* Fingerprint ridges inside glass */}
                <path d="M 40 55 Q 55 35 70 55 M 46 60 Q 55 45 64 60 M 35 60 Q 55 25 75 60" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeOpacity="0.8" />
              </g>
            </g>
          </g>
        );

      case 'legislacao-especial':
        // 8. LEGISLAÇÃO ESPECIAL: livros de legislação, documentos jurídicos e símbolos de justiça
        return (
          <g opacity="0.85">
            <radialGradient id="grad-le" cx="70%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#F368E0" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#1b0e1b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d070e" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-le)" />

            {/* Special Statutes Stack (Lei de Drogas, Desarmamento, Maria da Penha) */}
            <g transform="translate(450, 70)">
              {/* Stack of Bound Volumes */}
              <rect x="30" y="140" width="180" height="35" rx="4" fill="#301429" stroke="#d4af37" strokeWidth="1.5" />
              <text x="45" y="162" fill="#d4af37" fontSize="12" fontWeight="bold">LEI 11.343 / 06</text>
              <rect x="40" y="100" width="170" height="35" rx="4" fill="#200d1c" stroke="#F368E0" strokeWidth="1.5" />
              <text x="55" y="122" fill="#ffffff" fontSize="12" fontWeight="bold">LEI 10.826 / 03</text>
              <rect x="50" y="60" width="160" height="35" rx="4" fill="#150813" stroke="#E50914" strokeWidth="1.5" />
              <text x="65" y="82" fill="#E50914" fontSize="12" fontWeight="bold">LEI 11.340 / 06</text>
            </g>
          </g>
        );

      case 'arquivologia':
        // 9. ARQUIVOLOGIA: arquivos, pastas, documentos e organização de acervos
        return (
          <g opacity="0.85">
            <radialGradient id="grad-arq" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#48DBFB" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0e1720" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#060b10" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-arq)" />

            {/* Archival Filing Cabinet & Organized Folders */}
            <g transform="translate(470, 70)">
              <rect x="20" y="20" width="140" height="180" rx="6" fill="#14212e" stroke="#48DBFB" strokeWidth="2" strokeOpacity="0.6" />
              {/* Drawer 1 */}
              <rect x="30" y="35" width="120" height="45" rx="3" fill="#0d1620" stroke="#48DBFB" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="75" y="52" width="30" height="8" rx="2" fill="#d4af37" />
              {/* Drawer 2 with hanging folders */}
              <rect x="30" y="95" width="120" height="45" rx="3" fill="#0d1620" stroke="#48DBFB" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="75" y="112" width="30" height="8" rx="2" fill="#d4af37" />
              {/* Drawer 3 */}
              <rect x="30" y="150" width="120" height="40" rx="3" fill="#0d1620" stroke="#48DBFB" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="75" y="165" width="30" height="8" rx="2" fill="#d4af37" />
              {/* Three Ages Theory Badge */}
              <text x="90" y="220" fill="#48DBFB" fontSize="10" fontFamily="sans-serif" textAnchor="middle">TEORIA DAS 3 IDADES</text>
            </g>
          </g>
        );

      case 'medicina-legal':
        // 10. MEDICINA LEGAL: perícia forense, laboratório, microscópio e investigação científica
        return (
          <g opacity="0.85">
            <radialGradient id="grad-ml" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#0ABDE3" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#0a1820" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#050d12" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-ml)" />

            {/* Forensic Microscope & DNA Double Helix */}
            <g transform="translate(460, 65)">
              {/* Forensic Microscope */}
              <path d="M 50 180 L 150 180 M 100 180 L 100 110 M 100 110 L 70 80 L 90 60 L 120 90 Z" stroke="#0ABDE3" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="95" cy="85" r="14" fill="#0ABDE3" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.5" />
              <rect x="55" y="125" width="50" height="8" fill="#E50914" rx="2" />
              {/* DNA Strand */}
              <path d="M 160 50 Q 180 75 160 100 T 160 150 T 160 200" fill="none" stroke="#0ABDE3" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 180 50 Q 160 75 180 100 T 180 150 T 180 200" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="160" y1="75" x2="180" y2="75" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="160" y1="125" x2="180" y2="125" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="160" y1="175" x2="180" y2="175" stroke="#e2e8f0" strokeWidth="1.5" />
            </g>
          </g>
        );

      case 'criminologia':
        // 11. CRIMINOLOGIA: investigação criminal, impressões digitais e análise de evidências
        return (
          <g opacity="0.85">
            <radialGradient id="grad-crim" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#5f27cd" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#150a22" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0b0512" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-crim)" />

            {/* Evidence Board with Red Connecting Threads */}
            <g stroke="#E50914" strokeWidth="1.5" strokeOpacity="0.6">
              <line x1="420" y1="70" x2="520" y2="130" />
              <line x1="520" y1="130" x2="610" y2="90" />
              <line x1="520" y1="130" x2="570" y2="190" />
              <circle cx="420" cy="70" r="5" fill="#E50914" />
              <circle cx="520" cy="130" r="5" fill="#E50914" />
              <circle cx="610" cy="90" r="5" fill="#E50914" />
              <circle cx="570" cy="190" r="5" fill="#E50914" />
            </g>

            {/* Glowing Biometric Fingerprint */}
            <g transform="translate(480, 80)">
              <circle cx="45" cy="50" r="35" fill="none" stroke="#5f27cd" strokeWidth="2" strokeDasharray="6 3" />
              <path d="M 25 50 Q 45 25 65 50 M 32 55 Q 45 35 58 55 M 38 60 Q 45 45 52 60" fill="none" stroke="#d4af37" strokeWidth="2.5" />
            </g>
          </g>
        );

      case 'etica':
        // 12. ÉTICA: balança da Justiça, livros e símbolos de integridade
        return (
          <g opacity="0.85">
            <radialGradient id="grad-et" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF9F43" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#1c140d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0c0905" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-et)" />

            {/* Golden Scales of Justice and Moral Compass */}
            <g transform="translate(470, 70)">
              {/* Center Mast */}
              <rect x="75" y="30" width="8" height="150" fill="#d4af37" rx="3" />
              <rect x="50" y="175" width="58" height="15" fill="#d4af37" rx="4" />
              {/* Horizontal Beam */}
              <rect x="20" y="50" width="120" height="6" fill="#d4af37" rx="2" />
              {/* Left Pan */}
              <line x1="30" y1="56" x2="15" y2="105" stroke="#d4af37" strokeWidth="1.5" />
              <line x1="30" y1="56" x2="45" y2="105" stroke="#d4af37" strokeWidth="1.5" />
              <ellipse cx="30" cy="108" rx="25" ry="8" fill="#1b120a" stroke="#d4af37" strokeWidth="2" />
              {/* Right Pan */}
              <line x1="130" y1="56" x2="115" y2="105" stroke="#d4af37" strokeWidth="1.5" />
              <line x1="130" y1="56" x2="145" y2="105" stroke="#d4af37" strokeWidth="1.5" />
              <ellipse cx="130" cy="108" rx="25" ry="8" fill="#1b120a" stroke="#d4af37" strokeWidth="2" />
              {/* Laurel Wreath of Integrity */}
              <circle cx="79" cy="40" r="14" fill="#E50914" />
              <circle cx="79" cy="40" r="10" fill="#d4af37" />
            </g>
          </g>
        );

      case 'direitos-humanos':
        // 13. DIREITOS HUMANOS: símbolo de direitos humanos, justiça, igualdade e dignidade
        return (
          <g opacity="0.85">
            <radialGradient id="grad-dh" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2ED573" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0b1b11" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#050e09" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-dh)" />

            {/* Universal Human Rights Beacon Motif */}
            <g transform="translate(470, 70)">
              {/* Open Protective Hands & Peace Silhouette */}
              <circle cx="70" cy="80" r="60" fill="#08180e" stroke="#2ED573" strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="70" cy="80" r="45" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Human Figure radiating dignity */}
              <circle cx="70" cy="60" r="12" fill="#2ED573" />
              <path d="M 50 100 Q 70 78 90 100 L 85 125 L 55 125 Z" fill="#2ED573" fillOpacity="0.8" />
              <path d="M 40 85 Q 70 70 100 85" stroke="#d4af37" strokeWidth="3" fill="none" strokeLinecap="round" />
              <text x="70" y="165" fill="#ffffff" fontSize="11" fontWeight="bold" letterSpacing="2" textAnchor="middle">DUDH 1948</text>
            </g>
          </g>
        );

      case 'legislacao-prf':
        // 14. LEGISLAÇÃO DA PRF: rodovias, viaturas policiais rodoviárias e fiscalização de trânsito
        return (
          <g opacity="0.85">
            <radialGradient id="grad-prf" cx="70%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFD32A" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#1c1606" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0e0a02" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-prf)" />

            {/* Asphalt Highway Vanishing Point */}
            <g transform="translate(420, 60)">
              <polygon points="120,40 140,40 220,180 40,180" fill="#1b1c24" stroke="#d4af37" strokeWidth="2" />
              {/* Center dashed road strip */}
              <line x1="130" y1="45" x2="130" y2="60" stroke="#FFD32A" strokeWidth="3" />
              <line x1="130" y1="80" x2="130" y2="105" stroke="#FFD32A" strokeWidth="4" />
              <line x1="130" y1="130" x2="130" y2="175" stroke="#FFD32A" strokeWidth="6" />
              {/* PRF Emergency Flashing Lights (Red & Blue Beacon) */}
              <g transform="translate(95, 20)">
                <ellipse cx="20" cy="15" rx="14" ry="7" fill="#E50914" />
                <ellipse cx="50" cy="15" rx="14" ry="7" fill="#00D2D3" />
                <rect x="15" y="15" width="40" height="6" fill="#1a1a24" />
              </g>
            </g>
          </g>
        );

      case 'lei-execucao-penal':
      default:
        // 15. LEI DE EXECUÇÃO PENAL: ambiente penitenciário, legislação e sistema prisional
        return (
          <g opacity="0.85">
            <radialGradient id="grad-lep" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#EA2027" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#1a0c0d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a0505" stopOpacity="1" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad-lep)" />

            {/* Penitentiary Security Iron Bars */}
            <g stroke="#57606f" strokeWidth="7" strokeLinecap="round" opacity="0.5">
              <line x1="430" y1="30" x2="430" y2="230" />
              <line x1="475" y1="30" x2="475" y2="230" />
              <line x1="520" y1="30" x2="520" y2="230" />
              <line x1="565" y1="30" x2="565" y2="230" />
              <line x1="610" y1="30" x2="610" y2="230" />
              {/* Horizontal crossbar */}
              <line x1="410" y1="90" x2="630" y2="90" stroke="#d4af37" strokeWidth="4" />
              <line x1="410" y1="170" x2="630" y2="170" stroke="#d4af37" strokeWidth="4" />
            </g>

            {/* Heavy Brass Padlock & Security Seal */}
            <g transform="translate(490, 110)">
              <rect x="15" y="30" width="40" height="35" rx="6" fill="#b33939" stroke="#d4af37" strokeWidth="2" />
              <path d="M 23 30 L 23 15 Q 35 5 47 15 L 47 30" fill="none" stroke="#d4af37" strokeWidth="3" />
              <circle cx="35" cy="45" r="4" fill="#140809" />
            </g>
          </g>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer select-none border border-neutral-800 bg-[#12131a] transition-all duration-300 ${
        hoverable ? 'hover:scale-[1.03] hover:border-neutral-600 hover:shadow-2xl hover:shadow-black/80' : ''
      } ${className}`}
    >
      {/* Visual Canvas (either custom image or bespoke 16:9 vector illustration) */}
      {subject.coverImageUrl && !imageError ? (
        <img
          src={subject.coverImageUrl}
          alt={`Capa da disciplina ${subject.name}`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {renderVisualArtwork()}
        </svg>
      )}

      {/* Cinematic Vignette & Bottom Text Contrast Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

      {/* Subtle Top Red Accent Stripe (Netflix aesthetic) */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: subject.accentColor || '#E50914' }}
      />

      {/* Top Badge: Target Careers & Category */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-neutral-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
          <span>{subject.category}</span>
        </div>
        <div className="text-[10px] font-bold text-neutral-400 bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 rounded border border-neutral-700/60">
          {subject.targetCareers.slice(0, 3).join(' · ')}
        </div>
      </div>

      {/* Center Play Button on Hover */}
      {hoverable && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-13 h-13 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-[#E50914]/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Information Zone: Prominent Title & Content Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
        {/* Prominent Visible Discipline Title */}
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase leading-tight line-clamp-1 drop-shadow-md">
          {subject.name}
        </h3>

        {/* Muted Metadata Row (Unboxed, single-line text with subtle dot separators) */}
        <div className="mt-1.5 flex items-center gap-2 text-xs text-neutral-300 font-medium">
          {moduleCount !== undefined && (
            <span>{moduleCount} {moduleCount === 1 ? 'módulo' : 'módulos'}</span>
          )}
          {moduleCount !== undefined && lessonCount !== undefined && (
            <span aria-hidden="true" className="text-neutral-500">·</span>
          )}
          {lessonCount !== undefined && (
            <span>{lessonCount} {lessonCount === 1 ? 'aula' : 'aulas'}</span>
          )}
          {completedPercent > 0 && (
            <>
              <span aria-hidden="true" className="text-neutral-500">·</span>
              <span className="text-emerald-400 font-semibold">{Math.round(completedPercent)}% concluído</span>
            </>
          )}
        </div>

        {/* Progress Bar (Netflix-style red bar along bottom of card) */}
        {completedPercent > 0 && (
          <div className="mt-2.5 w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E50914] transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, completedPercent))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
