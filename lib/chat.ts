export type ChatReply = {
  answer: string;
  suggestContact: boolean;
  suggestions: string[];
};

type Topic = {
  id: string;
  keywords: string[];
  answer: string;
  suggestContact?: boolean;
  suggestions?: string[];
};

const defaultSuggestions = [
  "O que a Lua faz?",
  "Quais serviços vocês oferecem?",
  "Como funciona o processo?",
  "Como falar com vocês?",
];

const topics: Topic[] = [
  {
    id: "greeting",
    keywords: ["ola", "oi", "bom dia", "boa tarde", "boa noite", "hey", "eae", "eai"],
    answer:
      "Olá, eu sou o Tsuki, mascote da Lua Software Studio. Posso falar sobre serviços, processo, casos e como começar um projeto com a gente.",
    suggestions: defaultSuggestions,
  },
  {
    id: "tsuki",
    keywords: ["tsuki", "mascote", "quem e voce", "seu nome", "chatbot", "assistente"],
    answer:
      "Eu sou o Tsuki, mascote da Lua Software Studio. Estou aqui para tirar dúvidas sobre a empresa, os serviços e como começar um projeto com o time.",
    suggestions: ["O que a Lua faz?", "Quais serviços vocês oferecem?"],
  },
  {
    id: "about",
    keywords: [
      "quem",
      "lua",
      "empresa",
      "studio",
      "sobre",
      "faz",
      "voces",
      "historia",
      "o que",
      "oque",
    ],
    answer:
      "A Lua Software Studio cria produtos digitais: sistemas, aplicativos, plataformas e experiências. Unimos estratégia, design e tecnologia para o negócio avançar — do problema ao produto.",
    suggestions: ["Quais serviços vocês oferecem?", "Como funciona o processo?"],
  },
  {
    id: "services",
    keywords: [
      "servico",
      "servicos",
      "oferece",
      "site",
      "sites",
      "sistema",
      "sistemas",
      "app",
      "aplicativo",
      "aplicativos",
      "plataforma",
      "web",
    ],
    answer:
      "Podemos construir sites e experiências digitais, sistemas internos, aplicativos e plataformas completas. Em todos os casos, o ponto de partida é o problema do negócio — não a tecnologia pela tecnologia.",
    suggestions: ["Vocês fazem sistemas internos?", "Como começar um projeto?"],
  },
  {
    id: "sites",
    keywords: ["conversao", "landing", "institucional", "funil", "marca"],
    answer:
      "Em sites, transformamos marcas e funis em experiências digitais claras, rápidas e pensadas para gerar resultado — da presença da marca até a conversa com o cliente certo.",
    suggestions: ["E aplicativos?", "Como falar com vocês?"],
  },
  {
    id: "systems",
    keywords: ["interno", "operacao", "operacional", "erp", "fluxo", "processo interno"],
    answer:
      "Em sistemas sob medida, criamos plataformas internas e operacionais que simplificam processos, reduzem retrabalho e aceleram decisões do time.",
    suggestions: ["Como funciona o processo?", "Como começar um projeto?"],
  },
  {
    id: "apps",
    keywords: ["produto digital", "mobile", "ponta a ponta", "continuidade"],
    answer:
      "Em aplicativos, construímos o produto completo: da ideia inicial à entrega e à evolução contínua, com acompanhamento depois do lançamento.",
    suggestions: ["Quais casos vocês têm?", "Como começar um projeto?"],
  },
  {
    id: "pillars",
    keywords: ["estrategia", "design", "tecnologia", "pilar", "abordagem"],
    answer:
      "Não entregamos só código. Entendemos o problema antes da tecnologia, desenhamos para a experiência real, construímos para evoluir e acompanhamos depois do lançamento.",
  },
  {
    id: "process",
    keywords: [
      "processo",
      "como funciona",
      "etapa",
      "etapas",
      "descobrir",
      "definir",
      "construir",
      "evoluir",
      "metodologia",
    ],
    answer:
      "O processo tem quatro etapas: Descobrir (entender negócio e desafios), Definir (produto, fluxos e arquitetura), Construir (código, design e experiência) e Evoluir (acompanhar e melhorar com base em resultado).",
    suggestions: ["Quanto tempo leva um projeto?", "Como começar um projeto?"],
  },
  {
    id: "cases",
    keywords: ["caso", "casos", "portfolio", "projeto", "exemplos", "trabalho"],
    answer:
      "Mostramos o tipo de produto que colocamos em produção: sistemas de gestão, experiências web e produtos contínuos. Os cases nominais entram na página quando o material de cada cliente estiver pronto. Para um projeto específico, a conversa com o time é o melhor caminho.",
    suggestContact: true,
    suggestions: ["Como falar com vocês?", "Quais serviços vocês oferecem?"],
  },
  {
    id: "pricing",
    keywords: [
      "preco",
      "precos",
      "valor",
      "orcamento",
      "quanto custa",
      "investimento",
      "tabela",
      "pacote",
    ],
    answer:
      "Não trabalhamos com pacotes fechados na página. Cada projeto tem escopo, prazo e investimento próprios. Conte o que você precisa e a equipe responde com um caminho sob medida.",
    suggestContact: true,
    suggestions: ["Como começar um projeto?", "Como funciona o processo?"],
  },
  {
    id: "timeline",
    keywords: ["prazo", "tempo", "demora", "quando", "cronograma", "semana", "mes"],
    answer:
      "O prazo depende do tipo de produto e do quanto já está definido. No início, na etapa de Descobrir, alinhamos objetivo e recorte para estimar com clareza. Se quiser, a equipe olha o seu caso direto.",
    suggestContact: true,
  },
  {
    id: "contact",
    keywords: [
      "contato",
      "falar",
      "especialista",
      "email",
      "e-mail",
      "whatsapp",
      "instagram",
      "comecar",
      "conversa",
      "orcamento",
      "reuniao",
    ],
    answer:
      "Você pode escrever para luasoftwarestudio@gmail.com, chamar no Instagram @luasoftwarestudio ou abrir o formulário aqui no site. A equipe responde para entender o projeto e indicar o próximo passo.",
    suggestContact: true,
    suggestions: ["O que a Lua faz?", "Quais serviços vocês oferecem?"],
  },
  {
    id: "thanks",
    keywords: ["obrigado", "obrigada", "valeu", "agradec"],
    answer: "Por nada. Se quiser, posso seguir com serviços, processo ou um contato com o time.",
    suggestions: defaultSuggestions,
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreTopic(query: string, topic: Topic) {
  const tokens = new Set(query.split(" ").filter((token) => token.length > 1));
  let score = 0;

  for (const keyword of topic.keywords) {
    if (query.includes(keyword)) {
      score += keyword.includes(" ") ? 3 : 2;
    } else if (keyword.split(" ").every((part) => tokens.has(part))) {
      score += 2;
    }
  }

  return score;
}

export function answerCompanyQuestion(message: string): ChatReply {
  const query = normalize(message);

  if (!query) {
    return {
      answer: "Pode escrever sua dúvida sobre a Lua. Serviços, processo, prazos ou contato.",
      suggestContact: false,
      suggestions: defaultSuggestions,
    };
  }

  const ranked = topics
    .map((topic) => ({ topic, score: scoreTopic(query, topic) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  if (!best || best.score === 0) {
    return {
      answer:
        "Não encontrei isso com precisão na nossa base. Posso falar de serviços, processo, casos e contato — ou abrir o formulário para o time responder direto.",
      suggestContact: true,
      suggestions: defaultSuggestions,
    };
  }

  return {
    answer: best.topic.answer,
    suggestContact: Boolean(best.topic.suggestContact),
    suggestions: best.topic.suggestions ?? defaultSuggestions,
  };
}

export const chatWelcome: ChatReply = {
  answer:
    "Olá, eu sou o Tsuki, mascote da Lua. Pergunte sobre a empresa, os serviços ou como começar um projeto.",
  suggestContact: false,
  suggestions: defaultSuggestions,
};
