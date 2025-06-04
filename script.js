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
