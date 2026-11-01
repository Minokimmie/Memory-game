let cards = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍓", "🍓",
    "🍊", "🍊",
    "🍉", "🍉"
];

// Xáo trộn các thẻ
cards.sort(() => Math.random() - 0.5);

let game = document.getElementById("game");
let scoreText = document.getElementById("score");
let message = document.getElementById("message");

let firstCard = null;
let secondCard = null;
let score = 0;
let locked = false;
let matchedCount = 0;

// Hiển thị các thẻ
function displayCards() {
    game.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement("div");

        card.classList.add("card");
        card.innerText = "?";
        card.dataset.value = cards[i];

        card.addEventListener("click", function () {
            checkCard(card);
        });

        game.appendChild(card);
    }
}

// Kiểm tra thẻ được chọn
function checkCard(card) {
    if (
        locked ||
        card.classList.contains("matched") ||
        card === firstCard
    ) {
        return;
    }

    card.innerText = card.dataset.value;

    if (firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
        locked = true;

        setTimeout(checkMatch, 800);
    }
}

// Kiểm tra hai thẻ
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        score++;
        matchedCount += 2;

        scoreText.innerText = score;

        if (matchedCount === cards.length) {
            message.innerText = "Chúc mừng! Bạn đã hoàn thành game!";
        }
    } else {
        firstCard.innerText = "?";
        secondCard.innerText = "?";
    }

    firstCard = null;
    secondCard = null;
    locked = false;
}

// Chơi lại
document.getElementById("restart").addEventListener("click", function () {
    cards.sort(() => Math.random() - 0.5);

    score = 0;
    matchedCount = 0;
    firstCard = null;
    secondCard = null;
    locked = false;

    scoreText.innerText = score;
    message.innerText = "";

    displayCards();
});

displayCards();