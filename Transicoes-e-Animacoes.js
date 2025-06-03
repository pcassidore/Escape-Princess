// transitions_animations_examples.js
// Este arquivo contém exemplos de código para transições e animações
// extraídos do projeto "Escape Princess" em Phaser 3.

// ==================================================
// 1. Transição Circular (StartScene -> MainMenuScene)
// ==================================================
// Origem: StartScene.js (método startCircularTransition)

/**
 * Inicia uma transição circular (expansão de um círculo preto) 
 * para cobrir a tela antes de iniciar a próxima cena.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {string} targetSceneKey - A chave da cena de destino
 */
function startCircularTransition(scene, targetSceneKey) {
    const centerX = scene.cameras.main.width / 2;
    const centerY = scene.cameras.main.height / 2;
    // Calcula um raio grande o suficiente para cobrir a tela na diagonal
    const maxRadius = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

    // Cria um objeto gráfico para desenhar o círculo
    const circle = scene.add.graphics();
    circle.fillStyle(0x000000); // Cor da transição (preto)
    circle.setDepth(1000); // Garante que fique acima de outros elementos

    // Define o raio inicial como 0 (invisível)
    circle.setData("radius", 0);

    // Anima o raio do círculo usando Phaser Tweens
    scene.tweens.add({
        targets: circle.data.values, // Anima a propriedade 'radius' nos dados do objeto
        radius: maxRadius,
        duration: 500, // Duração da animação de expansão
        ease: "Sine.easeInOut", // Efeito de aceleração/desaceleração
        onUpdate: () => {
            // Redesenha o círculo a cada frame com o raio atualizado
            circle.clear();
            circle.fillStyle(0x000000);
            circle.fillCircle(centerX, centerY, circle.getData("radius"));
        },
        onComplete: () => {
            console.log(`Transição circular completa. Iniciando ${targetSceneKey}`);
            // Inicia a próxima cena APÓS a tela estar coberta
            scene.scene.start(targetSceneKey);
            // O círculo será destruído quando a cena atual for encerrada.
            // Se precisar de uma animação de "fechamento" na nova cena,
            // a lógica precisaria ser implementada lá.
        }
    });
}

// Exemplo de uso dentro de uma cena (ex: StartScene):
// this.startCircularTransition("MainMenuScene");


// ==================================================
// 2. Transição Fade Out/In entre Cenas (Usando Câmera)
// ==================================================
// Origem: MainMenuScene.js (startGame, exitToStart), GameScene.js (create, goToNextMap)

/**
 * Inicia uma transição de Fade Out da câmera atual e,
 * ao completar, inicia a cena de destino.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {string} targetSceneKey - A chave da cena de destino
 * @param {number} [duration=500] - Duração do fade em milissegundos
 */
function fadeOutToScene(scene, targetSceneKey, duration = 500) {
    scene.cameras.main.fadeOut(duration, 0, 0, 0, (camera, progress) => {
        if (progress === 1) {
            console.log(`Fade Out completo. Iniciando ${targetSceneKey}`);
            // Para músicas ou sons específicos da cena atual antes de mudar
            // Ex: if (scene.menuMusic) scene.menuMusic.stop();
            scene.scene.start(targetSceneKey);
        }
    });
}

/**
 * Inicia uma transição de Fade Out da câmera atual e,
 * ao completar, reinicia a cena atual (útil para mudar de mapa).
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {object} [data={}] - Dados a serem passados para a cena reiniciada
 * @param {number} [duration=500] - Duração do fade em milissegundos
 */
function fadeOutToRestart(scene, data = {}, duration = 500) {
    scene.cameras.main.fadeOut(duration, 0, 0, 0, (camera, progress) => {
        if (progress === 1) {
            console.log("Fade Out completo. Reiniciando cena.");
            // Para músicas ou sons específicos da cena atual antes de reiniciar
            // Ex: if (scene.gameMusic) scene.gameMusic.stop();
            scene.scene.restart(data);
        }
    });
}

/**
 * Inicia uma transição de Fade In da câmera ao criar a cena.
 * Deve ser chamado dentro do método `create()` da cena.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {number} [duration=500] - Duração do fade em milissegundos
 */
function fadeInOnLoad(scene, duration = 500) {
    scene.cameras.main.fadeIn(duration, 0, 0, 0);
    console.log("Fade In iniciado na carga da cena.");
}

// Exemplo de uso dentro de uma cena:
// // No MainMenuScene, para ir ao jogo:
// fadeOutToScene(this, "GameScene");
// // No GameScene, no create():
// fadeInOnLoad(this);
// // No GameScene, para ir ao próximo mapa:
// fadeOutToRestart(this, { mapIndex: nextMap });


