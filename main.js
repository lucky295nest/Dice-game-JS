//Dice
var dice1        =  0;
var dice2        =  0;
var dice3        =  0;
var dice4        =  0;

//int
var coins        =  0;
var coinGain     =  0;
var health       =  50;
var damage       =  1;
var powDamage    =  5;
var shieldCount  =  0;
var healCount    =  0;
var betValue     =  10;

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
const coins      =  document.getElementById("coins");
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
        useShield.classList.add("enabled");
        useHeal.classList.add("enabled");
        powerUp.classList.add("enabled");
    }

    healthText.innerHTML() = "Coins: " + coins; 
});

//event listeners
rollDice.addEventListener("click", () => {
    diceRoll();
});

placeBet.addEventListener("click", () => {
    if (coins >= betValue) {
        placedBet = true;
    } else {
        swal("Not enough coins.", "", "error");
    }
});

powerUp.addEventListener("click", () => {
    if (powerUp > 0) {
        usedPowerUp == true;
        useShield.classList.add("disabled");
        useHeal.classList.add("disabled");
        powerUp.classList.add("disabled");
    } else {
        swal("No power up available", "", "error");
    }
});

useShield.addEventListener("click", () => {
    if (shieldCount > 0) {
        usedShield == true;
        useShield.classList.add("disabled");
        useHeal.classList.add("disabled");
        powerUp.classList.add("disabled");
    } else {
        swal("No shield items in your inventory.", "", "error");
    }
});

useHeal.addEventListener("click", () => {
    if (healCount > 0) {
        usedHeal == true;
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
        Math.floor(Math.random() * 8) + 1,
        Math.floor(Math.random() * 8) + 1,
        Math.floor(Math.random() * 8) + 1,
        Math.floor(Math.random() * 8) + 1
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

        if (enemyBet == true) {
            enemyCoins -= betValue * 2;
        } else {
            enemyCoins += coinGain;
        }

        betValue += 10;
    }

    if (powerUp == true) {
        enemyHP -= powDamage;
        powerUp = false;
    } else {
        enemyHP -= damage;
    }
}

function recDamage() {
    if (placedBet == true) {
        coins -= betValue * 2;

        if (enemyBet == true) {
            enemyCoins += betValue * 2;
        } else {
            enemyCoins += coinGain;
        }

        betValue += 10;
    }

    if (enemyPowerUp == true) {
        health -= enemyPowDmg;
        enemyPowerUp = false;
    } else {
        health -= damage;
    }
}