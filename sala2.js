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
        
        // Criar os elementos de áudio
        this.somVitoria = new Audio('./sounds/magical_1.ogg');
        this.musicaFundo = new Audio('./sounds/No More Magic.mp3');
        
        // Configurar o volume
        this.somVitoria.volume = 1.0;
        this.musicaFundo.volume = 0.5; // Volume mais baixo para música de fundo
        
        // Configurar a música de fundo para loop
        this.musicaFundo.loop = true;
        
        // Adicionar listeners para erros
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
            </div>
        `;
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
            </div>
        `;
    }

    renderSalaChaves() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
            <div class="game-content" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
                <div style="position: absolute; top: 5%; left: 50%; transform: translateX(-50%); text-align: center; width: 100%;">
                    <h2 class="room-title">Desafio 2: As Chaves do Engano</h2>
                    <p style="margin: 20px; font-size: 18px; color: #FFD700; text-shadow: 1px 1px #8B4513;">
                        Um baú misterioso guarda a chave da porta. Três chaves estão sobre a mesa...<br>
                        Qual delas abrirá o baú?
                    </p>
                </div>
                
                <!-- Áreas clicáveis para cada chave -->
                <div class="chave-hotspot" 
                     onmouseover="game.mostrarDica('A chave de prata está enfeitiçada com magia negra...')"
                     onmouseout="game.esconderDica()"
                     onclick="game.escolherChave('prata')"
                     style="left: 45%; top: 80%;"></div>
                <div class="chave-hotspot"
                     onmouseover="game.mostrarDica('A chave enferrujada parece ser uma armadilha mortal...')"
                     onmouseout="game.esconderDica()"
                     onclick="game.escolherChave('enferrujada')"
                     style="left: 51%; top: 80%;"></div>
                <div class="chave-hotspot"
                     onmouseover="game.mostrarDica('A chave de ouro brilha com uma aura de esperança...')"
                     onmouseout="game.esconderDica()"
                     onclick="game.escolherChave('ouro')"
                     style="left: 57%; top: 80%;"></div>
            </div>
        `;
    }

    renderFinal() {
        const roomElement = document.getElementById('room');
        roomElement.innerHTML = `
            <div style="position: absolute; width: 100%; height: 100%; display: flex; 
                        flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <h1 class="room-title" style="margin-bottom: 30px;">Parabéns!</h1>
                <p style="margin: 20px; font-size: 18px; color: #FFD700; text-shadow: 1px 1px #8B4513;">
                    Você encontrou a chave correta e completou o desafio!<br>
                    O baú foi aberto com sucesso!
                </p>
                <button class="game-button" onclick="game.reiniciarJogo()">
                    Jogar Novamente
                </button>
            </div>
        `;
    }

    iniciarJogo() {
        // Iniciar a música de fundo quando o jogo começa
        if (this.gameState.somLigado) {
            this.playBackgroundMusic();
        }
        this.currentRoom = 'sala';
        this.renderRoom();
        this.showMessage('Um baú misterioso guarda a chave da porta. Escolha sabiamente...');
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
        console.log('Som ' + (this.gameState.somLigado ? 'ligado' : 'desligado'));
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
        if (chave === 'ouro') {
            console.log('Chave de ouro clicada, tentando tocar o som...');
            if (this.gameState.somLigado) {
                // Baixar volume da música de fundo temporariamente
                const volumeOriginal = this.musicaFundo.volume;
                this.musicaFundo.volume = 0.2;
                
                // Tocar som de vitória
                this.somVitoria.currentTime = 0;
                const playPromise = this.somVitoria.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Som reproduzido com sucesso!');
                        // Restaurar volume da música após o som de vitória
                        setTimeout(() => {
                            this.musicaFundo.volume = volumeOriginal;
                        }, 2000);
                    }).catch(error => {
                        console.error('Erro ao reproduzir o som:', error);
                        this.musicaFundo.volume = volumeOriginal;
                    });
                }
            }
            this.currentRoom = 'final';
            this.renderRoom();
            this.showMessage('Parabéns! A chave de ouro era a resposta correta!');
        } else if (chave === 'prata') {
            this.showMessage('A chave de prata estava enfeitiçada! Tente novamente...');
        } else {
            this.showMessage('A chave enferrujada era uma armadilha! Tente novamente...');
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

    reiniciarJogo() {
        this.gameState = {
            chaveEscolhida: '',
            desafiosCompletos: 0,
            somLigado: this.gameState.somLigado,
            dificuldade: this.gameState.dificuldade
        };
        this.currentRoom = 'start';
        this.renderRoom();
    }

    showMessage(message, duration = null) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        if (duration) {
            setTimeout(() => {
                messageElement.remove();
            }, duration);
        } else {
            setTimeout(() => {
                messageElement.remove();
            }, 3000);
        }
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
