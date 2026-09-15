/**
 * Rolagem suave do site inteiro via Lenis (carregado por CDN em index.html,
 * expõe window.Lenis). Some duas coisas de propósito:
 *  - prefers-reduced-motion: reduce → nem inicializa, fica no scroll nativo
 *  - CDN falhou (offline, bloqueado) → também fica no scroll nativo
 * Nos dois casos o site continua 100% navegável, só sem o efeito extra.
 *
 * Por padrão o Lenis já deixa o touch (celular) no scroll nativo do
 * sistema — só suaviza roda do mouse/trackpad e teclado, que é onde a
 * rolagem "seca" de verdade incomoda. Mexer nisso pioraria o mobile.
 */
export function iniciarRolagemSuave() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  if (typeof window.Lenis !== 'function') return null;

  const lenis = new window.Lenis({
    // lerp em vez de duration/easing fixos: em vez de cada evento de scroll
    // disparar uma animação com tempo marcado, a posição real "persegue"
    // o alvo continuamente a cada frame — é o que dá aquela sensação de
    // rolagem "líquida" o tempo todo, em vez de suave só nos saltos de
    // âncora. 0.1 é o valor mais usado em produção: suaviza sem parecer
    // borrachudo nem atrasar a resposta ao gesto.
    lerp: 0.1,
    // Só as chamadas .scrollTo() (âncoras) usam duration/easing — aqui uma
    // curva expo-out: sai rápido e desacelera suave até o alvo.
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  });

  // Exposto para depuração via devtools (`window.__lenis`) — não é usado
  // por nenhum outro módulo, que sempre recebe a instância por parâmetro.
  window.__lenis = lenis;

  function raf(tempo) {
    lenis.raf(tempo);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Links de âncora (nav, CTAs) passam pelo Lenis. O desconto da altura do
  // header fixo já vem do scroll-padding-top do html (css/base.css) — o
  // próprio Lenis respeita essa propriedade sozinho, então não é somado
  // offset nenhum aqui (senão o desconto dobra e a seção alvo pousa longe
  // demais do topo).
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const alvo = document.getElementById(id);
      if (!alvo) return;
      evento.preventDefault();
      lenis.scrollTo(alvo);
    });
  });

  return lenis;
}
