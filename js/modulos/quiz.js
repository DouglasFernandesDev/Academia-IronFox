import { categorias } from '../data/planos.js';
import { linkWhatsapp } from './whatsapp.js';

/**
 * Quiz de 3 perguntas que recomenda um plano real (dos mesmos dados de
 * js/data/planos.js — nunca inventa preço) e já manda pro WhatsApp com uma
 * mensagem qualificada. É o "produto pequeno" que dá mais peso à página
 * além de cards de preço: em vez de a pessoa comparar sozinha, ela responde
 * e recebe uma recomendação, chegando no WhatsApp já sabendo o que quer.
 */
const perguntas = [
  {
    id: 'foco',
    titulo: 'Qual é o seu foco principal?',
    opcoes: [
      { valor: 'aulas', rotulo: 'Aulas coletivas — Spinning, Jump, Dança, Funcional...' },
      { valor: 'musculacao', rotulo: 'Só musculação e cardio' },
    ],
  },
  {
    id: 'pagamento',
    titulo: 'Como prefere pagar?',
    opcoes: [
      { valor: 'pix', rotulo: 'Dinheiro ou Pix, mês a mês' },
      { valor: 'cartao', rotulo: 'Cartão de crédito' },
      { valor: 'recorrente', rotulo: 'Débito recorrente — sai mais barato' },
    ],
  },
  {
    id: 'funcionarioPublico',
    titulo: 'Você é funcionário público?',
    opcoes: [
      { valor: 'sim', rotulo: 'Sim' },
      { valor: 'nao', rotulo: 'Não' },
    ],
  },
];

const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function formatarPreco(valor) {
  const [reais, centavos] = formatador.format(valor).split(',');
  return { reais, centavos };
}

function calcularRecomendacao(respostas) {
  const categoriaId = respostas.foco === 'aulas' ? 'completo' : 'musculacao';
  const categoria = categorias.find((c) => c.id === categoriaId);

  let planoId;
  if (respostas.funcionarioPublico === 'sim') {
    planoId = `${categoriaId}-funcionario-publico`;
  } else if (respostas.pagamento === 'cartao') {
    planoId = `${categoriaId}-mensal-cartao`;
  } else if (respostas.pagamento === 'recorrente') {
    planoId = `${categoriaId}-anual`;
  } else {
    planoId = `${categoriaId}-mensal`;
  }

  // Se algum id não existir (ex.: categoria mudar de estrutura no futuro),
  // cai pro plano mensal em vez de quebrar a página.
  const plano = categoria.planos.find((p) => p.id === planoId) ?? categoria.planos.find((p) => p.destaque) ?? categoria.planos[0];
  return { categoria, plano };
}

export function iniciarQuiz() {
  const card = document.getElementById('quiz-card');
  if (!card) return;

  let passo = 0;
  const respostas = {};

  function renderizarPergunta() {
    const pergunta = perguntas[passo];
    card.innerHTML = `
      <div class="quiz__progresso" role="progressbar" aria-valuenow="${passo + 1}" aria-valuemin="1" aria-valuemax="${perguntas.length}" aria-label="Pergunta ${passo + 1} de ${perguntas.length}">
        ${perguntas.map((_, i) => `<span class="quiz__progresso-passo${i <= passo ? ' quiz__progresso-passo--ativo' : ''}"></span>`).join('')}
      </div>
      <p class="quiz__pergunta" tabindex="-1">${pergunta.titulo}</p>
      <div class="quiz__opcoes">
        ${pergunta.opcoes.map((op) => `<button type="button" class="quiz__opcao" data-valor="${op.valor}">${op.rotulo}</button>`).join('')}
      </div>
      ${passo > 0 ? '<button type="button" class="quiz__voltar">← Voltar</button>' : ''}
    `;

    card.querySelectorAll('.quiz__opcao').forEach((botao) => {
      botao.addEventListener('click', () => {
        respostas[pergunta.id] = botao.dataset.valor;
        passo += 1;
        if (passo < perguntas.length) renderizarPergunta();
        else renderizarResultado();
      });
    });

    card.querySelector('.quiz__voltar')?.addEventListener('click', () => {
      passo -= 1;
      renderizarPergunta();
    });

    card.querySelector('.quiz__pergunta')?.focus();
  }

  function renderizarResultado() {
    const { categoria, plano } = calcularRecomendacao(respostas);
    const { reais, centavos } = formatarPreco(plano.preco);
    const mensagem = `Oi, fiz o teste no site e o plano recomendado pra mim foi o ${plano.nome} (${categoria.mensagemPlano}) — quero confirmar!`;

    card.innerHTML = `
      <p class="quiz__resultado-eyebrow" tabindex="-1">Seu plano ideal é</p>
      <h3 class="quiz__resultado-nome">${plano.nome}</h3>
      <p class="quiz__resultado-categoria">${categoria.descricao}</p>
      <p class="quiz__resultado-preco">
        <span class="quiz__resultado-moeda">R$</span>${reais}<span class="quiz__resultado-centavos">,${centavos}${plano.periodo ? `<span class="quiz__resultado-periodo">${plano.periodo}</span>` : ''}</span>
      </p>
      <p class="quiz__resultado-condicao">${plano.condicao}</p>
      <a class="botao botao--primario botao--grande quiz__resultado-cta" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">
        Quero confirmar esse plano
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3-.2-.31a8.24 8.24 0 1 1 6.97 3.83Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>
      </a>
      <button type="button" class="quiz__refazer">Refazer teste</button>
    `;

    card.querySelector('.quiz__refazer')?.addEventListener('click', () => {
      passo = 0;
      Object.keys(respostas).forEach((chave) => delete respostas[chave]);
      renderizarPergunta();
    });

    card.querySelector('.quiz__resultado-eyebrow')?.focus();
  }

  renderizarPergunta();
}
