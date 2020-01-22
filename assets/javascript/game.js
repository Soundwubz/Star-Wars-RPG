$(document).ready(function() {

    console.log("updated");
    
    var characters = [
        {
            id: "0",
            name: "Darth Vader",
            health: 115,
            attack: 10,
            counterAttack: 10,
            resetStats: function() {
                this.health = 115;
                this.attack = 10;
            },
            increaseAttack: function() {
                this.attack += 10;
            }
        },
        {
            id: "1",
            name: "Kylo Ren",
            health: 145,
            attack: 15,
            counterAttack: 15,
            resetStats: function() {
                this.health = 145;
                this.attack = 15;
            },
            increaseAttack: function() {
                this.attack += 15;
            }
        },
        {
            id: "2",
            name: "Luke Skywalker",
            health: 130,
            attack: 12,
            counterAttack: 12,
            resetStats: function() {
                this.health = 130;
                this.attack = 12;
            },
            increaseAttack: function() {
                this.attack += 12;
            }
        },
        {
            id: "3",
            name: "Rey Skywalker",
            health: 150,
            attack: 20,
            counterAttack: 15,
            resetStats: function() {
                this.health = 150;
                this.attack = 15;
            },
            increaseAttack: function() {
                this.attack += 20;
            }
        }
    ];

    function updateHealth(element, health) { // updates character health on screen

        for(i = 0; i < element.length; i++){
            if(element[i].className === "health") {
                element[i].textContent = health;
            }
        }
    }

    function initGame() {
        usrChar = undefined;
        defender = undefined;
        for(j = 0; j < characters.length; j++) {
            var char = $('#' + characters[j].id);
            var charDiv = char.children();
            $('#charSelect').append(char);
            characters[j].resetStats();
            char.css("display", "inline-block");
            updateHealth(charDiv, characters[j].health);
        }
    }

    function enemiesDefeated() {
        let count = 0;
        for(i = 0; i < enemies.length; i++) {
            if(enemies[i].health < 1) {
                count++;
            }
        }
        if(count === 3) {
            return true;
        } else {
            return false;
        }
    }
    function gameOver(character) {
        if(inBattle) { // if currently in battle
            $('#' + character.id).css("display", "none"); // removes defeated enemy from screen
        } else { // if no longer in battle
            initGame(); // reset game
        }
    }
    function gameWon(character) {
        alert(character.name + ", you have deafeated all of the enemies! Congratulations!");
        initGame();
    }

    initGame();

    var usrChar;
    var enemies = [];
    var defender;

    var inBattle = false;

    
    $(".character").on("click", function(){
        var id = parseInt($(this).attr("value"));

        if(usrChar === undefined) {
            usrChar = characters[id];
            $('#userCharacter').append($(this)); // Moves character selected to #userCharacter;

            for(i = 0; i < characters.length; i++) { // Move other characters to #enemies div
                if(i !== id) {
                    enemies.push(characters[i]);
                    $('#enemies').append($('#' + i));
                }
            }
        }
        else if(characters[id] !== usrChar) { // Move enemy selected to defender section & start game
            $('#defender').append($(this));
            defender = characters[id];
            inBattle = true;
        }
        console.log('Character clicked: ' + $(this));


    });

    $("#attack-btn").on("click", function(){
        if(inBattle) {
            var charDiv = $("#" + usrChar.id).children();
            var defDiv = $("#" + defender.id).children();


            defender.health -= usrChar.attack; 
            usrChar.health -= defender.counterAttack;
            updateHealth(charDiv, usrChar.health);
            updateHealth(defDiv, defender.health);
            
            console.log(usrChar.name + " health: " + usrChar.health);
            console.log(defender.name + " health: " + defender.health);
            
            if(defender.health < 1) {
                gameOver(defender);
                if(usrChar.health < 1) { // both defender and user fell below 1 hp
                    inBattle = false;
                    alert(usrChar.name + " and " + defender.name + " have both been defeated");
                    gameOver(usrChar);
                } else { // only defender fell below 1 hp
                    alert(defender.name + " has been defeated!");
                    if(enemiesDefeated()){
                        gameWon(usrChar);
                    }
                }
                return false;
            }
            else if( usrChar.health < 1) { // User has been defeted
                inBattle = false;
                alert(usrChar.name + " has been defeated!");
                gameOver(usrChar);
                return false;
            } 
            else { // Neither characters defeated; Increase usrChar attack
                usrChar.increaseAttack();
            }


            console.log('In battle: ' + inBattle);

        }
    });
});