/* ######### PACOTE DE ÍCONES UTILIZADO ######### */
// https://github.com/feathericons/feather#feather
feather.replace();

/* ########## LOCALSTORAGE PARA SIMULAR LOGIN ######### */
if (localStorage.getItem('home') !== 'logged') {

  // redirecionar para a o login se não estiver logado
  window.location.replace = "./";
}

// global index chamado
var indexTicket;

/* ########## BANCO DE DADOS SIMULADO (objeto) ######### */
var DATA_BASE_SIMULATION = [
  {
    id: 'item-1',
    ticketNumber: 2020234567,
    customerName: 'José Pereira da Silva',
    subject: 'Problemas de conexão com a internet',
    reportInfo: [
      {
        date: '22/05/2020 - 08:34',
        message: 'O cliente encontra-se com instabilidade no sinal, impedindo sua navegação. Soluções preliminares tais como: “Reinicio e/ou reset do modem não surtiram efeitos”. Será necessária uma visita técnica no local para verificação e correção do problema!'
      },
      {
        date: '23/05/2020 - 11:00',
        message: 'Foi solicitado suporte técnico no local!'
      },
    ],
    updatedAt: '23/05/2020 - 11:00',
    status: 1
  },
  {
    id: 'item-2',
    ticketNumber: 2020678234,
    customerName: 'Antonio Ferraz',
    subject: 'Telefone Cortado',
    reportInfo: [
      {
        date: '21/05/2020 - 20:12',
        message: 'O cliente encontra-se com linha telefônica cortada!'
      },
      {
        date: '22/05/2020 - 11:10',
        message: 'Foi solicitado religação da linha após o pagamento efetuado!'
      },
    ],
    updatedAt: '22/05/2020 - 11:10',
    status: 2
  },
  {
    id: 'item-3',
    ticketNumber: 2020123666,
    customerName: 'Maria de Jesus',
    subject: 'Troca de Modem',
    reportInfo: [
      {
        date: '20/05/2020 - 12:12',
        message: 'O cliente solicita troca de aparelho após idenficado picos de energias queimando o modem.'
      },
      {
        date: '23/05/2020 - 11:10',
        message: 'Troca do aparelho foi efetuada com sucesso! O pagamento deverá ser cobrado em próxima fatura!'
      },
    ],
    updatedAt: '23/05/2020 - 11:10',
    status: 2
  },
  {
    id: 'item-4',
    ticketNumber: 2020333344,
    customerName: 'Carlos Alencar',
    subject: 'Cancelamento de Serviços',
    reportInfo: [
      {
        date: '23/05/2020 - 15:10',
        message: 'O cliente solicita o cancelamento dos serviços de internet e telefonia. Aparelhos devem ser retirados no local!'
      },
    ],
    updatedAt: '23/05/2020 - 15:10',
    status: 1
  },
  {
    id: 'item-5',
    ticketNumber: 2020333344,
    customerName: 'Joaquim Matos',
    subject: 'Cancelamento de Serviços',
    reportInfo: [
      {
        date: '23/05/2020 - 15:10',
        message: 'O cliente solicita o cancelamento dos serviços de internet e telefonia. Aparelhos devem ser retirados no local!'
      },
    ],
    updatedAt: '23/05/2020 - 15:10',
    status: 1
  }
];

/* ########## FAZER LOGOUT - SAIR DO SISTEMA ######### */
$('#user-logout').click(function () {
  // limpa dados do login no browser
  localStorage.setItem('home', 'none');

  // redireciona para o login
  window.location.replace("./");
});

/* ########## ALERTA DE SUCESSO ######### */
function successAlert(textAlert, timer) {
  // mostra alerta
  $('#success-alert').show();
  $('#success-alert span').text(textAlert || 'Chamado salvo com sucesso');

  // esconde alerta depois do timer definido
  setTimeout(() => {
    $('#success-alert').hide();
    $('#success-alert span').text('');
  }, timer || 3000);
};

/* ########## GERADOR DE NÚMEROS RANDÔNICOS ######### */
function randomNumber() {
  return Math.floor(Math.random() * (100 - 9999999 + 1)) + 9999999;
}

