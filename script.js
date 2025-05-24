function tocarSom() {
    var audio = document.getElementById("myAudio");
    var icone = document.getElementById("iconeSom");

    if (audio.paused) {
        audio.play();
        icone.src = "imagens/icone_som.png"; // Ícone som ligado
    } else {
        audio.pause();
        icone.src = "imagens/icone_semsom.png"; // Ícone som desligado
    }
}
