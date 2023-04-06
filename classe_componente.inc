<?php

class Componente {
    public $titulo;
    public $valor;
    public $data;
    public $botaoResultado;
    public $areaResultado;
    public $permiteNegativo;
    
    public function __construct() {
        $this->permiteNegativo = false;
    }
    
    public function getTitulo() {
        return $this->titulo;
    }

    public function getValor() {
        return $this->valor;
    }

    public function getData() {
        return $this->data;
    }

    public function getBotaoResultado() {
        return $this->botaoResultado;
    }

    public function getAreaResultado() {
        return $this->areaResultado;
    }

    public function setTitulo($titulo) {
        $this->titulo = $titulo;
    }

    public function setValor($valor) {
        $this->valor = $valor;
    }

    public function setData($data) {
        $this->data = $data;
    }

    public function setBotaoResultado($botaoResultado) {
        $this->botaoResultado = $botaoResultado;
    }

    public function setAreaResultado($areaResultado) {
        $this->areaResultado = $areaResultado;
    }
    
    public function getPermiteNegativo() {
        return $this->permiteNegativo;
    }

    public function setPermiteNegativo($permiteNegativo) {
        $this->permiteNegativo = $permiteNegativo;
    }

    /**
     * Seta os valores baseado no array que vem por parâmetro
     * @param json $json
     */
    public function setValores($json) {
        $this->validaDadosBackEnd($json);
        $this->setValor($json['valor']);
        $this->setData($json['valorData']);
        $this->setPermiteNegativo($json['permiteNegativo']);
    }
    
    /**
     * Função chamada pelo index.php que retorna uma string, essa string é um comando JS que instância um novo componente
     * @return string
     */
    public function getScript() {
        return 'var componente = new Componente(' . json_encode($this->getTitulo()) . ',' . json_encode($this->getPermiteNegativo()) . ');';
    }
    
    /**
     * Função que valida os dados mandados via POST
     * @param json $json
     * @throws Exception
     */
    public function validaDadosBackEnd($json) {
        $data = date_parse($json['valorData']);
        $dataMin = date_parse('01/01/2000');
        $dataMax = date_parse('01/01/2101');
        
        if(!isset($json)) {
            throw new Exception('O JSON não foi inicializado');
        }
        
        if(!isset($json['valor'])) {
            throw new Exception('O JSON valor não foi inicializado');
        }
        
        if(empty($json['valor']) || empty($json['valorData'])) {
            throw new Exception('O JSON não pode estar vazio');
        }
        
        if(is_nan($json['valor'])) {
            throw new Exception('O valor não é numérico');
        }
        
        if($this->permiteNegativo == false && $json['valor'] < 0) {
            throw new Exception('O valor não pode ser negativo');
        }
        
        if($data < $dataMin) {
            throw new Exception('A data não pode ser menor que 01/01/2000');
        } else if($data >= $dataMax) {
            throw new Exception('A data não pode ser maior que 31/12/2100');
        }
    }
    
    /**
     * Calcula o resultado da soma entre o valor o ano da data informada
     * @return string $data_atualizada
     */
    public function calculaResultado() {
        $valor = $this->getValor();
        $data = new DateTime($this->getData());
        $data->modify('+'.$valor.'year');
        return $data->format('d/m/Y');
    }
}


