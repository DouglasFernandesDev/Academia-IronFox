/**
 * Carrossel genérico por scroll-snap nativo (setas + dots). A rolagem em
 * si é sempre nativa — arrastar/tocar/roda do mouse já funciona sem
 * nenhuma linha de JS; setas e dots só chamam scrollTo() para a posição
 * certa, e um listener de scroll mantém os dois sincronizados.
 *
 * Os dots representam "paradas" alcançáveis de verdade, não um por item:
 * quando mais de um card cabe na tela ao mesmo tempo (comum em telas
 * largas com poucos itens), nem todo item consegue ficar sozinho encostado
 * no início da trilha — o navegador trava a rolagem antes disso. Contar
 * dots por parada alcançável evita ter um dot que nunca liga sozinho ou
 * dois dots presos na mesma posição de rolagem.
 */
export function iniciarCarrossel({ trilhoId, dotsId, botaoAnteriorSeletor, botaoProximoSeletor }) {
  const trilho = document.getElementById(trilhoId);
  const dotsContainer = document.getElementById(dotsId);
  if (!trilho || !dotsContainer) return;

  const itens = Array.from(trilho.children);
  if (!itens.length) return;

  const secao = trilho.closest('.carrossel') ?? document;
  const botaoAnterior = secao.querySelector(botaoAnteriorSeletor);
  const botaoProximo = secao.querySelector(botaoProximoSeletor);
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let itemStep = 1;
  let totalParadas = 1;
  let dots = [];

  function calcularGeometria() {
    itemStep = itens.length > 1 ? itens[1].offsetLeft - itens[0].offsetLeft : itens[0].offsetWidth;
    const rolagemMaxima = Math.max(0, trilho.scrollWidth - trilho.clientWidth);
    totalParadas = Math.max(1, Math.round(rolagemMaxima / itemStep) + 1);
  }

  function renderizarDots() {
    dotsContainer.innerHTML = Array.from({ length: totalParadas })
      .map((_, indice) => `<button type="button" class="carrossel__dot" role="tab" aria-selected="${indice === 0}" aria-label="Ir para o item ${indice + 1}"></button>`)
      .join('');
    dots = Array.from(dotsContainer.children);
    dots.forEach((dot, indice) => dot.addEventListener('click', () => irPara(indice)));
  }

  function indiceAtual() {
    const rolagemMaxima = Math.max(0, trilho.scrollWidth - trilho.clientWidth);
    if (trilho.scrollLeft >= rolagemMaxima - 1) return totalParadas - 1;
    return Math.min(totalParadas - 1, Math.round(trilho.scrollLeft / itemStep));
  }

  function irPara(indice) {
    const rolagemMaxima = Math.max(0, trilho.scrollWidth - trilho.clientWidth);
    const alvo = Math.min(indice * itemStep, rolagemMaxima);
    trilho.scrollTo({ left: alvo, behavior: reduzMovimento ? 'auto' : 'smooth' });
  }

  function atualizarEstado() {
    const indice = indiceAtual();
    dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === indice)));
    if (botaoAnterior) botaoAnterior.disabled = indice === 0;
    if (botaoProximo) botaoProximo.disabled = indice === totalParadas - 1;
  }

  botaoAnterior?.addEventListener('click', () => irPara(indiceAtual() - 1));
  botaoProximo?.addEventListener('click', () => irPara(indiceAtual() + 1));

  let temporizadorScroll;
  trilho.addEventListener(
    'scroll',
    () => {
      clearTimeout(temporizadorScroll);
      temporizadorScroll = setTimeout(atualizarEstado, 100);
    },
    { passive: true }
  );

  let temporizadorResize;
  window.addEventListener('resize', () => {
    clearTimeout(temporizadorResize);
    temporizadorResize = setTimeout(() => {
      calcularGeometria();
      renderizarDots();
      atualizarEstado();
    }, 150);
  });

  calcularGeometria();
  renderizarDots();
  atualizarEstado();
}
