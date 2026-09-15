import { config } from '../data/config.js';

/**
 * Monta uma URL wa.me com mensagem pré-preenchida.
 * @param {string} mensagem
 * @returns {string}
 */
export function linkWhatsapp(mensagem) {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${config.whatsapp}?text=${texto}`;
}

/**
 * Abre o WhatsApp em uma nova aba com a mensagem pronta.
 * @param {string} mensagem
 */
export function abrirWhatsapp(mensagem) {
  window.open(linkWhatsapp(mensagem), '_blank', 'noopener');
}
