/**
 * Menu mobile, header com sombra ao rolar, link ativo por seção e botão de
 * WhatsApp flutuante que aparece após o usuário rolar a página.
 */
export function iniciarNavegacao() {
  const header = document.querySelector('.header');
  const botaoMenu = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const linksNav = document.querySelectorAll('.header__nav a');

  function fecharMenu() {
    botaoMenu?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('header__nav--aberto');
    document.body.classList.remove('menu-aberto');
  }

  function abrirMenu() {
    botaoMenu?.setAttribute('aria-expanded', 'true');
    nav?.classList.add('header__nav--aberto');
    document.body.classList.add('menu-aberto');
  }

  botaoMenu?.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
    aberto ? fecharMenu() : abrirMenu();
  });

  linksNav.forEach((link) => link.addEventListener('click', fecharMenu));

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
  });

  // Header ganha fundo sólido/sombra depois de rolar um pouco
  const aoRolar = () => {
    header?.classList.toggle('header--rolado', window.scrollY > 12);
  };
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  // Link ativo conforme a seção visível
  const secoes = document.querySelectorAll('main [id]');
  if (secoes.length && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          linksNav.forEach((link) => {
            const ativo = link.getAttribute('href') === `#${entrada.target.id}`;
            link.classList.toggle('header__nav-link--ativo', ativo);
            if (ativo) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    secoes.forEach((secao) => observador.observe(secao));
  }
}

export function iniciarBotaoFlutuante() {
  const botao = document.querySelector('.whatsapp-flutuante');
  if (!botao) return;

  const aoRolar = () => {
    botao.classList.toggle('whatsapp-flutuante--visivel', window.scrollY > 400);
  };
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });
}
