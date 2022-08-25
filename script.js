const firstPlayer = document.getElementById("firstPlayer");
const secondPlayer = document.getElementById("secondPlayer");
const firstPlayerName = document.getElementById("firstPlayerName");
const secondPlayerName = document.getElementById("secondPlayerName");
const streakSpan = document.getElementById("streakSpan");
const backGame = document.getElementById('backGame');
const nextPlayerName = document.getElementById('nextPlayerName');
const addPlayerInput = document.getElementById("addPlayerInput");
const addPlayerButton = document.getElementById("addPlayerButton");
const listContainer = document.getElementById("listContainer");
let list = [];
let streakPrev;
let playerWinPrev;
let streak = 0;

// Funciones
const showPlayers = () => {

    if (list.length >= 2) {
        firstPlayerName.textContent = list[0];
        streakSpan.textContent = `Racha: ${streak}`;
        secondPlayerName.textContent = list[1];
    } else if (list.length >= 1) {
        firstPlayerName.textContent = list[0];
        secondPlayerName.textContent = "Añade Jugadores";
    } else {
        firstPlayerName.textContent = "Añade Jugadores";
        secondPlayerName.textContent = "Añade Jugadores";
        streakSpan.textContent = "";
    }

    list.length>=3?nextPlayerName.textContent = list[2]:nextPlayerName.textContent = list[2];

    showRow();
};
const showRow = () => {
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
        playerDelete.setAttribute("id", [index]);
        playerDelete.innerHTML =
            '<img class="trash" src="assets/trash.png" alt="trash">';

        // Declaramos elementos hijos
        playerContainer.appendChild(player);
        playerContainer.appendChild(playerDelete);
        // Añadimos a list-container
        listContainer.appendChild(playerContainer);
    }
};
const playerWin = () => {
    if (playerWinPrev === 1 && list.length >= 2) {
        list.push(list[1]);
        list.splice(1, 1);
        streakPrev = streak;
        streak++;
    } else if (playerWinPrev === 2 && list.length >= 2) {
        list.push(list[0]);
        playerLose=list[0];
        list.splice(0, 1);
        streakPrev = streak;
        streak = 1;
    }else{
        window.alert('Faltan Jugadores');
    }
    showPlayers();
};
// Eventos
// Carga la pagina
document.addEventListener('DOMContentLoaded', ()=>{
    showPlayers();
})
// Elegir ganador
firstPlayer.addEventListener("click", () => {
    playerWinPrev = 1;
    playerWin();
});
secondPlayer.addEventListener("click", () => {
    playerWinPrev = 2;
    playerWin();
});
// Agregar Jugadores
addPlayerButton.addEventListener("click", () => {
    if (addPlayerInput.value !== "" && addPlayerInput.value.trim() !== "") {
        if (addPlayerInput.value == "$2450357") {
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
    } else {
        window.alert("El nombre del jugador no puede estar vacio");
    }
});
// Eliminar Jugadores
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG" || e.target.tagName == "BUTTON") {
        list.splice(e.target.parentNode.id, 1);
        if(e.target.parentNode.id == 0) streak = 0;
        showPlayers();
    }
});
// Devolver partido
backGame.addEventListener('click',()=>{
    if(streak == streakPrev){
        window.alert("No es posible deshacer mas movimiento");
    }else{
        if(playerWinPrev==1){
            list.splice(1,0,list[list.length-1]);
            list.pop();
        }else if(playerWinPrev==2){
            list.splice(0,0,list[list.length-1])
            list.pop();
        }
        streak = streakPrev;
        showPlayers();
    }
})
