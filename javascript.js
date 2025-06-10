document.addEventListener('keydown', moverPersonagem);

function moverPersonagem(e) {
    const princesa = document.getElementById("princesa");
    const paredes = document.querySelectorAll(".parede");
    const passo = 5;

    let top = parseInt(getComputedStyle(princesa).top);
    let left = parseInt(getComputedStyle(princesa).left);

    let novoTop = top;
    let novoLeft = left;

    if (e.key === "ArrowUp") novoTop -= passo;
    if (e.key === "ArrowDown") novoTop += passo;
    if (e.key === "ArrowLeft") novoLeft -= passo;
    if (e.key === "ArrowRight") novoLeft += passo;

    // Limites da tela
    if (novoTop < 0 || novoTop + princesa.offsetHeight > window.innerHeight) return;
    if (novoLeft < 0 || novoLeft + princesa.offsetWidth > window.innerWidth) return;

    // Verifica colisão com paredes
    for (const parede of paredes) {
        const pRect = parede.getBoundingClientRect();
        const futura = princesa.getBoundingClientRect();
        const teste = {
            top: novoTop,
            left: novoLeft,
            width: princesa.offsetWidth,
            height: princesa.offsetHeight
        };

        const colide = !(
            teste.left + teste.width < pRect.left ||
            teste.left > pRect.left + pRect.width ||
            teste.top + teste.height < pRect.top ||
            teste.top > pRect.top + pRect.height
        );

        if (colide) return; // Impede o movimento
    }

    princesa.style.top = novoTop + "px";
    princesa.style.left = novoLeft + "px";
}

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
