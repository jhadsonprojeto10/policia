import React, { useState, useMemo } from 'react';
import { Subject, Module, Lesson, UserProgress } from '../types';
import { SubjectCover } from './SubjectCover';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface CatalogViewProps {
  subjects: Subject[];
  modules: Module[];
  lessons: Lesson[];
  userProgress: UserProgress;
  onSelectSubject: (subject: Subject) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  subjects,
  modules,
  lessons,
  userProgress,
  onSelectSubject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Compute stats per subject
  const subjectStats = useMemo(() => {
    const stats: Record<string, { modulesCount: number; lessonsCount: number; percent: number }> = {};

    subjects.forEach((subj) => {
      const subjectMods = modules.filter((m) => m.subjectId === subj.id);
      const subjectLessons = lessons.filter((l) => l.subjectId === subj.id);
      
      const completedCount = subjectLessons.filter((l) =>
        userProgress.completedLessonIds.includes(l.id)
      ).length;

      const percent = subjectLessons.length > 0
        ? (completedCount / subjectLessons.length) * 100
        : 0;

      stats[subj.id] = {
        modulesCount: subjectMods.length,
        lessonsCount: subjectLessons.length,
        percent,
      };
    });

    return stats;
  }, [subjects, modules, lessons, userProgress]);

  // Categories list
  const categories = ['all', 'Básicas', 'Direito', 'Específicas', 'Policial'];

  // Filter subjects based on search & category
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subj) => {
      const matchesCategory =
        selectedCategory === 'all' || subj.category === selectedCategory;

      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesName = subj.name.toLowerCase().includes(term);
      const matchesDescription = subj.description.toLowerCase().includes(term);
      const matchesCareers = subj.targetCareers.some((c) => c.toLowerCase().includes(term));
      
      // Also match if user searched for a module name in this subject
      const matchesModule = modules.some(
        (m) => m.subjectId === subj.id && m.title.toLowerCase().includes(term)
      );

      return matchesCategory && (matchesName || matchesDescription || matchesCareers || matchesModule);
    });
  }, [subjects, modules, searchTerm, selectedCategory]);

  return (
    <section id="catalogo-materias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Section Header & Search / Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E50914] tracking-wider uppercase">
            <span>Catálogo Completo</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">15 Disciplinas</span>
          </div>
          <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
            Todas as Matérias
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Selecione uma disciplina para acessar a grade de módulos e iniciar as videoaulas.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar matéria ou módulo..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-900/90 border border-neutral-800 rounded-md text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Tabs (Interactive Filter Controls as permitted by frontend design rules) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-md overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E50914] text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat === 'all' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Netflix 16:9 Subject Cards */}
      {filteredSubjects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredSubjects.map((subj) => {
            const stats = subjectStats[subj.id] || { modulesCount: 0, lessonsCount: 0, percent: 0 };
            return (
              <div key={subj.id} className="flex flex-col">
                <SubjectCover
                  subject={subj}
                  moduleCount={stats.modulesCount}
                  lessonCount={stats.lessonsCount}
                  completedPercent={stats.percent}
                  onClick={() => onSelectSubject(subj)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 p-12 text-center bg-neutral-900/40 rounded-lg border border-neutral-800">
          <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-white">Nenhuma matéria encontrada</h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-md mx-auto">
            Não encontramos matérias correspondentes a &ldquo;{searchTerm}&rdquo;. Tente buscar por termos como Penal, Constitucional, Informática ou limpe o filtro.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded transition-colors"
          >
            Redefinir Filtros
          </button>
        </div>
      )}
    </section>
  );
};
