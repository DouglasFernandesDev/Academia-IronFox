/**
 * Preços reais dos cartazes oficiais (imagens/plano 1.png e imagens/plano 2.png).
 * Duas categorias com número diferente de planos cada — nunca assumir grade fixa.
 */

export const categorias = [
  {
    id: 'completo',
    rotulo: 'Completo + aulas',
    descricao: 'Musculação, cardio e aulas coletivas',
    mensagemPlano: 'musculação + cardio + aulas coletivas',
    planos: [
      {
        id: 'completo-quinzenal',
        nome: 'Quinzenal',
        preco: 109.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: false,
      },
      {
        id: 'completo-mensal',
        nome: 'Mensal',
        preco: 169.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: true,
      },
      {
        id: 'completo-mensal-cartao',
        nome: 'Mensal no cartão',
        preco: 179.9,
        condicao: 'no cartão',
        periodo: null,
        destaque: false,
      },
      {
        id: 'completo-anual',
        nome: 'Anual',
        preco: 159.9,
        condicao: 'no débito recorrente',
        periodo: '/mês',
        destaque: false,
        economia: 'Economize R$ 10/mês em relação ao mensal',
      },
      {
        id: 'completo-funcionario-publico',
        nome: 'Funcionário público',
        preco: 159.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: false,
      },
    ],
  },
  {
    id: 'musculacao',
    rotulo: 'Musculação + cardio',
    descricao: 'Musculação e cardio',
    mensagemPlano: 'musculação + cardio',
    planos: [
      {
        id: 'musculacao-quinzenal',
        nome: 'Quinzenal',
        preco: 89.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: false,
      },
      {
        id: 'musculacao-mensal',
        nome: 'Mensal',
        preco: 129.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: true,
      },
      {
        id: 'musculacao-mensal-cartao',
        nome: 'Mensal no cartão',
        preco: 139.9,
        condicao: 'no cartão',
        periodo: null,
        destaque: false,
      },
      {
        id: 'musculacao-semestral',
        nome: 'Semestral',
        preco: 124.9,
        condicao: 'no débito recorrente',
        periodo: '/mês',
        destaque: false,
      },
      {
        id: 'musculacao-anual',
        nome: 'Anual',
        preco: 119.9,
        condicao: 'no débito recorrente',
        periodo: '/mês',
        destaque: false,
        economia: 'Economize R$ 10/mês em relação ao mensal',
      },
      {
        id: 'musculacao-funcionario-publico',
        nome: 'Funcionário público',
        preco: 119.9,
        condicao: 'no dinheiro ou pix',
        periodo: null,
        destaque: false,
      },
    ],
  },
];
