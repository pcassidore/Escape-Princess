// Função para tocar ou pausar a música e alternar o ícone de som
function tocarSom() {
    var audio = document.getElementById("myAudio"); //a musica em mp3
    var icone = document.getElementById("iconeSom"); //a imagem do icone de som
    // Obtém o elemento de áudio pelo ID

    // Verifica se o áudio está pausado
    if (audio.paused) {
        audio.play(); // Toca a música
        icone.src = "imagens/icone_som.png"; // Altera o ícone para som ligado
    } else {
        audio.pause(); // Pausa a música
        icone.src = "imagens/icone_semsom.png"; // Altera o ícone para som desligado
    }
}

function navegar(destino) {
    const transicao = document.getElementById('transicao'); // Seleciona o elemento com id 'transicao'
    
    somClique.volume = document.getElementById('volumeEfeitos').value; // Define o volume do som de clique com base no controle de volume
    somClique.play(); // Toca o som de clique

    if (destino === 'menu') {
        iniciarMusica(); // Inicia a música de fundo se o destino for o menu
    }

    transicao.style.width = '200vw'; // Aumenta a largura da transição para cobrir a tela com efeito
    transicao.style.height = '200vw'; // Aumenta a altura da transição

    setTimeout(() => { // Aguarda 400ms para fazer a troca de tela
        document.querySelectorAll('.tela').forEach(tela => {
            tela.classList.remove('ativa'); // Remove a classe "ativa" de todas as telas
        });
        document.getElementById(destino).classList.add('ativa'); // Adiciona a classe "ativa" na tela de destino

        transicao.style.width = '0'; // Reduz a transição de volta para desaparecer
        transicao.style.height = '0'; // Idem para altura
    }, 400); // Tempo da transição (deve coincidir com o CSS: 0.4s = 400ms)
}

function voltarInicio() {
    navegar('inicio'); // Função auxiliar para voltar para a tela de início
}

function voltarMenu() {
    navegar('menu'); // Função auxiliar para voltar para a tela do menu
}
