import { linkWhatsapp } from './whatsapp.js';

const REGEX_TELEFONE = /^\(\d{2}\) \d{4,5}-\d{4}$/;

function mascararTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 2) return digitos.replace(/^(\d*)/, '($1');
  if (digitos.length <= 6) return digitos.replace(/^(\d{2})(\d*)/, '($1) $2');
  if (digitos.length <= 10) return digitos.replace(/^(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
  return digitos.replace(/^(\d{2})(\d{5})(\d*)/, '($1) $2-$3');
}

const validadores = {
  nome: (valor) => (valor.trim().length >= 2 ? '' : 'Digite seu nome completo.'),
  telefone: (valor) => (REGEX_TELEFONE.test(valor.trim()) ? '' : 'Digite um WhatsApp válido, com DDD.'),
  objetivo: (valor) => (valor ? '' : 'Escolha um objetivo.'),
  dia: (valor) => (valor ? '' : 'Escolha um dia preferido.'),
};

function validarCampo(campo) {
  const erro = validadores[campo.name]?.(campo.value) ?? '';
  const elementoErro = document.getElementById(`${campo.id}-erro`);
  if (elementoErro) elementoErro.textContent = erro;
  campo.setAttribute('aria-invalid', erro ? 'true' : 'false');
  return !erro;
}

export function iniciarFormulario() {
  const formulario = document.getElementById('form-experimental');
  if (!formulario) return;

  const campoTelefone = formulario.querySelector('#campo-telefone');
  campoTelefone?.addEventListener('input', (evento) => {
    evento.target.value = mascararTelefone(evento.target.value);
  });

  formulario.querySelectorAll('input, select').forEach((campo) => {
    // Evita que o <select required> vazio seja anunciado como inválido por
    // validade nativa do HTML antes de o usuário sequer interagir com ele.
    campo.setAttribute('aria-invalid', 'false');
    campo.addEventListener('blur', () => validarCampo(campo));
  });

  const botaoEnviar = formulario.querySelector('.formulario__enviar');
  const mensagemStatus = document.getElementById('form-status');

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const campos = Array.from(formulario.querySelectorAll('input, select'));
    const resultados = campos.map((campo) => validarCampo(campo));
    const primeiroInvalido = campos[resultados.findIndex((valido) => !valido)];

    if (primeiroInvalido) {
      primeiroInvalido.focus();
      if (mensagemStatus) {
        mensagemStatus.textContent = 'Confira os campos destacados em vermelho.';
        mensagemStatus.className = 'formulario__status formulario__status--erro';
      }
      return;
    }

    const dados = Object.fromEntries(new FormData(formulario).entries());

    botaoEnviar?.setAttribute('disabled', 'true');
    botaoEnviar?.classList.add('botao--carregando');
    if (mensagemStatus) {
      mensagemStatus.textContent = 'Enviando...';
      mensagemStatus.className = 'formulario__status';
    }

    // Sem backend: o "envio" é a transição para o WhatsApp com os dados prontos.
    await new Promise((resolve) => setTimeout(resolve, 550));

    const mensagem = [
      'Oi, quero agendar uma aula experimental grátis!',
      `Nome: ${dados.nome}`,
      `Objetivo: ${dados.objetivo}`,
      `Dia preferido: ${dados.dia}`,
    ].join('\n');

    botaoEnviar?.removeAttribute('disabled');
    botaoEnviar?.classList.remove('botao--carregando');
    if (mensagemStatus) {
      mensagemStatus.textContent = 'Prontinho! Abrindo o WhatsApp com seus dados preenchidos.';
      mensagemStatus.className = 'formulario__status formulario__status--sucesso';
    }

    window.open(linkWhatsapp(mensagem), '_blank', 'noopener');
    formulario.reset();
  });
}
