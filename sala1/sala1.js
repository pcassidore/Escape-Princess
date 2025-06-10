class EscapeRoom {
    constructor() {
        this.inventory = [];
        this.currentRoom = 'start';
        this.gameState = {
            chaveEscolhida: '',
            desafiosCompletos: 0,
            somLigado: true,
            dificuldade: 'normal'
        };

        this.sequenciaEscolhida = '';

        // Criar os elementos de áudio
        this.somVitoria = new Audio('./sounds/magical_1.ogg');
        this.musicaFundo = new Audio('./sounds/No More Magic.mp3');

        // Configurar o volume
        this.somVitoria.volume = 1.0;
        this.musicaFundo.volume = 0.5;

        // Configurar a música de fundo para loop
        this.musicaFundo.loop = true;

        this.somVitoria.addEventListener('error', (e) => {
            console.error('Erro ao carregar o som de vitória:', e);
        });
        this.musicaFundo.addEventListener('error', (e) => {
            console.error('Erro ao carregar a música de fundo:', e);
        });

        this.init();
    }

    init() {
        this.renderRoom();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.currentRoom === 'opcoes') {
                    this.voltarAoMenu();
                }
            }
        });
    }

    renderRoom() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = '';

        switch(this.currentRoom) {
            case 'start':
                this.renderStartRoom();
                break;
            case 'opcoes':
                this.renderOpcoesRoom();
                break;
            case 'sala':
                this.renderSalaChaves();
                break;
            case 'final':
                this.renderFinal();
                break;
        }
    }

    renderStartRoom() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
            <div style="position: absolute; width: 100%; height: 100%; display: flex; 
                        flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <h1 style="color: #FFD700; font-size: 3em; text-shadow: 3px 3px 0 #8B4513; margin-bottom: 50px;">
                    Escape Room
                </h1>
                <div style="margin-top: 20px;">
                    <button class="game-button" onclick="game.iniciarJogo()">Iniciar</button>
                    <button class="game-button" onclick="game.abrirOpcoes()">Opções</button>
                    <button class="game-button" onclick="game.sairJogo()">Sair</button>
                </div>
            </div>`;
    }

    renderOpcoesRoom() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
            <div style="position: absolute; width: 100%; height: 100%; display: flex; 
                        flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <h2 class="room-title">Opções</h2>
                <div style="margin: 20px;">
                    <div style="margin: 20px;">
                        <label style="color: #FFD700; font-size: 1.2em; text-shadow: 1px 1px #8B4513;">Som:</label>
                        <button class="game-button" style="width: 120px;" 
                                onclick="game.toggleSom()">${this.gameState.somLigado ? 'Ligado' : 'Desligado'}</button>
                    </div>
                    <div style="margin: 20px;">
                        <label style="color: #FFD700; font-size: 1.2em; text-shadow: 1px 1px #8B4513;">Dificuldade:</label>
                        <button class="game-button" style="width: 120px;" 
                                onclick="game.toggleDificuldade()">${this.gameState.dificuldade}</button>
                    </div>
                </div>
                <button class="game-button" onclick="game.voltarAoMenu()">Voltar</button>
            </div>`;
    }

    renderSalaChaves() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
           <div class="game-content" style="position: relative; width: 100%; height: 100%; z-index: 1;">
    <div style="position: absolute; top: 5%; left: 50%; transform: translateX(-50%); text-align: center; width: 100%;">
        <h2 class="room-title">Desafio 1: O Código Secreto</h2>
        <p style="margin: 20px; font-size: 18px; color: #FFD700; text-shadow: 1px 1px #8B4513;">
            A porta está trancada com um código...Pelas paredes, quadros com números escondem a dica da sequência correta.<br>
            Qual será a senha?
        </p>
    </div>

    <button style="position: absolute; top: 80px; left: 1428px; display: flex; gap: 10px; border: none;" onclick="game.clicarQuadro('4')">
        <img src="./images/quadro1.png" alt="Quadro 1" style="height: 60px;">
    </button>
    <button style="position: absolute; top: 88px; left: 587px; display: flex; gap: 10px;border: none;" onclick="game.clicarQuadro('3')">
        <img src="./images/quadro2.png" alt="Quadro 2" style="height: 50px;">
    </button>
    <button style="position: absolute; top: 90%; left: 54%; display: flex; gap: 10px;border: none;" onclick="game.clicarQuadro('1')">
        <img src="./images/quadro3.png" alt="Quadro 3" style="height: 45px;">
    </button>
    <button style="position: absolute; top: 53%; left: 24%; display: flex; gap: 10px;border: none;" onclick="game.clicarQuadro('2')">
        <img src="./images/quadro4.png" alt="Quadro 4" style="height: 45px;">
    </button>
