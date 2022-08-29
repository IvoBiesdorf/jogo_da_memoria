document.querySelector('#estatisticas').onclick = ()=>{
    if(window.innerWidth < 770){
        const fechar = document.querySelector(".close2");
        const toogleMnLat = ()=>{
            document.querySelector('#ranking').classList.toggle('ranking2');
            document.querySelector('#ranking').classList.toggle('ranking');
        }
        toogleMnLat();
        if(document.querySelector('#ranking').classList == 'ranking2'){
            fetch("estatisticas.php")
            .then(resp => resp.text())
            .then(html => {
                document.querySelector('.estatistic').innerHTML = html;
            })
            .catch(e => {
                console.log(e);
                document.querySelector('.estatistic').innerHTML = "Ocorreu um erro inesperado, tente novamente mais tarde!";
            })
            fechar.onclick = ()=> toogleMnLat();

        }
        document.querySelector('.principal').onclick = ()=> {
            if(document.querySelector('#ranking').classList == 'ranking2'){
                toogleMnLat();
            }
        }
    }
    else{
        const modalEstatistica = document.querySelector('#modalEstatisticas');
        modalEstatistica.style.display = "block";
        modalEstatistica.querySelector(".close").onclick = ()=> {
            modalEstatistica.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalEstatistica) {
                modalEstatistica.style.display = "none";
            }
        }
        fetch("estatisticas.php")
        .then(resp => resp.text())
        .then(html => {
            modalEstatistica.querySelector('#corpo').innerHTML = html;
        })
        .catch(e => {
            console.log(e);
            modalEstatistica.querySelector('#corpo').innerHTML = "Ocorreu um erro inesperado, por favor tente novamente mais tarde!";
        })
    }
}

let horas = new Date(2022, 01, 01, 0, 0, 0, 0);
let hora = new Date();
let time = ()=> setTimeout(function(){
    horas = new Date(horas.setSeconds(horas.getSeconds()+1));
    tempo = String(horas.getHours()).padStart(2, '0')+":"+String(horas.getMinutes()).padStart(2, '0')+":"+String(horas.getSeconds()).padStart(2, '0');
    document.querySelector('.tempo').innerHTML = 'Tempo: '+tempo;
    if(window.innerWidth < window.outerWidth-100){
        console.log('Para jogar, feche o terminal')
        reiniciar();
    }
    if(pares < 12){ // ahhskjhgbsdfiuhdasifhdifhdsiahgfsdghasd
        time();
    }else{
        abrirModal();
    }
}, 1000);

let cartaVirada = false;
let bloqueiaJogo = false;
let carta_um, carta_dois;
let pares = 0;

const cartas = document.querySelectorAll('.carta');
let pontos = document.querySelector('.pontos')
const iniciarJogo = ()=> {
    cartas.forEach((carta) => {
        carta.style.order = Math.floor(Math.random() * 12); 
        carta.addEventListener('click', viraCarta);          
    })
    fetch("reg_jogo.php");
};
window.onload = ()=>{
    iniciarJogo();
    time();
}

function viraCarta() {
    if (!bloqueiaJogo){
        if (this !== carta_um){
            this.classList.add('virar');
            if (cartaVirada) {
                carta_dois = this;
                cartaVirada = false;
                verificaPar();
            }else{
                cartaVirada = true;
                carta_um = this;
            }
        } 
    } 
}

function verificaPar() {
    if (carta_um.dataset.card === carta_dois.dataset.card) {
        carta_um.removeEventListener('click', viraCarta);
        carta_dois.removeEventListener('click', viraCarta);
        resetaMesa();
        pontos.innerHTML = +pontos.innerHTML + 100;
        pares ++;
    }else{
        bloqueiaJogo = true;
        pontos.innerHTML = pontos.innerHTML - 50;
        setTimeout(() => {
            carta_um.classList.remove('virar');
            carta_dois.classList.remove('virar');
            resetaMesa();
        }, 1000);
    }
}

function resetaMesa() {
    cartaVirada = false;
    bloqueiaJogo = false;
    carta_um = null;
    carta_dois= null;
}

const reiniciar = ()=>{
    cartas.forEach(carta =>{
        carta.classList.remove('virar');
        resetaMesa();
    })
    horas = new Date(2022, 01, 01, 0, 0, 0, 0);
    pontos.innerHTML = 1000;
    if(pares == 12){
        time()
    }
    pares = 0;
    setTimeout(() => {
        iniciarJogo();
    }, 1200);
}
document.querySelector('#btn_reiniciar').onclick = ()=>reiniciar();

var modal = document.getElementById("modalFimJogo");

modal.querySelector(".close").onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function abrirModal(){
    const modal = document.getElementById("modalFimJogo");
    modal.style.display = "block";
    modal.querySelector('.salvar-pontuacao').style.visibility = "visible";
    modal.querySelector('.titulo-modal').innerHTML = 'Fim do jogo';
    modal.querySelector('.pontos-modal').innerHTML = 'Você fez '+document.querySelector('.pontos').innerHTML+' pontos!';
    modal.querySelector('.tempo-modal').innerHTML = 'O tempo de jogo foi de '+tempo;
    modal.querySelector('label').innerHTML = 'Deseja salvar sua pontuação?';

    modal.querySelector('#btn_salvar_pontuacao').onclick = ()=>{
        let formdata = new FormData();
        const pontos = document.querySelector('.pontos').innerHTML;
        const nome = modal.querySelector('.input-nome').value;
        if(nome == ''){
            alert("Favor preencher o campo Nome");
            return;
        }
        formdata.append("nome", nome)
        formdata.append("pontos", pontos)
        formdata.append("tempo", tempo)
        fetch("salvar_jogo.php",{
            body: formdata,
            method: 'post'
        })
        .then(resp => resp.json())
        .then(json => {
            modal.querySelector('.titulo-modal').innerHTML = 'Fim do jogo';
            if(json.status == 'ok'){
                modal.querySelector('.pontos-modal').innerHTML = 'Parabéns!';
                modal.querySelector('.tempo-modal').innerHTML = 'Sua pontuação foi salva com sucesso!';
                modal.querySelector('.salvar-pontuacao').style.visibility = "hidden";
            }
            else{
                modal.querySelector('.pontos-modal').innerHTML = 'Desculpa';
                modal.querySelector('.tempo-modal').innerHTML = 'Ocorreu um erro ao salvar';
                modal.querySelector('.salvar-pontuacao').style.visibility = "hidden";
            }
        })
    }
}
