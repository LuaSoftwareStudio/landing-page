import {
  defaultSuggestions,
  knowledgeBase,
  type KnowledgeArticle,
} from "./knowledge";

export type ChatReply = {
  answer: string;
  suggestContact: boolean;
  suggestions: string[];
  topicId?: string;
};

export type ChatContext = {
  lastTopicId?: string;
};

const STOPWORDS = new Set([
  "a",
  "ah",
  "ai",
  "ainda",
  "algo",
  "algum",
  "alguma",
  "ao",
  "aos",
  "as",
  "ate",
  "bem",
  "com",
  "como",
  "consigo",
  "da",
  "das",
  "de",
  "do",
  "dos",
  "e",
  "eh",
  "em",
  "eu",
  "exatamente",
  "gente",
  "isso",
  "ja",
  "la",
  "me",
  "meu",
  "minha",
  "muito",
  "na",
  "nao",
  "nas",
  "no",
  "nos",
  "nossa",
  "nosso",
  "o",
  "os",
  "ou",
  "para",
  "pode",
  "podem",
  "por",
  "pra",
  "preciso",
  "qual",
  "quais",
  "que",
  "queria",
  "quero",
  "se",
  "sem",
  "seria",
  "sim",
  "sua",
  "suas",
  "seu",
  "seus",
  "ta",
  "te",
  "tem",
  "ter",
  "td",
  "tipo",
  "to",
  "tudo",
  "um",
  "uma",
  "umas",
  "uns",
  "voce",
  "voces",
  "vcs",
]);

const CANONICAL: Record<string, string> = {
  app: "app",
  apps: "app",
  aplicativo: "app",
  aplicativos: "app",
  mobile: "app",
  ios: "app",
  android: "app",
  celular: "app",
  site: "site",
  sites: "site",
  website: "site",
  pagina: "site",
  paginas: "site",
  landing: "site",
  institucional: "site",
  web: "site",
  sistema: "sistema",
  sistemas: "sistema",
  erp: "sistema",
  interno: "sistema",
  internos: "sistema",
  planilha: "sistema",
  operacional: "sistema",
  plataforma: "plataforma",
  plataformas: "plataforma",
  servico: "servico",
  servicos: "servico",
  oferece: "servico",
  oferecem: "servico",
  atuam: "servico",
  preco: "preco",
  precos: "preco",
  custa: "preco",
  custo: "preco",
  cobram: "preco",
  cobrar: "preco",
  fica: "preco",
  valor: "preco",
  orcamento: "preco",
  investimento: "preco",
  tabela: "preco",
  pacote: "preco",
  pacotes: "preco",
  prazo: "prazo",
  tempo: "prazo",
  demora: "prazo",
  cronograma: "prazo",
  semana: "prazo",
  mes: "prazo",
  entrega: "prazo",
  entregar: "prazo",
  contato: "contato",
  email: "contato",
  gmail: "contato",
  instagram: "contato",
  insta: "contato",
  whatsapp: "contato",
  telefone: "contato",
  reuniao: "contato",
  chamar: "contato",
  falar: "contato",
  processo: "processo",
  processos: "processo",
  metodologia: "processo",
  etapa: "processo",
  etapas: "processo",
  ciclo: "processo",
  trabalham: "processo",
  descobrir: "descobrir",
  descoberta: "descobrir",
  definir: "definir",
  construir: "construir",
  desenvolvem: "construir",
  desenvolver: "construir",
  desenvolvimento: "construir",
  codigo: "construir",
  evoluir: "evoluir",
  evolucao: "evoluir",
  lancamento: "evoluir",
  lanca: "evoluir",
  lancar: "evoluir",
  acompanham: "evoluir",
  suporte: "evoluir",
  manutencao: "evoluir",
  somem: "evoluir",
  design: "design",
  ux: "design",
  ui: "design",
  interface: "design",
  experiencia: "design",
  stack: "stack",
  tecnologia: "stack",
  tecnologias: "stack",
  react: "stack",
  next: "stack",
  node: "stack",
  linguagem: "stack",
  portfolio: "portfolio",
  caso: "portfolio",
  casos: "portfolio",
  case: "portfolio",
  cases: "portfolio",
  exemplos: "portfolio",
  trabalhos: "portfolio",
  ecommerce: "ecommerce",
  loja: "ecommerce",
  marketplace: "ecommerce",
  vendas: "ecommerce",
  lua: "lua",
  studio: "lua",
  empresa: "lua",
  tsuki: "tsuki",
  mascote: "tsuki",
  chatbot: "tsuki",
  assistente: "tsuki",
  bot: "tsuki",
  comecar: "comecar",
  iniciar: "comecar",
  contratar: "comecar",
  pedido: "comecar",
  primeiro: "comecar",
  diferencial: "diferencial",
  diferencia: "diferencial",
  escolher: "diferencial",
  estrategia: "diferencial",
};

