import React from 'react';
import { Play, Sparkles, Compass } from 'lucide-react';
import { Subject, Lesson } from '../types';

interface HeroBannerProps {
  featuredSubject: Subject;
  lastWatchedLesson?: Lesson | null;
  onWatchLesson: (lesson: Lesson, subject: Subject) => void;
  onExploreSubject: (subject: Subject) => void;
  onScrollToCatalog: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredSubject,
  lastWatchedLesson,
  onWatchLesson,
  onExploreSubject,
  onScrollToCatalog,
}) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-neutral-800/80 bg-[#0a0b10]">
      {/* Background Cinematic Backdrop with Deep Radial Spotlight */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12] via-[#0c0d12]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 opacity-30 blur-2xl bg-radial from-[#E50914]/30 via-neutral-900/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-3 tracking-wider uppercase flex-wrap">
            <span className="text-[#E50914] font-bold">Carreiras Policiais</span>
            <span aria-hidden="true">·</span>
            <span>PF</span>
            <span aria-hidden="true">·</span>
            <span>PRF</span>
            <span aria-hidden="true">·</span>
            <span>Polícia Civil</span>
            <span aria-hidden="true">·</span>
            <span>Polícia Militar</span>
            <span aria-hidden="true">·</span>
            <span>Penal</span>
            <span aria-hidden="true">·</span>
            <span>GCM</span>
          </div>

          {/* Prominent Page Title as requested in brief */}
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.1] text-balance">
            ÁREA DO ALUNO
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-neutral-300 font-medium leading-relaxed">
            Videoaulas preparatórias para concursos policiais.
          </p>

          <p className="mt-2 text-sm text-neutral-400 leading-normal max-w-xl">
            Acesse o conteúdo programático completo, organizado por disciplinas e módulos com foco na sua aprovação. Assista às videoaulas preparatórias e conquiste sua farda.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {lastWatchedLesson ? (
              <button
                onClick={() => onWatchLesson(lastWatchedLesson, featuredSubject)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#E50914] hover:bg-[#c90712] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E50914]/25 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span className="whitespace-nowrap shrink-0">Continuar: {lastWatchedLesson.number}</span>
              </button>
            ) : (
              <button
                onClick={() => onExploreSubject(featuredSubject)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#E50914] hover:bg-[#c90712] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E50914]/25 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span className="whitespace-nowrap shrink-0">Começar por {featuredSubject.name}</span>
              </button>
            )}

            <button
              onClick={onScrollToCatalog}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 hover:text-white font-semibold text-sm transition-colors border border-neutral-700/60 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span className="whitespace-nowrap shrink-0">Ver Todas as 15 Matérias</span>
            </button>
          </div>

          {/* Disciplines quick overview line */}
          <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center gap-6 text-xs text-neutral-400">
            <div>
              <span className="text-white font-bold text-sm">15</span> Matérias Completas
            </div>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <div>
              <span className="text-white font-bold text-sm">78</span> Módulos Estruturados
            </div>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <div className="text-neutral-400">
              Videoaulas em Alta Definição
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
