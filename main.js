//Dice
var dice1        =  0;
var dice2        =  0;
var dice3        =  0;
var dice4        =  0;

//int
var coins        =  0;
var coinGain     =  10;
var maxHealth    =  50;
var health       =  50;
var damage       =  1;
var powDamage    =  5;
var powCount     =  0;
var shieldCount  =  0;
var healCount    =  0;
var healPower    =  10;
var betValue     =  10;
var betIncrease  =  10;
var powPrice     =  20;
var shieldPrice  =  10;
var healPrice    =  10;

//bool
var placedBet    =  false;
var usedPowerUp  =  false;
var usedShield   =  false;
var usedHeal     =  false;
 
//id
const rollDice   =  document.getElementById("rollDice");
const placeBet   =  document.getElementById("placeBet");
const powerUp    =  document.getElementById("powerUp");
const useShield  =  document.getElementById("useShield");
const useHeal    =  document.getElementById("useHeal");
const coinsText  =  document.getElementById("coinsCount");
const healthText =  document.getElementById("health");
const healText   =  document.getElementById("heals");
const shieldText =  document.getElementById("shields");
const powUpsText =  document.getElementById("powerUps");
const gameImage  =  document.getElementById("gameImage");
const buyPowerUp =  document.getElementById("buyPowerUp");
const buyShield  =  document.getElementById("buyShield");
const buyHeal    =  document.getElementById("buyHeal");

//enemy int
var enemyHP      =  50;
var enemyCoins   =  0;
var enemyDmg     =  1;
var enemyPowDmg  =  5;

//enemy bool
var enemyBet     =  false;
var enemyPowerUp =  false;
var enemyShield  =  false;
var enemyHeal    =  false;

//interval
setInterval(() => {
    if (usedPowerUp == true || usedShield == true || usedHeal == true) {
        useShield.classList.add("disabled");
        useHeal.classList.add("disabled");
        powerUp.classList.add("disabled");
    } else {
        useShield.classList.remove("disabled");
        useHeal.classList.remove("disabled");
        powerUp.classList.remove("disabled");
        powerUp.classList.add("btn-outline-light");
        powerUp.classList.remove("btn-outline-success");
        useHeal.classList.add("btn-outline-light");
        useHeal.classList.remove("btn-outline-success");
        useShield.classList.add("btn-outline-light");
        useShield.classList.remove("btn-outline-success");
    }

    if (placedBet == true) {
        placeBet.classList.add("disabled");
    } else {
        placeBet.classList.remove("disabled");
    }

    if (health > maxHealth) {
        health = maxHealth;
    }

    coinsText.innerHTML  = "Coins: " + coins;
    healthText.innerHTML = "HP: " + health;
    powUpsText.innerHTML = "Power ups: " + powCount;
    shieldText.innerHTML = "Shields: " + shieldCount;
    healText.innerHTML   = "Heals: " + healCount;
}, 100);

//event listeners
rollDice.addEventListener("click", () => {
    diceRoll();
});

placeBet.addEventListener("click", () => {
    if (coins >= betValue) {
        placedBet = true;
        coins -= betValue;
    } else {
        swal("Not enough coins.", "", "error");
    }
});

powerUp.addEventListener("click", () => {
    if (powCount > 0) {
        usedPowerUp = true;
        powCount--;
        useShield.classList.add("disabled");
        useHeal.classList.add("disabled");
        powerUp.classList.remove("btn-outline-light");
        powerUp.classList.add("btn-outline-success");
        powerUp.classList.add("disabled");
    } else {
        swal("No power up available", "", "error");
    }
});

useShield.addEventListener("click", () => {
    if (shieldCount > 0) {
        usedShield = true;
        shieldCount--;
        useShield.classList.add("disabled");
        useShield.classList.remove("btn-outline-light");
        useShield.classList.add("btn-outline-success");
        useHeal.classList.add("disabled");
        powerUp.classList.add("disabled");
    } else {
        swal("No shield items in your inventory.", "", "error");
    }
});

useHeal.addEventListener("click", () => {
    if (healCount > 0) {
        usedHeal = true;
        healCount--;
        useShield.classList.add("disabled");
        useHeal.classList.add("disabled");
        useHeal.classList.remove("btn-outline-light");
        useHeal.classList.add("btn-outline-success");
        powerUp.classList.add("disabled");
    } else {
        swal("No healing items in your inventory.", "", "error");
    }
});

buyHeal.addEventListener("click", () => {
    if (coins >= healPrice) {
        healCount++;
        coins -= healPrice;
    } else {
        swal("Not enough coins.", "", "error");
    }
});

buyPowerUp.addEventListener("click", () => {
    if (coins >= healPrice) {
        powCount++;
        coins -= powPrice;
    } else {
        swal("Not enough coins.", "", "error");
    }
});

buyShield.addEventListener("click", () => {
    if (coins >= healPrice) {
        shieldCount++;
        coins -= shieldPrice;
    } else {
        swal("Not enough coins.", "", "error");
    }
});

//functions
function diceRoll() {
    if (usedHeal == true) {
        health += healPower;
        usedHeal = false;
    }

    let randomNumber = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
    ];

    rollDice.classList.add("disabled");

    gameImage.src = "./img/Dice roll.gif";
    setTimeout(() => {
        gameImage.src = "./img/Dice rolled.png";
    }, 600);

    setTimeout(() => {
        gameImage.src = "./img/Dice default.gif";
        rollDice.classList.remove("disabled");
    }, 1800);

    dice1 = randomNumber[0];
    dice2 = randomNumber[1];
    dice3 = randomNumber[2];
    dice4 = randomNumber[3];

    calcDice(dice1, dice2, dice3, dice4);
}

function calcDice(dice1, dice2, dice3, dice4) {
    let player = dice1 + dice3;
    let enemy  = dice2 + dice4;

    if (player > enemy) {
        doDamage();
    } else {
        recDamage();
    }
}

function doDamage() {
    if (placedBet == true) {
        coins += betValue * 2;
        betValue += betIncrease;
    }

    if (usedPowerUp == true) {
        enemyHP -= powDamage;
        usedPowerUp = false;
    } else {
        enemyHP -= damage;
    }

    enemyBet = false;
    placedBet = false;
    usedShield = false;
    usedPowerUp = false;
    coins += coinGain;
}

function recDamage() {
    if (usedShield == false) {
        if (enemyBet == true) {
            enemyCoins += betValue * 2;
            betValue += betIncrease;
        }

        if (enemyPowerUp == true) {
            health -= enemyPowDmg;
            enemyPowerUp = false;
        } else {
            health -= enemyDmg;
        }

        enemyBet = false;
        placedBet = false;
        enemyCoins += coinGain;
        usedPowerUp = false;
    }
}