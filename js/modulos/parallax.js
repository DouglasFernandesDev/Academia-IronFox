/**
 * Parallax leve no hero: a foto/vídeo de fundo rola mais devagar que o
 * texto por cima, dando uma sensação de profundidade sem ser 3D de
 * verdade — efeito barato, roda em GPU (translate3d) e não usa nenhuma
 * biblioteca. Desliga sozinho com prefers-reduced-motion.
 *
 * @param {object|null} [lenis] Se o Lenis estiver ativo, sincroniza com o
 *   scroll suavizado dele (mesmo valor que move a página); senão cai num
 *   listener nativo com throttle por requestAnimationFrame.
 */
export function iniciarParallax(lenis) {
  const media = document.querySelector('.hero__media');
  const hero = document.querySelector('.hero');
  if (!media || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const FATOR = 0.18;
  let alturaHero = hero.offsetHeight;
  window.addEventListener('resize', () => {
    alturaHero = hero.offsetHeight;
  });

  function aplicar(scrollY) {
    // Depois que o hero sai de cena não há por que continuar calculando —
    // economiza trabalho no scroll do resto da página inteira.
    if (scrollY > alturaHero) return;
    media.style.transform = `translate3d(0, ${Math.round(scrollY * FATOR)}px, 0)`;
  }

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => aplicar(scroll));
  } else {
    let aguardando = false;
    window.addEventListener(
      'scroll',
      () => {
        if (aguardando) return;
        aguardando = true;
        requestAnimationFrame(() => {
          aplicar(window.scrollY);
          aguardando = false;
        });
      },
      { passive: true }
    );
  }
}
