const imgCartas = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

let numCartas;

function perguntarNumCartas() {
  numCartas = parseInt(
    prompt("Quantas cartas você deseja? (Números pares de 4 a 14)")
  );

  while (numCartas % 2 != 0 || numCartas < 4 || numCartas > 14) {
    numCartas = parseInt(
      prompt("Quantas cartas você deseja? (Números pares de 4 a 14)")
    );
  }

  distribuirCartas();
}

perguntarNumCartas();

function distribuirCartas() {
  imgCartas.sort(comparador);

  const mesa = document.querySelector(".board");
  let cartas = [];

  for (let i = 0; i < numCartas / 2; i++) {
    cartas.push(`<div class="card flip">
    <div class="front-face face">
       <img src="./img/${imgCartas[i]}.gif">
    </div>
    <div class="back-face face">
       <img class="icon" src="./img/icon.png">
    </div>
 </div>`);
    cartas.push(`<div class="card flip">
    <div class="front-face face">
       <img src="./img/${imgCartas[i]}.gif">
    </div>
    <div class="back-face face">
       <img class="icon" src="./img/icon.png">
    </div>
 </div>`);
  }

  cartas.sort(comparador);

  function comparador() {
    return Math.random() - 0.5;
  }

  for (let indice in cartas) {
    mesa.innerHTML += cartas[indice];
  }
}
