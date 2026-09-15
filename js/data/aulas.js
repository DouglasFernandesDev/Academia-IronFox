/**
 * Modalidades reais (imagens/aula coletiva.png).
 * A grade dia×horário NÃO existe nos cartazes originais — os horários abaixo
 * são exemplo plausível para preencher a estrutura da tabela e estão
 * marcados // CONFIRMAR. Substituir pelos horários reais antes de publicar.
 */

export const modalidades = [
  {
    id: 'funcional',
    nome: 'Funcional',
    descricao: 'Treino de força e condicionamento em circuito, em grupo.',
  },
  {
    id: 'funcional-kids',
    nome: 'Funcional Kids',
    descricao: 'Versão adaptada do funcional para crianças e adolescentes.',
  },
  {
    id: 'jump',
    nome: 'Jump',
    descricao: 'Cardio de alta intensidade no mini trampolim.',
  },
  {
    id: 'pilates-solo',
    nome: 'Pilates Solo',
    descricao: 'Fortalecimento, postura e mobilidade sem aparelhos.',
  },
  {
    id: 'spinning',
    nome: 'Spinning',
    descricao: 'Aula de ciclismo indoor com música e ritmo guiado.',
  },
  {
    id: 'danca-ritmo',
    nome: 'Dança Ritmo',
    descricao: 'Aula coreografada de dança para queimar calorias se divertindo.',
  },
];

export const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

// CONFIRMAR — grade de horários real da Iron Fox. Estrutura: um horário por
// linha, com a modalidade de cada dia (ou null quando não há aula no horário).
export const grade = [
  {
    horario: '06h',
    aulas: { Segunda: 'funcional', Terça: null, Quarta: 'funcional', Quinta: null, Sexta: 'funcional' },
  },
  {
    horario: '08h',
    aulas: { Segunda: 'pilates-solo', Terça: 'spinning', Quarta: 'pilates-solo', Quinta: 'spinning', Sexta: null },
  },
  {
    horario: '17h',
    aulas: { Segunda: null, Terça: 'funcional-kids', Quarta: null, Quinta: 'funcional-kids', Sexta: null },
  },
  {
    horario: '18h',
    aulas: { Segunda: 'jump', Terça: 'funcional', Quarta: 'jump', Quinta: 'funcional', Sexta: 'danca-ritmo' },
  },
  {
    horario: '19h',
    aulas: { Segunda: 'spinning', Terça: 'danca-ritmo', Quarta: 'spinning', Quinta: 'jump', Sexta: 'jump' },
  },
];
