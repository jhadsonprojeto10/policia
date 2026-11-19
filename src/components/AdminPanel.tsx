import React, { useState } from 'react';
import { Subject, Module, Lesson } from '../types';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail } from '../utils/youtube';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Play, 
  Tv, 
  CheckCircle, 
  Layers, 
  BookOpen, 
  RefreshCw,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  subjects: Subject[];
  modules: Module[];
  lessons: Lesson[];
  initialSubjectId?: string;
  initialModuleId?: string;
  onSaveLesson: (lessonData: {
    id?: string;
    moduleId: string;
    subjectId: string;
    number: string;
    title: string;
    youtubeUrl: string;
    youtubeId: string;
    duration?: string;
    summary?: string;
  }) => void;
  onDeleteLesson: (lessonId: string) => void;
  onReorderLessons: (moduleId: string, lessonIds: string[]) => void;
  onSaveModule: (moduleData: { id?: string; subjectId: string; title: string; description?: string }) => void;
  onDeleteModule: (moduleId: string) => void;
  onReorderModules: (subjectId: string, moduleIds: string[]) => void;
  onSaveSubject: (subjectData: Partial<Subject> & { id?: string; name: string }) => void;
  onDeleteSubject: (subjectId: string) => void;
  onResetCatalog: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  subjects,
  modules,
  lessons,
  initialSubjectId,
  initialModuleId,
  onSaveLesson,
  onDeleteLesson,
  onReorderLessons,
  onSaveModule,
  onDeleteModule,
  onReorderModules,
  onSaveSubject,
  onDeleteSubject,
  onResetCatalog,
  onClose,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'lessons' | 'all-modules' | 'modules' | 'subjects' | 'system'>('all-modules');
  const [allModulesFilterSubject, setAllModulesFilterSubject] = useState<string>('all');
  const [allModulesSearch, setAllModulesSearch] = useState<string>('');
  const [quickInputs, setQuickInputs] = useState<Record<string, { title: string; url: string; number: string }>>({});
  const [quickMsg, setQuickMsg] = useState<Record<string, string>>({});

  // Selected subject & module for video lesson management
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || subjects[0]?.id || ''
  );
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const currentSubjectModules = modules
    .filter((m) => m.subjectId === selectedSubjectId)
    .sort((a, b) => a.order - b.order);

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || currentSubjectModules[0]?.id || ''
  );

  // Lesson Form State
  const [lessonEditingId, setLessonEditingId] = useState<string | null>(null);
  const [lessonNumber, setLessonNumber] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonYoutubeUrl, setLessonYoutubeUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState('30:00');
  const [lessonSummary, setLessonSummary] = useState('');
  const [lessonSuccessMsg, setLessonSuccessMsg] = useState('');
  const [lessonErrorMsg, setLessonErrorMsg] = useState('');

  // Module Form State
  const [modEditingId, setModEditingId] = useState<string | null>(null);
  const [modTitle, setModTitle] = useState('');
  const [modDescription, setModDescription] = useState('');

  // Subject Form State
  const [subjEditingId, setSubjEditingId] = useState<string | null>(null);
  const [subjName, setSubjName] = useState('');
  const [subjShortName, setSubjShortName] = useState('');
  const [subjCategory, setSubjCategory] = useState<'Básicas' | 'Direito' | 'Específicas' | 'Policial'>('Direito');
  const [subjDescription, setSubjDescription] = useState('');
  const [subjCoverUrl, setSubjCoverUrl] = useState('');
  const [subjTargetCareers, setSubjTargetCareers] = useState('PF, PRF, PC, PM');

  // Current lessons in selected module
  const currentModuleLessons = lessons
    .filter((l) => l.moduleId === selectedModuleId)
    .sort((a, b) => a.order - b.order);

  // Preview YouTube ID
  const previewYouTubeId = extractYouTubeId(lessonYoutubeUrl);

  // Quick reset lesson form
  const resetLessonForm = (nextNum?: number) => {
    setLessonEditingId(null);
    const num = nextNum ?? currentModuleLessons.length + 1;
    setLessonNumber(`Aula ${num.toString().padStart(2, '0')}`);
    setLessonTitle('');
    setLessonYoutubeUrl('');
    setLessonDuration('30:00');
    setLessonSummary('');
    setLessonErrorMsg('');
  };

  const handleEditLesson = (lesson: Lesson) => {
    setLessonEditingId(lesson.id);
    setLessonNumber(lesson.number);
    setLessonTitle(lesson.title);
    setLessonYoutubeUrl(lesson.youtubeUrl);
    setLessonDuration(lesson.duration || '30:00');
    setLessonSummary(lesson.summary || '');
    setLessonErrorMsg('');
    setActiveAdminTab('lessons');
  };

  const handleSaveLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLessonErrorMsg('');

    if (!selectedSubjectId || !selectedModuleId) {
      setLessonErrorMsg('Selecione uma matéria e um módulo para cadastrar a aula.');
      return;
    }

    if (!lessonTitle.trim()) {
      setLessonErrorMsg('Informe o título da aula.');
      return;
    }

    const yId = extractYouTubeId(lessonYoutubeUrl);
    if (!yId) {
      setLessonErrorMsg('Link do YouTube inválido. Cole um link no formato https://www.youtube.com/watch?v=... ou https://youtu.be/...');
      return;
    }

    onSaveLesson({
      id: lessonEditingId || undefined,
      moduleId: selectedModuleId,
      subjectId: selectedSubjectId,
      number: lessonNumber.trim() || `Aula ${(currentModuleLessons.length + 1).toString().padStart(2, '0')}`,
      title: lessonTitle.trim(),
      youtubeUrl: lessonYoutubeUrl.trim(),
      youtubeId: yId,
      duration: lessonDuration.trim() || '30:00',
      summary: lessonSummary.trim(),
    });

    setLessonSuccessMsg(lessonEditingId ? 'Aula atualizada com sucesso!' : 'Videoaula cadastrada com sucesso!');
    setTimeout(() => setLessonSuccessMsg(''), 3000);

    resetLessonForm(lessonEditingId ? undefined : currentModuleLessons.length + 2);
  };

  // Reorder lessons
  const handleMoveLesson = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentModuleLessons.length) return;

    const reordered = [...currentModuleLessons];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    onReorderLessons(selectedModuleId, reordered.map((l) => l.id));
  };

  // Reorder modules
  const handleMoveModule = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentSubjectModules.length) return;

    const reordered = [...currentSubjectModules];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    onReorderModules(selectedSubjectId, reordered.map((m) => m.id));
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-neutral-200 pb-24">
      {/* Admin Header */}
      <div className="bg-[#14151f] border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E50914] text-white flex items-center justify-center font-bold shadow-md shadow-[#E50914]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl text-white tracking-wide uppercase">
                  PAINEL ADMINISTRATIVO
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30 uppercase">
                  Gestão Geral
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Cadastre e edite videoaulas do YouTube, gerencie matérias e módulos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded transition-colors cursor-pointer"
            >
              Voltar à Área do Aluno
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-neutral-800/60 pt-1">
          <button
            onClick={() => setActiveAdminTab('all-modules')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'all-modules'
                ? 'text-white border-[#E50914] bg-neutral-900/40'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4 text-[#E50914]" />
            <span>Vídeos em Todos os Módulos ({modules.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('lessons')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'lessons'
                ? 'text-white border-[#E50914] bg-neutral-900/40'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 text-neutral-400" />
            <span>Cadastro Individual Detalhado</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('modules')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'modules'
                ? 'text-white border-[#E50914] bg-neutral-900/40'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-neutral-400" />
            <span>Módulos ({modules.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('subjects')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'subjects'
                ? 'text-white border-[#E50914] bg-neutral-900/40'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-neutral-400" />
            <span>Matérias & Capas ({subjects.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('system')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'system'
                ? 'text-white border-[#E50914] bg-neutral-900/40'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-neutral-400" />
            <span>Restaurar Catálogo / Dados</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ==================== TAB 0: COLOCAR VÍDEOS EM TODOS OS MÓDULOS ==================== */}
        {activeAdminTab === 'all-modules' && (
          <div className="space-y-6">
            {/* Top explanation and filter controls */}
            <div className="bg-[#12131b] border border-neutral-800 p-5 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#E50914]" />
                    <span>Colocar Link de Vídeo do YouTube em Qualquer Módulo</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Visualize todos os 77 módulos do curso e cole links do YouTube diretamente no módulo desejado.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Filter by Subject */}
                  <div className="w-full sm:w-auto">
                    <select
                      value={allModulesFilterSubject}
                      onChange={(e) => setAllModulesFilterSubject(e.target.value)}
                      className="w-full bg-[#181924] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    >
                      <option value="all">Todas as 15 Disciplinas ({modules.length} módulos)</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({modules.filter((m) => m.subjectId === s.id).length} módulos)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Modules */}
                  <input
                    type="text"
                    value={allModulesSearch}
                    onChange={(e) => setAllModulesSearch(e.target.value)}
                    placeholder="Buscar módulo por nome..."
                    className="w-full sm:w-56 bg-[#181924] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>
            </div>

            {/* List of Modules with Instant YouTube Link Inserter */}
            <div className="space-y-4">
              {modules
                .filter((mod) => {
                  const matchesSubject = allModulesFilterSubject === 'all' || mod.subjectId === allModulesFilterSubject;
                  const term = allModulesSearch.toLowerCase().trim();
                  if (!term) return matchesSubject;
                  const subj = subjects.find((s) => s.id === mod.subjectId);
                  return (
                    matchesSubject &&
                    (mod.title.toLowerCase().includes(term) || (subj && subj.name.toLowerCase().includes(term)))
                  );
                })
                .map((mod) => {
                  const modSubj = subjects.find((s) => s.id === mod.subjectId);
                  const modLessons = lessons
                    .filter((l) => l.moduleId === mod.id)
                    .sort((a, b) => a.order - b.order);

                  const curInput = quickInputs[mod.id] || {
                    number: `Aula ${(modLessons.length + 1).toString().padStart(2, '0')}`,
                    title: '',
                    url: '',
                  };

                  const curMsg = quickMsg[mod.id];
                  const previewYt = extractYouTubeId(curInput.url);

                  return (
                    <div
                      key={mod.id}
                      className="bg-[#12131b] border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
                    >
                      {/* Module Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800">
                        <div className="flex items-center gap-2.5">
                          {modSubj && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 rounded">
                              {modSubj.shortName || modSubj.name}
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-white">
                            {mod.title}
                          </h3>
                        </div>

                        <span className="text-xs font-semibold text-neutral-400">
                          {modLessons.length} {modLessons.length === 1 ? 'aula cadastrada' : 'aulas cadastradas'}
                        </span>
                      </div>

                      {/* Quick YouTube Link Form */}
                      <div className="bg-[#171824] p-3.5 rounded-lg border border-neutral-700/60 mb-4">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          + Adicionar Nova Videoaula neste Módulo:
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={curInput.number}
                              onChange={(e) =>
                                setQuickInputs((prev) => ({
                                  ...prev,
                                  [mod.id]: { ...curInput, number: e.target.value },
                                }))
                              }
                              placeholder="Aula 01"
                              className="w-full bg-[#10111a] border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <input
                              type="text"
                              value={curInput.title}
                              onChange={(e) =>
                                setQuickInputs((prev) => ({
                                  ...prev,
                                  [mod.id]: { ...curInput, title: e.target.value },
                                }))
                              }
                              placeholder="Título da Aula (ex: Teoria Básica)"
                              className="w-full bg-[#10111a] border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <input
                              type="text"
                              value={curInput.url}
                              onChange={(e) =>
                                setQuickInputs((prev) => ({
                                  ...prev,
                                  [mod.id]: { ...curInput, url: e.target.value },
                                }))
                              }
                              placeholder="Cole o Link do YouTube (https://...)"
                              className="w-full bg-[#10111a] border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <button
                              onClick={() => {
                                if (!curInput.title.trim()) {
                                  alert('Informe o título da aula.');
                                  return;
                                }
                                const yId = extractYouTubeId(curInput.url);
                                if (!yId) {
                                  alert('Link do YouTube inválido.');
                                  return;
                                }

                                onSaveLesson({
                                  moduleId: mod.id,
                                  subjectId: mod.subjectId,
                                  number: curInput.number.trim() || `Aula ${(modLessons.length + 1).toString().padStart(2, '0')}`,
                                  title: curInput.title.trim(),
                                  youtubeUrl: curInput.url.trim(),
                                  youtubeId: yId,
                                  duration: '30:00',
                                });

                                setQuickInputs((prev) => ({
                                  ...prev,
                                  [mod.id]: {
                                    number: `Aula ${(modLessons.length + 2).toString().padStart(2, '0')}`,
                                    title: '',
                                    url: '',
                                  },
                                }));

                                setQuickMsg((prev) => ({ ...prev, [mod.id]: 'Vídeo adicionado com sucesso!' }));
                                setTimeout(() => {
                                  setQuickMsg((prev) => {
                                    const c = { ...prev };
                                    delete c[mod.id];
                                    return c;
                                  });
                                }, 3000);
                              }}
                              className="w-full py-1.5 px-3 bg-[#E50914] hover:bg-[#c90712] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Salvar Vídeo</span>
                            </button>
                          </div>
                        </div>

                        {curMsg && (
                          <p className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{curMsg}</span>
                          </p>
                        )}

                        {previewYt && (
                          <div className="mt-2.5 flex items-center gap-2 text-xs text-neutral-400">
                            <span className="text-emerald-400 font-semibold">✓ Link detectado:</span>
                            <span className="font-mono text-neutral-400 text-[11px]">ID: {previewYt}</span>
                          </div>
                        )}
                      </div>

                      {/* List of current video lessons in this module */}
                      {modLessons.length > 0 ? (
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                            Aulas Ativas neste Módulo:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {modLessons.map((item) => (
                              <div
                                key={item.id}
                                className="p-2.5 bg-[#171822] border border-neutral-800 rounded-lg flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img
                                    src={getYouTubeThumbnail(item.youtubeId, 'mq')}
                                    alt={item.title}
                                    className="w-12 h-8 rounded object-cover shrink-0 bg-black border border-neutral-700/60"
                                  />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-[#E50914] uppercase">{item.number}</span>
                                      <span className="font-semibold text-white truncate max-w-[170px]">{item.title}</span>
                                    </div>
                                    <span className="text-[10px] text-neutral-500 font-mono truncate block max-w-[190px]">
                                      {item.youtubeUrl}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Excluir a aula "${item.number} - ${item.title}"?`)) {
                                        onDeleteLesson(item.id);
                                      }
                                    }}
                                    className="p-1 text-neutral-500 hover:text-rose-400 rounded"
                                    title="Excluir aula"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-500 italic">
                          Nenhum vídeo cadastrado ainda. Use a barra acima para colar o link do YouTube.
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ==================== TAB 1: CADASTRO DE VIDEOAULAS (YouTube) ==================== */}
        {activeAdminTab === 'lessons' && (
          <div className="space-y-8">
            {/* Subject and Module Selectors Bar */}
            <div className="bg-[#12131b] border border-neutral-800 p-5 rounded-xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
                <span>1. Selecione a Matéria e o Módulo para Cadastrar Videoaulas</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Select Subject */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Disciplina / Matéria:
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => {
                      setSelectedSubjectId(e.target.value);
                      const mods = modules.filter((m) => m.subjectId === e.target.value);
                      if (mods.length > 0) {
                        setSelectedModuleId(mods[0].id);
                      }
                    }}
                    className="w-full bg-[#181924] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Module */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Módulo da Disciplina:
                  </label>
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="w-full bg-[#181924] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  >
                    {currentSubjectModules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Split Grid: Form on Left, Lessons Table on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form to Add / Edit YouTube Lesson (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5 sticky top-28">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Tv className="w-4 h-4 text-[#E50914]" />
                      <span>{lessonEditingId ? 'Editar Videoaula' : 'Cadastrar Nova Aula'}</span>
                    </h3>
                    {lessonEditingId && (
                      <button
                        onClick={() => resetLessonForm()}
                        className="text-xs text-neutral-400 hover:text-white"
                      >
                        Cancelar Edição
                      </button>
                    )}
                  </div>

                  {lessonSuccessMsg && (
                    <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{lessonSuccessMsg}</span>
                    </div>
                  )}

                  {lessonErrorMsg && (
                    <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{lessonErrorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveLessonSubmit} className="space-y-4">
                    {/* Número da aula */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Número da Aula <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        value={lessonNumber}
                        onChange={(e) => setLessonNumber(e.target.value)}
                        placeholder="Ex: Aula 01"
                        className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                        required
                      />
                    </div>

                    {/* Título da aula */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Título da Aula <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="Ex: Introdução à Interpretação"
                        className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                        required
                      />
                    </div>

                    {/* Campo para link do YouTube */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Link do Vídeo no YouTube <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        value={lessonYoutubeUrl}
                        onChange={(e) => setLessonYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                        required
                      />
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Aceita links como watch?v=, youtu.be, shorts ou ID do YouTube.
                      </p>
                    </div>

                    {/* Real-time YouTube Link Preview Thumbnail */}
                    {previewYouTubeId && (
                      <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5 font-medium">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Link válido detectado</span>
                          </span>
                          <span className="font-mono text-neutral-500">ID: {previewYouTubeId}</span>
                        </div>
                        <div className="relative aspect-video rounded overflow-hidden bg-black">
                          <img
                            src={getYouTubeThumbnail(previewYouTubeId, 'mq')}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Duração estimada & Resumo */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Duração
                        </label>
                        <input
                          type="text"
                          value={lessonDuration}
                          onChange={(e) => setLessonDuration(e.target.value)}
                          placeholder="30:00"
                          className="w-full bg-[#181924] border border-neutral-700 rounded-md px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Breve Descrição / Tópico
                        </label>
                        <input
                          type="text"
                          value={lessonSummary}
                          onChange={(e) => setLessonSummary(e.target.value)}
                          placeholder="Pontos cobrados em prova..."
                          className="w-full bg-[#181924] border border-neutral-700 rounded-md px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Botão Salvar */}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#E50914] hover:bg-[#c90712] text-white font-bold text-sm tracking-wide shadow-md shadow-[#E50914]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lessonEditingId ? 'Salvar Alterações' : 'Salvar e Publicar Aula'}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* List of Lessons in Selected Module (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                    <div>
                      <h3 className="font-display font-bold text-base text-white">
                        Aulas Cadastradas neste Módulo
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {currentModuleLessons.length} {currentModuleLessons.length === 1 ? 'aula disponível' : 'aulas disponíveis'} na área do aluno.
                      </p>
                    </div>

                    <button
                      onClick={() => resetLessonForm(currentModuleLessons.length + 1)}
                      className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-[#E50914] text-xs font-semibold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nova Aula</span>
                    </button>
                  </div>

                  {currentModuleLessons.length > 0 ? (
                    <div className="space-y-3">
                      {currentModuleLessons.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-[#171822] border border-neutral-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* YouTube Thumbnail Preview */}
                            <div className="relative w-16 h-10 rounded bg-black overflow-hidden shrink-0 border border-neutral-700/60">
                              <img
                                src={getYouTubeThumbnail(item.youtubeId, 'mq')}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#E50914] uppercase">
                                  {item.number}
                                </span>
                                <span aria-hidden="true" className="text-neutral-600">·</span>
                                <h4 className="text-sm font-semibold text-white truncate">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                                Link: <span className="font-mono text-neutral-500">{item.youtubeUrl}</span>
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons: Move, Edit, Delete */}
                          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                            <button
                              onClick={() => handleMoveLesson(index, 'up')}
                              disabled={index === 0}
                              className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 rounded"
                              title="Mover para cima"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleMoveLesson(index, 'down')}
                              disabled={index === currentModuleLessons.length - 1}
                              className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 rounded"
                              title="Mover para baixo"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleEditLesson(item)}
                              className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                              title="Editar aula"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Deseja excluir a aula "${item.number} - ${item.title}"?`)) {
                                  onDeleteLesson(item.id);
                                }
                              }}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                              title="Excluir aula"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-neutral-900/30 rounded-lg border border-neutral-800">
                      <Tv className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-white">Nenhuma aula cadastrada neste módulo</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Utilize o formulário ao lado para cadastrar a primeira videoaula do YouTube.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: GERENCIAR MÓDULOS ==================== */}
        {activeAdminTab === 'modules' && (
          <div className="space-y-6">
            <div className="bg-[#12131b] border border-neutral-800 p-5 rounded-xl">
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Filtrar Módulos da Matéria:
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full max-w-md bg-[#181924] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914]"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Add / Edit Module Card */}
            <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5">
              <h3 className="font-display font-bold text-base text-white mb-4">
                {modEditingId ? 'Editar Módulo' : 'Adicionar Novo Módulo'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Título do Módulo <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    value={modTitle}
                    onChange={(e) => setModTitle(e.target.value)}
                    placeholder="Ex: Módulo 7 – Legislação Atualizada"
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Descrição (Opcional)
                  </label>
                  <input
                    type="text"
                    value={modDescription}
                    onChange={(e) => setModDescription(e.target.value)}
                    placeholder="Tópicos abordados nas aulas..."
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!modTitle.trim()) return;
                    onSaveModule({
                      id: modEditingId || undefined,
                      subjectId: selectedSubjectId,
                      title: modTitle.trim(),
                      description: modDescription.trim(),
                    });
                    setModEditingId(null);
                    setModTitle('');
                    setModDescription('');
                  }}
                  className="px-4 py-2 bg-[#E50914] hover:bg-[#c90712] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {modEditingId ? 'Salvar Módulo' : 'Adicionar Módulo'}
                </button>
                {modEditingId && (
                  <button
                    onClick={() => {
                      setModEditingId(null);
                      setModTitle('');
                      setModDescription('');
                    }}
                    className="px-3 py-2 bg-neutral-800 text-neutral-300 hover:text-white text-xs rounded"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>

            {/* List of modules for current subject */}
            <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5">
              <h3 className="font-display font-bold text-base text-white mb-3">
                Módulos de {selectedSubject.name} ({currentSubjectModules.length})
              </h3>

              <div className="divide-y divide-neutral-800">
                {currentSubjectModules.map((mod, index) => {
                  const modLessons = lessons.filter((l) => l.moduleId === mod.id);
                  return (
                    <div key={mod.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{mod.title}</p>
                        <p className="text-xs text-neutral-400">
                          {modLessons.length} {modLessons.length === 1 ? 'aula' : 'aulas'} cadastradas
                          {mod.description && ` · ${mod.description}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveModule(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                          title="Mover para cima"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveModule(index, 'down')}
                          disabled={index === currentSubjectModules.length - 1}
                          className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded hover:bg-neutral-800"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setModEditingId(mod.id);
                            setModTitle(mod.title);
                            setModDescription(mod.description || '');
                          }}
                          className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                          title="Editar módulo"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Deseja excluir o módulo "${mod.title}" e todas as suas aulas?`)) {
                              onDeleteModule(mod.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                          title="Excluir módulo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: GERENCIAR MATÉRIAS & CAPAS ==================== */}
        {activeAdminTab === 'subjects' && (
          <div className="space-y-6">
            {/* Form to edit or add subject and cover */}
            <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5">
              <h3 className="font-display font-bold text-base text-white mb-4">
                {subjEditingId ? 'Editar Matéria e Capa' : 'Cadastrar Nova Matéria'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Nome da Matéria <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    value={subjName}
                    onChange={(e) => setSubjName(e.target.value)}
                    placeholder="Ex: Medicina Legal"
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={subjCategory}
                    onChange={(e) => setSubjCategory(e.target.value as any)}
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  >
                    <option value="Básicas">Básicas</option>
                    <option value="Direito">Direito</option>
                    <option value="Específicas">Específicas</option>
                    <option value="Policial">Policial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Carreiras Alvo (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={subjTargetCareers}
                    onChange={(e) => setSubjTargetCareers(e.target.value)}
                    placeholder="PF, PRF, PC, PM"
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Descrição da Matéria
                  </label>
                  <input
                    type="text"
                    value={subjDescription}
                    onChange={(e) => setSubjDescription(e.target.value)}
                    placeholder="Breve ementa do conteúdo para carreiras policiais..."
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Link de Imagem Personalizada para Capa (Opcional)
                  </label>
                  <input
                    type="text"
                    value={subjCoverUrl}
                    onChange={(e) => setSubjCoverUrl(e.target.value)}
                    placeholder="https://... (deixe vazio para usar capa nativa)"
                    className="w-full bg-[#181924] border border-neutral-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!subjName.trim()) return;
                    const careers = subjTargetCareers.split(',').map((c) => c.trim()).filter(Boolean);
                    onSaveSubject({
                      id: subjEditingId || undefined,
                      name: subjName.trim(),
                      shortName: subjShortName || subjName.trim(),
                      category: subjCategory,
                      description: subjDescription.trim(),
                      targetCareers: careers.length > 0 ? careers : ['PF', 'PRF', 'PC'],
                      coverImageUrl: subjCoverUrl.trim() || undefined,
                    });
                    setSubjEditingId(null);
                    setSubjName('');
                    setSubjDescription('');
                    setSubjCoverUrl('');
                  }}
                  className="px-4 py-2 bg-[#E50914] hover:bg-[#c90712] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {subjEditingId ? 'Salvar Alterações da Matéria' : 'Cadastrar Matéria'}
                </button>
                {subjEditingId && (
                  <button
                    onClick={() => {
                      setSubjEditingId(null);
                      setSubjName('');
                      setSubjDescription('');
                      setSubjCoverUrl('');
                    }}
                    className="px-3 py-2 bg-neutral-800 text-neutral-300 hover:text-white text-xs rounded"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>

            {/* List of 15 Subjects */}
            <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-5">
              <h3 className="font-display font-bold text-base text-white mb-3">
                Disciplinas do Sistema ({subjects.length})
              </h3>
              <div className="divide-y divide-neutral-800">
                {subjects.map((subj) => {
                  const sMods = modules.filter((m) => m.subjectId === subj.id);
                  const sLessons = lessons.filter((l) => l.subjectId === subj.id);

                  return (
                    <div key={subj.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{subj.name}</span>
                          <span className="text-[10px] uppercase font-semibold text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                            {subj.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {sMods.length} módulos · {sLessons.length} aulas · Alvo: {subj.targetCareers.join(', ')}
                          {subj.coverImageUrl && ' · [Capa personalizada ativa]'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSubjEditingId(subj.id);
                            setSubjName(subj.name);
                            setSubjShortName(subj.shortName || '');
                            setSubjCategory(subj.category);
                            setSubjDescription(subj.description);
                            setSubjCoverUrl(subj.coverImageUrl || '');
                            setSubjTargetCareers(subj.targetCareers.join(', '));
                          }}
                          className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                          title="Editar matéria e capa"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Deseja excluir a matéria "${subj.name}" e todo seu conteúdo?`)) {
                              onDeleteSubject(subj.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                          title="Excluir matéria"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: RESTAURAR DADOS / SISTEMA ==================== */}
        {activeAdminTab === 'system' && (
          <div className="bg-[#12131b] border border-neutral-800 rounded-xl p-6 max-w-2xl">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Restauração e Manutenção de Dados
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Caso deseje recarregar a grade completa padrão com as 15 disciplinas e 77 módulos originais especificados no edital, utilize o botão abaixo.
            </p>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Redefinir para Grade Padrão</p>
                <p className="text-xs text-neutral-500 mt-0.5">Restaura 15 matérias, 77 módulos e aulas iniciais do edital.</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Tem certeza de que deseja restaurar a grade de matérias original com os 77 módulos?')) {
                    onResetCatalog();
                    alert('Catálogo restaurado com sucesso!');
                  }
                }}
                className="px-4 py-2 bg-[#E50914] hover:bg-[#c90712] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Restaurar Padrão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
