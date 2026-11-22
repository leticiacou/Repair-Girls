/**
 * Professionals — base de dados das prestadoras de serviço da Repair Girls.
 * Usado no painel (agendamento) e na página inicial (cards "Conheça a equipe").
 * O modal de perfil é criado dinamicamente, então basta incluir este script
 * em qualquer página para habilitar `data-professional-id` e `data-pro-grid`.
 */

const Professionals = (() => {
  const LIST = [
    {
      id: 'carla-souza',
      name: 'Carla Souza',
      photo: 'https://i.pravatar.cc/300?img=45',
      specialty: 'Elétrica',
      services: ['Elétrica', 'Reparos Gerais'],
      servicesDone: 132,
      rating: 4.9,
      reviewCount: 87,
      experience: '8 anos',
      phone: '(11) 98765-1234',
      whatsapp: '5511987651234',
      city: 'Santo André',
      state: 'SP',
      lat: -23.6637,
      lng: -46.5383,
      zones: ['Centro', 'Campestre', 'Utinga'],
      bio: 'Eletricista formada pelo SENAI com 8 anos de experiência em instalações residenciais. Apaixonada por tornar a casa das clientes mais segura e funcional.',
      feedbacks: [
        { name: 'Juliana M.', rating: 5, text: 'Troca de tomadas rápida e muito caprichada. Me explicou tudo com paciência!', date: 'Out 2026' },
        { name: 'Patrícia R.', rating: 5, text: 'Instalou o ventilador de teto em 1h. Recomendo demais!', date: 'Set 2026' },
        { name: 'Camila S.', rating: 4, text: 'Serviço ótimo, só precisei remarcar uma vez por um imprevisto meu.', date: 'Ago 2026' }
      ]
    },
    {
      id: 'mariana-ferreira',
      name: 'Mariana Ferreira',
      photo: 'https://i.pravatar.cc/300?img=44',
      specialty: 'Hidráulica',
      services: ['Hidráulica', 'Reparos Gerais'],
      servicesDone: 98,
      rating: 4.8,
      reviewCount: 64,
      experience: '6 anos',
      phone: '(11) 97654-2211',
      whatsapp: '5511976542211',
      city: 'Campinas',
      state: 'SP',
      lat: -22.9099,
      lng: -47.0626,
      zones: ['Centro', 'Cambuí', 'Taquaral'],
      bio: 'Encanadora especializada em hidráulica residencial. Atendimento ágil para vazamentos, torneiras, chuveiros e instalações em geral.',
      feedbacks: [
        { name: 'Fernanda L.', rating: 5, text: 'Vazamento resolvido na hora. Chegou certinho no horário combinado.', date: 'Out 2026' },
        { name: 'Renata C.', rating: 5, text: 'Trocou o chuveiro e ainda ajustou a pressão da água. Super recomendo!', date: 'Set 2026' }
      ]
    },
    {
      id: 'beatriz-lima',
      name: 'Beatriz Lima',
      photo: 'https://i.pravatar.cc/300?img=32',
      specialty: 'Pintura',
      services: ['Pintura'],
      servicesDone: 76,
      rating: 5.0,
      reviewCount: 58,
      experience: '7 anos',
      phone: '(11) 96543-8899',
      whatsapp: '5511965438899',
      city: 'São Paulo',
      state: 'SP',
      lat: -23.5505,
      lng: -46.6333,
      zones: ['Pinheiros', 'Vila Mariana', 'Moema'],
      bio: 'Pintora decoradora com olho para detalhes. Transformo ambientes com cores, texturas e acabamentos impecáveis.',
      feedbacks: [
        { name: 'Aline P.', rating: 5, text: 'Pintou o quarto inteiro sem deixar respingo. Resultado lindo!', date: 'Out 2026' },
        { name: 'Débora N.', rating: 5, text: 'Fechou as rachaduras e deu um acabamento impecável nas paredes.', date: 'Set 2026' },
        { name: 'Larissa T.', rating: 4, text: 'Demorou um pouco mais que o previsto, mas o resultado valeu a pena.', date: 'Ago 2026' }
      ]
    },
    {
      id: 'patricia-alves',
      name: 'Patrícia Alves',
      photo: 'https://i.pravatar.cc/300?img=26',
      specialty: 'Montagem de Móveis',
      services: ['Montagem de Móveis', 'Reparos Gerais'],
      servicesDone: 154,
      rating: 4.7,
      reviewCount: 121,
      experience: '9 anos',
      phone: '(11) 95432-7766',
      whatsapp: '5511954327766',
      city: 'Santos',
      state: 'SP',
      lat: -23.9608,
      lng: -46.3336,
      zones: ['Centro', 'Gonzaga', 'Embaúba'],
      bio: 'Especialista em montagem e marcenaria residencial. Já montei mais de 150 móveis para clientes satisfeitas — tudo nivelado e caprichado.',
      feedbacks: [
        { name: 'Vanessa R.', rating: 5, text: 'Montou o guarda-roupa inteiro em 2 horas. Tudo nivelado e perfeito!', date: 'Out 2026' },
        { name: 'Letícia A.', rating: 5, text: 'Fixou os suportes de TV com muito cuidado. Recomendo de olhos fechados!', date: 'Set 2026' }
      ]
    },
    {
      id: 'renata-oliveira',
      name: 'Renata Oliveira',
      photo: 'https://i.pravatar.cc/300?img=20',
      specialty: 'Reparos Gerais',
      services: ['Reparos Gerais', 'Manutenção Preventiva'],
      servicesDone: 210,
      rating: 4.9,
      reviewCount: 167,
      experience: '10 anos',
      phone: '(11) 94321-6655',
      whatsapp: '5511943216655',
      city: 'Rio de Janeiro',
      state: 'RJ',
      lat: -22.9068,
      lng: -43.1729,
      zones: ['Copacabana', 'Tijuca', 'Botafogo'],
      bio: 'Reparos gerais e manutenção residencial. Resolvo aquele probleminha chato que ninguém quer mexer — portas, janelas, fechaduras e muito mais.',
      feedbacks: [
        { name: 'Simone B.', rating: 5, text: 'Consertou a porta que não fechava e ainda trocou a fechadura. Rápido e eficiente!', date: 'Out 2026' },
        { name: 'Priscila D.', rating: 5, text: 'Reparou a janela emperrada. Profissional atenciosa do início ao fim.', date: 'Set 2026' },
        { name: 'Tatiane F.', rating: 4, text: 'Ótimo serviço, comunicação sempre atenciosa pelo WhatsApp.', date: 'Ago 2026' }
      ]
    },
    {
      id: 'aline-costa',
      name: 'Aline Costa',
      photo: 'https://i.pravatar.cc/300?img=9',
      specialty: 'Manutenção Preventiva',
      services: ['Manutenção Preventiva', 'Elétrica'],
      servicesDone: 64,
      rating: 4.8,
      reviewCount: 49,
      experience: '5 anos',
      phone: '(11) 93210-5544',
      whatsapp: '5511932105544',
      city: 'Belo Horizonte',
      state: 'MG',
      lat: -19.9167,
      lng: -43.9345,
      zones: ['Savassi', 'Funcionários', 'Pampulha'],
      bio: 'Formada em Engenharia, foco em manutenção preventiva e segurança das instalações. Verifico cada detalhe para sua casa ficar sempre em dia.',
      feedbacks: [
        { name: 'Mariana G.', rating: 5, text: 'Revisão completa da casa: elétrica, hidráulica e estrutura. Super vale!', date: 'Out 2026' },
        { name: 'Bianca H.', rating: 5, text: 'Explicou cada ponto verificado e ainda deixou dicas de manutenção.', date: 'Set 2026' }
      ]
    },
    {
      id: 'juliana-prado',
      name: 'Juliana Prado',
      photo: 'https://i.pravatar.cc/300?img=47',
      specialty: 'Elétrica',
      services: ['Elétrica', 'Reparos Gerais'],
      servicesDone: 88,
      rating: 4.8,
      reviewCount: 61,
      experience: '6 anos',
      phone: '(71) 98888-1122',
      whatsapp: '5571988881122',
      city: 'Salvador',
      state: 'BA',
      lat: -12.9714,
      lng: -38.5014,
      zones: ['Centro', 'Pituba', 'Caminho das Árvores'],
      bio: 'Eletricista residencial em Salvador. Instalações, quadros de distribuição e reparos com acabamento sempre caprichado.',
      feedbacks: [
        { name: 'Tais M.', rating: 5, text: 'Troca do quadro elétrico feita com muita segurança e organização.', date: 'Out 2026' },
        { name: 'Rafaela S.', rating: 4, text: 'Serviço correto, só tive que ajustar o horário uma vez.', date: 'Set 2026' }
      ]
    },
    {
      id: 'fernanda-alves',
      name: 'Fernanda Alves',
      photo: 'https://i.pravatar.cc/300?img=48',
      specialty: 'Hidráulica',
      services: ['Hidráulica', 'Reparos Gerais'],
      servicesDone: 115,
      rating: 4.9,
      reviewCount: 93,
      experience: '9 anos',
      phone: '(81) 97777-3344',
      whatsapp: '5581977773344',
      city: 'Recife',
      state: 'PE',
      lat: -8.0476,
      lng: -34.8770,
      zones: ['Boa Viagem', 'Espinheiro', 'Casa Forte'],
      bio: 'Encanadora com quase 10 anos de estrada no Recife. Especialista em vazamentos e instalações em casas e apartamentos.',
      feedbacks: [
        { name: 'Bruna O.', rating: 5, text: 'Vazamento no banheiro resolvido em 40 minutos. Incrível!', date: 'Out 2026' },
        { name: 'Alice P.', rating: 5, text: 'Trocou a torneira e o sifão com capricho. Voltaria a chamar!', date: 'Set 2026' },
        { name: 'Nina R.', rating: 4, text: 'Ótimo atendimento, preço justo e serviço garantido.', date: 'Ago 2026' }
      ]
    },
    {
      id: 'camila-rocha',
      name: 'Camila Rocha',
      photo: 'https://i.pravatar.cc/300?img=49',
      specialty: 'Pintura',
      services: ['Pintura'],
      servicesDone: 69,
      rating: 4.7,
      reviewCount: 52,
      experience: '5 anos',
      phone: '(85) 96666-5566',
      whatsapp: '5585966665566',
      city: 'Fortaleza',
      state: 'CE',
      lat: -3.7319,
      lng: -38.5267,
      zones: ['Meireles', 'Aldeota', 'Benfica'],
      bio: 'Pintora decoradora fortalezense. Pintura interna e externa, texturas e acabamentos finos para deixar sua casa com cara nova.',
      feedbacks: [
        { name: 'Isabela C.', rating: 5, text: 'Pintou o apartamento inteiro em uma semana. Super organizada!', date: 'Out 2026' },
        { name: 'Luana V.', rating: 4, text: 'Resultado lindo, cores exatamente como combinamos.', date: 'Set 2026' }
      ]
    },
    {
      id: 'larissa-mendes',
      name: 'Larissa Mendes',
      photo: 'https://i.pravatar.cc/300?img=5',
      specialty: 'Montagem de Móveis',
      services: ['Montagem de Móveis', 'Reparos Gerais'],
      servicesDone: 143,
      rating: 4.8,
      reviewCount: 110,
      experience: '8 anos',
      phone: '(41) 95555-7788',
      whatsapp: '5541955557788',
      city: 'Curitiba',
      state: 'PR',
      lat: -25.4284,
      lng: -49.2733,
      zones: ['Batel', 'Bairro Alto', 'Centro'],
      bio: 'Montadora de móveis com 8 anos em Curitiba. Já montei mais de 140 móveis — tudo alinhado, sem gambiarra e sem risco para as paredes.',
      feedbacks: [
        { name: 'Paula F.', rating: 5, text: 'Montou o closet inteiro em 3 horas. Perfeito e sem deixar marca!', date: 'Out 2026' },
        { name: 'Gabi L.', rating: 5, text: 'Fixou os suportes da cozinha com muito cuidado. Recomendo!', date: 'Set 2026' }
      ]
    },
    {
      id: 'gabriela-santos',
      name: 'Gabriela Santos',
      photo: 'https://i.pravatar.cc/300?img=12',
      specialty: 'Reparos Gerais',
      services: ['Reparos Gerais', 'Manutenção Preventiva'],
      servicesDone: 178,
      rating: 4.9,
      reviewCount: 145,
      experience: '10 anos',
      phone: '(51) 94444-9900',
      whatsapp: '5551944449900',
      city: 'Porto Alegre',
      state: 'RS',
      lat: -30.0346,
      lng: -51.2177,
      zones: ['Moinhos de Vento', 'Petrópolis', 'Centro Histórico'],
      bio: 'Reparos gerais e manutenção residencial no Porto Alegre. Portas, janelas, fechaduras, drywall — resolvo com rapidez e limpeza.',
      feedbacks: [
        { name: 'Sofia T.', rating: 5, text: 'Reparou a porta que batia e ainda regulou a fechadura. Super!', date: 'Out 2026' },
        { name: 'Mel T.', rating: 5, text: 'Manutenção preventiva completa. Casa revisada de cima a baixo.', date: 'Set 2026' },
        { name: 'Carol M.', rating: 4, text: 'Serviço impecável, comunicação ótima pelo WhatsApp.', date: 'Ago 2026' }
      ]
    },
    {
      id: 'leticia-barbosa',
      name: 'Letícia Barbosa',
      photo: 'https://i.pravatar.cc/300?img=16',
      specialty: 'Manutenção Preventiva',
      services: ['Manutenção Preventiva', 'Elétrica'],
      servicesDone: 72,
      rating: 4.8,
      reviewCount: 58,
      experience: '6 anos',
      phone: '(61) 93333-2211',
      whatsapp: '5561933332211',
      city: 'Brasília',
      state: 'DF',
      lat: -15.7939,
      lng: -47.8828,
      zones: ['Asa Sul', 'Asa Norte', 'Sudoeste'],
      bio: 'Engenheira civil especializada em manutenção preventiva em Brasília. Laudo detalhado de cada ponto verificado na sua casa.',
      feedbacks: [
        { name: 'Débora Q.', rating: 5, text: 'Revisão elétrica completa com relatório. Muito profissional!', date: 'Out 2026' },
        { name: 'Júlia S.', rating: 5, text: 'Encontrou um problema que eu nem sabia que existia. Salvou!', date: 'Set 2026' }
      ]
    },
    {
      id: 'amanda-ferreira',
      name: 'Amanda Ferreira',
      photo: 'https://i.pravatar.cc/300?img=24',
      specialty: 'Elétrica',
      services: ['Elétrica'],
      servicesDone: 96,
      rating: 4.7,
      reviewCount: 78,
      experience: '7 anos',
      phone: '(62) 92222-4433',
      whatsapp: '5561922224433',
      city: 'Goiânia',
      state: 'GO',
      lat: -16.6869,
      lng: -49.2648,
      zones: ['Setor Bueno', 'Setor Marista', 'Jardim Goiás'],
      bio: 'Eletricista em Goiânia especializada em instalações residenciais novas e reformas. Do projeto à execução com acabamento limpo.',
      feedbacks: [
        { name: 'Marina E.', rating: 5, text: 'Instalou pontos de tomada novos sem deixar sujeira. Ótimo!', date: 'Out 2026' },
        { name: 'Helena B.', rating: 4, text: 'Serviço rápido e preço justo. Recomendo!', date: 'Set 2026' }
      ]
    },
    {
      id: 'bruna-carvalho',
      name: 'Bruna Carvalho',
      photo: 'https://i.pravatar.cc/300?img=31',
      specialty: 'Pintura',
      services: ['Pintura', 'Reparos Gerais'],
      servicesDone: 83,
      rating: 4.8,
      reviewCount: 66,
      experience: '6 anos',
      phone: '(48) 91111-6655',
      whatsapp: '5548911116655',
      city: 'Florianópolis',
      state: 'SC',
      lat: -27.5954,
      lng: -48.5480,
      zones: ['Centro', 'Lagoa da Conceição', 'Saco Grande'],
      bio: 'Pintora decoradora em Florianópolis. Pintura interna e externa com foco em acabamento e proteção contra umidade.',
      feedbacks: [
        { name: 'Beatriz J.', rating: 5, text: 'Pintou a varanda externa e ficou lindo. Resistente à maresia!', date: 'Out 2026' },
        { name: 'Amanda C.', rating: 5, text: 'Capricho total nos detalhes. Casa nova!', date: 'Set 2026' }
      ]
    },
    {
      id: 'vanessa-lopes',
      name: 'Vanessa Lopes',
      photo: 'https://i.pravatar.cc/300?img=38',
      specialty: 'Hidráulica',
      services: ['Hidráulica'],
      servicesDone: 91,
      rating: 4.9,
      reviewCount: 74,
      experience: '7 anos',
      phone: '(92) 90000-7788',
      whatsapp: '5592900007788',
      city: 'Manaus',
      state: 'AM',
      lat: -3.1190,
      lng: -60.0217,
      zones: ['Centro', 'Adrianópolis', 'Chapada'],
      bio: 'Encanadora em Manaus com 7 anos de experiência. Reparos em casas e apartamentos, com atenção à qualidade da água local.',
      feedbacks: [
        { name: 'Larissa F.', rating: 5, text: 'Reparou o encanamento com rapidez e deixou tudo limpo.', date: 'Out 2026' },
        { name: 'Sabrina V.', rating: 5, text: 'Chuveiro novo instalado e funcionando perfeitamente.', date: 'Set 2026' }
      ]
    },
    {
      id: 'paola-nunes',
      name: 'Paola Nunes',
      photo: 'https://i.pravatar.cc/300?img=41',
      specialty: 'Reparos Gerais',
      services: ['Reparos Gerais'],
      servicesDone: 127,
      rating: 4.7,
      reviewCount: 98,
      experience: '8 anos',
      phone: '(91) 98888-9900',
      whatsapp: '5591988889900',
      city: 'Belém',
      state: 'PA',
      lat: -1.4558,
      lng: -48.4908,
      zones: ['Nazaré', 'Batista Campos', 'Marco'],
      bio: 'Reparos gerais em Belém. Portas, janelas, drywall, fechaduras e aquele "conserta aqui" que a casa inteira precisa.',
      feedbacks: [
        { name: 'Fernanda U.', rating: 5, text: 'Consertou três coisas de uma vez. Super prático!', date: 'Out 2026' },
        { name: 'Vitória M.', rating: 4, text: 'Serviço honesto e bem feito. Voltaria a chamar.', date: 'Set 2026' }
      ]
    }
  ];

  // ===== Expansão nacional: 5 profissionais por UF =====
  // Só cidades que ainda faltam para cada estado chegar a 5 no total.
  // Formato: UF -> { ddd, cities: [[nome, lat, lng], ...] }
  const UF_EXTRA = {
    AC: { ddd: '68', cities: [
      ['Rio Branco', -9.9754, -67.8243], ['Cruzeiro do Sul', -8.0831, -72.6752],
      ['Sena Madureira', -9.1229, -68.6529], ['Tarauacá', -8.1614, -70.5167],
      ['Brasileia', -11.0017, -68.0724]
    ]},
    AL: { ddd: '82', cities: [
      ['Maceió', -9.6658, -35.7350], ['Arapiraca', -9.7523, -36.6614],
      ['Rio Largo', -9.6289, -35.8856], ['União dos Palmares', -9.6717, -36.8619],
      ['Penedo', -10.3109, -36.5653]
    ]},
    AP: { ddd: '96', cities: [
      ['Macapá', 0.0350, -51.0705], ['Santana', 0.0603, -51.1788],
      ['Mazagão', -0.1719, -50.5817], ['Laranjal do Jari', 0.0297, -51.6588],
      ['Oiapoque', 3.8333, -51.8333]
    ]},
    AM: { ddd: '92', cities: [
      ['Parintins', -2.6289, -56.7331], ['Itacoatiara', -3.1333, -58.3833],
      ['Manacapuru', -3.3167, -60.6167], ['Tefé', -3.3667, -64.7167]
    ]},
    BA: { ddd: '71', cities: [
      ['Feira de Santana', -12.2661, -38.9622], ['Vitória da Conquista', -14.8615, -40.8444],
      ['Camaçari', -12.7453, -38.3244], ['Ilhéus', -14.7959, -39.0438]
    ]},
    CE: { ddd: '85', cities: [
      ['Caucaia', -3.7372, -38.6426], ['Juazeiro do Norte', -7.2039, -39.3154],
      ['Sobral', -3.6919, -40.3509], ['Maracanaú', -3.8867, -38.6297]
    ]},
    DF: { ddd: '61', cities: [
      ['Ceilândia', -15.8119, -48.1358], ['Taguatinga', -15.8306, -48.1198],
      ['Águas Claras', -15.8250, -47.9694], ['Gama', -16.0004, -48.2953]
    ]},
    ES: { ddd: '27', cities: [
      ['Vitória', -20.3194, -40.3378], ['Vila Velha', -20.3297, -40.2924],
      ['Cariacica', -20.2614, -40.4156], ['Linhares', -19.1667, -40.0667],
      ['São Mateus', -18.7333, -39.8667]
    ]},
    GO: { ddd: '62', cities: [
      ['Aparecida de Goiânia', -16.8190, -49.2406], ['Anápolis', -16.3268, -48.9530],
      ['Rio Verde', -17.7833, -50.9333], ['Luziânia', -16.2507, -47.9564]
    ]},
    MA: { ddd: '98', cities: [
      ['São Luís', -2.5297, -44.3028], ['Imperatriz', -5.5283, -47.4956],
      ['São José de Ribamar', -2.5000, -44.2333], ['Timon', -5.0889, -42.8189],
      ['Caxias', -4.8594, -43.3510]
    ]},
    MT: { ddd: '65', cities: [
      ['Cuiabá', -15.6014, -56.0979], ['Várzea Grande', -15.6530, -56.1310],
      ['Rondonópolis', -16.4678, -54.6404], ['Sinop', -11.8626, -55.5028],
      ['Tangará da Serra', -14.6340, -57.4907]
    ]},
    MS: { ddd: '67', cities: [
      ['Campo Grande', -20.4697, -54.6201], ['Dourados', -22.2233, -54.8128],
      ['Três Lagoas', -20.7753, -51.7157], ['Corumbá', -19.0123, -57.6639],
      ['Ponta Porã', -22.5361, -55.7253]
    ]},
    MG: { ddd: '34', cities: [
      ['Uberlândia', -18.9186, -48.2772], ['Contagem', -19.9311, -44.0539],
      ['Juiz de Fora', -21.7642, -43.3503], ['Montes Claros', -16.7279, -43.8636]
    ]},
    PB: { ddd: '83', cities: [
      ['João Pessoa', -7.1195, -34.8450], ['Campina Grande', -7.2306, -35.8811],
      ['Santa Rita', -7.1717, -34.9794], ['Patos', -7.0206, -37.2755],
      ['Sousa', -6.7678, -38.2356]
    ]},
    PA: { ddd: '91', cities: [
      ['Santarém', -2.4424, -54.7084], ['Marabá', -5.3580, -49.1192],
      ['Castanhal', -1.2936, -48.0622], ['Parauapebas', -6.0692, -49.8935]
    ]},
    PR: { ddd: '43', cities: [
      ['Londrina', -23.3103, -51.1287], ['Maringá', -23.4205, -51.9331],
      ['Ponta Grossa', -25.0959, -50.1614], ['Cascavel', -24.9558, -53.4594]
    ]},
    PE: { ddd: '81', cities: [
      ['Jaboatão dos Guararapes', -8.1126, -34.8310], ['Olinda', -8.0084, -34.8553],
      ['Caruaru', -8.2827, -35.9758], ['Petrolina', -9.3958, -40.5040]
    ]},
    PI: { ddd: '86', cities: [
      ['Teresina', -5.0892, -42.8016], ['Picos', -7.0749, -41.4611],
      ['Parnaíba', -2.9057, -41.7350], ['Piripiri', -4.2937, -41.7494],
      ['Floriano', -6.1297, -42.7212]
    ]},
    RJ: { ddd: '21', cities: [
      ['Niterói', -22.8833, -43.2094], ['Duque de Caxias', -22.7897, -43.3119],
      ['Nova Iguaçu', -22.7599, -43.4500], ['Petrópolis', -22.5054, -43.1773]
    ]},
    RN: { ddd: '84', cities: [
      ['Natal', -5.7945, -35.2110], ['Mossoró', -5.1875, -37.3444],
      ['Parnamirim', -5.8889, -35.2639], ['Caicó', -6.4636, -37.0772],
      ['São Gonçalo do Amarante', -5.9292, -35.2717]
    ]},
    RO: { ddd: '69', cities: [
      ['Porto Velho', -8.7612, -63.9004], ['Ji-Paraná', -10.8807, -61.9429],
      ['Ariquemes', -9.9139, -63.0199], ['Vilhena', -12.7385, -60.1394],
      ['Cacoal', -11.4329, -61.4591]
    ]},
    RR: { ddd: '95', cities: [
      ['Boa Vista', 2.8235, -60.6758], ['Rorainópolis', 4.8656, -60.4414],
      ['Caracaraí', 1.8267, -61.1333], ['Mucajaí', 2.4544, -60.9278],
      ['Iracema', 2.6467, -60.9756]
    ]},
    RS: { ddd: '54', cities: [
      ['Caxias do Sul', -29.1681, -51.1794], ['Pelotas', -31.7642, -52.3376],
      ['Canoas', -29.9178, -51.1839], ['Santa Maria', -29.6912, -53.8041]
    ]},
    SC: { ddd: '47', cities: [
      ['Joinville', -26.3044, -48.8487], ['Blumenau', -26.9194, -49.0661],
      ['São José', -27.6154, -48.6361], ['Chapecó', -27.1011, -52.6694]
    ]},
    SE: { ddd: '79', cities: [
      ['Aracaju', -10.9472, -37.0731], ['Nossa Senhora do Socorro', -10.8728, -37.0719],
      ['Lagarto', -10.9286, -37.3387], ['Itabaiana', -10.6989, -37.4239],
      ['Estância', -10.6706, -37.4233]
    ]},
    SP: { ddd: '11', cities: [
      ['Guarulhos', -23.4626, -46.5322]
    ]},
    TO: { ddd: '63', cities: [
      ['Palmas', -10.1840, -48.3336], ['Araguaína', -7.1929, -48.2057],
      ['Gurupi', -11.7282, -49.0667], ['Porto Nacional', -10.7094, -48.4064],
      ['Paraíso do Tocantins', -10.7256, -47.8828]
    ]}
  };

  const GEN_FIRST = [
    'Ana','Beatriz','Camila','Carla','Daniela','Eduarda','Fabiana','Gabriela',
    'Helena','Isabela','Juliana','Larissa','Leticia','Luana','Manuela','Mariana',
    'Natalia','Nicole','Olivia','Patricia','Priscila','Queila','Rafaela','Roberta',
    'Sabrina','Simone','Sofia','Tatiane','Teresa','Valentina','Vanessa','Viviane',
    'Aline','Amanda','Bianca','Bruna','Carolina','Cecilia','Clara','Debora',
    'Elisa','Giovanna','Ingrid','Joana','Karen','Lorena','Melissa','Yasmin',
    'Alice','Barbara','Cristina','Diana','Esther','Fernanda','Gisele','Heloisa'
  ];
  const GEN_LAST = [
    'Almeida','Barbosa','Cardoso','Carvalho','Costa','Dias','Fernandes','Fonseca',
    'Freitas','Gomes','Goncalves','Lima','Martins','Mendes','Monteiro','Morais',
    'Nascimento','Nunes','Oliveira','Pereira','Pinto','Ribeiro','Rocha','Santos',
    'Silva','Soares','Sousa','Teixeira','Vasconcelos','Vieira','Xavier','Araujo',
    'Batista','Correia','Duarte','Esteves','Farias','Garcia','Henriques','Ibrahim',
    'Jardim','Klein','Leite','Macedo','Neves','Ortega','Peixoto','Queiroz',
    'Rezende','Sales','Tavares','Uchoa','Valente','Werneck','Yamada','Zanetti'
  ];
  const GEN_FB_NAMES = [
    'Cliente verificada','Moradora local','Cliente recorrente','Nova cliente',
    'Mariana C.','Juliana P.','Patricia L.','Camila R.','Beatriz S.','Fernanda M.'
  ];
  const GEN_SPECIALTIES = [
    'Elétrica', 'Hidráulica', 'Pintura', 'Montagem de Móveis',
    'Reparos Gerais', 'Manutenção Preventiva'
  ];
  const GEN_BIOS = {
    'Elétrica': [
      'Eletricista profissional em {city}/{uf}, com instalações residenciais, quadros de distribuição e reparos feitos com acabamento limpo.',
      'Especialista em elétrica residencial atuando em {city}/{uf}. Do disjuntor à tomada, resolvo com segurança e capricho.'
    ],
    'Hidráulica': [
      'Encanadora em {city}/{uf} com anos de experiência em vazamentos, torneiras, chuveiros e instalações hidráulicas residenciais.',
      'Hidráulica residencial em {city}/{uf}: atendimento rápido para vazamentos e instalações completas, sem gambiarra.'
    ],
    'Pintura': [
      'Pintora decoradora em {city}/{uf}. Pintura interna e externa, texturas e acabamentos finos para renovar seu ambiente.',
      'Pintura residencial em {city}/{uf} com foco em cobertura uniforme e acabamento impecável do início ao fim.'
    ],
    'Montagem de Móveis': [
      'Montadora de móveis em {city}/{uf}. Móveis nivelados, fixações seguras e zero sujeira depois do serviço.',
      'Especialista em montagem e pequenos reparos de marcenaria em {city}/{uf}, com capricho em cada detalhe.'
    ],
    'Reparos Gerais': [
      'Reparos gerais em {city}/{uf}: portas, janelas, fechaduras, drywall e aquele probleminha chato que a casa inteira precisa.',
      'Profissional de reparos residenciais em {city}/{uf}. Resolvo com rapidez, limpeza e garantia do serviço.'
    ],
    'Manutenção Preventiva': [
      'Engenheira focada em manutenção preventiva em {city}/{uf}. Reviso elétrica, hidráulica e estrutura com relatório detalhado.',
      'Manutenção preventiva residencial em {city}/{uf}. Verifico cada ponto da casa para você dormir tranquila.'
    ]
  };
  const GEN_FB_TEXTS = [
    'Serviço rápido, caprichado e com preço justo. Recomendo!',
    'Chegou no horário, resolveu tudo e ainda deixou a casa limpa.',
    'Profissional atenciosa do início ao fim. Voltaria a chamar!',
    'Explicou cada etapa do serviço com muita paciência.',
    'Resultado impecável. A casa ficou como nova.',
    'Comunicação ótima pelo WhatsApp e serviço garantido.'
  ];

  function genSlug(text) {
    return (text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // Pool de fotos: 100 retratos randomuser.me + 70 pravatar = 170 imagens únicas
  const PHOTO_POOL = [];
  for (let i = 0; i < 100; i++) PHOTO_POOL.push('https://randomuser.me/api/portraits/women/' + i + '.jpg');
  for (let i = 1; i <= 70; i++) PHOTO_POOL.push('https://i.pravatar.cc/300?img=' + i);
  let photoCursor = 0;

  // Gera profissionais até cada UF ter 5 no total
  const usedNames = new Set(LIST.map(p => p.name.toLowerCase()));
  const usedIds = new Set(LIST.map(p => p.id));
  const usedPhotos = new Set(LIST.map(p => p.photo));
  let genIndex = 0;

  Object.keys(UF_EXTRA).forEach(uf => {
    const current = LIST.filter(p => p.state === uf).length;
    const need = 5 - current;
    const { ddd, cities } = UF_EXTRA[uf];
    for (let k = 0; k < need && k < cities.length; k++, genIndex++) {
      const [city, lat, lng] = cities[k];

      // Nome único combinando primeiro + sobrenome
      let name = '';
      for (let t = 0; t < 500 && !name; t++) {
        const candidate = GEN_FIRST[(genIndex + t) % GEN_FIRST.length] + ' ' +
          GEN_LAST[(genIndex * 3 + t * 7 + 1) % GEN_LAST.length];
        if (!usedNames.has(candidate.toLowerCase())) name = candidate;
      }
      usedNames.add(name.toLowerCase());

      const spec = GEN_SPECIALTIES[genIndex % GEN_SPECIALTIES.length];
      const services = [spec];
      if (genIndex % 2 === 0) services.push(GEN_SPECIALTIES[(genIndex + 2) % GEN_SPECIALTIES.length]);

      const bioTpl = GEN_BIOS[spec][genIndex % GEN_BIOS[spec].length];
      const bio = bioTpl.replace('{city}', city).replace('{uf}', uf);

      const fbCount = 2 + (genIndex % 2);
      const feedbacks = [];
      for (let f = 0; f < fbCount; f++) {
        const fi = genIndex + f * 5;
        feedbacks.push({
          name: GEN_FB_NAMES[fi % GEN_FB_NAMES.length],
          rating: 4 + (fi % 2),
          text: GEN_FB_TEXTS[(fi * 3) % GEN_FB_TEXTS.length],
          date: (fi % 2 === 0 ? 'Out 2026' : 'Set 2026')
        });
      }

      const servicesDone = 35 + ((genIndex * 37) % 160);
      const rating = (45 + ((genIndex * 7) % 6)) / 10;
      const dddPhone = ddd + '9' + String(1000 + (genIndex * 137) % 9000) + String(1000 + (genIndex * 271) % 9000);
      let photo = null;
      for (let scan = 0; scan < PHOTO_POOL.length && !photo; scan++) {
        const candidate = PHOTO_POOL[(photoCursor + scan) % PHOTO_POOL.length];
        if (!usedPhotos.has(candidate)) {
          photo = candidate;
          photoCursor = (photoCursor + scan + 1) % PHOTO_POOL.length;
        }
      }
      if (!photo) photo = PHOTO_POOL[genIndex % PHOTO_POOL.length];
      usedPhotos.add(photo);

      let id = 'pro-' + genSlug(name) + '-' + uf.toLowerCase();
      let idGuard = 0;
      while (usedIds.has(id)) id = 'pro-' + genSlug(name) + '-' + uf.toLowerCase() + '-' + (++idGuard);
      usedIds.add(id);

      LIST.push({
        id,
        name,
        photo,
        specialty: spec,
        services,
        servicesDone,
        rating,
        reviewCount: Math.round(servicesDone * (0.55 + (genIndex % 5) * 0.1)),
        experience: (2 + (genIndex % 9)) + ' anos',
        phone: '(' + ddd + ') ' + dddPhone.slice(2, 7) + '-' + dddPhone.slice(7),
        whatsapp: '55' + dddPhone,
        city,
        state: uf,
        lat,
        lng,
        bio,
        feedbacks
      });
    }
  });

  function getAll() {
    return LIST.slice();
  }

  function getById(id) {
    return LIST.find(p => p.id === id) || null;
  }

  function getByName(name) {
    const n = (name || '').toLowerCase().trim();
    return LIST.find(p => p.name.toLowerCase() === n) || null;
  }

  function getQualifiedFor(service) {
    if (!service) return [];
    return LIST.filter(p => p.services.includes(service));
  }

  // Distância em km entre a profissional e uma coordenada (fórmula de Haversine)
  function distanceKm(pro, lat, lng) {
    if (pro.lat == null || pro.lng == null || lat == null || lng == null) return null;
    const R = 6371;
    const dLat = (pro.lat - lat) * Math.PI / 180;
    const dLng = (pro.lng - lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat * Math.PI / 180) * Math.cos(pro.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function pickForService(service, preferredId, location, lat, lng) {
    if (preferredId) {
      const chosen = getById(preferredId);
      if (chosen && chosen.services.includes(service)) return chosen;
    }
    let pool = getQualifiedFor(service);
    if (lat != null && lng != null) {
      const withDist = pool
        .map(p => ({ p, d: distanceKm(p, lat, lng) }))
        .filter(x => x.d != null)
        .sort((a, b) => a.d - b.d);
      if (withDist.length) pool = withDist.slice(0, Math.max(1, Math.ceil(withDist.length / 2))).map(x => x.p);
    } else if (location) {
      const near = pool.filter(p => proximityTier(p, location) > 0);
      if (near.length) pool = near;
    }
    const source = pool.length ? pool : LIST;
    return source[Math.floor(Math.random() * source.length)];
  }

  function normalizeLoc(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  }

  // Sigla -> nome do estado (normalizado, sem acento)
  const UF_NAMES = {
    ac: 'acre', al: 'alagoas', ap: 'amapa', am: 'amazonas', ba: 'bahia',
    ce: 'ceara', df: 'distrito federal', es: 'espirito santo', go: 'goias',
    ma: 'maranhao', mt: 'mato grosso', ms: 'mato grosso do sul', mg: 'minas gerais',
    pa: 'para', pb: 'paraiba', pr: 'parana', pe: 'pernambuco', pi: 'piaui',
    rj: 'rio de janeiro', rn: 'rio grande do norte', rs: 'rio grande do sul',
    ro: 'rondonia', rr: 'roraima', sc: 'santa catarina', sp: 'sao paulo',
    se: 'sergipe', to: 'tocantins'
  };
  const UF_BY_NAME = {};
  Object.keys(UF_NAMES).forEach(sigla => { UF_BY_NAME[UF_NAMES[sigla]] = sigla; });

  function toUF(s) {
    const n = normalizeLoc(s);
    if (!n) return '';
    if (UF_NAMES[n]) return n;
    return UF_BY_NAME[n] || n;
  }

  // Extrai { city, state } de textos como "Campinas, SP" ou "São Paulo"
  function parseLocation(location) {
    const parts = (location || '').split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return { city: normalizeLoc(parts[0]), state: toUF(parts[parts.length - 1]) };
    }
    if (parts.length === 1) {
      const only = normalizeLoc(parts[0]);
      // Se a pessoa digitou só a sigla do estado, trata como estado
      return UF_NAMES[only] ? { city: '', state: toUF(only) } : { city: only, state: '' };
    }
    return { city: '', state: '' };
  }

  function cityMatch(locCity, proCity) {
    if (!locCity || !proCity) return false;
    return locCity === proCity || locCity.includes(proCity) || proCity.includes(locCity);
  }

  // Retorna 2 = mesma cidade, 1 = mesmo estado, 0 = sem correspondência
  function proximityTier(pro, location) {
    const loc = parseLocation(location);
    if (!loc.city && !loc.state) return 0;
    if (cityMatch(loc.city, normalizeLoc(pro.city))) return 2;
    if (loc.state && toUF(pro.state) === loc.state) return 1;
    return 0;
  }

  function stars(rating) {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  // ===== Modal de perfil (criado dinamicamente) =====
  let modalEl = null;

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'auth-overlay pro-overlay';
    modalEl.innerHTML = `
      <div class="auth-box pro-box">
        <button class="auth-close" data-pro-close>&times;</button>
        <div id="proModalContent"></div>
      </div>`;
    document.body.appendChild(modalEl);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl || e.target.closest('[data-pro-close]')) close();
    });
    return modalEl;
  }

  function renderProfile(p) {
    const feedbacks = (p.feedbacks || []).map(f => `
      <div class="pro-feedback-item">
        <div class="pro-feedback-head">
          <strong>${f.name}</strong>
          <span class="stars">${stars(f.rating)}</span>
        </div>
        <p>${f.text}</p>
        <span class="pro-feedback-date">${f.date}</span>
      </div>`).join('');

    return `
      <div class="pro-header">
        <img class="pro-photo-lg" src="${p.photo}" alt="Foto de ${p.name}" />
        <h2>${p.name}</h2>
        <span class="pro-badge">${p.specialty}</span>
        <div class="pro-rating-line">
          <span class="stars">${stars(p.rating)}</span>
          <strong>${p.rating.toFixed(1)}</strong>
          <span class="pro-reviews">(${p.reviewCount} avaliações)</span>
        </div>
      </div>
      <div class="pro-stats">
        <div class="pro-stat">
          <div class="num">${p.servicesDone}</div>
          <div class="lbl">serviços realizados</div>
        </div>
        <div class="pro-stat">
          <div class="num">${p.experience}</div>
          <div class="lbl">de experiência</div>
        </div>
        <div class="pro-stat">
          <div class="num">${p.city.split(',')[0]}</div>
          <div class="lbl">base</div>
        </div>
      </div>
      <p class="pro-bio">${p.bio}</p>
      ${p.zones && p.zones.length ? `<p class="pro-zone-line">📍 ${p.city}/${p.state} · Atende: ${p.zones.join(', ')}</p>` : ''}
      <div class="pro-contact">
        <a class="btn btn-outline pro-contact-btn" href="tel:${p.phone.replace(/\D/g, '')}">📞 ${p.phone}</a>
        <a class="btn btn-primary pro-contact-btn" href="https://wa.me/${p.whatsapp}" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
      </div>
      <div class="pro-feedback">
        <h3>Feedbacks de clientes</h3>
        ${feedbacks || '<p class="pro-none">Ainda sem avaliações.</p>'}
      </div>`;
  }

  function open(pro) {
    if (!pro) return;
    const modal = ensureModal();
    modal.querySelector('#proModalContent').innerHTML = renderProfile(pro);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function openById(id) {
    open(getById(id));
  }

  function openByName(name) {
    open(getByName(name));
  }

  function close() {
    if (modalEl) {
      modalEl.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  // ===== Card de apresentação (usado em data-pro-grid) =====
  function renderCard(p) {
    return `
      <div class="card pro-card" data-professional-id="${p.id}" role="button" tabindex="0">
        <img class="pro-photo" src="${p.photo}" alt="Foto de ${p.name}" loading="lazy" />
        <h3 class="pro-name">${p.name}</h3>
        <span class="pro-badge">${p.specialty}</span>
        <div class="pro-rating-line">
          <span class="stars">${stars(p.rating)}</span>
          <strong>${p.rating.toFixed(1)}</strong>
        </div>
        <p class="pro-meta">${p.servicesDone} serviços realizados</p>
        <span class="pro-card-cta">Ver perfil completo →</span>
      </div>`;
  }

  function init() {
    document.querySelectorAll('[data-pro-grid]').forEach(grid => {
      grid.innerHTML = getAll().map(renderCard).join('');
    });
  }

  // Delegação global: qualquer elemento com data-professional-id abre o perfil
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-professional-id]');
    if (!el) return;
    e.preventDefault();
    if (el.tagName === 'BUTTON' || el.tagName === 'A') e.stopPropagation();
    openById(el.getAttribute('data-professional-id'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-professional-id]')) {
      e.preventDefault();
      openById(e.target.getAttribute('data-professional-id'));
    }
  });

  document.addEventListener('DOMContentLoaded', init);

  return { getAll, getById, getByName, getQualifiedFor, pickForService, proximityTier, distanceKm, stars, open, openById, openByName, close, renderCard, init };
})();
