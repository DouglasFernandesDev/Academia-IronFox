/**
 * Toca o vídeo de fundo do hero só depois que ele realmente começa a
 * reproduzir. A foto real (imagens/fachada.jpg) já está por baixo, sempre
 * visível — então se o autoplay for bloqueado, a conexão for lenta,
 * prefers-reduced-motion estiver ativo ou o navegador não suportar vídeo,
 * o resultado nunca é um retângulo preto: é a foto real da fachada.
 */
export function iniciarHeroVideo() {
  const video = document.getElementById('hero-video');
  if (!video) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  video.preload = 'auto';
  video
    .play()
    .then(() => video.classList.add('hero__video--ativo'))
    .catch(() => {
      // Autoplay bloqueado (economia de dados, política do navegador etc.):
      // não faz nada — a foto real continua sendo o que o visitante vê.
    });
}