const GREETING_ONLY =
  /^(ola|oi|hey|eae|eai|bom dia|boa tarde|boa noite)( tsuki| tudo bem| tudo bom| td bem)?$/;
const THANKS = /^(obrigado|obrigada|valeu|agradec(o|ida)?)\b/;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(token: string) {
  if (token.length <= 4) return token;
  return token
    .replace(/mente$/, "")
    .replace(/coes$/, "cao")
    .replace(/oes$/, "ao")
    .replace(/(acoes)$/, "acao")
    .replace(/(ando|endo|indo)$/, "")
    .replace(/(ados|adas|idos|idas)$/, "")
    .replace(/(ado|ada|ido|ida)$/, "")
    .replace(/(ar|er|ir)$/, "")
    .replace(/s$/, "");
}

function canon(token: string) {
  return CANONICAL[token] ?? CANONICAL[stem(token)] ?? stem(token);
}

function tokens(value: string) {
  return unique(
    normalize(value)
      .split(" ")
      .filter((token) => token.length > 1 && !STOPWORDS.has(token))
      .map(canon),
  );
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function editDistance(a: string, b: string) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 1) return 2;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const grid = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));
  for (let i = 0; i < rows; i += 1) grid[i][0] = i;
  for (let j = 0; j < cols; j += 1) grid[0][j] = j;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      grid[i][j] = Math.min(
        grid[i - 1][j] + 1,
        grid[i][j - 1] + 1,
        grid[i - 1][j - 1] + cost,
      );
    }
  }
  return grid[a.length][b.length];
}

function fuzzyHas(haystack: Set<string>, token: string) {
  if (haystack.has(token)) return true;
  if (token.length < 5) return false;
  for (const candidate of haystack) {
    if (candidate.length < 5) continue;
    if (candidate.startsWith(token) || token.startsWith(candidate)) return true;
    if (editDistance(token, candidate) <= 1) return true;
  }
  return false;
}

type IndexedArticle = {
  article: KnowledgeArticle;
  questions: string[];
  questionTokens: string[][];
  termSet: Set<string>;
  searchTokens: Set<string>;
};

const indexed: IndexedArticle[] = knowledgeBase.map((article) => {
  const questions = article.questions.map(normalize);
  const questionTokens = questions.map(tokens);
  const termSet = new Set(tokens(article.terms.join(" ")));
  const searchTokens = new Set([
    ...questionTokens.flat(),
    ...termSet,
    ...tokens(article.answer),
  ]);

  return { article, questions, questionTokens, termSet, searchTokens };
});

const documentFrequency = new Map<string, number>();
for (const item of indexed) {
  for (const token of item.searchTokens) {
    documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
  }
}

function idf(token: string) {
  const df = documentFrequency.get(token) ?? 1;
  return Math.log(1 + indexed.length / df);
}

function isFollowUp(
  query: string,
  queryTokens: string[],
  last?: IndexedArticle,
) {
  const marked = /^(e |e o |e a |e os |e as |e se |mas |e quanto)/.test(`${query} `);
  if (marked) return true;
  if (!last || queryTokens.length > 5) return false;
  return queryTokens.some((token) => last.searchTokens.has(token));
}

