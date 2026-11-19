import React, { useState } from 'react';
import { Subject, Module, Lesson, UserProgress } from '../types';
import { SubjectCover } from './SubjectCover';
import { getYouTubeThumbnail } from '../utils/youtube';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Clock, 
  Tv, 
  Layers 
} from 'lucide-react';

interface SubjectDetailViewProps {
  subject: Subject;
  modules: Module[];
  lessons: Lesson[];
  userProgress: UserProgress;
  isAdmin?: boolean;
  onBack: () => void;
  onPlayLesson: (lesson: Lesson, module: Module) => void;
  onToggleLessonCompleted: (lessonId: string) => void;
  onSaveLesson?: (lessonData: any) => void;
  onDeleteLesson?: (lessonId: string) => void;
  onQuickAddLesson?: (moduleId: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  modules,
  lessons,
  userProgress,
  onBack,
  onPlayLesson,
  onToggleLessonCompleted,
}) => {
  // Set modules expanded by default
  const [expandedModuleIds, setExpandedModuleIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((m, idx) => {
      initial[m.id] = idx < 4;
    });
    return initial;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    modules.forEach((m) => { all[m.id] = true; });
    setExpandedModuleIds(all);
  };

  const collapseAll = () => {
    setExpandedModuleIds({});
  };

  // Stats
  const subjectLessons = lessons.filter((l) => l.subjectId === subject.id);
  const completedLessons = subjectLessons.filter((l) =>
    userProgress.completedLessonIds.includes(l.id)
  );
  const percentCompleted = subjectLessons.length > 0
    ? Math.round((completedLessons.length / subjectLessons.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0c0d12] text-neutral-200 pb-20">
      {/* Top Header Banner with Discipline Information */}
      <div className="relative border-b border-neutral-800 bg-[#0f1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Catálogo de Matérias</span>
          </button>

          {/* Grid Split: Subject Overview & Cinematic Cover */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Metadata & Overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                <span className="text-[#E50914] font-bold">{subject.category}</span>
                <span aria-hidden="true">·</span>
                <span>{subject.targetCareers.join(', ')}</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                {subject.name}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                {subject.description}
              </p>

              {/* Progress and Quantitative stats bar */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-neutral-400" />
                  <span><strong className="text-white">{modules.length}</strong> módulos</span>
                </div>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <div className="flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-neutral-400" />
                  <span><strong className="text-white">{subjectLessons.length}</strong> videoaulas cadastradas</span>
                </div>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong className="text-emerald-400">{completedLessons.length}</strong> concluídas ({percentCompleted}%)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 max-w-md w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E50914] transition-all duration-300"
                  style={{ width: `${percentCompleted}%` }}
                />
              </div>
            </div>

            {/* Right Column: 16:9 Subject Cover Preview */}
            <div className="lg:col-span-5 max-w-md mx-auto lg:max-w-none w-full">
              <SubjectCover
                subject={subject}
                moduleCount={modules.length}
                lessonCount={subjectLessons.length}
                completedPercent={percentCompleted}
                hoverable={false}
                className="shadow-2xl shadow-black/80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight uppercase">
              Grade de Módulos & Videoaulas
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Assista às videoaulas
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={expandAll}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Expandir todos
            </button>
            <span aria-hidden="true" className="text-neutral-700">|</span>
            <button
              onClick={collapseAll}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Recolher todos
            </button>
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="mt-6 space-y-4">
          {modules.map((mod) => {
            const isExpanded = !!expandedModuleIds[mod.id];
            const modLessons = lessons
              .filter((l) => l.moduleId === mod.id)
              .sort((a, b) => a.order - b.order);

            const modCompletedCount = modLessons.filter((l) =>
              userProgress.completedLessonIds.includes(l.id)
            ).length;

            return (
              <div
                key={mod.id}
                className="bg-[#12131b] border border-neutral-800/80 rounded-lg overflow-hidden transition-colors"
              >
                {/* Module Header Bar (Click to expand/collapse) */}
                <div
                  onClick={() => toggleModule(mod.id)}
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-neutral-800/40 transition-colors select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <button
                      className="p-1 text-neutral-400 hover:text-white transition-colors"
                      aria-label={isExpanded ? 'Recolher módulo' : 'Expandir módulo'}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-[#E50914]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-neutral-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base sm:text-lg text-white truncate">
                          {mod.title}
                        </span>
                      </div>
                      {mod.description && (
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                          {mod.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Module Status & Lesson Count */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-xs text-neutral-400 font-medium whitespace-nowrap">
                      <span>{modLessons.length} {modLessons.length === 1 ? 'aula' : 'aulas'}</span>
                      {modLessons.length > 0 && modCompletedCount > 0 && (
                        <span className="text-emerald-400 ml-2">
                          ({modCompletedCount}/{modLessons.length})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Section with Lessons */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-neutral-800/60 bg-[#0e0f15]/80">
                    {/* Lessons list */}
                    {modLessons.length > 0 ? (
                      <div className="divide-y divide-neutral-800/40">
                        {modLessons.map((lesson) => {
                          const isCompleted = userProgress.completedLessonIds.includes(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-neutral-800/20 px-2 rounded transition-colors"
                            >
                              <div className="flex items-start sm:items-center gap-3 min-w-0">
                                {/* Completion Checkbox */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleLessonCompleted(lesson.id);
                                  }}
                                  className={`p-1 mt-0.5 sm:mt-0 transition-colors cursor-pointer ${
                                    isCompleted ? 'text-emerald-400 hover:text-emerald-300' : 'text-neutral-600 hover:text-neutral-400'
                                  }`}
                                  title={isCompleted ? 'Marcar como não concluída' : 'Marcar como concluída'}
                                >
                                  <CheckCircle2 className="w-5 h-5" />
                                </button>

                                {/* Video small thumbnail */}
                                <div 
                                  onClick={() => onPlayLesson(lesson, mod)}
                                  className="relative w-14 h-9 rounded bg-black overflow-hidden shrink-0 cursor-pointer border border-neutral-700/60"
                                >
                                  <img
                                    src={getYouTubeThumbnail(lesson.youtubeId, 'mq')}
                                    alt={lesson.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase shrink-0">
                                      {lesson.number}
                                    </span>
                                    <span aria-hidden="true" className="text-neutral-600">·</span>
                                    <h4 
                                      onClick={() => onPlayLesson(lesson, mod)}
                                      className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                      {lesson.title}
                                    </h4>
                                  </div>
                                  {lesson.summary && (
                                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                                      {lesson.summary}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Watch Action */}
                              <div className="flex items-center gap-3 shrink-0 pl-8 sm:pl-0">
                                {lesson.duration && (
                                  <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration}
                                  </span>
                                )}

                                <button
                                  onClick={() => onPlayLesson(lesson, mod)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E50914] hover:bg-[#c90712] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm hover:scale-[1.02]"
                                >
                                  <Play className="w-3.5 h-3.5 fill-white" />
                                  <span>Assistir</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-neutral-400">
                        <p>Nenhuma videoaula cadastrada neste módulo no momento.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
