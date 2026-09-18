# Design System — Lua Software Studio

Documento extraído do código em produção da landing (`app/globals.css` e componentes).  
Não usar paletas genéricas, Archivo, Space Grotesk, GSAP ou pretos puros de templates.

---

## Princípios

| Fazer | Não fazer |
|---|---|
| Minimalismo editorial e premium | Gradientes roxos, neon, glassmorphism |
| Preto, branco e cinza | Partículas, 3D, stock photos |
| Tipografia forte + espaço negativo | Mais de uma família de fonte |
| Clareza de produto e conversão | Métricas, clientes ou depoimentos inventados |
| Microinteração discreta (200ms) | Parallax, textos voando, animação contínua |

**Posicionamento:** estratégia, design e tecnologia para criar produtos digitais.  
**Conceito de marca:** ciclos e evolução (`Descobrir → Definir → Construir → Evoluir`). Sem lua, estrelas ou galáxia.

---

## Tokens

Fonte da verdade: `:root` em `app/globals.css`, mapeados no Tailwind v4 via `@theme inline`.

### Cor

| Token CSS | Tailwind | Hex / valor | Uso |
|---|---|---|---|
| `--bg` | `bg-bg` | `#f3f1ec` | Superfície cream (casos, serviços, processo) |
| `--bg-soft` | `bg-bg-soft` | `#f7f5f1` | Superfície cream mais clara |
| `--bg-white` | `bg-bg-white` | `#ffffff` | Body, header, footer, cards claros |
| `--ink` | `text-ink` / `bg-ink` | `#171717` | Texto principal, CTA escuro, anel de foco |
| `--ink-soft` | `text-ink-soft` | `#4a4a4a` | Corpo secundário |
| `--hero` | `bg-hero` | `#171717` | Hero, CTA final, chrome de mockup |
| `--card` | `bg-card` | `#1c1c1c` | Cards de serviços (escuros) |
| `--muted-on-dark` | `text-muted-on-dark` | `#c4c4c4` | Corpo sobre fundo escuro |
| `--label` | `text-label` | `#5c5c5c` | Kickers e labels |
| `--dot` | `bg-dot` | `#d4d0c8` | Detalhe / ponto |
| `--ring` | `ring` | `#171717` | Foco visível (branco em `.dark-section`) |
| `--border` | `border-border` | `rgb(23 23 23 / 0.1)` | Bordas padrão |

**Opacidades recorrentes**

- Borda clara: `border-ink/8`, `border-ink/10`, `border-ink/15`
- Borda em escuro: `border-white/10`, `border-white/15`
- Texto em escuro: `text-white/65`, `text-white/55`, `text-white/90`
- Campo em escuro: `bg-white/8`

**Seleção:** fundo `--ink`, texto `--bg`.

### Forma

| Token | Valor | Uso |
|---|---|---|
| `--radius` / `--radius-card` | `28px` | Seções, cards, dialog, chat |
| Pill / botão | `9999px` (`rounded-full`) | CTAs, tags, launcher do chat |
| Campo | `0.75rem` (`rounded-xl`) | Inputs e textarea |
| Tag | `rounded-full` | Disciplinas nos cases |

### Espaçamento

| Token | Valor | Uso |
|---|---|---|
| `--container` | `80rem` (1280px) | Largura máxima |
| `--section-space` | `5rem` (80px) | Padding vertical de seção (mobile) |
| `--section-space-lg` | `7rem` (112px) | Padding vertical a partir de `md` |
| Gutter mobile | `1.25rem` (20px) | `.section-shell` |
| Gutter `sm` | `2rem` (32px) | `.section-shell` |
| Gutter `lg` | `4rem` (64px) | `.section-shell` |
| Header | `4.5rem` / `5.5rem` (`sm`) | Altura mínima |
| Alvo de clique | `min-h-11` (44px) | Botões, links, inputs |
| Scroll padding | `6rem` topo / `6.5rem` base | Âncoras sob header e chat |

### Movimento

