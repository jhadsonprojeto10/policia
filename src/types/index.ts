export interface Lesson {
  id: string;
  moduleId: string;
  subjectId: string;
  order: number;
  number: string; // e.g. "Aula 01"
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  duration?: string;
  summary?: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  subjectId: string;
  order: number;
  title: string;
  description?: string;
  lessons?: Lesson[];
}

export interface Subject {
  id: string;
  name: string;
  shortName?: string;
  category: 'Básicas' | 'Direito' | 'Específicas' | 'Policial';
  description: string;
  targetCareers: string[];
  visualKey: 
    | 'portugues' 
    | 'informatica' 
    | 'raciocinio-logico' 
    | 'direito-administrativo' 
    | 'direito-constitucional' 
    | 'direito-penal' 
    | 'direito-processual-penal' 
    | 'legislacao-especial' 
    | 'arquivologia' 
    | 'medicina-legal' 
    | 'criminologia' 
    | 'etica' 
    | 'direitos-humanos' 
    | 'legislacao-prf' 
    | 'lei-execucao-penal';
  coverImageUrl?: string;
  accentColor: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'aluno' | 'admin';
  avatar?: string;
}

export interface UserProgress {
  userId: string;
  completedLessonIds: string[];
  lastWatchedLessonId?: string;
  lastWatchedSubjectId?: string;
  updatedAt: string;
}