// ==================================================
// 3. Animações de Botões (Hover e Clique)
// ==================================================
// Origem: MainMenuScene.js (createButton)

/**
 * Aplica efeitos de hover (escala) e clique (escala + som) a um botão.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {Phaser.GameObjects.Image | Phaser.GameObjects.Sprite | Phaser.GameObjects.Text} button - O objeto do botão
 * @param {function} onClickCallback - Função a ser chamada no clique
 * @param {string} [hoverSoundKey="sfxHover"] - Chave do som de hover
 * @param {string} [clickSoundKey="sfxClick"] - Chave do som de clique
 */
function setupButtonAnimations(scene, button, onClickCallback, hoverSoundKey = "sfxHover", clickSoundKey = "sfxClick") {
    button.setInteractive({ useHandCursor: true });

    const sfxHover = scene.sound.add(hoverSoundKey, { volume: scene.registry.get("sfxVolume", 0.5) });
    const sfxClick = scene.sound.add(clickSoundKey, { volume: scene.registry.get("sfxVolume", 0.5) });

    button.on("pointerover", () => {
        scene.tweens.killTweensOf(button); // Para animações anteriores se houver
        scene.tweens.add({ targets: button, scale: 1.1, duration: 100, ease: "Sine.easeInOut" });
        sfxHover.play();
    });

    button.on("pointerout", () => {
        scene.tweens.killTweensOf(button);
        scene.tweens.add({ targets: button, scale: 1.0, duration: 100, ease: "Sine.easeInOut" });
    });

    button.on("pointerdown", () => {
        sfxClick.play();
        scene.tweens.killTweensOf(button);
        // Efeito de clique rápido (encolhe e volta)
        scene.tweens.add({
            targets: button,
            scale: 0.95,
            duration: 50,
            yoyo: true, // Volta ao estado original
            ease: "Sine.easeInOut",
            onComplete: () => {
                button.setScale(1.0); // Garante escala final correta
                if (onClickCallback) {
                    onClickCallback.call(scene); // Chama o callback principal
                }
            }
        });
    });
}

// Exemplo de uso dentro de uma cena:
// const myButton = this.add.image(x, y, "buttonImage");
// setupButtonAnimations(this, myButton, () => { console.log("Botão clicado!"); });


// ==================================================
// 4. Animação de Texto de Feedback (Fade Out)
// ==================================================
// Origem: GameScene.js (showFeedbackText)

/**
 * Mostra um texto na tela e o faz desaparecer após um tempo.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {number} x - Posição X do texto
 * @param {number} y - Posição Y do texto
 * @param {string} text - O conteúdo do texto
 * @param {object} style - Objeto de estilo do texto Phaser
 * @param {number} [duration=2000] - Tempo visível antes de desaparecer (ms)
 */
function showTemporaryFeedbackText(scene, x, y, text, style, duration = 2000) {
    const feedbackText = scene.add.text(x, y, text, style).setOrigin(0.5);
    
    // Animação de fade out usando tweens
    scene.tweens.add({
        targets: feedbackText,
        alpha: 0, // Anima a transparência para 0
        delay: duration - 500, // Começa a desaparecer um pouco antes do tempo total
        duration: 500, // Duração do fade out
        ease: "Power1",
        onComplete: () => {
            feedbackText.destroy(); // Remove o objeto de texto da cena
        }
    });
}

// Exemplo de uso dentro de uma cena:
// const feedbackStyle = { font: "30px Arial", fill: "#00ff00" };
// showTemporaryFeedbackText(this, this.cameras.main.centerX, 100, "Enigma Resolvido!", feedbackStyle, 2500);


// ==================================================
// 5. Animação de Clique em Objeto Interativo (Enigma)
// ==================================================
// Origem: GameScene.js (handleEnigma1Input)

/**
 * Aplica uma animação de "pulso" (escala) a um objeto quando clicado.
 * @param {Phaser.Scene} scene - A cena atual (this)
 * @param {Phaser.GameObjects.GameObject} targetObject - O objeto que foi clicado
 */
function animateObjectClick(scene, targetObject) {
    scene.tweens.add({
        targets: targetObject,
        scale: 1.2, // Aumenta a escala
        duration: 100, // Duração curta
        yoyo: true, // Retorna à escala original
        ease: "Sine.easeInOut"
    });
}

// Exemplo de uso dentro de uma função de clique:
// myInteractiveObject.on("pointerdown", () => {
//     animateObjectClick(this, myInteractiveObject);
//     // ...outra lógica...
// });

