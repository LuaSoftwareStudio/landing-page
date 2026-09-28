export type KnowledgeArticle = {
  id: string;
  questions: string[];
  terms: string[];
  answer: string;
  suggestContact?: boolean;
  suggestions?: string[];
  related?: string[];
};

export const defaultSuggestions = [
  "O que a Lua faz?",
  "Quais serviços vocês oferecem?",
  "Como funciona o processo?",
  "Como falar com vocês?",
];

export const knowledgeBase: KnowledgeArticle[] = [
  {
    id: "about",
    questions: [
      "o que a lua faz",
      "quem e a lua",
      "o que e a lua software studio",
      "sobre a empresa",
      "o que voces fazem",
      "me fala da lua",
      "o que voces fazem exatamente",
      "me explica a lua",
    ],
    terms: ["lua", "studio", "empresa", "sobre", "historia", "faz"],
    answer:
      "A Lua Software Studio cria produtos digitais: sistemas, aplicativos, plataformas e experiências. O posicionamento é do problema ao produto — estratégia, design e tecnologia juntas, com clareza de produto, não só com código.",
    suggestions: ["Quais serviços vocês oferecem?", "Por que escolher a Lua?"],
    related: ["services", "why"],
  },
  {
    id: "tsuki",
    questions: [
      "quem e voce",
      "o que e o tsuki",
      "seu nome",
      "voce e um chatbot",
      "voce e um assistente",
    ],
    terms: ["tsuki", "mascote", "chatbot", "assistente", "bot"],
    answer:
      "Eu sou o Tsuki, mascote da Lua Software Studio. Respondo com o que está na nossa base pública: serviços, processo, prazos em linhas gerais e como falar com o time. Se a dúvida for do seu projeto, abro o caminho para a equipe.",
    suggestions: ["O que a Lua faz?", "Como falar com vocês?"],
    related: ["about", "contact"],
  },
  {
    id: "services",
    questions: [
      "quais servicos voces oferecem",
      "o que voces constroem",
      "quais produtos voces fazem",
      "no que voces atuam",
      "o que da pra construir com voces",
      "voces desenvolvem o que",
    ],
    terms: ["servico", "servicos", "oferece", "oferecem", "atuam"],
    answer:
      "Construímos quatro tipos de produto: sites e experiências digitais, sistemas internos, aplicativos e plataformas. Em todos, o ponto de partida é o problema do negócio. A tecnologia entra quando o caminho do produto já está claro.",
    suggestions: ["Vocês fazem sistemas internos?", "E aplicativos?"],
    related: ["sites", "systems", "apps", "platforms"],
  },
  {
    id: "sites",
    questions: [
      "voces fazem sites",
      "fazem landing page",
      "fazem site institucional",
      "experiencia digital",
      "site de conversao",
      "da pra fazer um site com voces",
      "criam paginas",
    ],
    terms: [
      "site",
      "sites",
      "landing",
      "institucional",
      "conversao",
      "funil",
      "marca",
      "web",
    ],
    answer:
      "Sim. Em sites e experiências digitais, a Lua cria páginas rápidas, claras e alinhadas ao negócio — da presença da marca até a conversão. Pode ser um site institucional, uma landing ou uma experiência pensada para o funil.",
    suggestions: ["E sistemas internos?", "Como começar um projeto?"],
    related: ["services", "platforms", "start"],
  },
  {
    id: "systems",
    questions: [
      "voces fazem sistemas internos",
      "fazem sistema sob medida",
      "substitui planilha",
      "sistema operacional para o time",
    ],
    terms: [
      "sistema",
      "sistemas",
      "interno",
      "internos",
      "operacao",
      "operacional",
      "erp",
      "planilha",
      "fluxo",
    ],
    answer:
      "Sim. Em sistemas internos, transformamos processos manuais em plataformas mais simples para o time operar com menos fricção. O recorte — o que entra no primeiro ciclo — fica claro na etapa de Descobrir.",
    suggestions: ["Como funciona o processo?", "Como começar um projeto?"],
    related: ["process", "platforms", "start"],
  },
  {
    id: "apps",
    questions: [
      "voces fazem aplicativo",
      "fazem app",
      "experiencia mobile",
      "aplicativo ponta a ponta",
      "consigo desenvolver um aplicativo com voces",
      "da pra fazer um app",
    ],
    terms: ["app", "aplicativo", "aplicativos", "mobile", "ios", "android"],
    answer:
      "Sim. Criamos experiências mobile pensadas para o uso real, do primeiro acesso à evolução depois do lançamento. Aplicativo entra quando o produto precisa acompanhar a pessoa no dia a dia — não só como um site.",
    suggestions: ["E plataformas?", "Como funciona o processo?"],
    related: ["platforms", "process", "evolve"],
  },
  {
    id: "platforms",
    questions: [
      "voces fazem plataformas",
      "produto digital completo",
      "plataforma para crescer",
    ],
    terms: ["plataforma", "plataformas", "ponta", "arquitetura"],
    answer:
      "Sim. Plataformas são produtos digitais completos, com arquitetura preparada para crescer depois da entrega. Entram quando o negócio precisa de mais de uma tela ou de um fluxo contínuo — não só de uma página.",
    suggestions: ["Por que escolher a Lua?", "Como começar um projeto?"],
    related: ["why", "systems", "start"],
  },
  {
    id: "ecommerce",
    questions: [
      "voces fazem ecommerce",
      "fazem loja virtual",
      "fazem marketplace",
    ],
    terms: ["ecommerce", "e-commerce", "loja", "marketplace", "vendas"],
    answer:
      "Não listamos e-commerce como um produto pronto. Se o negócio precisa de loja, catálogo ou um fluxo de vendas, o time avalia isso como um produto — site, sistema ou plataforma — a partir do problema, não de um pacote genérico.",
    suggestContact: true,
    suggestions: ["Quais serviços vocês oferecem?", "Como falar com vocês?"],
    related: ["services", "contact"],
  },
  {
    id: "why",
    questions: [
      "por que a lua",
      "por que escolher a lua",
      "o diferencial de voces",
      "o que diferencia a lua",
    ],
    terms: [
      "diferencial",
      "diferencia",
      "escolher",
      "pilar",
      "abordagem",
      "estrategia",
    ],
    answer:
      "A Lua não entrega só código. Quatro pontos definem o trabalho: estratégia antes da tecnologia; design orientado à experiência real; engenharia pensada para evoluir; e parceria depois do lançamento.",
    suggestions: ["Como funciona o processo?", "Quais serviços vocês oferecem?"],
    related: ["process", "services"],
  },
  {
    id: "design",
    questions: [
      "voces fazem design",
      "fazem ux",
      "fazem ui",
      "so desenvolvem ou tambem desenham",
    ],
    terms: ["design", "ux", "ui", "interface", "experiencia"],
    answer:
      "Design faz parte do trabalho, não é um extra. Interface só vale se for fácil de usar e ajudar a pessoa a concluir o que veio fazer. Estratégia, design e tecnologia andam juntos no mesmo ciclo.",
    suggestions: ["Como funciona o processo?", "Por que escolher a Lua?"],
    related: ["why", "process"],
  },
  {
    id: "process",
    questions: [
      "como funciona o processo",
      "como voces trabalham",
      "qual a metodologia",
      "quais sao as etapas",
    ],
    terms: ["processo", "etapas", "etapa", "metodologia", "ciclo"],
    answer:
      "O processo é um ciclo, não uma entrega isolada: Descobrir, Definir, Construir e Evoluir. A mesma lógica de um produto que continua mudando depois do lançamento.",
    suggestions: ["O que é a etapa Descobrir?", "Quanto tempo leva um projeto?"],
    related: ["discover", "define", "build", "evolve", "timeline"],
  },
  {
    id: "discover",
    questions: [
      "o que e a etapa descobrir",
      "o que acontece no comeco",
      "como comeca o projeto",
    ],
    terms: ["descobrir", "descoberta", "entendimento", "contexto"],
    answer:
      "Em Descobrir, o time entende o problema, o negócio e o contexto antes de decidir o caminho. É nessa etapa que objetivo e recorte ficam claros o suficiente para estimar com responsabilidade.",
    suggestions: ["O que é Definir?", "Quanto tempo leva um projeto?"],
    related: ["define", "timeline", "start"],
  },
  {
    id: "define",
    questions: [
      "o que e a etapa definir",
      "o que e definir o produto",
    ],
    terms: ["definir", "fluxos", "arquitetura", "solucao"],
    answer:
      "Em Definir, as necessidades viram uma solução clara: produto, fluxos e arquitetura. Só então a construção começa com um recorte combinado — não com um palpite de stack.",
    suggestions: ["O que é Construir?", "Vocês escolhem a tecnologia como?"],
    related: ["build", "stack"],
  },
  {
    id: "build",
    questions: [
      "o que e a etapa construir",
      "como e o desenvolvimento",
    ],
    terms: ["construir", "desenvolver", "desenvolvimento", "codigo"],
    answer:
      "Em Construir, projetamos e desenvolvemos o produto com foco em qualidade, uso e entrega. Código e design andam juntos, no recorte definido na etapa anterior.",
    suggestions: ["O que é Evoluir?", "Como começar um projeto?"],
    related: ["evolve", "start"],
  },
  {
    id: "evolve",
    questions: [
      "o que e a etapa evoluir",
      "voces acompanham depois do lancamento",
      "tem suporte depois",
    ],
    terms: [
      "evoluir",
      "evolucao",
      "continuidade",
      "lancamento",
      "acompanham",
      "manutencao",
      "suporte",
    ],
    answer:
      "Em Evoluir, o trabalho continua depois que o produto está no ar: medir, ajustar e crescer com o uso real. A Lua trata isso como parceria contínua, não como um “entrega e some”.",
    suggestions: ["Por que escolher a Lua?", "Como falar com vocês?"],
    related: ["why", "contact"],
  },
  {
    id: "stack",
    questions: [
      "quais tecnologias voces usam",
      "voces trabalham com react",
      "qual a stack",
      "voces escolhem a tecnologia como",
    ],
    terms: [
      "tecnologia",
      "tecnologias",
      "stack",
      "react",
      "next",
      "node",
      "linguagem",
    ],
    answer:
      "Não vendemos uma stack fixa na página. A tecnologia entra depois de entender o problema, o usuário e o objetivo. A engenharia é pensada para o produto de hoje aguentar o que vier amanhã.",
    suggestions: ["Como funciona o processo?", "Quais serviços vocês oferecem?"],
    related: ["why", "process"],
  },
  {
    id: "cases",
    questions: [
      "quais casos voces tem",
      "tem portfolio",
      "posso ver exemplos de trabalho",
      "tem cases publicos",
    ],
    terms: ["caso", "casos", "portfolio", "exemplos", "trabalhos"],
    answer:
      "Ainda não temos cases públicos para apresentar. Sem inventar portfólio, o caminho honesto é conversar sobre o seu problema: o time indica o tipo de produto — site, sistema, app ou plataforma — e o próximo passo.",
    suggestContact: true,
    suggestions: ["Quais serviços vocês oferecem?", "Como falar com vocês?"],
    related: ["services", "contact"],
  },
  {
    id: "pricing",
    questions: [
      "quanto custa",
      "qual o preco",
      "tem tabela de preco",
      "voces trabalham com pacote",
      "como e o orcamento",
      "quanto fica um projeto",
      "voces cobram como",
    ],
    terms: [
      "preco",
      "precos",
      "valor",
      "orcamento",
      "investimento",
      "tabela",
      "pacote",
      "custa",
    ],
    answer:
      "Não há pacote fechado nem tabela na página. Cada projeto tem escopo, prazo e investimento próprios. O recorte começa na conversa: o que você precisa, para quem e com que urgência.",
    suggestContact: true,
    suggestions: ["Como começar um projeto?", "Quanto tempo leva um projeto?"],
    related: ["start", "timeline"],
  },
  {
    id: "timeline",
    questions: [
      "quanto tempo leva um projeto",
      "qual o prazo",
      "demora quanto tempo",
      "tem cronograma padrao",
      "demora muito pra entregar",
    ],
    terms: ["prazo", "tempo", "demora", "cronograma", "semana", "mes"],
    answer:
      "Não existe prazo padrão publicado, porque depende do tipo de produto e do quanto já está definido. Na etapa Descobrir alinhamos objetivo e recorte para estimar com clareza. Se quiser, a equipe olha o seu caso direto.",
    suggestContact: true,
    suggestions: ["O que é a etapa Descobrir?", "Como começar um projeto?"],
    related: ["discover", "start"],
  },
  {
    id: "start",
    questions: [
      "como comecar um projeto",
      "como funciona o primeiro passo",
      "quero comecar",
      "como contratar voces",
    ],
    terms: ["comecar", "contratar", "primeiro", "iniciar", "pedido"],
    answer:
      "O primeiro passo é contar o essencial: nome, e-mail, empresa se quiser, e o que você quer construir. O formulário do site abre o e-mail para a Lua. A equipe responde para entender o projeto e indicar o próximo passo.",
    suggestContact: true,
    suggestions: ["Como falar com vocês?", "Como funciona o processo?"],
    related: ["contact", "process"],
  },
  {
    id: "contact",
    questions: [
      "como falar com voces",
      "qual o email",
      "tem instagram",
      "como entrar em contato",
      "me passa o contato",
      "me passa o email",
    ],
    terms: [
      "contato",
      "email",
      "gmail",
      "instagram",
      "whatsapp",
      "telefone",
      "reuniao",
    ],
    answer:
      "Você pode escrever para luasoftwarestudio@gmail.com, chamar no Instagram @luasoftwarestudio ou abrir o formulário aqui no site. Não publicamos WhatsApp nem telefone nesta página.",
    suggestContact: true,
    suggestions: ["Como começar um projeto?", "O que a Lua faz?"],
    related: ["start", "about"],
  },
];

export function knowledgeContext() {
  return knowledgeBase
    .map((article) => {
      const contact = article.suggestContact ? "\nOferecer formulário de contato: sim" : "";
      const hints = article.suggestions?.length
        ? `\nSugestões: ${article.suggestions.join(" | ")}`
        : "";
      return `### ${article.id}\n${article.answer}${contact}${hints}`;
    })
    .join("\n\n");
}
