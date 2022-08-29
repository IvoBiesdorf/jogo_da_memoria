

<?php

function novaConexao($banco = 'jogo_memoria') {
    $servidor = 'localhost';
    $usuario = 'root';
    $senha = '';
    $conexao = new mysqli($servidor, $usuario, $senha, $banco);
    if($conexao->connect_error) {
        die('Erro: ' . $conexao->connect_error);
    }
    return $conexao;
}
function getResultFromQuery($sql){
    $conn = novaConexao();
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}
// retorna o IP do usuario
function ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    
    return $ipaddress;
}
function detailsIpaddress($ipaddress){
    $details = json_decode(file_get_contents("http://ipinfo.io/{$ipaddress}"));
    return $details;
}
function clean($data){
    $data = htmlspecialchars($data);
    $data = stripslashes($data);
    $data = trim($data);
    return $data;
}