let lives = 3;
let crystals = 0;

const parameters = new URLSearchParams(
    window.location.search
);

const receivedName = parameters.get("username");

let playerName = "PLAYER";

if (receivedName) {
    playerName = receivedName
        .trim()
        .slice(0, 7)
        .toUpperCase();
}

document.getElementById(
    "playerName"
).textContent = playerName;

function updateStatus() {
    const livesElement =
        document.getElementById("lives");

    if (lives === 3) {
        livesElement.textContent = "❤️ ❤️ ❤️";
    } else if (lives === 2) {
        livesElement.textContent = "❤️ ❤️ 🖤";
    } else if (lives === 1) {
        livesElement.textContent = "❤️ 🖤 🖤";
    } else {
        livesElement.textContent = "🖤 🖤 🖤";
    }

    document.getElementById(
        "crystals"
    ).textContent = crystals;
}

function chooseLeftPath() {
    crystals++;

    updateStatus();

    document.getElementById(
        "storyTitle"
    ).textContent = "Você encontrou um cristal!";

    document.getElementById(
        "storyText"
    ).textContent =
        playerName +
        " encontrou um cristal azul escondido entre as árvores. " +
        "O cristal iluminou uma passagem secreta.";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button"
            onclick="enterSecretPath()"
        >
            💎 ENTRAR NA PASSAGEM
        </button>

        <button
            class="choice-button"
            onclick="returnToCrossroads()"
        >
            ↩ VOLTAR
        </button>
    `;
}

function chooseRightPath() {
    lives--;

    updateStatus();

    document.getElementById(
        "character"
    ).textContent = "😵";

    document.getElementById(
        "storyTitle"
    ).textContent = "Uma criatura apareceu!";

    document.getElementById(
        "storyText"
    ).textContent =
        "Uma criatura estava escondida no caminho. " +
        playerName +
        " conseguiu escapar, mas perdeu uma vida.";

    if (lives <= 0) {
        showGameOver();
        return;
    }

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button"
            onclick="faceCreature()"
        >
            ⚔ ENFRENTAR CRIATURA
        </button>

        <button
            class="choice-button"
            onclick="returnToCrossroads()"
        >
            🏃 VOLTAR CORRENDO
        </button>
    `;
}

function enterSecretPath() {
    crystals += 2;

    updateStatus();

    document.getElementById(
        "storyTitle"
    ).textContent = "Portal encontrado!";

    document.getElementById(
        "storyText"
    ).textContent =
        playerName +
        " encontrou mais dois cristais e o portal de saída.";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button victory-button"
            onclick="showVictory()"
        >
            ✨ ENTRAR NO PORTAL
        </button>
    `;
}

function faceCreature() {
    lives--;

    updateStatus();

    if (lives <= 0) {
        showGameOver();
        return;
    }

    document.getElementById(
        "character"
    ).textContent = "🧙";

    document.getElementById(
        "storyTitle"
    ).textContent = "Você escapou!";

    document.getElementById(
        "storyText"
    ).textContent =
        "A criatura era muito forte. Você perdeu outra vida, " +
        "mas conseguiu voltar ao início.";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button"
            onclick="returnToCrossroads()"
        >
            ↩ CONTINUAR A AVENTURA
        </button>
    `;
}

function returnToCrossroads() {
    document.getElementById(
        "character"
    ).textContent = "🧙";

    document.getElementById(
        "storyTitle"
    ).textContent = "Você voltou ao início";

    document.getElementById(
        "storyText"
    ).textContent =
        "Os dois caminhos aparecem novamente. Escolha com cuidado.";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button"
            onclick="chooseLeftPath()"
        >
            ◀ CAMINHO DA ESQUERDA
        </button>

        <button
            class="choice-button"
            onclick="chooseRightPath()"
        >
            CAMINHO DA DIREITA ▶
        </button>
    `;
}

function showVictory() {
    document.getElementById(
        "scene"
    ).innerHTML = `
        <div class="final-symbol">🏆</div>
        <div class="final-message">FASE CONCLUÍDA!</div>
    `;

    document.getElementById(
        "storyTitle"
    ).textContent = "Parabéns, " + playerName + "!";

    document.getElementById(
        "storyText"
    ).textContent =
        "Você terminou a fase com " +
        crystals +
        " cristais e " +
        lives +
        " vida(s).";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button victory-button"
            onclick="restartGame()"
        >
            ↻ JOGAR NOVAMENTE
        </button>

        <a
            href="index.html"
            class="choice-button"
        >
            ⏹ VOLTAR AO MENU
        </a>
    `;
}

function showGameOver() {
    document.getElementById(
        "scene"
    ).innerHTML = `
        <div class="final-symbol">💀</div>
        <div class="game-over-message">GAME OVER</div>
    `;

    document.getElementById(
        "storyTitle"
    ).textContent = "A aventura terminou";

    document.getElementById(
        "storyText"
    ).textContent =
        playerName +
        " ficou sem vidas. Não desista!";

    document.getElementById(
        "choiceButtons"
    ).innerHTML = `
        <button
            class="choice-button"
            onclick="restartGame()"
        >
            ↻ TENTAR NOVAMENTE
        </button>

        <a
            href="index.html"
            class="choice-button"
        >
            ⏹ VOLTAR AO MENU
        </a>
    `;
}

function restartGame() {
    window.location.href =
        "game.html?username=" +
        encodeURIComponent(playerName);
}
