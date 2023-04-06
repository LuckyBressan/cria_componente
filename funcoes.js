$(document).ready(function () {
    $('#componente1').click(function() {
        if($('#div_componente')) {
            $('#div_componente').empty();
            onClickAjaxCriaComponente();
        }
    });
    $('#componente2').click(function() {
        if($('#div_componente')) {
            $('#div_componente').empty();
            onClickAjaxCriaComponenteNovo();
        }
    });
});

/**
 * Evento AJAX onClick que cria um componente.
 */
function onClickAjaxCriaComponente() {   
    $.ajax({
        url: 'http://localhost/treino/projetoTreino/ex03/index.php',
        type: 'GET',
        data: 'processo=criaComponente'
    }) .done(function (componente){
        localStorage.setItem('componente', componente);
        $('#div_componente').append(componente);
    });
}

/**
 * Evento AJAX onClick que cria o componente novo.
 */
function onClickAjaxCriaComponenteNovo() {   
    $.ajax({
        url: 'http://localhost/treino/projetoTreino/ex03/index.php',
        type: 'GET',
        data: 'processo=criaComponenteNovo'
    }) .done(function (componente){
        localStorage.setItem('componente', componente);
        $('#div_componente').append(componente);
    });
}

/**
 * Evento AJAX onClick que gera o resultado da soma entre o valor e o ano da data informada.
 */
function onClickAjaxGeraResultado(permiteNegativo = false) {
    $.ajax({
        url: 'http://localhost/treino/projetoTreino/ex03/index.php?processo=geraResultado',
        type: 'POST',
        data: { dadosForm: JSON.stringify({
                            valor: $('#campo_valor').val(),
                            valorData: $('#campo_data').val(),
                            permiteNegativo: permiteNegativo
                        }) 
        }
    }) .done(function (resultado) {
        $('#area_resultado').css('display', 'inline-block');
        $('#area_resultado').empty();
        $('#area_resultado').append(resultado);
    });
}

/**
 * Evento AJAX onClick que gera o novo resultado do novo componente
 */
function onClickAjaxGeraResultadoNovo(permiteNegativo = false) {
    $.ajax({
        url: 'http://localhost/treino/projetoTreino/ex03/index.php?processo=geraResultadoNovo',
        type: 'POST',
        data: { dadosForm: JSON.stringify({
                            valor: $('#campo_valor').val(),
                            valorData: $('#campo_data').val(),
                            select: $('#select_data').val(),
                            checkbox: $('#checkbox').is(':checked'),
                            permiteNegativo: permiteNegativo
                        }) 
        }
    }) .done(function (resultado) {
        $('#area_resultado').css('display', 'inline-block');
        $('#area_resultado').empty();
        $('#area_resultado').append(resultado);
    });
}

/**
 * Função que valida os dados da tela antes de dar início a função onClickAjaxGeraResultado.
 * @returns {Boolean}
 */
function validaDadosTela(permiteNegativo) {
    var campoValor = $('#campo_valor').val();
    var campoData = $('#campo_data').val();
    var aData = campoData.split('-');
    
    if(!campoValor.length > 0) {
        alert ('O valor não foi informado');
    } else if(isNaN(parseInt(campoValor))) {
        alert ('O valor informado não é um número');
    } else if(parseInt(campoValor) != campoValor) {
        alert('O valor não pode ser decimal');
    } else if(permiteNegativo == false && parseInt(campoValor) < 0) {
        alert ('O valor informado não pode ser negativo');
    } else if(!campoData.length > 0) {
        alert ('A data não foi informada');
    } else if(parseInt(aData[0]) > 2100) {
        alert ('A data não pode ultrapassar o dia 31/12/2100');
    } else if(parseInt(aData[0]) < 2000) {
        alert ('A data não pode ser anterior ao dia 01/01/2000');
    } else {
        return true;
    }
}

localStorage.componente ? $('#div_componente').append(localStorage.componente) : '';
localStorage.valor ? $('#campo_valor').val(localStorage.valor) : '';
localStorage.data ? $('#div_componente').val(localStorage.data) : '';
localStorage.select ? $('#div_componente').val(localStorage.select) : '';
localStorage.checkbox ? $('#div_componente').val(localStorage.checkbox) : '';

const dadosSalvos = function() {
    const valor = $('#campo_valor').val(),
            data = $('#campo_data').val(),
            select = $('#select_data').val(),
            checkbox = $('#checkbox').is(':checked');
    
    localStorage.setItem('valor', valor);
    localStorage.setItem('data', data);
    localStorage.setItem('select', select);
    localStorage.setItem('checkbox', checkbox);
};

document.onchange = dadosSalvos();
