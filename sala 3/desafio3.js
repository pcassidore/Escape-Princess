const viewport = document.getElementById('viewport');
const room = document.getElementById('room');
const msg = document.getElementById('mensagem');

let posX = 0;
let movingLeft = false;
let movingRight = false;
const speed = 3;
const padding = 50;

// Detecta bordas para mover
viewport.addEventListener('mousemove', (e) => {
  if (e.clientX < padding) {
    movingLeft = true;
    movingRight = false;
  } else if (e.clientX > window.innerWidth - padding) {
    movingRight = true;
    movingLeft = false;
  } else {
    movingLeft = false;
    movingRight = false;
  }
});

function moverCamera() {
  const maxShift = room.offsetWidth - viewport.offsetWidth;
  if (movingLeft) {
    posX = Math.min(posX + speed, 0);
  } else if (movingRight) {
    posX = Math.max(posX - speed, -maxShift);
  }
  room.style.transform = `translateX(${posX}px)`;
  requestAnimationFrame(moverCamera);
}

moverCamera();

// Ações dos túneis
document.getElementById('tunel1').onclick = () => mostrarMensagem("Túnel errado, tente novamente");
document.getElementById('tunel2').onclick = () => mostrarMensagem("Túnel certo, parabéns!");
document.getElementById('tunel3').onclick = () => mostrarMensagem("Túnel errado, tente novamente");

function mostrarMensagem(texto) {
  msg.innerText = texto;
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
}
