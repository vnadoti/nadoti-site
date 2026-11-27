/* ============================================================
   CATÁLOGO NADOTI — edite aqui para mudar o site.
   Cada produto vira um card, um canal no mixer do topo e uma
   página de detalhes (painel lateral).
   ============================================================ */

window.NADOTI_CONFIG = {
  // Troque pelo seu número (só dígitos, com DDI 55) — usado nos botões "Quero uma licença"
  whatsapp: "5517991231610",
  // E-mail de contato exibido no rodapé (deixe "" para esconder)
  email: "",
  instagram: "https://instagram.com/vnadoti",
  github: "https://github.com/vnadoti",
};

window.NADOTI_PRODUCTS = [
  {
    id: "madbass",
    // frase que aparece digitada no launcher do topo
    task: "criar uma linha de baixo pro meu beat",
    name: "MadBass",
    kind: "Plugin de áudio",
    category: "audio",
    tagline: "Basslines de Tech House em um puxão de alavanca.",
    description:
      "Gerador de basslines MIDI para Tech House. Escolha densidade, groove e humanização, puxe a alavanca e arraste o MIDI direto para a sua DAW. Feito pra quem quer sair do loop vazio e chegar no groove em segundos.",
    features: [
      "Gera linhas de baixo MIDI prontas para Tech House",
      "Seis knobs de controle: densidade, swing, humanize e mais",
      "STABILIZE trava as notas que você gostou e varia o resto",
      "Arraste o MIDI direto para Ableton, FL Studio, Logic, Reaper",
    ],
    platforms: ["Windows", "macOS"],
    formats: ["VST3", "AU", "Standalone"],
    status: "live",
    price: "R$ 49,90",
    priceNote: "licença vitalícia",
    image: "img/madbass.jpg",
    url: "https://madbassvst.vercel.app/",
    featured: true,
  },
  {
    id: "daw-manager",
    // frase que aparece digitada no launcher do topo
    task: "organizar meus projetos de música",
    name: "DAW Manager",
    kind: "App desktop",
    category: "windows",
    tagline: "Seu estúdio. Organizado.",
    description:
      "Encontra os projetos espalhados pelo seu computador — FL Studio, Ableton, Logic, REAPER, Cubase, Bitwig e Studio One — e organiza tudo com capa, BPM, tags e status. Tem quadro Kanban, checklists, gerenciador de samples com tom e BPM, criador de projetos e o Shuffle pra resgatar aquela ideia esquecida. 100% offline.",
    features: [
      "Biblioteca automática dos seus projetos, com capas, tags e prévia de áudio",
      "Quadro Kanban e checklists: Ideia → Produzindo → Mixagem → Master → Finalizado",
      "Sample Manager com detecção de tom e BPM e editor não destrutivo",
      "Shuffle: sorteia um projeto esquecido pra você terminar",
      "Uma licença ativa até 2 computadores",
    ],
    platforms: ["Windows", "macOS"],
    formats: ["App desktop"],
    status: "live",
    price: "R$ 97",
    priceNote: "vitalícia · 7 dias grátis",
    image: "img/daw_manager_board.webp",
    url: "https://daw-manager.vercel.app/",
    ctaLabel: "Testar grátis por 7 dias",
    featured: true,
  },
  {
    id: "pulso-live",
    // frase que aparece digitada no launcher do topo
    task: "descobrir o tom e o BPM dessa música",
    name: "Pulso Live",
    kind: "Plugin de áudio",
    category: "audio",
    tagline: "Tom e BPM de qualquer música, em tempo real.",
    description:
      "Coloque no Master, dê play e em poucos segundos aparece a tonalidade, a notação Camelot / Open Key e o BPM. No modo Standalone ele escuta o que toca no PC — Spotify, YouTube, navegador — sem cabo virtual.",
    features: [
      "Tonalidade em ~3 s e BPM em ~5–8 s",
      "Camelot e Open Key, pronto pra mixar em harmonia",
      "Intensidade das 12 notas ao vivo",
      "Arraste um arquivo e analise a faixa inteira",
    ],
    platforms: ["Windows", "macOS"],
    formats: ["VST3", "AU", "Standalone"],
    status: "live",
    price: "Valor em breve",
    priceNote: "site em breve",
    image: "img/pulso_live.png",
    url: "",
  },
  {
    id: "vtask",
    // frase que aparece digitada no launcher do topo
    task: "planejar minhas tarefas de hoje",
    name: "VTask",
    kind: "App para Windows",
    category: "windows",
    tagline: "Tarefas, calendário, hábitos e Pomodoro. Sem nuvem.",
    description:
      "Um app de produtividade nativo, leve e 100% local. Organize o dia, acompanhe seus hábitos e foque com o Pomodoro — seus dados ficam no seu computador, sem conta, sem assinatura de nuvem, sem IA espiando.",
    features: [
      "Tarefas, calendário, hábitos e Pomodoro integrados",
      "Nativo em Rust: abre na hora e quase não usa memória",
      "Dados locais, sem login e sem internet",
      "Instalador de um arquivo só, sem pedir administrador",
    ],
    platforms: ["Windows"],
    formats: ["App desktop"],
    status: "live",
    price: "Valor em breve",
    priceNote: "site em breve",
    image: "img/vtask.jpg",
    url: "",
  },
  {
    id: "mosaico",
    // frase que aparece digitada no launcher do topo
    task: "organizar as janelas abertas na tela",
    name: "Mosaico",
    kind: "App para Windows",
    category: "windows",
    tagline: "Suas janelas se organizam sozinhas, em mosaico.",
    description:
      "Um gerenciador de janelas em mosaico (tiling) para Windows 10 e 11, com motor próprio e tudo configurável pela interface — sem arquivo de configuração, sem linha de comando. Abriu uma janela, ela já encaixa no lugar. Cada monitor tem seus próprios workspaces e layouts.",
    features: [
      "Layouts BSP, colunas, grade, principal + pilha, ultrawide e monocle",
      "Workspaces por monitor e presets prontos: programação, ultrawide, foco total",
      "Arraste uma janela sobre outra e elas trocam de lugar, até entre monitores",
      "Atalhos globais editáveis, bordas coloridas e regras por app em 1 clique",
      "Leve: um processo só, orientado a eventos, sem polling",
    ],
    platforms: ["Windows 10", "Windows 11"],
    formats: ["App desktop"],
    status: "live",
    price: "Valor em breve",
    priceNote: "site em breve",
    image: "img/mosaico.jpg",
    imagePosition: "left top",
    url: "",
  },
  {
    id: "refcanvas",
    // frase que aparece digitada no launcher do topo
    task: "montar um painel de referências",
    name: "RefCanvas",
    kind: "Ferramenta para designers",
    category: "windows",
    free: true,
    tagline: "Seu quadro de referências para criar melhor. Grátis.",
    description:
      "Um canvas infinito de referências para ilustradores, artistas 3D, concept artists e designers. Jogue suas imagens, organize num clique e deixe tudo flutuando por cima do Blender, Photoshop ou Figma — sem travar o computador. Uma alternativa moderna e gratuita ao PureRef.",
    features: [
      "Modo Fantasma: as referências flutuam e os cliques passam direto pro seu software (Ctrl+Shift+G)",
      "Auto-organização: Ctrl+P arruma todas as imagens num grid compacto",
      "Paleta dominante: extrai as cores da referência e copia o HEX",
      "Modo Foco (Tab), opacidade ajustável e janela fixa no topo",
      "Nativo em C# / WebView2: abre na hora e gasta pouca memória",
    ],
    platforms: ["Windows"],
    formats: ["App desktop"],
    status: "live",
    price: "Grátis",
    priceNote: "freeware · sem pegadinha",
    image: "img/refcanvas.jpg",
    // download liberado só depois do e-mail; o link fica em api/subscribe.js
    gated: true,
    url: "",
  },
  {
    id: "ollo-reader",
    // frase que aparece digitada no launcher do topo
    task: "ler meus livros em EPUB e PDF",
    name: "Ollo Reader",
    kind: "App para Windows",
    category: "windows",
    tagline: "Seus livros EPUB e PDF, numa biblioteca bonita e offline.",
    description:
      "Um leitor moderno e rápido de EPUB e PDF para Windows. Organize sua biblioteca com capas, listas, favoritos e estrelas, e leia do seu jeito: paginado como um livro ou em rolagem contínua, com temas Claro, Sépia, Escuro e Preto. Tem até Speed Reader. Sem cadastro, sem nuvem, sem telemetria — seus livros ficam no seu computador.",
    features: [
      "Biblioteca visual com capas, busca, listas, favoritos e sincronização de pasta",
      "Modo paginado ou contínuo, em uma ou duas colunas",
      "Temas Claro, Sépia, Escuro e Preto (OLED); ajuste fonte, entrelinha e margens",
      "Marcadores, destaques e notas — e o progresso salvo em cada livro",
      "Speed Reader de 100 a 1.200 palavras por minuto (EPUB)",
      "100% offline, sem login, em português e inglês",
    ],
    platforms: ["Windows 10", "Windows 11"],
    formats: ["EPUB", "PDF"],
    status: "live",
    price: "R$ 29,90",
    priceNote: "vitalícia · 7 dias grátis",
    image: "img/ollo_reader.jpg",
    url: "https://olloreader.vercel.app/",
    ctaLabel: "Baixar e testar 7 dias",
  },
  {
    id: "yoink-md",
    // frase que aparece digitada no launcher do topo
    task: "transcrever um vídeo do YouTube",
    name: "Yoink.md",
    kind: "Extensão para Chrome",
    category: "ferramentas",
    tagline: "A transcrição de qualquer vídeo do YouTube, em .md, com 1 clique.",
    description:
      "Um painel ao lado do vídeo pega a transcrição inteira, separada por tempo e por capítulos. Busque, clique num trecho pra pular até ele e baixe tudo em Markdown — com título, canal, índice e link pro segundo exato de cada fala. Perfeito pra estudar, resumir aulas ou alimentar o seu Obsidian.",
    features: [
      "Transcrição completa, dividida por capítulos e agrupada por fala, 30 s, 1 ou 2 min",
      "Clique no tempo e o vídeo vai direto pro trecho; modo Seguir acompanha o vídeo",
      "Arquivo .md pronto pro Obsidian: cabeçalho, índice e links com o tempo exato",
      "Busca na transcrição, copiar e baixar com um clique",
      "10 transcrições grátis pra testar",
    ],
    platforms: ["Chrome"],
    formats: ["Extensão", "YouTube"],
    status: "soon",
    price: "R$ 19,90/mês",
    priceNote: "ilimitado · 10 grátis",
    image: "img/yoink_md_popup.jpg",
    url: "",
  },
];
