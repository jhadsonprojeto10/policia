/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Subject, Module, Lesson, User, UserProgress } from './types';
import { courseStorage, DEMO_USERS } from './services/storage';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogView } from './components/CatalogView';
import { SubjectDetailView } from './components/SubjectDetailView';
import { VideoPlayerView } from './components/VideoPlayerView';
import { AdminPanel } from './components/AdminPanel';
import { StudentProgressView } from './components/StudentProgressView';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.aluno);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    userId: 'user-aluno-1',
    completedLessonIds: [],
    updatedAt: new Date().toISOString(),
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState<'catalog' | 'progress' | 'admin'>('catalog');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [quickAddModuleId, setQuickAddModuleId] = useState<string | undefined>(undefined);

  // Load Initial Data
  const refreshData = () => {
    const s = courseStorage.getSubjects();
    const m = courseStorage.getAllModules();
    const l = courseStorage.getAllLessons();
    const u = courseStorage.getCurrentUser();
    const p = courseStorage.getUserProgress(u.id);

    setSubjects(s);
    setModules(m);
    setLessons(l);
    setCurrentUser(u);
    setUserProgress(p);

    // Keep active selectedSubject in sync with fresh data
    if (selectedSubject) {
      const updatedSubj = s.find((item) => item.id === selectedSubject.id);
      if (updatedSubj) setSelectedSubject(updatedSubj);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // When user changes, refresh progress
  useEffect(() => {
    if (currentUser) {
      const p = courseStorage.getUserProgress(currentUser.id);
      setUserProgress(p);
    }
  }, [currentUser]);

  // Handle Play Lesson
  const handlePlayLesson = (lesson: Lesson, mod: Module, subj?: Subject) => {
    const targetSubject = subj || subjects.find((s) => s.id === lesson.subjectId) || null;
    setSelectedSubject(targetSubject);
    setSelectedModule(mod);
    setSelectedLesson(lesson);
    courseStorage.recordWatchProgress(lesson.id, lesson.subjectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Completion
  const handleToggleLessonCompleted = (lessonId: string) => {
    courseStorage.toggleLessonCompleted(lessonId);
    setUserProgress(courseStorage.getUserProgress(currentUser.id));
  };

  // Save Lesson Handler
  const handleSaveLesson = (lessonData: {
    id?: string;
    moduleId: string;
    subjectId: string;
    number: string;
    title: string;
    youtubeUrl: string;
    youtubeId: string;
    duration?: string;
    summary?: string;
  }) => {
    courseStorage.saveLesson(lessonData);
    refreshData();
  };

  // Delete Lesson Handler
  const handleDeleteLesson = (lessonId: string) => {
    courseStorage.deleteLesson(lessonId);
    refreshData();
  };

  // Reorder Lessons Handler
  const handleReorderLessons = (moduleId: string, lessonIds: string[]) => {
    courseStorage.reorderLessons(moduleId, lessonIds);
    refreshData();
  };

  // Save Module Handler
  const handleSaveModule = (moduleData: {
    id?: string;
    subjectId: string;
    title: string;
    description?: string;
  }) => {
    courseStorage.saveModule(moduleData);
    refreshData();
  };

  // Delete Module Handler
  const handleDeleteModule = (moduleId: string) => {
    courseStorage.deleteModule(moduleId);
    refreshData();
  };

  // Reorder Modules Handler
  const handleReorderModules = (subjectId: string, moduleIds: string[]) => {
    courseStorage.reorderModules(subjectId, moduleIds);
    refreshData();
  };

  // Save Subject Handler
  const handleSaveSubject = (subjectData: Partial<Subject> & { id?: string; name: string }) => {
    courseStorage.saveSubject(subjectData);
    refreshData();
  };

  // Delete Subject Handler
  const handleDeleteSubject = (subjectId: string) => {
    courseStorage.deleteSubject(subjectId);
    if (selectedSubject?.id === subjectId) {
      setSelectedSubject(null);
      setSelectedLesson(null);
    }
    refreshData();
  };

  // Reset to default catalog
  const handleResetCatalog = () => {
    courseStorage.resetToDefaultCatalog();
    refreshData();
  };

  // Find last watched lesson for hero resume
  const lastWatchedLesson = userProgress.lastWatchedLessonId
    ? lessons.find((l) => l.id === userProgress.lastWatchedLessonId)
    : (lessons[0] || null);

  const featuredSubject = (lastWatchedLesson && subjects.find((s) => s.id === lastWatchedLesson.subjectId)) || subjects[0];

  return (
    <div className="min-h-screen bg-[#0c0d12] text-neutral-200 flex flex-col font-sans">
      {/* Top Bar Navigation (Hidden only inside full theater video player if desired, or kept sticky) */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedLesson(null);
          if (tab === 'catalog') {
            setSelectedSubject(null);
          }
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => {
          courseStorage.logout();
          setCurrentUser(courseStorage.getCurrentUser());
        }}
        onQuickRoleSwitch={(role) => {
          courseStorage.switchRole(role);
          setCurrentUser(courseStorage.getCurrentUser());
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW 1: Video Player (Active when a lesson is selected) */}
        {selectedLesson && selectedModule && selectedSubject ? (
          <VideoPlayerView
            lesson={selectedLesson}
            module={selectedModule}
            subject={selectedSubject}
            moduleLessons={lessons.filter((l) => l.moduleId === selectedModule.id)}
            userProgress={userProgress}
            onBackToSubject={() => setSelectedLesson(null)}
            onSelectLesson={(newLesson) => {
              setSelectedLesson(newLesson);
              courseStorage.recordWatchProgress(newLesson.id, newLesson.subjectId);
            }}
            onToggleLessonCompleted={handleToggleLessonCompleted}
          />
        ) : selectedSubject ? (
          /* VIEW 2: Individual Subject Detail Page (Módulos & Aulas) */
          <SubjectDetailView
            subject={selectedSubject}
            modules={modules.filter((m) => m.subjectId === selectedSubject.id)}
            lessons={lessons}
            userProgress={userProgress}
            isAdmin={currentUser.role === 'admin'}
            onBack={() => setSelectedSubject(null)}
            onPlayLesson={(lesson, mod) => handlePlayLesson(lesson, mod, selectedSubject)}
            onToggleLessonCompleted={handleToggleLessonCompleted}
            onSaveLesson={handleSaveLesson}
            onDeleteLesson={handleDeleteLesson}
          />
        ) : activeTab === 'admin' ? (
          /* VIEW 3: Painel Administrativo */
          <AdminPanel
            subjects={subjects}
            modules={modules}
            lessons={lessons}
            initialSubjectId={undefined}
            initialModuleId={quickAddModuleId}
            onSaveLesson={handleSaveLesson}
            onDeleteLesson={handleDeleteLesson}
            onReorderLessons={handleReorderLessons}
            onSaveModule={handleSaveModule}
            onDeleteModule={handleDeleteModule}
            onReorderModules={handleReorderModules}
            onSaveSubject={handleSaveSubject}
            onDeleteSubject={handleDeleteSubject}
            onResetCatalog={handleResetCatalog}
            onClose={() => {
              setActiveTab('catalog');
              setQuickAddModuleId(undefined);
            }}
          />
        ) : activeTab === 'progress' ? (
          /* VIEW 4: Meus Estudos & Histórico */
          <StudentProgressView
            subjects={subjects}
            modules={modules}
            lessons={lessons}
            userProgress={userProgress}
            onSelectSubject={(subj) => {
              setSelectedSubject(subj);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPlayLesson={(les, mod, subj) => handlePlayLesson(les, mod, subj)}
          />
        ) : (
          /* VIEW 5: Página Inicial (Hero Spotlight + Todas as 15 Matérias) */
          <>
            {featuredSubject && (
              <HeroBanner
                featuredSubject={featuredSubject}
                lastWatchedLesson={lastWatchedLesson}
                onWatchLesson={(les, subj) => {
                  const mod = modules.find((m) => m.id === les.moduleId);
                  if (mod) handlePlayLesson(les, mod, subj);
                }}
                onExploreSubject={(subj) => {
                  setSelectedSubject(subj);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onScrollToCatalog={() => {
                  const el = document.getElementById('catalogo-materias');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            <CatalogView
              subjects={subjects}
              modules={modules}
              lessons={lessons}
              userProgress={userProgress}
              onSelectSubject={(subj) => {
                setSelectedSubject(subj);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-[#08090d] py-10 mt-16 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm tracking-wider uppercase text-white">
              CARREIRAS <span className="text-[#E50914]">POLICIAIS</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Área do Aluno Concurseiro</span>
          </div>

          <div className="text-center sm:text-right">
            <span>Videoaulas preparatórias para Polícia Federal, Rodoviária, Civil, Militar e Penal e Gcm</span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(user) => {
          courseStorage.setCurrentUser(user);
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
