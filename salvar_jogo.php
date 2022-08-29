<?php
    include_once 'funcoes.php';

    $nome = clean($_POST['nome']);
    $pontos = $_POST['pontos'];
    $tempo = $_POST['tempo'];
    $ip = ip();
  
    $sql ="INSERT INTO `jogos` (`nome`, `pontos`, `tempo`, `ip`, `data_hora`) VALUES ('{$nome}', '{$pontos}', '$tempo', '$ip', current_timestamp())";
    if(getResultFromQuery($sql)){
        echo '{"status":"ok"}';
    }else{
        echo '{"status":"bad"}';
    }