/* ########## DEFINE DATA ATUAL ######### */
function setDate() {
  return jQuery.format.toBrowserTimeZone(new Date(), 'dd/MM/yyyy - HH:mm');
}

/* ########## CONTAR E EXIBIR RESUMO ######### */
// Em atendimento (status 1)
function getResumeAttendance() {
  var resultAttendance = 0;

  // filtra apenas com status 1
  DATA_BASE_SIMULATION.filter(function (item) {
    if (item.status === 1) {
      resultAttendance++;
    }
  });

  // exibe resultado em: <p id="resumeAttendance">
  $('#resumeAttendance').text(resultAttendance);
};
// Finalizados (status 2)
function getResumeFinalized() {
  var resultFinalized = 0;

  // filtra apenas com status 2
  DATA_BASE_SIMULATION.filter(function (item) {
    if (item.status === 2) {
      resultFinalized++;
    }
  });

  // exibe resultado em: <p id="resumeFinalized">
  $('#resumeFinalized').text(resultFinalized);
};
// Exibir resultados do resumo
getResumeAttendance();
getResumeFinalized();


/* ########## PREPARA E EXIBE LISTA OS ÍTENS NA HOME ######### */
function setList(updated) {

  // se for atualizar lista, apaga a anterior
  if (!!updated) {
    $('#list-items').html('');
  }

  // converte status para exibir em texto (condição ternária)
  function setStatus(status) {
    return status === 1 ? '<span class="statusOn">Em Atendimento</span>' : '<span class="statusOff">Finalizado</span>';
  };

  // percorre a lista para inserir as linhas em: <tbody id="list-items">
  DATA_BASE_SIMULATION.map(function (item, index) {
    $('#list-items').append(
      '<tr>' +
      '<th scope="row">#' + item.ticketNumber + '</th>' +
      '<td>' + item.customerName + '</td>' +
      '<td>' + item.updatedAt + 'h</td>' +
      '<td>' + setStatus(item.status) + '</td>' +
      '<td>' +
      '<a class="list-edit-item" id="' + item.id + '" data-index="' + index + '">' +
      `
            <svg xmlns="http://www.w3.org/2000/svg" 
              xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25">
              <defs>
                <style>.a{clip-path:url(#b);}.b{fill:none;stroke:#a358bc;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.c{fill:transparent;}</style>
                <clipPath id="b">
                  <rect width="25" height="25"/>
                </clipPath>
              </defs>
              <g id="a" class="a">
                <rect class="c" width="25" height="25"/>
                <g transform="translate(-1.598 -1.416)">
                  <path class="b" d="M13.029,6h-7.8A2.229,2.229,0,0,0,3,8.229v15.6a2.229,2.229,0,0,0,2.229,2.229h15.6a2.229,2.229,0,0,0,2.229-2.229v-7.8" transform="translate(0 -1.044)"/>
                  <path class="b" d="M22.583,3.444a2.138,2.138,0,0,1,3.024,3.024l-9.575,9.575L12,17.051l1.008-4.032Z" transform="translate(-1.037)"/>
                </g>
              </g>
            </svg>
            `+
      '</a>' +
      '</td>' +
      '</tr>'
    );
  });


  // click abrir chamado por ID/INDEX
  $('.list-edit-item').click(function () {
    // limpa campo de nova interação
    $("#report").val('');

    // desabilita campos nome e assunto
    $('#customerName, #subject').attr('disabled', true);


    // Pega o INDEX do item da lista ( baseado no DATA_BASE_SIMULATION)
    var getIndex = $(this).attr('data-index');

    // Pega os dados do chamado pelo ID
    var getTicket = DATA_BASE_SIMULATION[getIndex];

    // disponibiliza o index na variavel GLOBAL
    indexTicket = getIndex;

    // Exibe numero do protocolo:  <p class="protocol-number">
    $('.protocol-number').text('Protocolo: #' + getTicket.ticketNumber);

    // Prepara lista de interações para exibir em: <div class="list-interacions" id="interaction">
    function interactionsPrepare() {

      // Limpa últimas listas de interações
      $('#interaction').html('');

      // percorre lista
      getTicket.reportInfo.map(function (item) {
        $('#interaction').append(
          '<p class="list-interacions-title">Últimas Interações</p>' +
          '<p>DATA: <b>' + item.date + '</b></p>' +
          '<p class="text-interacion">' + item.message + '</p>'
        );
      });

    };
    interactionsPrepare();

    // Preenche os dados no formulário em: <form class="modal-form">
    $('#customerName').val(getTicket.customerName);
    $('#subject').val(getTicket.subject);
    $("#status").val(getTicket.status).change();

    // Exibe a lista de interações em: <div class="list-interacions">
    $('.list-interacions').show();

    // Abre o modal
    $('#modalTicket').modal('show');

  });

};
setList();

