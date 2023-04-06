<?php

include_once './classe_componente.inc';
include_once './classe_componente_novo.inc';

$processo = (isset($_GET['processo']) ? $_GET['processo'] : null);

if(!$processo) {
    include_once 'index.html';
} else {
    switch ($processo) {
        case 'criaComponente':
            $componente = new Componente();
            $componente->setTitulo('Componente 1');
            echo '<script>' . $componente->getScript() . '</script>';
            break;
        case 'criaComponenteNovo':
            $componenteNovo = new ComponenteNovo();
            $componenteNovo->setTitulo('Componente 2');
            echo '<script>' . $componenteNovo->getScript() . '</script>';
            break;
        case 'geraResultado':
            $dadosForm = $_POST['dadosForm'];
            $componente = new Componente();
            $json = json_decode($dadosForm, true);
            $componente->setValores($json);
            echo $componente->calculaResultado();
            break;
        case 'geraResultadoNovo':
            $dadosForm = $_POST['dadosForm'];
            $componenteNovo = new ComponenteNovo();
            $json = json_decode($dadosForm, true);
            $componenteNovo->setValores($json);
            echo $componenteNovo->calculaResultado();
            break;
        default:
            throw new Exception('ERRO! PROCESSO NÃO EXISTE');
            break;
    }
}