/**
 * Revela elementos com [data-revelar] em stagger conforme entram na viewport.
 * Respeita prefers-reduced-motion: nesse caso tudo aparece no estado final,
 * sem animação.
 */
export function iniciarRevelacao() {
  const elementos = document.querySelectorAll('[data-revelar]');
  if (!elementos.length) return;

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzMovimento || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('revelar--visivel'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada, indice) => {
        if (!entrada.isIntersecting) return;
        const atraso = Number(entrada.target.dataset.atraso ?? indice % 6) * 60;
        setTimeout(() => entrada.target.classList.add('revelar--visivel'), atraso);
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elementos.forEach((el) => observador.observe(el));
}
