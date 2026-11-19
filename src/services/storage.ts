import { Subject, Module, Lesson, User, UserProgress } from '../types';
import { INITIAL_SUBJECTS, INITIAL_MODULES, INITIAL_LESSONS } from '../data/initialCatalog';

const STORAGE_KEYS = {
  SUBJECTS: 'policiaflix_subjects_v2',
  MODULES: 'policiaflix_modules_v2',
  LESSONS: 'policiaflix_lessons_v2',
  AUTH: 'policiaflix_auth_user_v2',
  PROGRESS: 'policiaflix_user_progress_v2',
};

// Default Demo Users
export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: 'user-admin-1',
    name: 'Delegado / Coordenador',
    email: 'admin@policia.com',
    role: 'admin',
    avatar: 'A',
  },
  aluno: {
    id: 'user-aluno-1',
    name: 'Aluno Concurseiro',
    email: 'aluno@policia.com',
    role: 'aluno',
    avatar: 'C',
  },
};

class CourseStorageService {
  private subjects: Subject[] = [];
  private modules: Module[] = [];
  private lessons: Lesson[] = [];
  private currentUser: User = DEMO_USERS.aluno;
  private userProgress: Record<string, UserProgress> = {};
  private initialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Load Subjects
    const savedSubjects = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (savedSubjects) {
      try {
        this.subjects = JSON.parse(savedSubjects);
      } catch (e) {
        this.subjects = [...INITIAL_SUBJECTS];
      }
    } else {
      this.subjects = [...INITIAL_SUBJECTS];
      this.saveSubjectsLocal();
    }

    // Load Lessons first
    const savedLessons = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (savedLessons) {
      try {
        this.lessons = JSON.parse(savedLessons);
      } catch (e) {
        this.lessons = [...INITIAL_LESSONS];
      }
    } else {
      this.lessons = [...INITIAL_LESSONS];
      this.saveLessonsLocal();
    }

    // Load Modules (strictly only modules that have video lessons)
    const savedModules = localStorage.getItem(STORAGE_KEYS.MODULES);
    if (savedModules) {
      try {
        this.modules = JSON.parse(savedModules);
      } catch (e) {
        this.modules = [...INITIAL_MODULES];
      }
    } else {
      this.modules = [...INITIAL_MODULES];
      this.saveModulesLocal();
    }

    // Purge any module that does not have video lessons placed
    const activeModuleIds = new Set(this.lessons.map((l) => l.moduleId));
    this.modules = this.modules.filter((m) => activeModuleIds.has(m.id));
    this.saveModulesLocal();

