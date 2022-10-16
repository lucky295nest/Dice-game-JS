//Dice
var dice1        =  0;
var dice2        =  0;
var dice3        =  0;
var dice4        =  0;

//int
var coins        =  0;
var coinGain     =  10;
var health       =  50;
var damage       =  1;
var powDamage    =  5;
var powCount     =  0;
var shieldCount  =  0;
var healCount    =  0;
var betValue     =  10;
var betIncrease  =  10;

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
    }

    if (placedBet == true) {
        placeBet.classList.add("disabled");
    } else {
        placeBet.classList.remove("disabled");
    }

    coinsText.innerHTML = "Coins: " + coins;
    healthText.innerHTML = "HP: " + health;
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
        powerUp.classList.add("disabled");
    } else {
        swal("No healing items in your inventory.", "", "error");
    }
});

//functions
function diceRoll() {
    let randomNumber = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
    ];

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
    coins += coinGain;
}

function recDamage() {
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
}