</div>`;
    }

    renderFinal() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
            <div style="position: absolute; width: 100%; height: 100%; display: flex; 
                        flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <h1 class="room-title" style="margin-bottom: 30px;">Parabéns!</h1>
                <p style="margin: 20px; font-size: 18px; color: #FFD700; text-shadow: 1px 1px #8B4513;">
                    Você passou pela porta com a sequência correta!
                </p>
                <button class="game-button" onclick="game.reiniciarJogo()">
                    Jogar Novamente
                </button>
            </div>`;
    }

    iniciarJogo() {
        if (this.gameState.somLigado) {
            this.playBackgroundMusic();
        }
        this.currentRoom = 'sala';
        this.renderRoom();
        this.showMessage('Um código misterioso bloqueia a porta. Tente descobrir a sequência correta...');
    }

    abrirOpcoes() {
        this.currentRoom = 'opcoes';
        this.renderRoom();
    }

    voltarAoMenu() {
        this.currentRoom = 'start';
        this.renderRoom();
    }

    sairJogo() {
        if (confirm('Tem certeza que deseja sair do jogo?')) {
            window.location.href = 'about:blank';
            window.close();
        }
    }

    toggleSom() {
        this.gameState.somLigado = !this.gameState.somLigado;
        if (!this.gameState.somLigado) {
            this.somVitoria.pause();
            this.somVitoria.currentTime = 0;
            this.musicaFundo.pause();
        } else {
            this.playBackgroundMusic();
        }
        this.renderRoom();
        this.showMessage(`Som ${this.gameState.somLigado ? 'ligado' : 'desligado'}!`, 1500);
    }

    toggleDificuldade() {
        const dificuldades = ['fácil', 'normal', 'difícil'];
        const currentIndex = dificuldades.indexOf(this.gameState.dificuldade);
        this.gameState.dificuldade = dificuldades[(currentIndex + 1) % dificuldades.length];
        this.renderRoom();
        this.showMessage(`Dificuldade alterada para ${this.gameState.dificuldade}!`, 1500);
    }

    escolherChave(chave) {
        this.esconderDica();
        this.gameState.chaveEscolhida = chave;

        const senhaCorreta = '4312';

        if (this.gameState.chaveEscolhida === senhaCorreta) {
            if (this.gameState.somLigado) {
                const volumeOriginal = this.musicaFundo.volume;
                this.musicaFundo.volume = 0.2;

                this.somVitoria.currentTime = 0;
                const playPromise = this.somVitoria.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setTimeout(() => {
                            this.musicaFundo.volume = volumeOriginal;
                        }, 2000);
                    }).catch(error => {
                        console.error('erro ao reproduzir o som:', error);
                        this.musicaFundo.volume = volumeOriginal;
                    });
                }
            }
            this.currentRoom = 'final';
            this.renderRoom();
            this.showMessage('parabéns! você passou pela porta com a sequência correta!');
        } else {
            this.showMessage('sequência errada, tente novamente...');
        }
    }

    mostrarDica(dica) {
        const dicaElement = document.getElementById('dica');
        if (dicaElement) {
            dicaElement.textContent = dica;
            dicaElement.classList.add('visible');
        }
    }

    esconderDica() {
        const dicaElement = document.getElementById('dica');
        if (dicaElement) {
            dicaElement.classList.remove('visible');
        }
    }

    clicarQuadro(numero) {
        this.sequenciaEscolhida += numero;
        this.mostrarDica(`Você clicou no quadro ${numero}`);

        if (this.sequenciaEscolhida.length === 4) {
            this.escolherChave(this.sequenciaEscolhida);
            this.sequenciaEscolhida = '';
        }
    }

    reiniciarJogo() {
        this.gameState = {
            chaveEscolhida: '',
            desafiosCompletos: 0,
            somLigado: this.gameState.somLigado,
            dificuldade: this.gameState.dificuldade
        };
        this.sequenciaEscolhida = '';
        this.currentRoom = 'start';
        this.renderRoom();
    }

    showMessage(message, duration = null) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, duration || 3000);
    }

    playBackgroundMusic() {
        if (this.gameState.somLigado) {
            const playPromise = this.musicaFundo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Erro ao reproduzir música de fundo:', error);
                });
            }
        }
    }
}

const game = new EscapeRoom();
