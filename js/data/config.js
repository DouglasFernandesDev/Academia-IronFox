/**
 * Dados centrais do negócio — único arquivo a editar para colocar o site
 * no ar com informações reais. Tudo marcado // CONFIRMAR é placeholder.
 */
export const config = {
  nome: 'Iron Fox Sport Center',
  assinatura: 'Chegamos para mudar a sua visão de treino!',

  // CONFIRMAR — número real de WhatsApp da Iron Fox, formato internacional sem símbolos
  whatsapp: '5522999999999',

  instagram: 'https://instagram.com/ironfoxsportcenter', // CONFIRMAR

  endereco: {
    linha: 'R. Nossa Sra. de Nazareth, s/n, ao lado do nº 1044',
    bairro: 'Cidade Nova',
    cidade: 'Iguaba Grande',
    uf: 'RJ',
    cep: '28960-000', // CONFIRMAR
  },

  // CONFIRMAR — coordenadas exatas da unidade (aproximação do centro de Iguaba Grande)
  coordenadas: { lat: -22.8395, lng: -42.2286 },

  horarios: [
    { dias: 'Segunda a sexta', abre: '05h', fecha: '22h' },
    { dias: 'Sábado', abre: '08h', fecha: '16h' },
    { dias: 'Domingo', abre: '09h', fecha: '13h' },
  ],

  convenios: ['TotalPass', 'Gympass'],

  manifesto: {
    paragrafo1:
      'Nós vamos além de uma academia — ela é um centro de treinamento e família.',
    paragrafo2:
      'Nosso propósito é claro: impulsionar sua evolução física e mental por meio da musculação, das aulas coletivas, e da disciplina e constância. Oferecemos um ambiente moderno, motivador e acessível para o bem-estar de todos, atendendo do iniciante ao atleta de alto desempenho.',
  },
};
