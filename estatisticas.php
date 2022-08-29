<?php
include_once 'funcoes.php';
$sql ="SELECT * FROM `jogos` ORDER BY `pontos` DESC, `tempo` ASC LIMIT 10";
$dados = getResultFromQuery($sql);?>
    <div class="linha">
        <div class="strong indice">#</div>
        <div class="strong nome">Jogador(a)</div>
        <div class="strong pontos">Pontos</div>
        <div class="strong tempo">Tempo</div>
    </div>
<?php
$indice = 1;
foreach($dados as $dado):?>
    <div class="linha">
        <div class="indice"><?=$indice++?>º</div>
        <div class="nome">  <?=$dado['nome']?></div>
        <div class="pontos"><?=$dado['pontos']?></div>
        <div class="tempo"> <?=$dado['tempo']?></div>
    </div>
<?php endforeach ?>