| Token | Valor |
|---|---|
| `--transition` | `200ms ease` |
| Entrada de card | `rise` 420ms, stagger 70ms |
| Seta de CTA | `translateX(3px)` no hover/focus |
| Visual de case | `translateY(-3px)` no hover do card |
| Hover de card | `-translate-y-0.5` + borda |

Sem preferência reduzida: animações e transições caem para `0.01ms`. Scroll deixa de ser smooth.

---

## Tipografia

**Família única:** Geist Sans (`geist/font/sans`), variável `--font-geist-sans`, fallback Arial / Helvetica.

| Papel | Tamanho | Peso | Line-height | Tracking | Classe / seletor |
|---|---|---|---|---|---|
| Hero H1 | 2.25rem → 3rem (`sm`) → 3.5rem (`lg`) | 500 | 1.08 | −0.04em | `Hero` |
| Título de seção | clamp(1.75rem, 3vw, 2.5rem) | 500 | 1.15 | −0.04em | `.section-title` |
| Título de card / H3 | 1.35rem | 500 | — | −0.02em / −0.03em | serviços, cases, diferenciais |
| Corpo | 1.0625rem (17px) no `body`; `text-base` / `sm:text-lg` nas seções | 400 | 1.6 / 1.75 (`leading-7`) | 0 | parágrafos |
| Secundário | 15px (`text-[15px]`) | 400 | — | 0 | ajuda de form, copyright |
| Botão / nav | `text-sm` (14px) a `text-base` | 400–500 | — | 0 | CTAs, header |
| Label de form | 13px | 500 | 1rem | 0 | `ContactForm` |
| Kicker | 12px (`text-xs` / `.section-kicker`) | 500 | — | 0.22em | uppercase |
| Tag | 12px | 400 | — | 0 | chips de case |

Kickers: uppercase, `tracking-[0.22em]`, cor `--label` (ou `white/65` no escuro).

---

## Layout

### Grid e container

- Classe `.section-shell`: `max-width: 80rem`, centralizado, gutters responsivos.
- Classe `.section-space`: padding-block 5rem / 7rem.
- Seções escuras: `.dark-section` + `bg-hero` + `text-white` (foco branco).

### Ritmo de superfícies

1. Header — branco translúcido  
2. Hero — ink  
3. Casos — cream (`bg-bg`)  
4. Serviços — cream, cards ink  
5. Por que Lua — branco  
6. Processo — cream  
7. Contato — ink  
8. Footer — branco  

### Breakpoints usados

320 / 375 / 390 / 430 / 640 (`sm`) / 768 (`md`) / 1024 (`lg`) / 1280.

---

## Componentes

### Botões

**Primário em fundo escuro** (hero, CTA final)

- `rounded-full bg-white px-5 text-sm text-ink min-h-11`
- Hover: `opacity-80`
- Seta: `CtaArrow` com `group/cta`

**Primário em fundo claro** (header)

- `rounded-full bg-ink px-5 text-sm text-white min-h-11`
- Mobile: texto curto “Começar”; desktop: “Começar um projeto”

**Secundário / textual**

- Link ou botão sem fundo, `min-h-11`, `text-sm`, seta no hover

**Ícone (menu, fechar)**

- `min-h-11 min-w-11 rounded-full`
- Menu: `border-ink/10`

Não usar `bg-transparent` no `ContactButton` base — no Tailwind v4 essa utilidade vence `bg-ink`.

### Header

- Sticky, `z-40`, `backdrop-blur-md`
- Em repouso: `bg-bg-white/80`, borda transparente
- Com scroll (> 8px): `bg-bg-white/95`, `border-ink/10`
- Nav: Serviços, Casos, Processo
- Mobile: hamburger + CTA visível

### Cards

**Serviço (escuro)**  
`rounded-[28px] bg-card px-7 py-8`, número grande, título 1.35rem, corpo `muted-on-dark`. Hover: elevação + `border-white/10`.

