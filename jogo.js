document.addEventListener('DOMContentLoaded', () => {
  const princesa = document.getElementById("princesa");
  const paredes = document.querySelectorAll(".parede");
  const portas = document.querySelectorAll(".porta");
  const passo = 3;

  let velY = 0;
  let gravidade = 1;
  let pulando = false;
  let noChao = true;

  let keys = {};

  // Detecta teclas pressionadas e liberadas
  document.addEventListener("keydown", (e) => {
    keys[e.code] = true;

    // Início do pulo
    if (e.code === "Space" && noChao && !pulando) {
      velY = -15;
      pulando = true;
      noChao = false;
    }
  });

  document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });

  function atualizarSprite(direcao) {
    const caminho = "imagens/";
    if (direcao === "cima") princesa.style.backgroundImage = `url('${caminho}princesa_cima.png')`;
    if (direcao === "baixo") princesa.style.backgroundImage = `url('${caminho}princesa_paradadireita.png')`;
    if (direcao === "esquerda") princesa.style.backgroundImage = `url('${caminho}princesa_esquerda.png')`;
    if (direcao === "direita") princesa.style.backgroundImage = `url('${caminho}princesa_direita.png')`;
  }

  function mover() {
    let top = parseInt(getComputedStyle(princesa).top);
    let left = parseInt(getComputedStyle(princesa).left);
    let novoTop = top + velY;
    let novoLeft = left;
    let colidiuComParede = false;

    if (keys["ArrowLeft"] || keys["KeyA"]) {
      novoLeft -= passo;
      atualizarSprite("esquerda");
    }
    if (keys["ArrowRight"] || keys["KeyD"]) {
      novoLeft += passo;
      atualizarSprite("direita");
    }

    // aplicar gravidade
    velY += gravidade;

    // impedir sair da tela horizontalmente
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const larguraPersonagem = princesa.offsetWidth;
    const alturaPersonagem = princesa.offsetHeight;

    if (novoLeft < 0) novoLeft = 0;
    if (novoLeft + larguraPersonagem > largura) novoLeft = largura - larguraPersonagem;

    // colisão com chão (parede)
    noChao = false;
    for (const parede of paredes) {
  const p = parede.getBoundingClientRect();
  const futura = {
    left: novoLeft,
    top: novoTop,
    right: novoLeft + larguraPersonagem,
    bottom: novoTop + alturaPersonagem
  };

  const colisao = !(
    futura.right < p.left ||
    futura.left > p.right ||
    futura.bottom < p.top ||
    futura.top > p.bottom
  );

  if (colisao) {
    colidiuComParede = true;

    // Colisão vinda de cima (cair sobre chão)
    if (top + alturaPersonagem <= p.top && velY > 0) {
      novoTop = p.top - alturaPersonagem;
      velY = 0;
      noChao = true;
      pulando = false;
    }

        // Colisão lateral esquerda ou direita (qualquer direção)
    const sobreposicaoX =
      Math.min(futura.right, p.right) - Math.max(futura.left, p.left);
    const sobreposicaoY =
      Math.min(futura.bottom, p.bottom) - Math.max(futura.top, p.top);

    if (sobreposicaoX < sobreposicaoY) {
      if (left < p.left) {
        // Veio da esquerda
        novoLeft = p.left - larguraPersonagem;
      } else if (left > p.left) {
        // Veio da direita
        novoLeft = p.right;
      }
    }

    // Batida no teto (de baixo para cima)
    if (top >= p.bottom && velY < 0) {
      velY = 0;
    }
  }
}

    princesa.style.left = novoLeft + "px";
    princesa.style.top = novoTop + "px";

    // verificar colisão com porta
    for (const porta of portas) {
      const r1 = princesa.getBoundingClientRect();
      const r2 = porta.getBoundingClientRect();
      const colidiu = !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
      );
      if (colidiu) {
        document.body.classList.add("fade");
        setTimeout(() => {
          const destino = porta.getAttribute("data-destino");
          if (destino) window.location.href = destino;
        }, 1000);
      }
    }

    requestAnimationFrame(mover);
  }

  mover(); // inicia loop
});
