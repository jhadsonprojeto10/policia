import React from 'react';
import { Subject, Module, Lesson, UserProgress } from '../types';
import { 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface StudentProgressViewProps {
  subjects: Subject[];
  modules: Module[];
  lessons: Lesson[];
  userProgress: UserProgress;
  onSelectSubject: (subject: Subject) => void;
  onPlayLesson: (lesson: Lesson, module: Module, subject: Subject) => void;
}

export const StudentProgressView: React.FC<StudentProgressViewProps> = ({
  subjects,
  modules,
  lessons,
  userProgress,
  onSelectSubject,
  onPlayLesson,
}) => {
  const completedCount = userProgress.completedLessonIds.length;
  const totalLessons = lessons.length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Completed lessons details
  const completedLessonsList = lessons.filter((l) =>
    userProgress.completedLessonIds.includes(l.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#E50914] uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Área do Aluno Concurseiro</span>
        </div>
        <h1 className="mt-1 font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
          Meus Estudos & Progresso
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Acompanhe seu avanço em cada matéria e continue de onde parou.
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-[#12131b] border border-neutral-800 rounded-xl">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Aulas Concluídas
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{completedCount}</span>
            <span className="text-xs text-neutral-500 font-mono">/ {totalLessons} aulas</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-[#12131b] border border-neutral-800 rounded-xl">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Progresso Geral
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-[#E50914]">{overallPercentage}%</span>
            <span className="text-xs text-neutral-500">do edital</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E50914] transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-[#12131b] border border-neutral-800 rounded-xl">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Total de Matérias
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{subjects.length}</span>
            <span className="text-xs text-neutral-500">disciplinas</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            {modules.length} módulos estruturados para concursos policiais
          </p>
        </div>
      </div>

      {/* Progress by Subject */}
      <div className="mt-12">
        <h2 className="font-display font-bold text-xl text-white tracking-wide uppercase mb-4">
          Avanço por Matéria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subj) => {
            const subjLessons = lessons.filter((l) => l.subjectId === subj.id);
            const subjCompleted = subjLessons.filter((l) =>
              userProgress.completedLessonIds.includes(l.id)
            ).length;
            const pct = subjLessons.length > 0
              ? Math.round((subjCompleted / subjLessons.length) * 100)
              : 0;

            return (
              <div
                key={subj.id}
                onClick={() => onSelectSubject(subj)}
                className="p-4 bg-[#12131b] border border-neutral-800/80 hover:border-neutral-700 rounded-xl cursor-pointer transition-all hover:bg-[#161724] group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-400 group-hover:text-white transition-colors">
                    {subj.name}
                  </span>
                  <span className="text-xs font-bold text-[#E50914] font-mono">
                    {pct}%
                  </span>
                </div>

                <div className="mt-2 w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E50914] transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                  <span>{subjCompleted} de {subjLessons.length} aulas</span>
                  <span className="flex items-center gap-1 text-neutral-400 group-hover:text-white">
                    <span>Acessar</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* List of completed lessons */}
      <div className="mt-12 bg-[#12131b] border border-neutral-800 rounded-xl p-6">
        <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Aulas Concluídas Recentemente ({completedLessonsList.length})</span>
        </h3>

        {completedLessonsList.length > 0 ? (
          <div className="divide-y divide-neutral-800/60 max-h-80 overflow-y-auto">
            {completedLessonsList.map((item) => {
              const itemSubj = subjects.find((s) => s.id === item.subjectId);
              const itemMod = modules.find((m) => m.id === item.moduleId);

              return (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase">
                        {item.number}
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-sm font-semibold text-white">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {itemSubj?.name} &rsaquo; {itemMod?.title}
                    </p>
                  </div>

                  {itemSubj && itemMod && (
                    <button
                      onClick={() => onPlayLesson(item, itemMod, itemSubj)}
                      className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-[#E50914] text-xs font-semibold text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Rever</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-neutral-500 py-4">
            Você ainda não marcou nenhuma aula como concluída. Comece assistindo às videoaulas e marcando seu progresso!
          </p>
        )}
      </div>
    </div>
  );
};
