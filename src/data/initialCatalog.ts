import { Subject, Module, Lesson } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    "id": "lingua-portuguesa",
    "name": "Língua Portuguesa",
    "shortName": "Português",
    "category": "Básicas",
    "description": "Interpretação de textos, gramática normativa, sintaxe, concordância e redação oficial para carreiras policiais.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC",
      "PM"
    ],
    "visualKey": "portugues",
    "accentColor": "#E50914",
    "order": 1
  },
  {
    "id": "informatica",
    "name": "Informática",
    "shortName": "Informática",
    "category": "Básicas",
    "description": "Segurança da informação, redes de computadores, sistemas operacionais e ferramentas de produtividade.",
    "targetCareers": [
      "PF",
      "PC",
      "PRF"
    ],
    "visualKey": "informatica",
    "accentColor": "#00D2D3",
    "order": 2
  },
  {
    "id": "raciocinio-logico",
    "name": "Raciocínio Lógico",
    "shortName": "RLM",
    "category": "Básicas",
    "description": "Lógica proposicional, diagramas lógicos, equivalências, negações e raciocínio quantitativo.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC",
      "PM"
    ],
    "visualKey": "raciocinio-logico",
    "accentColor": "#FF9F43",
    "order": 3
  },
  {
    "id": "direito-administrativo",
    "name": "Direito Administrativo",
    "shortName": "Dir. Administrativo",
    "category": "Direito",
    "description": "Regime jurídico-administrativo, princípios constitucionais, poderes, atos administrativos e responsabilidade civil do Estado.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC",
      "PM"
    ],
    "visualKey": "direito-administrativo",
    "accentColor": "#54A0FF",
    "order": 4
  },
  {
    "id": "direito-constitucional",
    "name": "Direito Constitucional",
    "shortName": "Dir. Constitucional",
    "category": "Direito",
    "description": "Constituição Federal de 1988, direitos fundamentais, organização dos poderes e segurança pública.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC",
      "DEPEN"
    ],
    "visualKey": "direito-constitucional",
    "accentColor": "#10AC84",
    "order": 5
  },
  {
    "id": "direito-penal",
    "name": "Direito Penal",
    "shortName": "Dir. Penal",
    "category": "Direito",
    "description": "Teoria do crime, tipicidade, antijuridicidade, culpabilidade, crimes contra a pessoa e contra o patrimônio.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC",
      "PM"
    ],
    "visualKey": "direito-penal",
    "accentColor": "#EE5253",
    "order": 6
  },
  {
    "id": "direito-processual-penal",
    "name": "Direito Processual Penal",
    "shortName": "Proc. Penal",
    "category": "Direito",
    "description": "Inquérito policial, provas periciais, prisões cautelares, ação penal e garantias processuais do réu.",
    "targetCareers": [
      "PF",
      "PC",
      "PRF"
    ],
    "visualKey": "direito-processual-penal",
    "accentColor": "#FF6B6B",
    "order": 7
  },
  {
    "id": "legislacao-especial",
    "name": "Legislação Especial",
    "shortName": "Leg. Especial",
    "category": "Direito",
    "description": "Estatuto do Desarmamento, Lei de Drogas, Crimes Hediondos, Lei Maria da Penha e Organizações Criminosas.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC"
    ],
    "visualKey": "legislacao-especial",
    "accentColor": "#F368E0",
    "order": 8
  },
  {
    "id": "arquivologia",
    "name": "Arquivologia",
    "shortName": "Arquivologia",
    "category": "Específicas",
    "description": "Gestão de documentos públicos, teoria das três idades, métodos de arquivamento e conservação de acervos.",
    "targetCareers": [
      "PF - Administrativo",
      "PC"
    ],
    "visualKey": "arquivologia",
    "accentColor": "#48DBFB",
    "order": 9
  },
  {
    "id": "medicina-legal",
    "name": "Medicina Legal",
    "shortName": "Medicina Legal",
    "category": "Específicas",
    "description": "Traumatologia forense, tanatologia, sexologia e antropologia forense na perícia criminalística.",
    "targetCareers": [
      "PC - Perito/Papiloscopista",
      "PF"
    ],
    "visualKey": "medicina-legal",
    "accentColor": "#0ABDE3",
    "order": 10
  },
  {
    "id": "criminologia",
    "name": "Criminologia",
    "shortName": "Criminologia",
    "category": "Específicas",
    "description": "Escolas criminológicas, teorias do delito, vitimologia, controle social e prevenção da criminalidade moderna.",
    "targetCareers": [
      "PC - Delegado/Investigador"
    ],
    "visualKey": "criminologia",
    "accentColor": "#5f27cd",
    "order": 11
  },
  {
    "id": "etica",
    "name": "Ética",
    "shortName": "Ética no Serviço Público",
    "category": "Básicas",
    "description": "Código de Ética do Servidor Público Federal, Decreto 1.171/94 e princípios da conduta proba na polícia.",
    "targetCareers": [
      "PF",
      "PRF",
      "PC"
    ],
    "visualKey": "etica",
    "accentColor": "#FF9F43",
    "order": 12
  },
  {
    "id": "direitos-humanos",
    "name": "Direitos Humanos",
    "shortName": "Direitos Humanos",
    "category": "Policial",
    "description": "Declaração Universal dos Direitos Humanos, Sistema Interamericano e uso proporcional da força policial.",
    "targetCareers": [
      "PRF",
      "PC",
      "PM",
      "DEPEN"
    ],
    "visualKey": "direitos-humanos",
    "accentColor": "#2ED573",
    "order": 13
  },
  {
    "id": "legislacao-prf",
    "name": "Legislação da PRF",
    "shortName": "Legislação de Trânsito",
    "category": "Policial",
    "description": "Código de Trânsito Brasileiro (CTB), resoluções do CONTRAN, fiscalização viária e crimes de trânsito.",
    "targetCareers": [
      "PRF"
    ],
    "visualKey": "legislacao-prf",
    "accentColor": "#FFD32A",
    "order": 14
  },
  {
    "id": "lei-execucao-penal",
    "name": "Lei de Execução Penal",
    "shortName": "LEP (Lei 7.210)",
    "category": "Policial",
    "description": "Regimes prisionais, progressão, remição de pena, direitos e deveres dos apenados e RDD.",
    "targetCareers": [
      "Polícia Penal",
      "DEPEN",
      "PC"
    ],
    "visualKey": "lei-execucao-penal",
    "accentColor": "#EA2027",
    "order": 15
  }
];