**Case (claro)**  
`rounded-[28px] border-ink/8 bg-bg-white`. Visual `aspect-[16/10]` + `ProductPreview`. Hover: elevação, borda, mockup sobe 3px.

**Diferencial / processo**  
Sem card pesado. Número + título + texto. Processo: linha horizontal no `lg`, conector vertical no mobile.

### Formulário

Campos: Nome, E-mail, Empresa (opcional), projeto.  
Altura mínima 44px, `rounded-xl`, label 13px.

| Estado | Claro | Escuro |
|---|---|---|
| Default | `border-ink/15 bg-bg-white` | `border-white/15 bg-white/8` |
| Focus | `border-ink` | `border-white` |
| Erro | `text-red-700` | `text-red-300` |
| Sucesso / fallback | e-mail `luasoftwarestudio@gmail.com` | idem |

Estados: `idle` | `sending` | `sent` | `error`.  
CTA: “Enviar projeto →”. Sem placeholders se o label basta.

### Dialog

- `<dialog>` nativo, `rounded-[28px]`, `max-w 32rem`
- Backdrop `bg-black/55`
- Título: “O que você quer construir?”

### Chat (Tsuki)

- Mascote **masculino** (“o Tsuki”)
- Launcher: anel preto, círculo branco, arte completa em `/brand/tsuki-chat.png`
- Balão: “Oi! Posso te ajudar?”
- Header do painel: nome + status `online`
- `z-80`, anel branco para contrastar nas faixas pretas
- Ícones: Phosphor (`@phosphor-icons/react`), só em Client Components

### Logo

| Variante | Arquivo | Uso |
|---|---|---|
| Clara | `/brand/logo-on-light.png` | Header, footer |
| Escura | `/brand/logo-on-dark.png` | Superfícies ink |
| Marca | `/brand/mark.png` | Não usar no hero |
| Tsuki | `/brand/tsuki-chat.png` | Chat |

Header: altura 36px mobile / 44px desktop. `style={{ width: "auto" }}` no `next/image`.

### Mockup de produto

`ProductPreview` — CSS only, `aria-hidden`. Variantes: `hero`, `ops`, `web`, `app`.  
Nos cases, o quadro é sempre `aspect-[16/10]`.

---

## Acessibilidade

- `lang="pt-BR"`
- Skip link → `#conteudo`
- Foco: `outline 2px solid var(--ring)`, offset 3px; branco em `.dark-section`
- Headings em ordem (H1 único no hero)
- Botão para ação, `a` para navegação
- Alvos ≥ 44px
- `prefers-reduced-motion`
- Contraste: ink em cream; `muted-on-dark` em hero (≥ ~8:1)

---

## Conteúdo e voz

- Clareza antes de slogan
- Tsuki: masculino
- Não inventar cases, métricas, prazos de resposta ou redes
- Instagram real: `luasoftwarestudio`
- E-mail real: `luasoftwarestudio@gmail.com`
- CTA principal: “Começar um projeto”

### Narrativa da página

Hero → Casos → Serviços → Por que Lua → Processo → Contato → Footer

---

## Stack

| Camada | Escolha |
|---|---|
| App | Next.js 16 App Router, React 19, TypeScript |
| Estilo | Tailwind CSS v4 + tokens em `globals.css` |
| Fonte | `geist/font/sans` |
| Ícones | Phosphor, client-only |
| Contato | `mailto:` após validação no cliente |
| Chat | FAQ local em `lib/chat.ts` |

Não adicionar biblioteca de animação. CSS + React bastam.

---

## Anti-padrões

- Gradiente só por estética
- Glassmorphism, neon, partículas
- Stock de pessoas trabalhando
- Newsletter, popup, chat fake (o Tsuki já existe)
- Inventar prova social
- Trocar Geist por segunda família
- Reduzir corpo abaixo de ~16px para “ficar mais minimalista”
- Animações que ignoram `prefers-reduced-motion`
- `bg-transparent` competindo com `bg-ink` no mesmo botão
- Phosphor em Server Component (quebra `createContext`)
