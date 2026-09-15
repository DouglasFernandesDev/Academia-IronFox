/**
 * Lightbox da galeria de estrutura usando <dialog> nativo — o navegador já
 * resolve foco preso, fechar com Esc e devolver o foco ao elemento que abriu.
 *
 * @param {object|null} [lenis] Instância do Lenis (ou null se não ativo) —
 *   pausada enquanto o modal está aberto, para a roda do mouse não rolar a
 *   página por baixo dele.
 */
export function iniciarGaleria(lenis) {
  const dialog = document.getElementById('galeria-dialog');
  const imagemDialog = document.getElementById('galeria-dialog-img');
  const legendaDialog = document.getElementById('galeria-dialog-legenda');
  const botaoFechar = dialog?.querySelector('.galeria-dialog__fechar');
  const itens = document.querySelectorAll('.galeria__item');

  if (!dialog || !imagemDialog || !itens.length) return;

  itens.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      imagemDialog.src = img.src;
      imagemDialog.alt = img.alt;
      if (legendaDialog) legendaDialog.textContent = img.alt;
      dialog.showModal();
      lenis?.stop();
    });
  });

  botaoFechar?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (evento) => {
    if (evento.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => lenis?.start());
}
