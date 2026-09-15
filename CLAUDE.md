# Project: Iron Fox Sport Center — Site Institucional

> Este arquivo antes descrevia outro projeto ("Sagrado Creperia — Cardápio
> Digital", um cardápio de delivery). Foi substituído em 14/09/2026 porque
> não tinha relação com este repositório e induzia erro em qualquer sessão
> futura — nomes de arquivo, regras de negócio e stack estavam todos errados
> para a Iron Fox.

## O que é este site

Site de **apresentação** da Iron Fox Sport Center (academia em Iguaba
Grande/RJ). Não é o site final — é um protótipo navegável com dados reais
extraídos dos cartazes oficiais do Instagram da academia (`imagens/`), para
aprovação do dono antes de virar o site definitivo. Toda conversão do site
aponta para o WhatsApp: a academia não tem matrícula online, então cada CTA
já abre o WhatsApp com uma mensagem pronta.

## Tech Stack

### Instalado
- HTML5 semântico
- CSS3 — Custom Properties (variáveis), Flexbox, Grid, `aspect-ratio`
- JavaScript (ES6+, Vanilla — sem frameworks)
- `live-server` — servidor de desenvolvimento com live reload

### Planejada (ainda não instalada)
> Adotar conforme a necessidade. Instalar a dependência **antes** de referenciá-la em código ou nas regras.
- ESLint / Stylelint — lint de JS/CSS, ainda não configurado neste repositório
- Prettier — formatação automática de código
- Playwright — testes E2E, se o formulário/checkout ganhar mais lógica

## Architecture

- Estrutura de projeto estático, organizada por tipo de arquivo na raiz:
  - `index.html` — página única de apresentação (one-pager)
  - `css/` — `css/base.css` (tokens + reset), `css/layout.css` (header, hero, footer, seções),
    `css/componentes/` (um arquivo por componente: `bloco-marcado.css`, `botao.css`,
    `card-plano.css`, `grade-aulas.css`, `carrossel.css` (mecânica genérica de scroll-snap,
    usada por depoimentos e pela galeria no mobile), `galeria.css`, `equipe.css`,
    `depoimento.css`, `formulario.css`, `whatsapp-flutuante.css`, `quiz.css`),
    `css/utilitarios.css` (revelação por scroll)
  - `js/main.js` — ponto de entrada (`<script type="module">`), orquestra os módulos
  - `js/data/` — **toda informação do negócio fica aqui**, nunca hardcoded em outro lugar:
    - `config.js` — WhatsApp, endereço, coordenadas, horários, convênios, manifesto
    - `planos.js` — as duas categorias de plano com os preços reais (também usado pelo quiz)
    - `aulas.js` — modalidades e grade de horários
    - `equipe.js` / `depoimentos.js` — conteúdo ainda placeholder, ver seção abaixo
  - `js/modulos/` — um módulo por comportamento: `whatsapp.js`, `planos.js`, `grade-aulas.js`,
    `navegacao.js`, `formulario.js`, `galeria.js`, `revelar.js`, `hero-video.js` (autoplay com
    fallback pra foto real), `rolagem-suave.js` (Lenis), `carrossel.js` (genérico — inicializado
    duas vezes: depoimentos e galeria mobile), `parallax.js` (hero), `quiz.js` (recomendação de
    plano a partir dos dados reais de `planos.js`)
  - `imagens/` — cartazes originais do Instagram (fonte dos dados reais) + `imagens/placeholder/`
    (fotos de banco de imagens usadas só até haver fotos reais, ver README daquela pasta)
- JavaScript em módulos ES6 (`import`/`export`) — evita poluir o escopo global
- CSS organizado por camadas: tokens (`base.css`) → layout → componentes → utilitários
- Sem lógica de servidor: tudo roda no navegador. O "envio" do formulário de aula
  experimental não tem backend — ele monta uma mensagem e abre o WhatsApp

## Code Style

- HTML: tags semânticas (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<address>`, `<footer>`)
- Acessibilidade: todo `<img>` com `alt`; `<label>` associado a cada input; `aria-*`
  quando o HTML semântico não for suficiente; foco visível nunca removido (`:focus-visible`
  em `css/base.css`)
- CSS: nomenclatura BEM (`bloco__elemento--modificador`); Custom Properties para todo
  token de design (nunca hex solto num componente); mobile-first (`min-width`)
- JavaScript: ES6+ (`const`/`let`, nunca `var`); módulos ES, sem `require()`
- Sem CSS inline (`style="..."`) e sem JS inline (`onclick="..."`)
- Nomes de arquivo e variáveis de negócio em português, seguindo o restante do projeto
  (`js/data/planos.js`, `linkWhatsapp`, `iniciarGradeAulas`) — mantenha a consistência

## Dados do Negócio

- Toda informação real da academia (WhatsApp, endereço, coordenadas, horário, convênios)
  fica centralizada em `js/data/config.js` — é o único arquivo a editar para pôr o
  site no ar com dados reais, sem tocar em lógica
- Os preços (`js/data/planos.js`) e a grade de aulas (`js/data/aulas.js`) vêm dos
  cartazes oficiais em `imagens/plano 1.png`, `imagens/plano 2.png` e
  `imagens/aula coletiva.png` — **os preços são reais**, a grade dia×horário é exemplo
- Valores marcados com o comentário `// CONFIRMAR` são placeholders até o dono da
  academia confirmar o dado real. Lista completa de pendências no plano de implementação
  (`docs/` ou peça ao Claude para relistar — foi detalhado na entrega original)
- **Nunca inventar CREF ou nome de professor como se fosse real** — registro
  profissional é verificável; até a academia enviar os dados, o campo fica com o
  texto literal "a confirmar" (`js/data/equipe.js`)
- **Nunca usar foto de banco de imagens como se fosse aluno ou professor real** —
  ver `imagens/placeholder/README.md` para a política completa de fotos de exemplo

## Environment Variables

- Projeto estático não tem `.env` — se um dia adotar backend para o formulário
  (ex.: Netlify Forms) ou analytics, documentar aqui a integração
- **Nunca** colocar chaves/segredos em JavaScript do lado do cliente

## Workflow

- Rodar `npx live-server` para desenvolvimento — **nunca** abrir `index.html` via
  `file://` (quebra os módulos ES por CORS)
- Configurar ESLint/Stylelint antes de depender deles no workflow (ainda não instalados)
- Validar visualmente em pelo menos dois navegadores antes de considerar uma tela pronta
- Branch naming: `feat/`, `fix/`, `chore/` + descrição em kebab-case
- **NUNCA rodar `git commit` diretamente.** Sempre usar a skill `commit` deste
  repositório, mesmo quando o pedido for implícito ("salva", "finaliza", "pode subir")
- **Nunca commitar sem autorização explícita do usuário** — instrução direta do dono
  do projeto, válida para todo o histórico deste repositório

## Common Gotchas

- Abrir `index.html` direto via `file://` quebra `fetch`/módulos ES por CORS — sempre
  usar um servidor local (`live-server`, `vite`, etc.)
- `<script type="module">` já é `defer` por padrão e roda em modo estrito
- Cascata de CSS: espaçamento de seção vive só em `.secao { padding-block: var(--espaco-secao) }`
  (`css/base.css`) — nunca sobrescrever `padding-block` num componente específico, ou
  um seletor de tipo e um de elemento acabam zerando o padding um do outro
- `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` usa espaço não
  separável (U+00A0) entre "R$" e o valor — `js/modulos/planos.js` formata o preço
  manualmente (reais e centavos separados) porque o card reproduz o layout do cartaz
  original (centavos sobrescritos), não o formato padrão do `Intl`
- `[hidden]` pode parar de funcionar se um componente definir `display` com a mesma
  especificidade — `css/base.css` já tem `[hidden] { display: none !important; }` no reset

## Roadmap (fases futuras, fora do escopo desta entrega)

1. **Conteúdo real** — substituir todo `// CONFIRMAR`: WhatsApp, grade de aulas,
   fotos reais, equipe com CREF, depoimentos autorizados, taxa de adesão/fidelidade
2. **Publicação** — domínio próprio, Netlify/Vercel, Search Console, Google Business Profile
3. **Medição** — GA4 com Consent Mode v2 (skill `analytics-lgpd`), evento de clique
   de WhatsApp segmentado por plano
4. **Conversão** — formulário com backend real (hoje só existe se o usuário enviar
   a mensagem no WhatsApp), página por plano para tráfego pago
5. **Área do aluno / marcação de aula / treino em tempo real** — a Iron Fox já usa
   (ou vai usar) um sistema de gestão de academia. **Não construir esse backend do
   zero.** Sistemas como Pacto, ABC Evo/W12, Tecnofit e EVO já expõem API própria
   para check-in, agenda de turma e ficha de treino, e alguns têm app de aluno
   pronto — a "área do aluno" deste site deve consumir essa API ou linkar/embutir o
   portal que o sistema já fornece. Confirmar com o dono da academia qual sistema é,
   antes de desenhar essa fase em detalhe