/* ########## SALVAR NOVO CHAMADO ######### */
function setItcket() {
  // pega os valores do input
  var getName = $('#customerName').val();
  var getSubject = $('#subject').val();
  var getStatus = $("#status").val();
  var getReport = $("#report").val();

  // valida preenchimento antes de salvar
  if (!getName.length || !getSubject.length || !getReport.length) {

    alert('É obrigatórios preencher todos os campos do formulário!');

  } else {

    // define data
    var dateNow = setDate();

    // pega dados do formulario
    var dataTicket = {
      id: 'item-' + randomNumber(),
      ticketNumber: Number('2020' + randomNumber()),
      customerName: getName,
      subject: getSubject,
      reportInfo: [
        {
          date: dateNow,
          message: getReport
        }
      ],
      updatedAt: dateNow,
      status: Number(getStatus)
    };

    // adiciona dados no banco: DATA_BASE_SIMULATION
    DATA_BASE_SIMULATION.unshift(dataTicket);

    // atualiza lista de chamados e resumo
    setList(true);
    getResumeAttendance();
    getResumeFinalized();

    $('#modalTicket').modal('hide');

  }
};

/* ########## SALVAR NOVA INTERAÇÃO PELO ID DO CHAMADO ######### */
function setInteraction() {
  var getReport = $("#report").val();
  var getStatus = $("#status").val();

  // define data
  var dateNow = setDate();

  // pega mensagem do formulario
  var dataInteraction = {
    date: dateNow,
    message: getReport
  };

  // Atualiza chamado existente no banco: DATA_BASE_SIMULATION
  DATA_BASE_SIMULATION[indexTicket].updatedAt = dateNow;
  DATA_BASE_SIMULATION[indexTicket].status = Number(getStatus);

  // atualiza lista de interações, lista de chamados, resumo
  setList(true);
  getResumeAttendance();
  getResumeFinalized();

  // se existir mensagem no campo NOVA INTERAÇÃO
  if (getReport.length) { 
    DATA_BASE_SIMULATION[indexTicket].reportInfo.unshift(dataInteraction);
    
    $('#interaction').prepend(
      '<p>DATA: <b>' + dataInteraction.date + '</b></p>' +
      '<p class="text-interacion">' + dataInteraction.message + '</p>'
    );
  }

  // limpa campo de NOVA INTERAÇÃO
  $("#report").val('');

  // se o chamado for finalizado, fechar o modal ao salvar
  if(Number(getStatus) === 2) {
    $('#modalTicket').modal('hide');
  } else {
    successAlert('Chamado Atualizado com Sucesso');
  }

}

/* ########## MODAL ######### */
// click novo chamado
$('#btn-new-ticket').click(function () {
  // limpa últimas infos do form e index
  indexTicket = undefined;
  $('#interaction').html('');
  $('#customerName').val('');
  $('#subject').val('');
  $('#report').val('');
  $("#status").val(1).change();

  // desabilita campos nome e assunto
  $('#customerName, #subject').attr('disabled', false);

  // Esconde a lista de interações
  $('.list-interacions').hide();

  // Exibe "NOVO CHAMADO" no lugar do número de protocolo em: <p class="protocol-number">
  $('.protocol-number').text('NOVO CHAMADO');

  // Abre o modal
  $('#modalTicket').modal('show');
});

// salvar/atualizar chamado
$('#save-ticket').click(function () {

  if (indexTicket !== undefined) {
    setInteraction();
  } else {
    setItcket();
  }

});