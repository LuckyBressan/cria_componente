<?php
include_once './classe_componente.inc';

class ComponenteNovo extends Componente {
    public $checkbox;
    public $select;
    
    public function getCheckbox() {
        return $this->checkbox;
    }

    public function getSelect() {
        return $this->select;
    }

    public function setCheckbox($checkbox) {
        $this->checkbox = $checkbox;
    }

    public function setSelect($select) {
        $this->select = $select;
    }
        
    public function getScript() {
        return 'var componenteNovo = new ComponenteNovo(' . json_encode($this->getTitulo()) . ',' . json_encode($this->getPermiteNegativo()) . ');';
    }
    
    public function setValores($json) {
        parent::setValores($json);
        $this->setSelect($json['select']);
        $this->setCheckbox($json['checkbox']);
    }
    
    public function calculaResultado() {
        $valor = $this->getValor();
        $data = new DateTime($this->getData());
        $select = $this->getSelect();
        $operador = ($this->getCheckbox() ? '-' : '+');
        $data->modify($operador.$valor.$select);
        return $data->format('d/m/Y');
    }
}
