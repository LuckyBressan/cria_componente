function Componente(titulo, permiteNegativo) {   
    this.div = $('#div_componente');
    this.titulo = $('<h1>').append(titulo);
    this.permiteNegativo = permiteNegativo;
    this.valor = $('<input>')
            .attr({
                type: 'number',
                id: 'campo_valor'
             })
            .addClass('campo_info');
    this.data = $('<input>')
            .attr({
                type: 'date' ,
                id: 'campo_data',
                min: '2000-01-01',
                max: '2100-12-31'
             })
             .addClass('campo_info');
    this.botaoResultado = $('<input>')
            .attr({
                type: 'submit',
                value: 'Resultado',
                id: 'botao_resultado'
             })
            .addClass('campo_info input_button_result')
             .click(function() {
                 if(validaDadosTela(permiteNegativo)) {
                     onClickAjaxGeraResultado();
                 }
             });
    this.areaResultado = $('<span>')
            .attr({
                id: 'area_resultado' ,
                name: 'areaResultado'
            })
            .css('display', 'none')
            .addClass('campo_info');
    this.div.append(this.titulo, this.valor, this.data, this.botaoResultado, this.areaResultado);
}

Componente.prototype.setValor = function(valor) {
    this.valor.val(valor);
};

Componente.prototype.setData = function(data) {
    this.data.val(data);
};

Componente.prototype.setPermiteNegativo = function(permiteNegativo) {
    this.permiteNegativo = permiteNegativo;
};

ComponenteNovo.prototype = Object.create(Componente.prototype);

function ComponenteNovo(titulo, permiteNegativo) {
    Componente.call(this, titulo, permiteNegativo);
    
    this.article = $('<article>')
            .attr({
                name: 'opcoes',
                id: 'opcoes'
            })
            .addClass('opcoes_adicionais');
    
    this.labelCheckbox = $('<label>')
            .attr({
                for: 'checkbox',
                name: 'label_checkbox'
            })
            .text('deseja subtrair?');
    this.checkbox = $('<input>')
            .attr({
                type: 'checkbox',
                id: 'checkbox',
                name: 'checkbox'
            });
    this.labelSelect = $('<label>')
            .attr({
                for: 'select_data',
                name: 'label_select'
            })
            .text('Incrementar: ');
    this.select = $('<select>')
            .attr({
                id: 'select_data',
                name: 'selectData'
            });
    this.botaoResultado2 = $('<input>')
            .attr({
                type: 'submit',
                id: 'botao_resultado2',
                value: 'Resultado'
            }) 
            .addClass('campo_info input_button_result')
            .click(function() {
               if(validaDadosTela(permiteNegativo))  {
                    onClickAjaxGeraResultadoNovo(permiteNegativo);
               }
            });
    this.option1 = $('<option>').attr({ value: 'day' }).text('Dia');
    this.option2 = $('<option>').attr({ value: 'month' }).text('Mês');
    this.option3 = $('<option>').attr({ value: 'year' }).text('Ano');
    this.espaco = '&nbsp;&nbsp;';
    this.select.append(this.option1, this.option2, this.option3);
    
    this.article.append(
            this.labelCheckbox,
            this.checkbox,
            this.espaco,
            this.labelSelect,
            this.select);
    
    this.div.append(
            this.titulo,
            this.valor,
            this.article,
            this.data,
            this.botaoResultado2,
            this.areaResultado);
            
    /**
     * Meu botão resultado do componente 1 estava aparecendo então tive que removê-lo a força
     */
    this.botaoResultado.remove();
}