---
name: Portfólio EVI
description: Portfólio dark violeta-sobre-quase-preto de desenvolvedora front-end — vidro, glow discreto e mono como rótulo.
colors:
  bg: "#0a0416"
  bg-deep: "#060310"
  surface: "#100c22"
  surface-2: "#16112e"
  line: "rgba(255, 255, 255, 0.08)"
  line-strong: "rgba(255, 255, 255, 0.14)"
  primary: "#8b5cf6"
  primary-light: "#a78bfa"
  primary-soft: "#c4b5fd"
  fuchsia-glow: "#a855f7"
  ink: "#f4f2fb"
  ink-soft: "#b6b0cc"
  ink-faint: "#8d87ac"
  success: "#34d399"
  danger: "#fb7185"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, monospace"
    fontSize: "0.65rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  full: "9999px"
spacing:
  gutter-mobile: "1.25rem"
  gutter-desktop: "2rem"
  card: "1.25rem"
  card-lg: "1.5rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "linear-gradient(to right, {colors.primary}, {colors.fuchsia-glow})"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-outline:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  chip-filter:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "0.375rem 1rem"
  chip-filter-active:
    backgroundColor: "linear-gradient(to right, {colors.primary}, {colors.fuchsia-glow})"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.375rem 1rem"
  tag-tech:
    backgroundColor: "rgba(139, 92, 246, 0.1)"
    textColor: "{colors.primary-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.625rem"
  card:
    backgroundColor: "rgba(16, 12, 34, 0.78)"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
---

# Design System: Portfólio EVI

<!-- Registrado a partir do build entregue (revisão de finish: ship). Fonte de verdade: src/index.css (@theme), componentes em src/components/. Seed de direção 311d17c9. -->

## Overview

**Creative North Star: "O Cânone Violeta"**

