$(document).ready(function() {
    
    var characters = [
        {
            id: "0",
            name: "Darth Vader",
            health: 100,
            attack: 10,
            counterAttack: 20
        },
        {
            id: "1",
            name: "Kylo Ren",
            health: 125,
            attack: 15,
            counterAttack: 25
        },
        {
            id: "2",
            name: "Luke Skywalker",
            health: 115,
            attack: 12,
            counterAttack: 22
        },
        {
            id: "3",
            name: "Rey Skywalker",
            health: 130,
            attack: 15,
            counterAttack: 25
        }
    ];

    function updateHealth(element, health) {

        for(i = 0; i < element.length; i++){
            if(element[i].className === "health") {
                element[i].textContent = health;
            }
        }
    }

    function initGame() {
        for(j = 0; j < characters.length; j++) {
            var charDiv = $("#" + characters[j].id).children();
            updateHealth(charDiv, characters[j].health);
        }
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

            for(i = 0; i < characters.length; i++) {
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
        console.log($(this));


    });

    $("#attack-btn").on("click", function(){
        if(inBattle) {
            defender.health -= usrChar.attack;
            usrChar.health -= defender.counterAttack;
            usrChar.attack += 3;

            console.log(usrChar.name + " health: " + usrChar.health);
            console.log(defender.name + " health: " + defender.health);

            // setHealth(usrChar.health, defender.health);

            var charDiv = $("#" + usrChar.id).children();
            var defDiv = $("#" + defender.id).children();
            updateHealth(charDiv, usrChar.health);
            updateHealth(defDiv, defender.health);
        }
    });
});