export const INITIAL_MODULES: Module[] = [
  {
    "id": "mod-lp-1",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "title": "Módulo 1 – Interpretação de Texto"
  },
  {
    "id": "mod-lp-2",
    "subjectId": "lingua-portuguesa",
    "order": 2,
    "title": "Módulo 2 – Concordância Verbal e Nominal"
  },
  {
    "id": "mod-lp-3",
    "subjectId": "lingua-portuguesa",
    "order": 3,
    "title": "Módulo 3 – Sintaxe e Pontuação"
  },
  {
    "id": "mod-lp-4",
    "subjectId": "lingua-portuguesa",
    "order": 4,
    "title": "Módulo 4 – Regência Verbal e Nominal e Crase"
  },
  {
    "id": "mod-lp-5",
    "subjectId": "lingua-portuguesa",
    "order": 5,
    "title": "Módulo 5 – Coesão e Conectivos"
  },
  {
    "id": "mod-inf-1",
    "subjectId": "informatica",
    "order": 1,
    "title": "Módulo 1 – Segurança da Informação"
  },
  {
    "id": "mod-inf-2",
    "subjectId": "informatica",
    "order": 2,
    "title": "Módulo 2 – Internet e Navegadores"
  },
  {
    "id": "mod-inf-3",
    "subjectId": "informatica",
    "order": 3,
    "title": "Módulo 3 – Pacote Office"
  },
  {
    "id": "mod-inf-4",
    "subjectId": "informatica",
    "order": 4,
    "title": "Módulo 4 – Sistemas Operacionais"
  },
  {
    "id": "mod-inf-5",
    "subjectId": "informatica",
    "order": 5,
    "title": "Módulo 5 – Redes de Computadores"
  },
  {
    "id": "mod-inf-6",
    "subjectId": "informatica",
    "order": 6,
    "title": "Módulo 6 – Hardware e Conceitos Fundamentais"
  },
  {
    "id": "mod-rl-1",
    "subjectId": "raciocinio-logico",
    "order": 1,
    "title": "Módulo 1 – Lógica Proposicional"
  },
  {
    "id": "mod-rl-2",
    "subjectId": "raciocinio-logico",
    "order": 2,
    "title": "Módulo 2 – Argumentação Lógica"
  },
  {
    "id": "mod-rl-3",
    "subjectId": "raciocinio-logico",
    "order": 3,
    "title": "Módulo 3 – Diagramas e Teoria dos Conjuntos"
  },
  {
    "id": "mod-rl-4",
    "subjectId": "raciocinio-logico",
    "order": 4,
    "title": "Módulo 4 – Lógica Situacional"
  },
  {
    "id": "mod-da-1",
    "subjectId": "direito-administrativo",
    "order": 1,
    "title": "Módulo 1 – Princípios da Administração Pública"
  },
  {
    "id": "mod-da-2",
    "subjectId": "direito-administrativo",
    "order": 2,
    "title": "Módulo 2 – Atos Administrativos"
  },
  {
    "id": "mod-da-3",
    "subjectId": "direito-administrativo",
    "order": 3,
    "title": "Módulo 3 – Responsabilidade Civil do Estado"
  },
  {
    "id": "mod-da-4",
    "subjectId": "direito-administrativo",
    "order": 4,
    "title": "Módulo 4 – Agentes Públicos"
  },
  {
    "id": "mod-da-5",
    "subjectId": "direito-administrativo",
    "order": 5,
    "title": "Módulo 5 – Improbidade Administrativa"
  },
  {
    "id": "mod-da-6",
    "subjectId": "direito-administrativo",
    "order": 6,
    "title": "Módulo 6 – Poderes Administrativos"
  },
  {
    "id": "mod-dc-1",
    "subjectId": "direito-constitucional",
    "order": 1,
    "title": "Módulo 1 – Direitos e Garantias Fundamentais"
  },
  {
    "id": "mod-dc-2",
    "subjectId": "direito-constitucional",
    "order": 2,
    "title": "Módulo 2 – Organização do Estado e Competências"
  },
  {
    "id": "mod-dc-3",
    "subjectId": "direito-constitucional",
    "order": 3,
    "title": "Módulo 3 – Organização dos Poderes"
  },
  {
    "id": "mod-dc-4",
    "subjectId": "direito-constitucional",
    "order": 4,
    "title": "Módulo 4 – Controle de Constitucionalidade"
  },
  {
    "id": "mod-dc-5",
    "subjectId": "direito-constitucional",
    "order": 5,
    "title": "Módulo 5 – Administração Pública"
  },
  {
    "id": "mod-dc-6",
    "subjectId": "direito-constitucional",
    "order": 6,
    "title": "Módulo 6 – Segurança Pública"
  },
  {
    "id": "mod-dp-1",
    "subjectId": "direito-penal",
    "order": 1,
    "title": "Módulo 1 – Teoria do Crime"
  },
  {
    "id": "mod-dp-2",
    "subjectId": "direito-penal",
    "order": 2,
    "title": "Módulo 2 – Excludentes de Ilicitude"
  },
  {
    "id": "mod-dp-3",
    "subjectId": "direito-penal",
    "order": 3,
    "title": "Módulo 3 – Crimes Contra a Pessoa"
  },
  {
    "id": "mod-dp-4",
    "subjectId": "direito-penal",
    "order": 4,
    "title": "Módulo 4 – Crimes Contra o Patrimônio"
  },
  {
    "id": "mod-dp-5",
    "subjectId": "direito-penal",
    "order": 5,
    "title": "Módulo 5 – Excludentes de Culpabilidade"
  },
  {
    "id": "mod-dp-6",
    "subjectId": "direito-penal",
    "order": 6,
    "title": "Módulo 6 – Iter Criminis"
  },
  {
    "id": "mod-dp-7",
    "subjectId": "direito-penal",
    "order": 7,
    "title": "Módulo 7 – Crimes de Trânsito"
  },
  {
    "id": "mod-dpp-1",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "title": "Módulo 1 – Inquérito Policial"
  },
  {
    "id": "mod-dpp-2",
    "subjectId": "direito-processual-penal",
    "order": 2,
    "title": "Módulo 2 – Prisão e Medidas Cautelares"
  },
  {
    "id": "mod-dpp-3",
    "subjectId": "direito-processual-penal",
    "order": 3,
    "title": "Módulo 3 – Provas"
  },
  {
    "id": "mod-dpp-4",
    "subjectId": "direito-processual-penal",
    "order": 4,
    "title": "Módulo 4 – Ação Penal"
  },
  {
    "id": "mod-dpp-5",
    "subjectId": "direito-processual-penal",
    "order": 5,
    "title": "Módulo 5 – Princípios do Processo Penal e Competência"
  },
  {
    "id": "mod-le-1",
    "subjectId": "legislacao-especial",
    "order": 1,
    "title": "Módulo 1 – Lei de Drogas"
  },
  {
    "id": "mod-le-2",
    "subjectId": "legislacao-especial",
    "order": 2,
    "title": "Módulo 2 – Lei Maria da Penha"
  },
  {
    "id": "mod-le-3",
    "subjectId": "legislacao-especial",
    "order": 3,
    "title": "Módulo 3 – Crimes Hediondos"
  },
  {
    "id": "mod-le-4",
    "subjectId": "legislacao-especial",
    "order": 4,
    "title": "Módulo 4 – Estatuto do Desarmamento"
  },
  {
    "id": "mod-le-5",
    "subjectId": "legislacao-especial",
    "order": 5,
    "title": "Módulo 5 – Organização Criminosa"
  },
  {
    "id": "mod-arq-1",
    "subjectId": "arquivologia",
    "order": 1,
    "title": "Módulo 1 – Gestão de Documentos e Teoria das Três Idades"
  },
  {
    "id": "mod-arq-2",
    "subjectId": "arquivologia",
    "order": 2,
    "title": "Módulo 2 – Conceitos Fundamentais e Princípios Arquivísticos"
  },
  {
    "id": "mod-arq-3",
    "subjectId": "arquivologia",
    "order": 3,
    "title": "Módulo 3 – Organização e Métodos de Arquivamento"
  },
  {
    "id": "mod-arq-4",
    "subjectId": "arquivologia",
    "order": 4,
    "title": "Módulo 4 – Protocolo e Funções Arquivísticas"
  },
  {
    "id": "mod-arq-5",
    "subjectId": "arquivologia",
    "order": 5,
    "title": "Módulo 5 – Legislação Arquivística Brasileira"
  },
  {
    "id": "mod-ml-1",
    "subjectId": "medicina-legal",
    "order": 1,
    "title": "Módulo 1 – Traumatologia Forense"
  },
  {
    "id": "mod-ml-2",
    "subjectId": "medicina-legal",
    "order": 2,
    "title": "Módulo 2 – Tanatologia Forense"
  },
  {
    "id": "mod-ml-3",
    "subjectId": "medicina-legal",
    "order": 3,
    "title": "Módulo 3 – Sexologia Forense"
  },
  {
    "id": "mod-ml-4",
    "subjectId": "medicina-legal",
    "order": 4,
    "title": "Módulo 4 – Psiquiatria Forense"
  },
  {
    "id": "mod-ml-5",
    "subjectId": "medicina-legal",
    "order": 5,
    "title": "Módulo 5 – Antropologia Forense e Identificação Humana"
  },
  {
    "id": "mod-crim-1",
    "subjectId": "criminologia",
    "order": 1,
    "title": "Módulo 1 – Teorias Criminológicas"
  },
  {
    "id": "mod-crim-2",
    "subjectId": "criminologia",
    "order": 2,
    "title": "Módulo 2 – Conceito, Objeto, Método e Escolas Criminológicas"
  },
  {
    "id": "mod-crim-3",
    "subjectId": "criminologia",
    "order": 3,
    "title": "Módulo 3 – Temas Contemporâneos da Criminologia"
  },
  {
    "id": "mod-crim-4",
    "subjectId": "criminologia",
    "order": 4,
    "title": "Módulo 4 – Vitimologia"
  },
  {
    "id": "mod-crim-5",
    "subjectId": "criminologia",
    "order": 5,
    "title": "Módulo 5 – Prevenção Criminal e Controle Social"
  },
  {
    "id": "mod-et-1",
    "subjectId": "etica",
    "order": 1,
    "title": "Módulo 1 – Princípios da Administração Pública"
  },
  {
    "id": "mod-et-2",
    "subjectId": "etica",
    "order": 2,
    "title": "Módulo 2 – Código de Ética do Servidor Público"
  },
  {
    "id": "mod-et-3",
    "subjectId": "etica",
    "order": 3,
    "title": "Módulo 3 – Lei de Improbidade Administrativa"
  },
  {
    "id": "mod-et-4",
    "subjectId": "etica",
    "order": 4,
    "title": "Módulo 4 – Conflito de Interesse"
  },
  {
    "id": "mod-dh-1",
    "subjectId": "direitos-humanos",
    "order": 1,
    "title": "Módulo 1 – Declaração Universal dos Direitos Humanos (DUDH)"
  },
  {
    "id": "mod-dh-2",
    "subjectId": "direitos-humanos",
    "order": 2,
    "title": "Módulo 2 – Sistema Interamericano de Direitos Humanos"
  },
  {
    "id": "mod-dh-3",
    "subjectId": "direitos-humanos",
    "order": 3,
    "title": "Módulo 3 – Incorporação de Tratados de Direitos Humanos ao Direito Brasileiro"
  },
  {
    "id": "mod-dh-4",
    "subjectId": "direitos-humanos",
    "order": 4,
    "title": "Módulo 4 – Proibição da Tortura, Uso da Força e Abuso de Autoridade"
  },
  {
    "id": "mod-dh-5",
    "subjectId": "direitos-humanos",
    "order": 5,
    "title": "Módulo 5 – PNDH, Gerações/Dimensões e Princípios dos Direitos Humanos"
  },
  {
    "id": "mod-prf-1",
    "subjectId": "legislacao-prf",
    "order": 1,
    "title": "Módulo 1 – Infrações e Penalidades"
  },
  {
    "id": "mod-prf-2",
    "subjectId": "legislacao-prf",
    "order": 2,
    "title": "Módulo 2 – Crimes de Trânsito"
  },
  {
    "id": "mod-prf-3",
    "subjectId": "legislacao-prf",
    "order": 3,
    "title": "Módulo 3 – Resoluções do CONTRAN"
  },
  {
    "id": "mod-prf-4",
    "subjectId": "legislacao-prf",
    "order": 4,
    "title": "Módulo 4 – Normas de Circulação e Conduta"
  },
  {
    "id": "mod-prf-5",
    "subjectId": "legislacao-prf",
    "order": 5,
    "title": "Módulo 5 – Sistema de Trânsito e Habilitação"
  },
  {
    "id": "mod-lep-1",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "title": "Módulo 1 – Progressão e Regressão de Regime"
  },
  {
    "id": "mod-lep-2",
    "subjectId": "lei-execucao-penal",
    "order": 2,
    "title": "Módulo 2 – Remição de Pena"
  },
  {
    "id": "mod-lep-3",
    "subjectId": "lei-execucao-penal",
    "order": 3,
    "title": "Módulo 3 – Direitos e Deveres do Preso"
  },
  {
    "id": "mod-lep-4",
    "subjectId": "lei-execucao-penal",
    "order": 4,
    "title": "Módulo 4 – Faltas Disciplinares e Regime Disciplinar Diferenciado (RDD)"
  },
  {
    "id": "mod-lep-5",
    "subjectId": "lei-execucao-penal",
    "order": 5,
    "title": "Módulo 5 – Livramento Condicional e Saída Temporária"
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    "id": "les-lp-101",
    "moduleId": "mod-lp-1",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "number": "Aula 01",
    "title": "Introdução à Interpretação",
    "youtubeUrl": "https://www.youtube.com/watch?v=22iA3PPjr7c&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB",
    "youtubeId": "22iA3PPjr7c",
    "duration": "28:15",
    "summary": "Conceitos basilares de compreensão vs interpretação de texto, tipologia textual e identificação de tese."
  },
  {
    "id": "les-lp-102",
    "moduleId": "mod-lp-1",
    "subjectId": "lingua-portuguesa",
    "order": 2,
    "number": "Aula 02",
    "title": "Compreensão Textual",
    "youtubeUrl": "https://www.youtube.com/watch?v=IYlsViWKZAA",
    "youtubeId": "IYlsViWKZAA",
    "duration": "32:40",
    "summary": "Distinção entre elementos explícitos no texto e inferências lógicas válidas nas bancas de concurso."
  },
  {
    "id": "les-lp-103",
    "moduleId": "mod-lp-1",
    "subjectId": "lingua-portuguesa",
    "order": 3,
    "number": "Aula 03",
    "title": "Interpretação de Textos em Questões",
    "youtubeUrl": "https://youtube.com/watch?v=z0PX0-KjI6U&pp=ygUUY29tcHJlZW5zw6NvIHRleHR1YWw%3D",
    "youtubeId": "z0PX0-KjI6U",
    "duration": "35:10",
    "summary": "Resolução prática de questões recentes de bancas policiais (Cebraspe, FGV e Vunesp)."
  },
  {
    "id": "les-inf-101",
    "moduleId": "mod-inf-1",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula 0",
    "title": "Princípios da Segurança da Informação (CIDR)",
    "youtubeUrl": "https://www.youtube.com/watch?v=X2wgk02Bqt0",
    "youtubeId": "X2wgk02Bqt0",
    "duration": "25:50",
    "summary": "Confidencialidade, Integridade, Disponibilidade, Autenticidade e Não-repúdio."
  },
  {
    "id": "les-rl-101",
    "moduleId": "mod-rl-1",
    "subjectId": "raciocinio-logico",
    "order": 1,
    "number": "Aula 01",
    "title": "Conceito de Proposição e Conectivos Lógicos",
    "youtubeUrl": "https://www.youtube.com/watch?v=_yMyiFxJ10U",
    "youtubeId": "_yMyiFxJ10U",
    "duration": "27:45",
    "summary": "Identificação de sentenças abertas, proposições simples e compostas e conectivos (E, OU, SE... ENTÃO)."
  },
  {
    "id": "les-rl-102",
    "moduleId": "mod-rl-1",
    "subjectId": "raciocinio-logico",
    "order": 2,
    "number": "Aula 02",
    "title": "parte 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=xBlLfzrRbHo",
    "youtubeId": "xBlLfzrRbHo",
    "duration": "34:10",
    "summary": "Regras práticas de valoração de conjunção, disjunção, condicional e bicondicional."
  },
  {
    "id": "les-dp-101",
    "moduleId": "mod-dp-1",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "teoria do crime",
    "youtubeUrl": "https://www.youtube.com/watch?v=3TltdLt49rU",
    "youtubeId": "3TltdLt49rU",
    "duration": "42:15",
    "summary": "Estrutura tripartida do crime: Fato Típico, Ilicitude e Culpabilidade. Conduta dolosa e culposa."
  },
  {
    "id": "les-dc-101",
    "moduleId": "mod-dc-1",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Artigo 5º da CF/88: Direitos Individuais e Coletivos",
    "youtubeUrl": "https://www.youtube.com/watch?v=LoAGKCtsc8k",
    "youtubeId": "LoAGKCtsc8k",
    "duration": "40:30",
    "summary": "Inviolabilidade do domicílio, sigilo das comunicações e remédios constitucionais."
  },
  {
    "id": "les-prf-101",
    "moduleId": "mod-prf-1",
    "subjectId": "legislacao-prf",
    "order": 1,
    "number": "Aula 01",
    "title": "infraçõs de transito",
    "youtubeUrl": "https://www.youtube.com/watch?v=sfSe2vQmOgM",
    "youtubeId": "sfSe2vQmOgM",
    "duration": "31:20",
    "summary": "Estrutura do SNT, competências específicas da Polícia Rodoviária Federal nas rodovias federais."
  },
  {
    "id": "les-dpp-101",
    "moduleId": "mod-dpp-1",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "number": "Aula",
    "title": "Natureza e Características do Inquérito Policial",
    "youtubeUrl": "https://www.youtube.com/watch?v=52xdtjEdYdA",
    "youtubeId": "52xdtjEdYdA",
    "duration": "36:45",
    "summary": "Características: escrito, inquisitivo, sigiloso, oficial, indispensável e indisponível."
  },
  {
    "id": "les-mod-lp-2-01",
    "moduleId": "mod-lp-2",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "number": "Aula 01",
    "title": "Concordância Verbal e Nominal –",
    "youtubeUrl": "https://www.youtube.com/watch?v=jdqhnVUvqOc&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=7",
    "youtubeId": "jdqhnVUvqOc",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Concordância Verbal e Nominal cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lp-2-02",
    "moduleId": "mod-lp-2",
    "subjectId": "lingua-portuguesa",
    "order": 2,
    "number": "Aula 02",
    "title": "Concordância Verbal e Nominal –2",
    "youtubeUrl": "https://youtube.com/watch?v=WWk4ef_x_sw&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=17&pp=iAQB",
    "youtubeId": "WWk4ef_x_sw",
    "duration": "30:20",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Concordância Verbal e Nominal."
  },
  {
    "id": "les-mod-lp-3-01",
    "moduleId": "mod-lp-3",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "number": "Aula 01",
    "title": "Sintaxe",
    "youtubeUrl": "https://www.youtube.com/watch?v=WZwRBcuf4hQ&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=4",
    "youtubeId": "WZwRBcuf4hQ",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Sintaxe e Pontuação cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lp-3-02",
    "moduleId": "mod-lp-3",
    "subjectId": "lingua-portuguesa",
    "order": 2,
    "number": "Aula 02",
    "title": "Pontuação –",
    "youtubeUrl": "https://www.youtube.com/watch?v=G8Stjzy-87k&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=26",
    "youtubeId": "G8Stjzy-87k",
    "duration": "27:45",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Sintaxe e Pontuação."
  },
  {
    "id": "les-mod-lp-4-01",
    "moduleId": "mod-lp-4",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "number": "Aula 01",
    "title": "Regência Verbal e Nominal",
    "youtubeUrl": "https://www.youtube.com/watch?v=1IRO-p95oo0&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=8",
    "youtubeId": "1IRO-p95oo0",
    "duration": "25:50",
    "summary": "Conceitos essenciais de Regência Verbal e Nominal e Crase cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lp-4-02",
    "moduleId": "mod-lp-4",
    "subjectId": "lingua-portuguesa",
    "order": 2,
    "number": "Aula 02",
    "title": "Crase – Resolução",
    "youtubeUrl": "https://www.youtube.com/watch?v=BA7OQ4wZWr0&list=PL2EIbkbKtDXrzQy5b1c3J7SKQaMbdgkqB&index=56",
    "youtubeId": "BA7OQ4wZWr0",
    "duration": "34:10",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Regência Verbal e Nominal e Crase."
  },
  {
    "id": "les-mod-lp-5-01",
    "moduleId": "mod-lp-5",
    "subjectId": "lingua-portuguesa",
    "order": 1,
    "number": "Aula",
    "title": "Coesão e Conectivos –",
    "youtubeUrl": "https://www.youtube.com/watch?v=f1vCAm294i8",
    "youtubeId": "f1vCAm294i8",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Coesão e Conectivos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-inf-2-01",
    "moduleId": "mod-inf-2",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula",
    "title": "Internet e Navegadores – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=k7vK0JTfTEA",
    "youtubeId": "k7vK0JTfTEA",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Internet e Navegadores cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-inf-3-01",
    "moduleId": "mod-inf-3",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula",
    "title": "Pacote Office – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=KOrkCwSww0U",
    "youtubeId": "KOrkCwSww0U",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Pacote Office cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-inf-4-01",
    "moduleId": "mod-inf-4",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula 01",
    "title": "Sistemas Operacionais – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=MkVvtFSxpNg",
    "youtubeId": "MkVvtFSxpNg",
    "duration": "38:00",
    "summary": "Conceitos essenciais de Sistemas Operacionais cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-inf-5-01",
    "moduleId": "mod-inf-5",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula 01",
    "title": "Redes de Computadores – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=G8twv6vSsXU",
    "youtubeId": "G8twv6vSsXU",
    "duration": "40:30",
    "summary": "Conceitos essenciais de Redes de Computadores cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-inf-6-01",
    "moduleId": "mod-inf-6",
    "subjectId": "informatica",
    "order": 1,
    "number": "Aula 0",
    "title": "Hardware e Conceitos Fundamentais – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=_p_YtjUGFkw",
    "youtubeId": "_p_YtjUGFkw",
    "duration": "31:20",
    "summary": "Conceitos essenciais de Hardware e Conceitos Fundamentais cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-rl-2-01",
    "moduleId": "mod-rl-2",
    "subjectId": "raciocinio-logico",
    "order": 1,
    "number": "Aula 01",
    "title": "conectivos logicos",
    "youtubeUrl": "https://www.youtube.com/watch?v=r0SvBhr0okk",
    "youtubeId": "r0SvBhr0okk",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Argumentação Lógica cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-rl-2-02",
    "moduleId": "mod-rl-2",
    "subjectId": "raciocinio-logico",
    "order": 2,
    "number": "Aula 02",
    "title": "parte 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=ZxEtxwh43gk",
    "youtubeId": "ZxEtxwh43gk",
    "duration": "25:50",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Argumentação Lógica."
  },
  {
    "id": "les-mod-rl-3-01",
    "moduleId": "mod-rl-3",
    "subjectId": "raciocinio-logico",
    "order": 1,
    "number": "Aula 01",
    "title": "Diagramas e Teoria dos Conjuntos – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=l_20kYKKZk0",
    "youtubeId": "l_20kYKKZk0",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Diagramas e Teoria dos Conjuntos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-rl-3-02",
    "moduleId": "mod-rl-3",
    "subjectId": "raciocinio-logico",
    "order": 2,
    "number": "Aula 02",
    "title": "parte 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=KqaLCFvCuCQ",
    "youtubeId": "KqaLCFvCuCQ",
    "duration": "30:20",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Diagramas e Teoria dos Conjuntos."
  },
  {
    "id": "les-mod-rl-4-01",
    "moduleId": "mod-rl-4",
    "subjectId": "raciocinio-logico",
    "order": 1,
    "number": "Aula 01",
    "title": "argumentação  logica",
    "youtubeUrl": "https://www.youtube.com/watch?v=Hi4Wlt51GO4",
    "youtubeId": "Hi4Wlt51GO4",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Lógica Situacional cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-1-01",
    "moduleId": "mod-da-1",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Princípios da Administração Pública – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=eAVIZ6LWg4U",
    "youtubeId": "eAVIZ6LWg4U",
    "duration": "25:50",
    "summary": "Conceitos essenciais de Princípios da Administração Pública cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-2-01",
    "moduleId": "mod-da-2",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Atos Administrativos –",
    "youtubeUrl": "https://www.youtube.com/watch?v=xUfpZFsH1H8",
    "youtubeId": "xUfpZFsH1H8",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Atos Administrativos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-3-01",
    "moduleId": "mod-da-3",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Responsabilidade Civil do Estado –",
    "youtubeUrl": "https://www.youtube.com/watch?v=cf39ZeYr7l0",
    "youtubeId": "cf39ZeYr7l0",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Responsabilidade Civil do Estado cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-3-02",
    "moduleId": "mod-da-3",
    "subjectId": "direito-administrativo",
    "order": 2,
    "number": "Aula 02",
    "title": "Responsabilidade Civil do Estado –parte 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=-n4Ymzl86aY",
    "youtubeId": "-n4Ymzl86aY",
    "duration": "38:00",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Responsabilidade Civil do Estado."
  },
  {
    "id": "les-mod-da-4-01",
    "moduleId": "mod-da-4",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Agentes Públicos – Fundamentos",
    "youtubeUrl": "https://www.youtube.com/watch?v=YBaVuK5Hth4",
    "youtubeId": "YBaVuK5Hth4",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Agentes Públicos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-5-01",
    "moduleId": "mod-da-5",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Improbidade Administrativa –",
    "youtubeUrl": "https://www.youtube.com/watch?v=LkpK6hCClcE",
    "youtubeId": "LkpK6hCClcE",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Improbidade Administrativa cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-da-5-02",
    "moduleId": "mod-da-5",
    "subjectId": "direito-administrativo",
    "order": 2,
    "number": "Aula 02",
    "title": "Improbidade Administrativa –",
    "youtubeUrl": "https://www.youtube.com/watch?v=g4m7RgJagFg",
    "youtubeId": "g4m7RgJagFg",
    "duration": "31:20",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Improbidade Administrativa."
  },
  {
    "id": "les-mod-da-6-01",
    "moduleId": "mod-da-6",
    "subjectId": "direito-administrativo",
    "order": 1,
    "number": "Aula 01",
    "title": "Poderes Administrativos –",
    "youtubeUrl": "https://www.youtube.com/watch?v=g4m7RgJagFg",
    "youtubeId": "g4m7RgJagFg",
    "duration": "38:00",
    "summary": "Conceitos essenciais de Poderes Administrativos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dc-2-01",
    "moduleId": "mod-dc-2",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Organização do Estado e Competências – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=8HDmbYeUuaY",
    "youtubeId": "8HDmbYeUuaY",
    "duration": "31:20",
    "summary": "Conceitos essenciais de Organização do Estado e Competências cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dc-2-02",
    "moduleId": "mod-dc-2",
    "subjectId": "direito-constitucional",
    "order": 2,
    "number": "Aula 02",
    "title": "Organização do Estado e Competências – 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=pg9SorCGwGI",
    "youtubeId": "pg9SorCGwGI",
    "duration": "32:40",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Organização do Estado e Competências."
  },
  {
    "id": "les-mod-dc-3-01",
    "moduleId": "mod-dc-3",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Organização dos Poderes –",
    "youtubeUrl": "https://www.youtube.com/watch?v=jMiN6HbxsZM",
    "youtubeId": "jMiN6HbxsZM",
    "duration": "36:45",
    "summary": "Conceitos essenciais de Organização dos Poderes cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dc-4-01",
    "moduleId": "mod-dc-4",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Controle de Constitucionalidade – 1",
    "youtubeUrl": "https://www.youtube.com/watch?v=22Q4VCTiJ44",
    "youtubeId": "22Q4VCTiJ44",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Controle de Constitucionalidade cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dc-4-02",
    "moduleId": "mod-dc-4",
    "subjectId": "direito-constitucional",
    "order": 2,
    "number": "Aula 02",
    "title": "Controle de Constitucionalidade –2",
    "youtubeUrl": "https://www.youtube.com/watch?v=CVNaIQbK6SM",
    "youtubeId": "CVNaIQbK6SM",
    "duration": "25:50",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Controle de Constitucionalidade."
  },
  {
    "id": "les-mod-dc-5-01",
    "moduleId": "mod-dc-5",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Administração Pública – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=FCHp8KUKmvc",
    "youtubeId": "FCHp8KUKmvc",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Administração Pública cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dc-6-01",
    "moduleId": "mod-dc-6",
    "subjectId": "direito-constitucional",
    "order": 1,
    "number": "Aula 01",
    "title": "Segurança Pública – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=EejsxTtflTg&t=79s",
    "youtubeId": "EejsxTtflTg",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Segurança Pública cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-2-01",
    "moduleId": "mod-dp-2",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Excludentes de Ilicitude –",
    "youtubeUrl": "https://www.youtube.com/watch?v=dlNkscEqZJk",
    "youtubeId": "dlNkscEqZJk",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Excludentes de Ilicitude cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-3-01",
    "moduleId": "mod-dp-3",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Crimes Contra a Pessoa – 1",
    "youtubeUrl": "https://www.youtube.com/watch?v=x0AmqeNeG10",
    "youtubeId": "x0AmqeNeG10",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Crimes Contra a Pessoa cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-3-02",
    "moduleId": "mod-dp-3",
    "subjectId": "direito-penal",
    "order": 2,
    "number": "Aula 02",
    "title": "Crimes Contra a Pessoa – 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=gFmWg2oPy94",
    "youtubeId": "gFmWg2oPy94",
    "duration": "38:00",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Crimes Contra a Pessoa."
  },
  {
    "id": "les-mod-dp-4-01",
    "moduleId": "mod-dp-4",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Crimes Contra o Patrimônio –",
    "youtubeUrl": "https://www.youtube.com/watch?v=fW7NLaBw8dA",
    "youtubeId": "fW7NLaBw8dA",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Crimes Contra o Patrimônio cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-5-01",
    "moduleId": "mod-dp-5",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Excludentes de Culpabilidade –",
    "youtubeUrl": "https://www.youtube.com/watch?v=gcIsFlaFtJw&t=805s",
    "youtubeId": "gcIsFlaFtJw",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Excludentes de Culpabilidade cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-6-01",
    "moduleId": "mod-dp-6",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Iter Criminis – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=iJuiQOKeF1g",
    "youtubeId": "iJuiQOKeF1g",
    "duration": "38:00",
    "summary": "Conceitos essenciais de Iter Criminis cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dp-7-01",
    "moduleId": "mod-dp-7",
    "subjectId": "direito-penal",
    "order": 1,
    "number": "Aula 01",
    "title": "Crimes de Trânsito –",
    "youtubeUrl": "https://www.youtube.com/watch?v=qZVuJk_Ooa0",
    "youtubeId": "qZVuJk_Ooa0",
    "duration": "40:30",
    "summary": "Conceitos essenciais de Crimes de Trânsito cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dpp-2-01",
    "moduleId": "mod-dpp-2",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "number": "Aula",
    "title": "Prisão e Medidas Cautelares –",
    "youtubeUrl": "https://www.youtube.com/watch?v=yNZz6hVPYG0",
    "youtubeId": "yNZz6hVPYG0",
    "duration": "36:45",
    "summary": "Conceitos essenciais de Prisão e Medidas Cautelares cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dpp-3-01",
    "moduleId": "mod-dpp-3",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "number": "Aula",
    "title": "Provas – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=vslnGUhPAkE",
    "youtubeId": "vslnGUhPAkE",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Provas cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dpp-4-01",
    "moduleId": "mod-dpp-4",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "number": "Aula 0",
    "title": "Ação Penal –",
    "youtubeUrl": "https://www.youtube.com/watch?v=Qbd_thbgA3c",
    "youtubeId": "Qbd_thbgA3c",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Ação Penal cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dpp-5-01",
    "moduleId": "mod-dpp-5",
    "subjectId": "direito-processual-penal",
    "order": 1,
    "number": "Aula",
    "title": "Princípios do Processo Penal e Competência –",
    "youtubeUrl": "https://www.youtube.com/watch?v=PXDBmD99NB4",
    "youtubeId": "PXDBmD99NB4",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Princípios do Processo Penal e Competência cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-le-1-01",
    "moduleId": "mod-le-1",
    "subjectId": "legislacao-especial",
    "order": 1,
    "number": "Aula 01",
    "title": "Lei de Drogas – 1",
    "youtubeUrl": "https://www.youtube.com/watch?v=9BfkXcgjyZY",
    "youtubeId": "9BfkXcgjyZY",
    "duration": "25:50",
    "summary": "Conceitos essenciais de Lei de Drogas cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-le-1-02",
    "moduleId": "mod-le-1",
    "subjectId": "legislacao-especial",
    "order": 2,
    "number": "Aula 02",
    "title": "Lei de Drogas – 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=kYY7IWj4j6I",
    "youtubeId": "kYY7IWj4j6I",
    "duration": "34:10",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Lei de Drogas."
  },
  {
    "id": "les-mod-le-2-01",
    "moduleId": "mod-le-2",
    "subjectId": "legislacao-especial",
    "order": 1,
    "number": "Aula",
    "title": "Lei Maria da Penha –",
    "youtubeUrl": "https://www.youtube.com/watch?v=HHi2L2srxdw",
    "youtubeId": "HHi2L2srxdw",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Lei Maria da Penha cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-le-3-01",
    "moduleId": "mod-le-3",
    "subjectId": "legislacao-especial",
    "order": 1,
    "number": "Aula",
    "title": "Crimes Hediondos –",
    "youtubeUrl": "https://www.youtube.com/watch?v=XGUAtqyMhNU",
    "youtubeId": "XGUAtqyMhNU",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Crimes Hediondos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-le-4-01",
    "moduleId": "mod-le-4",
    "subjectId": "legislacao-especial",
    "order": 1,
    "number": "Aula 01",
    "title": "Estatuto do Desarmamento",
    "youtubeUrl": "https://www.youtube.com/watch?v=ZpWpXJXB4fA",
    "youtubeId": "ZpWpXJXB4fA",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Estatuto do Desarmamento cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-le-4-02",
    "moduleId": "mod-le-4",
    "subjectId": "legislacao-especial",
    "order": 2,
    "number": "Aula 02",
    "title": "Estatuto do Desarmamento – 2",
    "youtubeUrl": "https://www.youtube.com/watch?v=RYSz6h_x290",
    "youtubeId": "RYSz6h_x290",
    "duration": "40:30",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Estatuto do Desarmamento."
  },
  {
    "id": "les-mod-le-5-01",
    "moduleId": "mod-le-5",
    "subjectId": "legislacao-especial",
    "order": 1,
    "number": "Aula",
    "title": "Organização Criminosa –",
    "youtubeUrl": "https://www.youtube.com/watch?v=8Z6brTvdCzw",
    "youtubeId": "8Z6brTvdCzw",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Organização Criminosa cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-arq-1-01",
    "moduleId": "mod-arq-1",
    "subjectId": "arquivologia",
    "order": 1,
    "number": "Aula",
    "title": "Gestão de Documentos e Teoria das Três Idades – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=CGK6s0zTtSE",
    "youtubeId": "CGK6s0zTtSE",
    "duration": "38:00",
    "summary": "Conceitos essenciais de Gestão de Documentos e Teoria das Três Idades cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-arq-2-01",
    "moduleId": "mod-arq-2",
    "subjectId": "arquivologia",
    "order": 1,
    "number": "Aula",
    "title": "Conceitos Fundamentais e Princípios Arquivísticos – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=SkZDrBYJ2cU&pp=ygVNQXJxdWl2b2xvZ2lhICBhdWxhIHNvYnJlICBDb25jZWl0b3MgRnVuZGFtZW50YWlzIGUgUHJpbmPDrXBpb3MgQXJxdWl2w61zdGljb3M%3D",
    "youtubeId": "SkZDrBYJ2cU",
    "duration": "40:30",
    "summary": "Conceitos essenciais de Conceitos Fundamentais e Princípios Arquivísticos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-arq-3-01",
    "moduleId": "mod-arq-3",
    "subjectId": "arquivologia",
    "order": 1,
    "number": "Aula 01",
    "title": "Organização e Métodos de Arquivamento – 1",
    "youtubeUrl": "https://www.youtube.com/watch?v=8YVbnn9mXrc",
    "youtubeId": "8YVbnn9mXrc",
    "duration": "31:20",
    "summary": "Conceitos essenciais de Organização e Métodos de Arquivamento cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-arq-3-02",
    "moduleId": "mod-arq-3",
    "subjectId": "arquivologia",
    "order": 2,
    "number": "Aula 02",
    "title": "Organização e Métodos de Arquivamento 2",
    "youtubeUrl": "https://youtube.com/watch?v=Fz1Hg0EVupQ&pp=ugUHEgVwdC1CUg%3D%3D",
    "youtubeId": "Fz1Hg0EVupQ",
    "duration": "32:40",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Organização e Métodos de Arquivamento."
  },
  {
    "id": "les-mod-arq-4-01",
    "moduleId": "mod-arq-4",
    "subjectId": "arquivologia",
    "order": 1,
    "number": "Aula",
    "title": "Protocolo e Funções Arquivísticas –",
    "youtubeUrl": "https://www.youtube.com/watch?v=PAGxRD4th9A",
    "youtubeId": "PAGxRD4th9A",
    "duration": "36:45",
    "summary": "Conceitos essenciais de Protocolo e Funções Arquivísticas cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-arq-5-01",
    "moduleId": "mod-arq-5",
    "subjectId": "arquivologia",
    "order": 1,
    "number": "Aula",
    "title": "Legislação Arquivística Brasileira –",
    "youtubeUrl": "https://www.youtube.com/watch?v=01dFOqeZTXk&pp=ygVCQXJxdWl2b2xvZ2lhICBhdWxhIHNvYnJlIOKAkyBMZWdpc2xhw6fDo28gQXJxdWl2w61zdGljYSBCcmFzaWxlaXJh",
    "youtubeId": "01dFOqeZTXk",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Legislação Arquivística Brasileira cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-ml-1-01",
    "moduleId": "mod-ml-1",
    "subjectId": "medicina-legal",
    "order": 1,
    "number": "Aula",
    "title": "Traumatologia Forense –",
    "youtubeUrl": "https://www.youtube.com/watch?v=mCUYf1Qluks",
    "youtubeId": "mCUYf1Qluks",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Traumatologia Forense cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-ml-2-01",
    "moduleId": "mod-ml-2",
    "subjectId": "medicina-legal",
    "order": 1,
    "number": "Aula",
    "title": "Tanatologia Forense –",
    "youtubeUrl": "https://www.youtube.com/watch?v=k6pmnc6zOVA",
    "youtubeId": "k6pmnc6zOVA",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Tanatologia Forense cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-ml-3-01",
    "moduleId": "mod-ml-3",
    "subjectId": "medicina-legal",
    "order": 1,
    "number": "Aula",
    "title": "Sexologia Forense",
    "youtubeUrl": "https://www.youtube.com/watch?v=b6EcwSrf6_U",
    "youtubeId": "b6EcwSrf6_U",
    "duration": "25:50",
    "summary": "Conceitos essenciais de Sexologia Forense cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-ml-4-01",
    "moduleId": "mod-ml-4",
    "subjectId": "medicina-legal",
    "order": 1,
    "number": "Aula 01",
    "title": "Psiquiatria Forense –",
    "youtubeUrl": "https://www.youtube.com/watch?v=-NFcI6M-1ho",
    "youtubeId": "-NFcI6M-1ho",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Psiquiatria Forense cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-ml-5-01",
    "moduleId": "mod-ml-5",
    "subjectId": "medicina-legal",
    "order": 1,
    "number": "Aula 0",
    "title": "Antropologia Forense e Identificação Humana",
    "youtubeUrl": "https://www.youtube.com/watch?v=Dn6qC22g6Qw",
    "youtubeId": "Dn6qC22g6Qw",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Antropologia Forense e Identificação Humana cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-crim-1-01",
    "moduleId": "mod-crim-1",
    "subjectId": "criminologia",
    "order": 1,
    "number": "Aula",
    "title": "Teorias Criminológicas –",
    "youtubeUrl": "https://youtube.com/watch?v=jPHJde1NXv0&pp=ygU1Q1JJTUlOT0xPR0lBIGF1bGEgc29icmUg4oCTICAgVGVvcmlhcyBDcmltaW5vbMOzZ2ljYXM%3D",
    "youtubeId": "jPHJde1NXv0",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Teorias Criminológicas cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-crim-2-01",
    "moduleId": "mod-crim-2",
    "subjectId": "criminologia",
    "order": 1,
    "number": "Aula",
    "title": "Conceito, Objeto, Método e Escolas Criminológicas – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=c9RM51Ig7To",
    "youtubeId": "c9RM51Ig7To",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Conceito, Objeto, Método e Escolas Criminológicas cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-crim-3-01",
    "moduleId": "mod-crim-3",
    "subjectId": "criminologia",
    "order": 1,
    "number": "Aula 01",
    "title": "Temas Contemporâneos da Criminologia",
    "youtubeUrl": "https://www.youtube.com/watch?v=Agfsv0Vw0Dk",
    "youtubeId": "Agfsv0Vw0Dk",
    "duration": "38:00",
    "summary": "Conceitos essenciais de Temas Contemporâneos da Criminologia cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-crim-4-01",
    "moduleId": "mod-crim-4",
    "subjectId": "criminologia",
    "order": 1,
    "number": "Aula",
    "title": "Vitimologia",
    "youtubeUrl": "https://www.youtube.com/watch?v=MZH75Cyq4kc",
    "youtubeId": "MZH75Cyq4kc",
    "duration": "40:30",
    "summary": "Conceitos essenciais de Vitimologia cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-crim-5-01",
    "moduleId": "mod-crim-5",
    "subjectId": "criminologia",
    "order": 1,
    "number": "Aula 01",
    "title": "Prevenção Criminal e Controle Social",
    "youtubeUrl": "https://www.youtube.com/watch?v=TRODoY3aftk&pp=ygVDQ1JJTUlOT0xPR0lBIGF1bGEgc29icmUg4oCTIFByZXZlbsOnw6NvIENyaW1pbmFsIGUgQ29udHJvbGUgU29jaWFsIA%3D%3D",
    "youtubeId": "TRODoY3aftk",
    "duration": "31:20",
    "summary": "Conceitos essenciais de Prevenção Criminal e Controle Social cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-et-1-01",
    "moduleId": "mod-et-1",
    "subjectId": "etica",
    "order": 1,
    "number": "Aula",
    "title": "Princípios da Administração Pública",
    "youtubeUrl": "https://www.youtube.com/watch?v=FIghHQZw9MQ&t=450s",
    "youtubeId": "FIghHQZw9MQ",
    "duration": "36:45",
    "summary": "Conceitos essenciais de Princípios da Administração Pública cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-et-2-01",
    "moduleId": "mod-et-2",
    "subjectId": "etica",
    "order": 1,
    "number": "Aula 01",
    "title": "Código de Ética do Servidor Público –",
    "youtubeUrl": "https://www.youtube.com/watch?v=KBB1p1IXFf4",
    "youtubeId": "KBB1p1IXFf4",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Código de Ética do Servidor Público cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-et-3-01",
    "moduleId": "mod-et-3",
    "subjectId": "etica",
    "order": 1,
    "number": "Aula 01",
    "title": "Lei de Improbidade Administrativa –",
    "youtubeUrl": "https://www.youtube.com/watch?v=PXFfF_cVUUk&t=735s",
    "youtubeId": "PXFfF_cVUUk",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Lei de Improbidade Administrativa cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-et-3-02",
    "moduleId": "mod-et-3",
    "subjectId": "etica",
    "order": 2,
    "number": "Aula 02",
    "title": "Lei de Improbidade Administrativa –2",
    "youtubeUrl": "https://www.youtube.com/watch?v=LkpK6hCClcE&t=286s",
    "youtubeId": "LkpK6hCClcE",
    "duration": "30:20",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Lei de Improbidade Administrativa."
  },
  {
    "id": "les-mod-et-4-01",
    "moduleId": "mod-et-4",
    "subjectId": "etica",
    "order": 1,
    "number": "Aula",
    "title": "Conflito de Interesse –",
    "youtubeUrl": "https://www.youtube.com/watch?v=fhP9yoOT8Jk",
    "youtubeId": "fhP9yoOT8Jk",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Conflito de Interesse cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dh-1-01",
    "moduleId": "mod-dh-1",
    "subjectId": "direitos-humanos",
    "order": 1,
    "number": "Aula",
    "title": "Declaração Universal dos Direitos Humanos (DUDH) – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=6GSRf9AIqig",
    "youtubeId": "6GSRf9AIqig",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Declaração Universal dos Direitos Humanos (DUDH) cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dh-2-01",
    "moduleId": "mod-dh-2",
    "subjectId": "direitos-humanos",
    "order": 1,
    "number": "Aula",
    "title": "Sistema Interamericano de Direitos Humanos – Fundamentos e Teoria",
    "youtubeUrl": "https://www.youtube.com/watch?v=DzMZ-_hOddw",
    "youtubeId": "DzMZ-_hOddw",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Sistema Interamericano de Direitos Humanos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dh-3-01",
    "moduleId": "mod-dh-3",
    "subjectId": "direitos-humanos",
    "order": 1,
    "number": "Aula",
    "title": "Incorporação de Tratados de Direitos Humanos ao Direito Brasileiro",
    "youtubeUrl": "https://www.youtube.com/watch?v=mnAgBG2T0eg&pp=ygVtZGlyZWl0b3MgaHVtYW5vcyAgYXVsYSBzb2JyZSDigJPigJMgSW5jb3Jwb3Jhw6fDo28gZGUgVHJhdGFkb3MgZGUgRGlyZWl0b3MgSHVtYW5vcyBhbyBEaXJlaXRvICBCcmFzaWxlaXJvIC4uLg%3D%3D",
    "youtubeId": "mnAgBG2T0eg",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Incorporação de Tratados de Direitos Humanos ao Direito Brasileiro cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dh-4-01",
    "moduleId": "mod-dh-4",
    "subjectId": "direitos-humanos",
    "order": 1,
    "number": "Aula",
    "title": "Proibição da Tortura, Uso da Força e Abuso de Autoridade",
    "youtubeUrl": "https://youtube.com/watch?v=6gKhpDK6KG4&pp=ygVhZGlyZWl0b3MgaHVtYW5vcyAgYXVsYSBzb2JyZSDigJMgUHJvaWJpw6fDo28gZGEgVG9ydHVyYSwgVXNvIGRhIEZvcsOnYSBlIEFidXNvIGRlICBBdXRvcmlkYWRlIC4uLg%3D%3D",
    "youtubeId": "6gKhpDK6KG4",
    "duration": "42:15",
    "summary": "Conceitos essenciais de Proibição da Tortura, Uso da Força e Abuso de Autoridade cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-dh-4-02",
    "moduleId": "mod-dh-4",
    "subjectId": "direitos-humanos",
    "order": 2,
    "number": "Aula 02",
    "title": "Proibição da Tortura, Uso da Força e Abuso de Autoridade 2",
    "youtubeUrl": "https://youtube.com/watch?v=bkHNjVWRfbI&pp=ugUHEgVwdC1QVA%3D%3D",
    "youtubeId": "bkHNjVWRfbI",
    "duration": "31:20",
    "summary": "Análise detalhada de pegadinhas e questões comentadas de Proibição da Tortura, Uso da Força e Abuso de Autoridade."
  },
  {
    "id": "les-mod-dh-5-01",
    "moduleId": "mod-dh-5",
    "subjectId": "direitos-humanos",
    "order": 1,
    "number": "Aula",
    "title": "PNDH, Gerações/Dimensões e Princípios dos Direitos Humanos –",
    "youtubeUrl": "https://www.youtube.com/watch?v=rZkMCpIkmlI&pp=ygVnZGlyZWl0b3MgaHVtYW5vcyAgYXVsYSBzb2JyZSDigJMgUE5ESCwgR2VyYcOnw7Vlcy9EaW1lbnPDtWVzIGUgUHJpbmPDrXBpb3MgZG9zIERpcmVpdG9zICBIdW1hbm9zIC4uLi4uLtIHCQkrDAGHKiGM7w%3D%3D",
    "youtubeId": "rZkMCpIkmlI",
    "duration": "38:00",
    "summary": "Conceitos essenciais de PNDH, Gerações/Dimensões e Princípios dos Direitos Humanos cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-prf-2-01",
    "moduleId": "mod-prf-2",
    "subjectId": "legislacao-prf",
    "order": 1,
    "number": "Aula 01",
    "title": "Crimes de Trânsito –",
    "youtubeUrl": "https://www.youtube.com/watch?v=E-wFnfglgoU",
    "youtubeId": "E-wFnfglgoU",
    "duration": "31:20",
    "summary": "Conceitos essenciais de Crimes de Trânsito cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-prf-3-01",
    "moduleId": "mod-prf-3",
    "subjectId": "legislacao-prf",
    "order": 1,
    "number": "Aula 01",
    "title": "Resoluções do CONTRAN",
    "youtubeUrl": "https://www.youtube.com/watch?v=Z1BI2Oij3eY",
    "youtubeId": "Z1BI2Oij3eY",
    "duration": "36:45",
    "summary": "Conceitos essenciais de Resoluções do CONTRAN cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-prf-4-01",
    "moduleId": "mod-prf-4",
    "subjectId": "legislacao-prf",
    "order": 1,
    "number": "Aula 01",
    "title": "Normas de Circulação e Conduta –",
    "youtubeUrl": "https://www.youtube.com/watch?v=I6c2ITlK6S0",
    "youtubeId": "I6c2ITlK6S0",
    "duration": "28:15",
    "summary": "Conceitos essenciais de Normas de Circulação e Conduta cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-prf-5-01",
    "moduleId": "mod-prf-5",
    "subjectId": "legislacao-prf",
    "order": 1,
    "number": "Aula 01",
    "title": "Sistema de Trânsito e Habilitação –",
    "youtubeUrl": "https://www.youtube.com/watch?v=mtUto_8f_Ow",
    "youtubeId": "mtUto_8f_Ow",
    "duration": "32:40",
    "summary": "Conceitos essenciais de Sistema de Trânsito e Habilitação cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lep-1-01",
    "moduleId": "mod-lep-1",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "number": "Aula",
    "title": "Progressão e Regressão de Regime",
    "youtubeUrl": "https://www.youtube.com/watch?v=J4gbJ5K9Hp4",
    "youtubeId": "J4gbJ5K9Hp4",
    "duration": "35:10",
    "summary": "Conceitos essenciais de Progressão e Regressão de Regime cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lep-2-01",
    "moduleId": "mod-lep-2",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "number": "Aula 0",
    "title": "Remição de Pena –",
    "youtubeUrl": "https://www.youtube.com/watch?v=y7BJ0Nt1TO0",
    "youtubeId": "y7BJ0Nt1TO0",
    "duration": "25:50",
    "summary": "Conceitos essenciais de Remição de Pena cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lep-3-01",
    "moduleId": "mod-lep-3",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "number": "Aula",
    "title": "Direitos e Deveres do Preso –",
    "youtubeUrl": "https://www.youtube.com/watch?v=wVlKOjHUdAA&t=4s",
    "youtubeId": "wVlKOjHUdAA",
    "duration": "30:20",
    "summary": "Conceitos essenciais de Direitos e Deveres do Preso cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lep-4-01",
    "moduleId": "mod-lep-4",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "number": "Aula",
    "title": "Faltas Disciplinares e Regime Disciplinar Diferenciado (RDD) –",
    "youtubeUrl": "https://www.youtube.com/watch?v=N_n3jZym78Q",
    "youtubeId": "N_n3jZym78Q",
    "duration": "27:45",
    "summary": "Conceitos essenciais de Faltas Disciplinares e Regime Disciplinar Diferenciado (RDD) cobrados pelas principais bancas de carreiras policiais."
  },
  {
    "id": "les-mod-lep-5-01",
    "moduleId": "mod-lep-5",
    "subjectId": "lei-execucao-penal",
    "order": 1,
    "number": "Aula",
    "title": "Livramento Condicional e Saída Temporária –",
    "youtubeUrl": "https://www.youtube.com/watch?v=Ie5_6EEh2c0&pp=ygU6YXVsYSBzb2JyZSAgIExJVlJBTUVOVE8gIENPTkRJQ0lPTkFMIEUgU0HDjURBICBURU1QT1LDgVJJQQ%3D%3D",
    "youtubeId": "Ie5_6EEh2c0",
    "duration": "34:10",
    "summary": "Conceitos essenciais de Livramento Condicional e Saída Temporária cobrados pelas principais bancas de carreiras policiais."
  }
];
