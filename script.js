const firstPlayerBox = document.getElementById("firstPlayerBox");

const secondPlayerBox = document.getElementById("secondPlayerBox");

const firstPlayer = document.getElementById("firstPlayer");

const secondPlayer = document.getElementById("secondPlayer");

const streakSpan = document.getElementById('games-won');

const addPlayerInput = document.getElementById("add-player__input");

const addPlayerButton = document.getElementById("add-player__button");

const listContainer = document.getElementById("list__container");

const deletePlayerButtonList = document.getElementsByClassName('player__delete');

const list = [];

let streak = 0;

// Funciones

const addPlayer = () => {
    if (addPlayerInput.value == "$allPlayers") {
        list.splice(0);
        list.push(
            "ESTEBAN",
            "SIABATTO",
            "RICARDO",
            "DANIEL",
            "ANDRES",
            "WILLIAM",
            "ACUÑA",
            "NICOLAS",
            "BLESSD",
            "MARLES",
            "PAULA",
            "FELIPE"
        );
        streak = 0;
    } else if (addPlayerInput.value == "$clearAll") {
        list.splice(0);
        streak = 0;
    } else {
        list.push(addPlayerInput.value.toUpperCase());
    }
    addPlayerInput.value = "";
    showPlayers();
};

const deletePlayer = (index) => {
    list.splice(index,1);
    showPlayers();
};

const showPlayers = () => {
    if(list.length >=2){
        firstPlayer.setAttribute("value", list[0]);
        streakSpan.textContent = streak;
        secondPlayer.setAttribute("value", list[1]);
    }else if(list.length >=1){
        firstPlayer.setAttribute("value", list[0]);
        streakSpan.textContent = streak;
        secondPlayer.setAttribute("value", 'Añade Jugadores');
    }else{
        firstPlayer.setAttribute("value", 'Añade Jugadores');
        secondPlayer.setAttribute("value", 'Añade Jugadores');
    }
    showRow(list);
};

const showRow = (list) => {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    for (let index in list) {
        const playerContainer = document.createElement("div");
        const player = document.createElement("p");
        const playerDelete = document.createElement("button");
        // Agregamos atributos y clases
        playerContainer.classList.add("player__container");

        player.innerHTML = list[index];

        playerDelete.classList.add("player__delete");
        playerDelete.setAttribute('id',[index]);
        playerDelete.innerHTML =
            '<img class="trash" src="assets/trash.png" alt="trash">';

        // Declaramos elementos hijos
        playerContainer.appendChild(player);
        playerContainer.appendChild(playerDelete);
        // Añadimos a list-container
        listContainer.appendChild(playerContainer);
    }
};

const playerWin = (win) => {
    if (win === 1 && list.length >=2) {
        list.push(list[1]);
        list.splice(1, 1);
        streak++;

    } else if (win === 2 && list.length >=2) {
        list.push(list[0]);
        list.splice(0, 1);
        streak=1;
    }
    showPlayers();
};

// Eventos
firstPlayerBox.addEventListener("click", () => {
    playerWin(1);
});

secondPlayerBox.addEventListener("click", () => {
    playerWin(2);
});

addPlayerButton.addEventListener("click", () => {
    if (addPlayerInput.value !== "" && addPlayerInput.value.trim() !== "") {
        addPlayer();
    } else {
        window.alert("El nombre del jugador no puede estar vacio");
    }
});

listContainer.addEventListener('click',(e)=>{
    if(e.target.tagName == 'IMG' || e.target.tagName == 'BUTTON'){
        deletePlayer(e.target.parentNode.getAttribute('id'));
    }
})

// Inicialización
showPlayers();
