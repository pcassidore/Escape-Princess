function animateTransition(onHalfway, onComplete) {
  const circle = document.getElementById("circleTransition");

  // Mostra o círculo
  circle.classList.remove("hidden");

  // Reseta animações
  circle.classList.remove("animate-expand", "animate-contract");
  void circle.offsetWidth;

  // Inicia expansão
  requestAnimationFrame(() => {
    circle.classList.add("animate-expand");

    // Meio da transição (800ms depois)
    setTimeout(() => {
      circle.classList.remove("animate-expand");

      // Lógica de mudança de tela
      onHalfway();

      // Contrai
      void circle.offsetWidth;
      circle.classList.add("animate-contract");

      // Fim da transição (800ms depois)
      setTimeout(() => {
        circle.classList.remove("animate-contract");
        circle.classList.add("hidden"); // Oculta novamente
        if (onComplete) onComplete();
      }, 800);

    }, 800);
  });
}


// Entrar (intro → menu)
function iniciarTransicao() {
  animateTransition(() => {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
  });
}

function iniciarJogoComTransicao() {
  animateTransition(() => {
    window.location.href = "map1.html";
  });
}


// Sair (menu → intro)
function voltarParaIntro() {
  animateTransition(() => {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");
  });
}

function irParaJogo(url) {
  const circle = document.getElementById("circleTransition");

  // Reinicia animações
  circle.classList.remove("animate-expand", "animate-contract");
  void circle.offsetWidth;

  requestAnimationFrame(() => {
    circle.classList.add("animate-expand");

    // Após a expansão, redireciona
    setTimeout(() => {
      window.location.href = url;
    }, 800);
  });
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


function irParaMenu() {
  window.location.href = "menu_e_dicas/index.html"; // ajuste se o caminho for diferente

} 