Este é o portfólio dark que a categoria consagrou — violeta sobre quase-preto, vidro, caret digitando — executado no teto de craft, e não na versão genérica de template. A identidade inteira vive em uma única família de cor: o violeta (#8b5cf6 → #a855f7) aparece como gradiente nos CTAs, no nome digitado, no sublinhado da navegação ativa e na moldura hexagonal neon do retrato. Todo o resto é quase-preto azulado, vidro translúcido e três tons de tinta clara.

A densidade é generosa: seções de respiro amplo (6rem vertical), container único de 72rem, grades de cards com vidro fosco. O clima é tecnológico sem ruído — a grade de pontos e as auroras desfocadas do fundo ficam sempre atrás de máscara e blur, nunca competindo com o texto. Micro-rótulos em JetBrains Mono maiúsculo (badges, tags, selos) fazem o papel de voz "de código"; os títulos começam direto no Sora, sem rótulo acima.

**Key Characteristics:**
- Uma só família de acento (violeta→fúcsia), sempre em gradiente quando é protagonista.
- Superfícies de vidro: fundo translúcido + borda branca a 8% + blur de 12px.
- Profundidade por glow violeta e luz, não por sombra cinza.
- Sora para títulos, Inter para leitura, JetBrains Mono para rótulos técnicos.
- Movimento de entrada único, ease-out exponencial, sempre respeitando `prefers-reduced-motion`.
- Estados projetados: vazio, carregando, sucesso, erro e placeholder rotulado existem em todos os fluxos.

## Colors

Paleta monocromática violeta sobre quase-preto azulado, com dois verdes/rosas funcionais de feedback.

### Primary
- **Violeta Elétrico** (#8b5cf6): a cor da identidade. Base dos gradientes de CTA, fundos suaves a 10–15% (badges, tags, nav ativa mobile) e glow atmosférico das auroras.
- **Violeta Luminoso** (#a78bfa): ponta clara do acento — caret de digitação, foco visível, ícones de contato, hover de bordas.
- **Lilás Suave** (#c4b5fd): texto sobre fundos violeta translúcidos (badge do herói, tags de tecnologia).
- **Fúcsia de Brilho** (#a855f7): a segunda parada de todo gradiente protagonista (CTAs, `text-gradient`, hexágono neon, sublinhado da navegação).

### Neutral
- **Quase-Preto Violeta** (#0a0416): fundo de seções alternadas (`bg`); também o `theme-color` do navegador.
- **Abismo** (#060310): fundo profundo do body e das seções de fecho (`bg-deep`); par do `bg` nos degradês entre seções.
- **Superfície** (#100c22): base dos cards de vidro (usada a 78% de opacidade no `card-glass`).
- **Superfície 2** (#16112e): preenchimento sob o retrato hexagonal e superfícies elevadas.
- **Linha** (rgba(255,255,255,0.08)) e **Linha Forte** (rgba(255,255,255,0.14)): todas as bordas do sistema; a forte é o estado de hover/ênfase da fraca.
- **Tinta** (#f4f2fb), **Tinta Suave** (#b6b0cc), **Tinta Apagada** (#8d87ac): a escala de texto — títulos/labels, corpo, e metadados/placeholder, respectivamente.

### Feedback
- **Sucesso** (#34d399): confirmação de envio do formulário (borda/fundo a 40%/10%, texto esmeralda claro).
- **Perigo** (#fb7185): estados de erro do formulário (mesmo padrão translúcido).

### Named Rules
**A Regra do Gradiente Protagonista.** Quando o violeta é protagonista (CTA primário, nome no herói, filtro ativo, sublinhado da nav), ele aparece como gradiente #8b5cf6→#a855f7 — nunca como cor chapada. Chapado e translúcido (10–15%) é papel de coadjuvante: fundos de badge, tags, hover.

**A Regra do Branco Emprestado.** Bordas e fundos neutros nunca inventam um cinza: são sempre branco translúcido (borda 8%/14%, fundo 3–4%) sobre o quase-preto, para que a temperatura violeta do fundo atravesse.

## Typography

**Display Font:** Sora (com ui-sans-serif, system-ui)
**Body Font:** Inter (com ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono (com ui-monospace, Cascadia Code)

**Character:** Sora dá o tom geométrico-tecnológico dos títulos; Inter mantém a leitura neutra e confortável; JetBrains Mono maiúsculo com tracking largo é a voz "de terminal" dos micro-rótulos.

### Hierarchy
- **Display** (700, clamp(2.6rem, 7vw, 4.4rem), lh 1.05, tracking -0.025em): apenas o h1 do herói, com o nome em `text-gradient` e caret digitando.
- **Headline** (700, 1.875rem → 2.25rem ≥640px, tracking -0.025em): títulos de seção via `SectionHeading`, com uma palavra em `<Accent>` (gradiente). Sem rótulo acima do título.
- **Title** (700, 1.125rem–1.25rem): títulos de card (projetos, timeline, cursos), sempre em Sora.
- **Body** (400, 0.85–1rem, lh 1.625, cor `ink-soft`): parágrafos e descrições; leads limitados a `max-w-xl`/`max-w-md`.
- **Label** (500–600, 0.6–0.72rem, tracking 0.1–0.2em, MAIÚSCULAS, JetBrains Mono): badges ("dev", "Exemplo", "Destaque"), tags de tecnologia, rótulo do herói.

### Named Rules
**A Regra do Mono como Rótulo.** JetBrains Mono maiúsculo só existe dentro de chips, badges e selos — nunca solto acima de um título como kicker/eyebrow. Títulos de seção começam direto no h2 em Sora.

**A Regra da Palavra Acesa.** Cada título de seção acende exatamente uma expressão em `text-gradient` (`<Accent>`); o resto fica em `ink`. Nunca o título inteiro em gradiente fora do nome no herói.

## Layout

- **Container único:** `max-w-6xl` (72rem) centralizado, gutter de 1.25rem no mobile e 2rem em `lg`.
- **Ritmo vertical:** seções com `py-24` (6rem); o herói é a exceção — `min-h-svh` com `pt-32` para compensar o header fixo de 72px (`scroll-margin-top: 88px` nas âncoras).
- **Fundos alternados:** as seções alternam `bg` (#0a0416) e `bg-deep` (#060310), com divisores de luz — linha de 1px em gradiente `transparent → primary/50 → transparent` — e auroras desfocadas (`blur(120px)`, violeta/fúcsia a 10–20%) ancoradas fora do viewport.
- **Grades:** duas colunas assimétricas no herói (`1.05fr/0.95fr`) e no contato (`0.85fr/1.15fr`); cards de projeto em 1→2→3 colunas (`sm`/`lg`) com `gap-6`; espaçamento interno de card em `p-5` (grade) e `p-6`–`p-8` (formulário).
- **Responsivo:** navegação vira menu hambúrguer abaixo de `lg` (painel com blur e trava de scroll); chips decorativos maiores só aparecem em `md+`; nada gera scroll horizontal (`overflow-x: hidden` no body é cinto de segurança, não desculpa).

**A Regra do Fundo Silencioso.** Texturas de fundo (grade de pontos, auroras) vivem sempre atrás de máscara radial e blur pesado, com opacidade ≤ 20%, e são `aria-hidden`. Se o fundo compete com o texto, ele está errado.

## Elevation & Depth

Profundidade por luz, não por sombra cinza: o sistema combina vidro translúcido (camada tonal) com glows violeta. Sombras pretas existem apenas como âncora ambiente sob elementos flutuantes.

### Shadow Vocabulary
- **Glow primário** (`box-shadow: 0 8px 30px -6px color-mix(in srgb, var(--color-primary) 55%, transparent), 0 2px 8px rgba(0,0,0,0.4)` — utilitário `glow-primary`): CTAs primários e elementos que carregam o gradiente protagonista.
- **Glow de filtro** (`0 4px 16px -4px rgba(139,92,246,0.6)`): chip de filtro ativo.
- **Glow de traço** (`0 0 8px 1px rgba(168,85,247,0.7)`): sublinhado da navegação ativa; no SVG do hexágono, o equivalente é `feGaussianBlur stdDeviation 7`.
- **Âncora ambiente** (`0 10px 30px -8px rgba(0,0,0,0.6)`): chips flutuantes do retrato — a única sombra puramente preta do sistema.

### Named Rules
**A Regra do Vidro.** Superfície elevada = `card-glass`: fundo `surface` a 78%, borda `line` de 1px e `backdrop-filter: blur(12px)`. Não existem cards opacos nem sombras de elevação em repouso; o hover eleva trocando a borda para `primary-light/40`, não adicionando sombra.

## Shapes

- **Raio por papel:** botões e alvos quadrados de ícone em `rounded-lg` (0.5rem); inputs e mensagens de feedback em `rounded-xl` (0.75rem); cards e painéis em `rounded-2xl` (1rem); tudo que é chip, badge, tag ou filtro é pílula (`rounded-full`).
- **Bordas de 1px em tudo:** a forma é desenhada por borda translúcida, não por preenchimento contrastante. Estado vazio usa borda tracejada (`border-dashed border-line-strong`).
- **A silhueta da casa é o hexágono:** o retrato vive num hexágono de vértice para cima com traço de 3px em gradiente violeta e glow, eco deslocado em traço fino a 25%, e clip da foto dentro.

## Components

### Buttons (`src/components/ui/Button.tsx`)
Confiantes e táteis: sobem 2px no hover, voltam no active.
- **Shape:** cantos suaves (0.5rem), `font-semibold` 0.875rem, ícone Lucide de 1rem à direita do texto.
- **Primary:** gradiente `primary → fuchsia-glow`, texto branco, `glow-primary`; hover: `brightness-110` + `-translate-y-0.5`.
- **Outline:** borda `line-strong` + fundo branco 3%; hover: borda `primary-light/60` + fundo `primary/10` + elevação.
- **Ghost:** borda `line`, texto `ink-soft`; hover só reforça borda/texto, sem elevação.
- **Focus:** `outline-2 outline-offset-2 outline-primary-light` (padrão global de `:focus-visible`).
- **Tamanhos:** sm `px-3.5 py-2 / 0.8rem`, md `px-5 py-2.5`, lg `px-6 py-3 / 0.95rem`. Vira `<a>` automaticamente quando recebe `href`.

### Chips
- **Filtro de projetos:** pílula `px-4 py-1.5 / 0.8rem`; inativa = borda `line` + fundo branco 3% + `ink-soft`; ativa = gradiente protagonista + glow de filtro + `aria-pressed`.
- **Tag de tecnologia:** pílula mono 0.65rem, borda `primary/35`, fundo `primary/10`, texto `primary-soft`.
- **Selos sobre imagem:** "Destaque" (âmbar + estrela) e "Exemplo" (neutro), ambos mono maiúsculo 0.62rem sobre `bg-black/55` com `backdrop-blur-sm`.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (1rem).
- **Background/Border:** `card-glass` (ver A Regra do Vidro).
- **Hover:** borda → `primary-light/40`; capa com `scale(1.04)` em 500ms (grupo).
- **Capa de projeto sem imagem:** estado vazio projetado — gradiente violeta/índigo/fúcsia da lista `COVER_GRADIENTS`, malha de pontos brancos a 40%, monograma Sora 3rem e nome em mono maiúsculo no rodapé.
- **Internal Padding:** `p-5` (cards de grade), `p-6`–`p-8` (painéis grandes).

### Inputs / Fields (`Contact.tsx`)
- **Style:** `rounded-xl`, borda `line`, fundo branco 3%, texto `ink`, placeholder `ink-faint`.
- **Hover / Focus:** hover → `line-strong`; focus → borda `primary-light/70` + `ring-2 ring-primary/30` (sem outline nativo aqui).
- **Feedback:** mensagens em caixa `rounded-xl` translúcida `success`/`danger` a 40%/10%, com ícone e `aria-live="polite"`; botão de envio mostra `Loader2` girando.

### Navigation (`Header.tsx`)
- Header fixo de 72px; transparente no topo, ganha `bg-deep/80 + backdrop-blur-xl + borda line` após 24px de scroll.
- Logo = marca em Sora bold + selo "dev" em pílula gradiente mono maiúscula.
- Link ativo: texto `ink` + sublinhado de 1px em gradiente com glow, animado por `layoutId` (spring 380/32); inativos em `ink-soft`.
- Mobile: painel deslizante com blur, item ativo em `bg-primary/15`, trava de scroll do body, `aria-expanded`/`aria-controls`.

### Retrato Hexagonal Neon (assinatura, `Hero.tsx`)
SVG 400×440: hexágono com traço 3px em gradiente `#a78bfa → #a855f7 → #6d28d9` + filtro de glow, eco de traço fino deslocado, foto clipada sobre `surface-2`, halo radial violeta desfocado atrás. Ao redor: chips de vidro flutuantes (ícone de código, React girando 360° em 14s, mini janela de código com dots semáforo) oscilando 10px em 4.5s — tudo desligado sob `prefers-reduced-motion` e com `aria-label`.

### Reveal (grammar de entrada, `Reveal.tsx`)
Entrada única ao rolar: `opacity 0 → 1` + deslocamento (28px de baixo, ou 32px lateral), 0.7s, ease `[0.16, 1, 0.3, 1]`, `viewport once` com margem -60px; `delay` escalona cards de grade. Com movimento reduzido, renderiza estático.

**A Regra da Entrada Única.** Todo movimento de entrada usa o ease `cubic-bezier(0.16, 1, 0.3, 1)`, roda uma única vez (`once: true`) e tem alternativa estática para `prefers-reduced-motion`. Loops contínuos são reservados a ornamentos `aria-hidden` (ping do badge, flutuação dos chips, rotação do React, céu ambiente).

### Céu ambiente (`Starfield.tsx` + keyframes em `index.css`)
Camada `fixed inset-0 z-[5] pointer-events-none aria-hidden` sobre toda a página: 12 estrelas fixas de 2–3px cintilando (`twinkle`, 3.8–5.9s, opacidade 0.15→0.7, glow violeta) e 5 estrelas cadentes (`shooting-star`: risco de 2px × 130–230px, trilho `rotate(135deg)` — diagonal caindo para a esquerda —, cauda `#fff → primary-soft → primary → transparent` com cabeça à direita, percurso `translateX(65vmax)` nos primeiros 13% de ciclos de 9–14s, delays escalonados). Só `transform`/`opacity`; posições determinísticas em consts. Sob `prefers-reduced-motion`: cadentes somem, cintilantes ficam estáticas a 0.3. O risco pode cruzar sobre conteúdo — por isso é fino, breve e ≤ 0.9 de opacidade; qualquer aumento de densidade ou brilho viola A Regra do Fundo Silencioso.

### Superfícies do navegador
O tema alcança o browser: `::selection` violeta 45%, caret `primary-light`, scrollbar fina com polegar #372a5e (hover #4c3b80) sobre `bg-deep`, `:focus-visible` global em `primary-light` com offset 3px, `theme-color` #0a0416.

## Do's and Don'ts

### Do:
- **Do** usar o gradiente #8b5cf6→#a855f7 em todo elemento violeta protagonista (A Regra do Gradiente Protagonista).
- **Do** construir superfícies com `card-glass` e neutros de branco translúcido (borda 8%/14%, fundo 3–4%) — nunca cinza opaco.
- **Do** entrar com `Reveal` (0.7s, ease `[0.16,1,0.3,1]`, `once`) e sempre fornecer o caminho estático de `prefers-reduced-motion`.
- **Do** rotular conteúdo de exemplo com o selo mono "Exemplo" e projetar o estado vazio (capa-monograma, caixa tracejada) em vez de esconder a ausência.
- **Do** manter foco visível: `outline primary-light` global, ou borda+ring violeta nos inputs.

### Don't:
- **Don't** usar kickers/eyebrows acima de títulos — mono maiúsculo vive só em chips, badges e selos.
- **Don't** introduzir uma segunda família de acento; azul/rosa/verde aparecem apenas como feedback funcional ou fleck decorativo minúsculo em ornamento `aria-hidden`.
- **Don't** usar sombras cinza/pretas de elevação em repouso; profundidade é vidro + glow violeta (a única sombra preta é a âncora dos chips flutuantes).
- **Don't** animar em loop qualquer elemento que carregue conteúdo, nem manter animação sob `prefers-reduced-motion`.
- **Don't** deixar o fundo falar alto: texturas sempre mascaradas, desfocadas e ≤ 20% de opacidade.
