const trilha = document.getElementById('trilha');
const somClique = document.getElementById('somClique');
const somHover = document.getElementById('somHover');

// Iniciar trilha sonora
trilha.volume = 0.5;

// Navegação SPA
function navegar(tela) {
    somClique.volume = document.getElementById('volumeEfeitos').value;
    somClique.play();

    if (tela === 'inicio') {
        trilha.play(); // Só começa a música quando for iniciar o menu
    }

    document.querySelectorAll('.tela').forEach(div => {
        div.classList.remove('ativa');
    });
    document.getElementById(tela).classList.add('ativa');
}

// Efeito sonoro de hover
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        somHover.volume = document.getElementById('volumeEfeitos').value;
        somHover.play();
    });
});

// Controle de volume
document.getElementById('volumeMusica').addEventListener('input', (e) => {
    trilha.volume = e.target.value;
});

// Velocidade do jogador
let velocidadeJogador = 5;

document.getElementById('velocidadeJogador').addEventListener('input', (e) => {
    velocidadeJogador = e.target.value;
    console.log("Velocidade do Jogador:", velocidadeJogador);
});