    // Load Current User
    const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = DEMO_USERS.aluno;
      }
    } else {
      this.currentUser = DEMO_USERS.aluno;
      this.saveUserLocal();
    }

    // Load Progress
    const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (savedProgress) {
      try {
        this.userProgress = JSON.parse(savedProgress);
      } catch (e) {
        this.userProgress = {};
      }
    }

    this.initialized = true;
    this.syncWithServerBackend();
  }

  // Attempt backend API sync if server is running
  private async syncWithServerBackend() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const dataRes = await fetch('/api/catalog');
        if (dataRes.ok) {
          const remoteData = await dataRes.json();
          if (remoteData.subjects && remoteData.subjects.length > 0) {
            this.subjects = remoteData.subjects;
            this.modules = remoteData.modules || this.modules;
            this.lessons = remoteData.lessons || this.lessons;
            this.saveSubjectsLocal();
            this.saveModulesLocal();
            this.saveLessonsLocal();
          }
        }
      }
    } catch {
      // Backend not running or offline; client storage is authoritative
    }
  }

  private saveSubjectsLocal() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(this.subjects));
    }
  }

  private saveModulesLocal() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(this.modules));
    }
  }

  private saveLessonsLocal() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(this.lessons));
    }
  }

  private saveUserLocal() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(this.currentUser));
    }
  }

  private saveProgressLocal() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.userProgress));
    }
  }

  // Remote sync helper
  private async notifyBackendChange() {
    try {
      await fetch('/api/catalog/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: this.subjects,
          modules: this.modules,
          lessons: this.lessons,
        }),
      });
    } catch {
      // Ignore if offline
    }
  }

  /* ---------------- Subjects API ---------------- */
  public getSubjects(): Subject[] {
    return [...this.subjects].sort((a, b) => a.order - b.order);
  }

  public getSubjectById(id: string): Subject | undefined {
    return this.subjects.find((s) => s.id === id);
  }

  public saveSubject(subjectData: Partial<Subject> & { id?: string; name: string }): Subject {
    const id = subjectData.id || `sub-${Date.now()}`;
    const existingIndex = this.subjects.findIndex((s) => s.id === id);

    let subject: Subject;
    if (existingIndex >= 0) {
      subject = {
        ...this.subjects[existingIndex],
        ...subjectData,
        id,
      };
      this.subjects[existingIndex] = subject;
    } else {
      subject = {
        id,
        name: subjectData.name,
        shortName: subjectData.shortName || subjectData.name,
        category: subjectData.category || 'Policial',
        description: subjectData.description || 'Conteúdo preparatório para carreiras policiais.',
        targetCareers: subjectData.targetCareers || ['PF', 'PRF', 'PC', 'PM'],
        visualKey: subjectData.visualKey || 'portugues',
        coverImageUrl: subjectData.coverImageUrl,
        accentColor: subjectData.accentColor || '#E50914',
        order: subjectData.order ?? this.subjects.length + 1,
      };
      this.subjects.push(subject);
    }

    this.saveSubjectsLocal();
    this.notifyBackendChange();
    return subject;
  }

  public deleteSubject(id: string): boolean {
    const initialLen = this.subjects.length;
    this.subjects = this.subjects.filter((s) => s.id !== id);
    this.modules = this.modules.filter((m) => m.subjectId !== id);
    this.lessons = this.lessons.filter((l) => l.subjectId !== id);

    this.saveSubjectsLocal();
    this.saveModulesLocal();
    this.saveLessonsLocal();
    this.notifyBackendChange();
    return this.subjects.length < initialLen;
  }

  /* ---------------- Modules API ---------------- */
  public getModulesBySubject(subjectId: string): Module[] {
    return this.modules
      .filter((m) => m.subjectId === subjectId)
      .sort((a, b) => a.order - b.order);
  }

  public getAllModules(): Module[] {
    return [...this.modules];
  }

  public getModuleById(id: string): Module | undefined {
    return this.modules.find((m) => m.id === id);
  }

  public saveModule(moduleData: Partial<Module> & { subjectId: string; title: string }): Module {
    const id = moduleData.id || `mod-${Date.now()}`;
    const existingIndex = this.modules.findIndex((m) => m.id === id);

    let mod: Module;
    if (existingIndex >= 0) {
      mod = {
        ...this.modules[existingIndex],
        ...moduleData,
        id,
      };
      this.modules[existingIndex] = mod;
    } else {
      const subjectMods = this.getModulesBySubject(moduleData.subjectId);
      mod = {
        id,
        subjectId: moduleData.subjectId,
        title: moduleData.title,
        order: moduleData.order ?? subjectMods.length + 1,
        description: moduleData.description,
      };
      this.modules.push(mod);
    }

    this.saveModulesLocal();
    this.notifyBackendChange();
    return mod;
  }

  public deleteModule(id: string): boolean {
    const initialLen = this.modules.length;
    this.modules = this.modules.filter((m) => m.id !== id);
    this.lessons = this.lessons.filter((l) => l.moduleId !== id);

    this.saveModulesLocal();
    this.saveLessonsLocal();
    this.notifyBackendChange();
    return this.modules.length < initialLen;
  }

  public reorderModules(subjectId: string, orderedModuleIds: string[]) {
    orderedModuleIds.forEach((modId, index) => {
      const mod = this.modules.find((m) => m.id === modId);
      if (mod) {
        mod.order = index + 1;
      }
    });
    this.saveModulesLocal();
    this.notifyBackendChange();
  }

  /* ---------------- Lessons API ---------------- */
  public getLessonsByModule(moduleId: string): Lesson[] {
    return this.lessons
      .filter((l) => l.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  public getLessonsBySubject(subjectId: string): Lesson[] {
    return this.lessons
      .filter((l) => l.subjectId === subjectId)
      .sort((a, b) => a.order - b.order);
  }

  public getAllLessons(): Lesson[] {
    return [...this.lessons];
  }

  public getLessonById(id: string): Lesson | undefined {
    return this.lessons.find((l) => l.id === id);
  }

  public saveLesson(lessonData: {
    id?: string;
    moduleId: string;
    subjectId: string;
    number: string;
    title: string;
    youtubeUrl: string;
    youtubeId: string;
    duration?: string;
    summary?: string;
    order?: number;
  }): Lesson {
    const id = lessonData.id || `les-${Date.now()}`;
    const existingIndex = this.lessons.findIndex((l) => l.id === id);

    let lesson: Lesson;
    if (existingIndex >= 0) {
      lesson = {
        ...this.lessons[existingIndex],
        ...lessonData,
        id,
      };
      this.lessons[existingIndex] = lesson;
    } else {
      const moduleLessons = this.getLessonsByModule(lessonData.moduleId);
      lesson = {
        id,
        moduleId: lessonData.moduleId,
        subjectId: lessonData.subjectId,
        number: lessonData.number || `Aula ${(moduleLessons.length + 1).toString().padStart(2, '0')}`,
        title: lessonData.title,
        youtubeUrl: lessonData.youtubeUrl,
        youtubeId: lessonData.youtubeId,
        duration: lessonData.duration || '30:00',
        summary: lessonData.summary || '',
        order: lessonData.order ?? moduleLessons.length + 1,
      };
      this.lessons.push(lesson);
    }

    this.saveLessonsLocal();
    this.notifyBackendChange();
    return lesson;
  }

  public deleteLesson(id: string): boolean {
    const initialLen = this.lessons.length;
    this.lessons = this.lessons.filter((l) => l.id !== id);
    this.saveLessonsLocal();
    this.notifyBackendChange();
    return this.lessons.length < initialLen;
  }

  public reorderLessons(moduleId: string, orderedLessonIds: string[]) {
    orderedLessonIds.forEach((lesId, index) => {
      const les = this.lessons.find((l) => l.id === lesId);
      if (les) {
        les.order = index + 1;
      }
    });
    this.saveLessonsLocal();
    this.notifyBackendChange();
  }

  /* ---------------- Auth & User Management ---------------- */
  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
    this.saveUserLocal();
  }

  public switchRole(role: 'aluno' | 'admin') {
    this.currentUser = DEMO_USERS[role];
    this.saveUserLocal();
  }

  public login(email: string, role?: 'aluno' | 'admin'): User {
    const matchedRole = role || (email.toLowerCase().includes('admin') ? 'admin' : 'aluno');
    const user: User = {
      id: `user-${Date.now()}`,
      name: matchedRole === 'admin' ? 'Administrador do Sistema' : email.split('@')[0],
      email,
      role: matchedRole,
      avatar: email[0].toUpperCase(),
    };
    this.currentUser = user;
    this.saveUserLocal();
    return user;
  }

  public logout() {
    this.currentUser = DEMO_USERS.aluno;
    this.saveUserLocal();
  }

  /* ---------------- Student Progress API ---------------- */
  public getUserProgress(userId: string): UserProgress {
    if (!this.userProgress[userId]) {
      this.userProgress[userId] = {
        userId,
        completedLessonIds: [],
        updatedAt: new Date().toISOString(),
      };
    }
    return this.userProgress[userId];
  }

  public toggleLessonCompleted(lessonId: string): boolean {
    const userId = this.currentUser.id;
    const progress = this.getUserProgress(userId);
    const index = progress.completedLessonIds.indexOf(lessonId);
    let completed = false;

    if (index >= 0) {
      progress.completedLessonIds.splice(index, 1);
      completed = false;
    } else {
      progress.completedLessonIds.push(lessonId);
      completed = true;
    }

    progress.updatedAt = new Date().toISOString();
    this.saveProgressLocal();
    return completed;
  }

  public recordWatchProgress(lessonId: string, subjectId: string) {
    const userId = this.currentUser.id;
    const progress = this.getUserProgress(userId);
    progress.lastWatchedLessonId = lessonId;
    progress.lastWatchedSubjectId = subjectId;
    progress.updatedAt = new Date().toISOString();
    this.saveProgressLocal();
  }

  /* ---------------- Catalog Reset & Stats ---------------- */
  public resetToDefaultCatalog() {
    this.subjects = [...INITIAL_SUBJECTS];
    this.modules = [...INITIAL_MODULES];
    this.lessons = [...INITIAL_LESSONS];
    this.saveSubjectsLocal();
    this.saveModulesLocal();
    this.saveLessonsLocal();
    this.notifyBackendChange();
  }

  public getStats() {
    return {
      totalSubjects: this.subjects.length,
      totalModules: this.modules.length,
      totalLessons: this.lessons.length,
    };
  }
}

export const courseStorage = new CourseStorageService();
