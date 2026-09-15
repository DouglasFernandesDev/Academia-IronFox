import { config } from './data/config.js';
import { iniciarNavegacao, iniciarBotaoFlutuante } from './modulos/navegacao.js';
import { iniciarPlanos } from './modulos/planos.js';
import { iniciarGradeAulas } from './modulos/grade-aulas.js';
import { iniciarFormulario } from './modulos/formulario.js';
import { iniciarGaleria } from './modulos/galeria.js';
import { iniciarRevelacao } from './modulos/revelar.js';
import { linkWhatsapp } from './modulos/whatsapp.js';
import { iniciarHeroVideo } from './modulos/hero-video.js';
import { iniciarRolagemSuave } from './modulos/rolagem-suave.js';
import { iniciarCarrossel } from './modulos/carrossel.js';
import { iniciarParallax } from './modulos/parallax.js';
import { iniciarQuiz } from './modulos/quiz.js';

/**
 * Preenche todo elemento marcado com [data-horarios] a partir de
 * js/data/config.js — horário de funcionamento fica escrito num único
 * lugar e se repete no hero e em "Onde estamos" sem duplicar texto no HTML.
 */
function renderizarHorarios() {
  const html = config.horarios
    .map(
      (h) => `
        <li class="horario">
          <span class="horario__dias">${h.dias}</span>
          <span class="horario__intervalo">${h.abre} às ${h.fecha}</span>
        </li>
      `
    )
    .join('');
  document.querySelectorAll('[data-horarios]').forEach((el) => {
    el.innerHTML = html;
  });
}

function renderizarConvenios() {
  const html = config.convenios.map((c) => `<li class="convenios__item">${c}</li>`).join('');
  document.querySelectorAll('[data-convenios]').forEach((el) => {
    el.innerHTML = html;
  });
}

function ligarBotaoFlutuanteAoWhatsapp() {
  const botao = document.getElementById('whatsapp-flutuante');
  if (!botao) return;
  botao.href = linkWhatsapp('Oi! Quero saber mais sobre a Iron Fox.');
  botao.target = '_blank';
  botao.rel = 'noopener';
}

renderizarHorarios();
renderizarConvenios();
ligarBotaoFlutuanteAoWhatsapp();

const lenis = iniciarRolagemSuave();

iniciarNavegacao();
iniciarBotaoFlutuante();
iniciarPlanos();
iniciarGradeAulas();
iniciarFormulario();
iniciarGaleria(lenis);
iniciarRevelacao();
iniciarHeroVideo();
iniciarParallax(lenis);
iniciarQuiz();
iniciarCarrossel({
  trilhoId: 'depoimentos-trilho',
  dotsId: 'depoimentos-dots',
  botaoAnteriorSeletor: '[data-carrossel-anterior]',
  botaoProximoSeletor: '[data-carrossel-proximo]',
});
iniciarCarrossel({
  trilhoId: 'estrutura-trilho',
  dotsId: 'estrutura-dots',
  botaoAnteriorSeletor: '[data-galeria-anterior]',
  botaoProximoSeletor: '[data-galeria-proximo]',
});

// Ano corrente no rodapé, sem precisar editar o HTML todo ano
document.getElementById('ano-atual')?.replaceChildren(String(new Date().getFullYear()));
