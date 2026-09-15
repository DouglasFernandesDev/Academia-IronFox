import { modalidades, dias, grade } from '../data/aulas.js';

function nomeModalidade(id) {
  return modalidades.find((m) => m.id === id)?.nome ?? '—';
}

function renderizarTabela() {
  const tabela = document.getElementById('grade-tabela');
  if (!tabela) return;

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th scope="col"><span class="sr-only">Horário</span></th>
      ${dias.map((dia) => `<th scope="col">${dia}</th>`).join('')}
    </tr>
  `;

  const tbody = document.createElement('tbody');
  tbody.innerHTML = grade
    .map(
      (linha) => `
        <tr>
          <th scope="row">${linha.horario}</th>
          ${dias
            .map((dia) => {
              const id = linha.aulas[dia];
              return `<td>${id ? `<span class="grade-aulas__pill">${nomeModalidade(id)}</span>` : '<span class="grade-aulas__vazio" aria-hidden="true">—</span>'}</td>`;
            })
            .join('')}
        </tr>
      `
    )
    .join('');

  tabela.replaceChildren(thead, tbody);
}

function renderizarMobile() {
  const container = document.getElementById('grade-dias');
  const lista = document.getElementById('grade-lista');
  if (!container || !lista) return;

  container.innerHTML = dias
    .map(
      (dia, indice) =>
        `<button type="button" class="grade-aulas__dia-btn" data-dia="${dia}" aria-pressed="${indice === 0}">${dia}</button>`
    )
    .join('');

  function renderizarLista(dia) {
    const linhasDoDia = grade.filter((linha) => linha.aulas[dia]);
    lista.innerHTML = linhasDoDia.length
      ? linhasDoDia
          .map(
            (linha) => `
              <li class="grade-aulas__item">
                <span class="grade-aulas__item-horario">${linha.horario}</span>
                <span class="grade-aulas__item-nome">${nomeModalidade(linha.aulas[dia])}</span>
              </li>
            `
          )
          .join('')
      : '<li class="grade-aulas__item grade-aulas__item--vazio">Sem aulas coletivas neste dia.</li>';
  }

  container.querySelectorAll('.grade-aulas__dia-btn').forEach((botao) => {
    botao.addEventListener('click', () => {
      container.querySelectorAll('.grade-aulas__dia-btn').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      botao.setAttribute('aria-pressed', 'true');
      renderizarLista(botao.dataset.dia);
    });
  });

  renderizarLista(dias[0]);
}

function renderizarModalidades() {
  const grid = document.getElementById('modalidades-grid');
  if (!grid) return;

  grid.innerHTML = modalidades
    .map(
      (m) => `
        <li class="card-modalidade">
          <h3 class="card-modalidade__nome">${m.nome}</h3>
          <p class="card-modalidade__descricao">${m.descricao}</p>
        </li>
      `
    )
    .join('');
}

export function iniciarGradeAulas() {
  renderizarModalidades();
  renderizarTabela();
  renderizarMobile();
}