function scoreArticle(
  query: string,
  queryTokens: string[],
  item: IndexedArticle,
  last?: IndexedArticle,
) {
  let score = 0;
  let distinctiveHits = 0;

  for (const question of item.questions) {
    if (query === question) score += 40;
    else if (query.length >= 8 && question.includes(query)) score += 16;
    else if (question.length >= 10 && query.includes(question)) score += 20;
  }

  for (const questionParts of item.questionTokens) {
    const overlap = questionParts.filter((token) => queryTokens.includes(token));
    if (overlap.length === 0) continue;
    score += (overlap.length / Math.max(questionParts.length, 1)) * 12;
  }

  for (const token of queryTokens) {
    const weight = idf(token);
    const distinctive = weight >= Math.log(1 + indexed.length / 4);
    if (item.termSet.has(token) || fuzzyHas(item.termSet, token)) {
      score += 7 * weight;
      if (distinctive) distinctiveHits += 1;
    } else if (item.searchTokens.has(token) || fuzzyHas(item.searchTokens, token)) {
      score += 2.4 * weight;
      if (distinctive) distinctiveHits += 1;
    }
  }

  if (last && isFollowUp(query, queryTokens, last)) {
    if (item.article.id === last.article.id) score += 6;
    if (item.article.related?.includes(last.article.id)) score += 4;
    if (last.article.related?.includes(item.article.id)) score += 4;
  }

  return { score, distinctiveHits };
}

function unknownReply(): ChatReply {
  return {
    answer:
      "Isso ainda não está na nossa base pública. Posso falar de serviços, processo, prazos em linhas gerais e contato — ou abrir o formulário para o time responder com o contexto do seu projeto.",
    suggestContact: true,
    suggestions: defaultSuggestions,
  };
}

function fromArticles(articles: KnowledgeArticle[]): ChatReply {
  const primary = articles[0];
  return {
    answer: articles.map((article) => article.answer).join("\n\n"),
    suggestContact: articles.some((article) => article.suggestContact),
    suggestions: primary.suggestions ?? defaultSuggestions,
    topicId: primary.id,
  };
}

const aboutArticle = knowledgeBase.find((article) => article.id === "about");

export function answerCompanyQuestion(
  message: string,
  context: ChatContext = {},
): ChatReply {
  const query = normalize(message);
  const queryTokens = tokens(message);

  if (!query) {
    return {
      answer: "Pode escrever sua dúvida sobre a Lua. Serviços, processo, prazos ou contato.",
      suggestContact: false,
      suggestions: defaultSuggestions,
    };
  }

  if (GREETING_ONLY.test(query)) {
    return {
      answer: "Olá! Como posso te ajudar?",
      suggestContact: false,
      suggestions: defaultSuggestions,
      topicId: "tsuki",
    };
  }

  if (THANKS.test(query) && queryTokens.length <= 4) {
    return {
      answer: "Por nada. Se quiser, sigo com serviços, processo ou um contato com o time.",
      suggestContact: false,
      suggestions: defaultSuggestions,
      topicId: "tsuki",
    };
  }

  if (
    aboutArticle &&
    (queryTokens.length === 0 || queryTokens.every((token) => token === "lua"))
  ) {
    return fromArticles([aboutArticle]);
  }

  const last = indexed.find((item) => item.article.id === context.lastTopicId);

  const ranked = indexed
    .map((item) => {
      const result = scoreArticle(query, queryTokens, item, last);
      return { item, ...result };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const accepted =
    best &&
    (best.distinctiveHits >= 1 || best.score >= 5.5);

  if (!best || !accepted) {
    return unknownReply();
  }

  const close = ranked.filter(
    (entry) =>
      entry.item.article.id !== best.item.article.id &&
      (entry.distinctiveHits >= 1 || entry.score >= 5.5) &&
      entry.score >= best.score * 0.9,
  );

  const chosen = [best.item.article];
  if (
    close[0] &&
    best.item.article.related?.includes(close[0].item.article.id)
  ) {
    chosen.push(close[0].item.article);
  }

  return fromArticles(chosen);
}

export const chatWelcome: ChatReply = {
  answer:
    "Olá, eu sou o Tsuki, mascote da Lua. Pergunte sobre a empresa, os serviços ou como começar um projeto.",
  suggestContact: false,
  suggestions: defaultSuggestions,
  topicId: "tsuki",
};
