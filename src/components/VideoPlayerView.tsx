import React, { useState, useEffect } from 'react';
import { Subject, Module, Lesson, UserProgress } from '../types';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Tv, 
  ListOrdered,
  Maximize2,
  Share2
} from 'lucide-react';

interface VideoPlayerViewProps {
  lesson: Lesson;
  module: Module;
  subject: Subject;
  moduleLessons: Lesson[];
  userProgress: UserProgress;
  onBackToSubject: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleLessonCompleted: (lessonId: string) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  lesson,
  module,
  subject,
  moduleLessons,
  userProgress,
  onBackToSubject,
  onSelectLesson,
  onToggleLessonCompleted,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Sorted list of lessons in this module
  const sortedLessons = [...moduleLessons].sort((a, b) => a.order - b.order);
  const currentIndex = sortedLessons.findIndex((l) => l.id === lesson.id);

  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const isCompleted = userProgress.completedLessonIds.includes(lesson.id);

  // Keyboard navigation (Previous / Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && nextLesson) {
        onSelectLesson(nextLesson);
      } else if (e.key === 'ArrowLeft' && prevLesson) {
        onSelectLesson(prevLesson);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextLesson, prevLesson, onSelectLesson]);

  const embedUrl = getYouTubeEmbedUrl(lesson.youtubeId || lesson.youtubeUrl, true);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(lesson.youtubeUrl || window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-neutral-200">
      {/* Top Navigation Bar */}
      <div className="border-b border-neutral-800 bg-[#0e0f15]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onBackToSubject}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E50914]" />
            <span>Voltar para {subject.name}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 truncate max-w-lg">
            <span className="text-neutral-500 font-semibold">{subject.shortName || subject.name}</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span className="text-neutral-300 truncate">{module.title}</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span className="text-white font-bold truncate">{lesson.number}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors rounded hover:bg-neutral-800 cursor-pointer text-xs flex items-center gap-1"
              title="Copiar link da aula"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedNotification ? 'Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Arena: Responsive 12-column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video Screen Area (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* 16:9 YouTube Player Frame */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-neutral-800">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={`${lesson.number} - ${lesson.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                  <Tv className="w-12 h-12 text-neutral-600 mb-2" />
                  <p className="font-semibold text-white">Vídeo não configurado</p>
                  <p className="text-xs text-neutral-500 mt-1">O link do YouTube informado não pôde ser carregado.</p>
                </div>
              )}
            </div>

            {/* Below Video Header & Controls */}
            <div className="mt-5 pb-6 border-b border-neutral-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider">
                    <span>{lesson.number}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400">{module.title}</span>
                  </div>
                  <h1 className="mt-1 font-display font-extrabold text-xl sm:text-2xl text-white">
                    {lesson.title}
                  </h1>
                </div>

                {/* Mark as completed button */}
                <button
                  onClick={() => onToggleLessonCompleted(lesson.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-sm'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  <span>{isCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
                </button>
              </div>

              {lesson.summary && (
                <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#12131b] p-3.5 rounded-lg border border-neutral-800/60">
                  {lesson.summary}
                </p>
              )}

              {/* Navigation Bar: Previous / Next Lesson */}
              <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-neutral-800/40">
                <button
                  onClick={() => prevLesson && onSelectLesson(prevLesson)}
                  disabled={!prevLesson}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    prevLesson
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700'
                      : 'opacity-40 cursor-not-allowed text-neutral-500 bg-neutral-900/50 border border-neutral-800'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="block text-[10px] text-neutral-400 uppercase font-medium">Aula Anterior</span>
                    <span className="block truncate max-w-[130px] sm:max-w-[200px]">{prevLesson ? prevLesson.number : 'Início'}</span>
                  </div>
                </button>

                <button
                  onClick={() => nextLesson && onSelectLesson(nextLesson)}
                  disabled={!nextLesson}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    nextLesson
                      ? 'bg-[#E50914] hover:bg-[#c90712] text-white shadow-md shadow-[#E50914]/30'
                      : 'opacity-40 cursor-not-allowed text-neutral-500 bg-neutral-900/50 border border-neutral-800'
                  }`}
                >
                  <div className="text-right">
                    <span className="block text-[10px] text-red-200 uppercase font-medium">Próxima Aula</span>
                    <span className="block truncate max-w-[130px] sm:max-w-[200px]">{nextLesson ? nextLesson.number : 'Fim do Módulo'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Module Video Playlist (4 cols on desktop) */}
          <div className="lg:col-span-4">
            <div className="bg-[#12131b] border border-neutral-800 rounded-xl overflow-hidden sticky top-20 shadow-xl">
              {/* Playlist Header */}
              <div className="p-4 bg-[#161722] border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#E50914] uppercase tracking-wider">
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Aulas do Módulo</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5 truncate">
                    {module.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} de {sortedLessons.length}
                </span>
              </div>

              {/* Lessons List in this Module */}
              <div className="max-h-[580px] overflow-y-auto divide-y divide-neutral-800/50">
                {sortedLessons.map((item, idx) => {
                  const isActive = item.id === lesson.id;
                  const itemCompleted = userProgress.completedLessonIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectLesson(item)}
                      className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-[#E50914]/15 border-l-4 border-l-[#E50914]'
                          : 'hover:bg-neutral-800/40 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {/* Play or completed icon */}
                      <div className="mt-0.5 shrink-0">
                        {itemCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <Play className="w-4 h-4 fill-[#E50914] text-[#E50914]" />
                        ) : (
                          <span className="text-xs font-mono text-neutral-500 w-4 block text-center">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[11px] font-bold uppercase ${isActive ? 'text-[#E50914]' : 'text-neutral-400'}`}>
                            {item.number}
                          </span>
                          {item.duration && (
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {item.duration}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-semibold mt-0.5 line-clamp-2 ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                          {item.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
