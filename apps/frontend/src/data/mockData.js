export const quickQuestions = [
  'Como acompanho meu pedido?',
  'Quais são as formas de pagamento?',
  'Como solicito uma troca?',
]

export const categories = [
  { name: 'Pedidos e entregas', short: 'PE' },
  { name: 'Pagamentos', short: 'PG' },
  { name: 'Trocas e devoluções', short: 'TD' },
  { name: 'Minha conta', short: 'MC' },
]

export const faqAnswers = [
  {
    terms: ['pedido', 'acompanhar', 'rastrear', 'entrega'],
    answer: 'Você pode acompanhar o pedido em Minha conta > Meus pedidos. Assim que ele for enviado, o código de rastreio também ficará disponível por lá.',
  },
  {
    terms: ['pagamento', 'pagar', 'pix', 'cartão', 'boleto'],
    answer: 'Aceitamos cartão de crédito, Pix e boleto bancário. No cartão, você pode parcelar a compra em até 10 vezes.',
  },
  {
    terms: ['troca', 'devolução', 'devolver'],
    answer: 'A troca ou devolução pode ser solicitada em até 7 dias após o recebimento. Acesse Meus pedidos e selecione “Solicitar troca”.',
  },
  {
    terms: ['conta', 'senha', 'acesso', 'login'],
    answer: 'Para recuperar o acesso, clique em “Esqueci minha senha” na tela de login. Você receberá as instruções no e-mail cadastrado.',
  },
]

export const weeklyQueries = [
  { day: 'Seg', value: 58 },
  { day: 'Ter', value: 72 },
  { day: 'Qua', value: 64 },
  { day: 'Qui', value: 86 },
  { day: 'Sex', value: 100 },
  { day: 'Sáb', value: 48 },
  { day: 'Dom', value: 38 },
]

export const categoryDistribution = [
  { label: 'Pedidos', value: '37%', color: '#126e5a' },
  { label: 'Pagamentos', value: '26%', color: '#46ad8c' },
  { label: 'Trocas', value: '21%', color: '#8fd4bc' },
  { label: 'Conta', value: '16%', color: '#d5eee6' },
]

export const topQuestions = [
  { text: 'Como acompanho meu pedido?', count: 186 },
  { text: 'Quais são as formas de pagamento?', count: 142 },
  { text: 'Qual é o prazo de entrega?', count: 117 },
  { text: 'Como solicito uma troca?', count: 94 },
]

export const unansweredQuestions = [
  { text: 'Vocês entregam fora do Brasil?', time: 'Hoje, 10:42' },
  { text: 'Posso alterar o endereço após a compra?', time: 'Ontem, 18:05' },
  { text: 'Existe desconto para empresas?', time: 'Ontem, 14:21' },
]
