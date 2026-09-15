import { categorias } from '../data/planos.js';
import { linkWhatsapp } from './whatsapp.js';

const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function formatarPreco(valor) {
  const [reais, centavos] = formatador.format(valor).split(',');
  return { reais, centavos };
}

function criarCard(plano, categoria) {
  const { reais, centavos } = formatarPreco(plano.preco);
  const mensagem = `Oi, quero o plano ${plano.nome.toLowerCase()} (${categoria.mensagemPlano})`;

  const card = document.createElement('article');
  card.className = 'card-plano';
  if (plano.destaque) card.classList.add('card-plano--destaque');

  card.innerHTML = `
    ${plano.destaque ? '<span class="card-plano__badge">Mais escolhido</span>' : ''}
    <h3 class="card-plano__nome">${plano.nome}</h3>
    <p class="card-plano__legenda">por apenas</p>
    <p class="card-plano__preco">
      <span class="card-plano__moeda">R$</span>${reais}<span class="card-plano__centavos">,${centavos}${plano.periodo ? `<span class="card-plano__periodo">${plano.periodo}</span>` : ''}</span>
    </p>
    <p class="card-plano__condicao">${plano.condicao}</p>
    ${plano.economia ? `<p class="card-plano__economia">${plano.economia}</p>` : ''}
    <a class="botao botao--primario card-plano__cta" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">
      Quero esse plano
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3-.2-.31a8.24 8.24 0 1 1 6.97 3.83Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>
    </a>
  `;
  return card;
}

/**
 * Inicializa o toggle de categorias e a renderização dos cards de plano.
 */
export function iniciarPlanos() {
  const tabs = document.querySelectorAll('.planos__tab');
  const grid = document.getElementById('planos-grid');
  const descricao = document.getElementById('planos-descricao');

  if (!tabs.length || !grid) return;

  function renderizar(categoriaId) {
    const categoria = categorias.find((c) => c.id === categoriaId) ?? categorias[0];

    grid.replaceChildren(...categoria.planos.map((plano) => criarCard(plano, categoria)));
    if (descricao) descricao.textContent = categoria.descricao;

    tabs.forEach((tab) => {
      const ativa = tab.dataset.categoria === categoria.id;
      tab.setAttribute('aria-selected', String(ativa));
      tab.tabIndex = ativa ? 0 : -1;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => renderizar(tab.dataset.categoria));
  });

  // Navegação por seta entre as abas, seguindo o padrão de tablist do ARIA
  const tablist = tabs[0]?.closest('[role="tablist"]');
  tablist?.addEventListener('keydown', (evento) => {
    const indiceAtual = Array.from(tabs).findIndex((t) => t.getAttribute('aria-selected') === 'true');
    let proximo = null;
    if (evento.key === 'ArrowRight') proximo = (indiceAtual + 1) % tabs.length;
    if (evento.key === 'ArrowLeft') proximo = (indiceAtual - 1 + tabs.length) % tabs.length;
    if (proximo !== null) {
      tabs[proximo].focus();
      renderizar(tabs[proximo].dataset.categoria);
      evento.preventDefault();
    }
  });

  renderizar(categorias[0].id);
}
