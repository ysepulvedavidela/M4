let urlBase = "https://swapi.dev/api/people/";

import Personaje from "./clases/personaje.js";
const getData = async (id) => {
    let response = await fetch(urlBase + id);
    let data = await response.json();
    let { name: nombre, height: estatura, mass: peso } = data;
    let nuevoPersonaje = new Personaje(nombre, estatura, peso);
    return nuevoPersonaje;
};

function* gen(idInicio, idTermino) {
    for (let index = idInicio; index <= idTermino; index++) {
        yield getData(index);
    }
}
let g = gen(1, 5); // "Generator { }"

let contenedorPersonajes = document.getElementById("personajes");

const cargarDatos = (personaje) => {
    contenedorPersonajes.innerHTML += `<p>${personaje.nombre} - ${personaje.estatura} cm - ${personaje.peso} kg</p>`;
};

btnSiguiente.addEventListener("click", async () => {
    let resultado = g.next();
    if (resultado.done) {
        g = gen(1, 10);
        contenedorPersonajes.innerHTML = "";
        alert("No hay más elementos por mostrar.");
    } else {
        let personaje = await resultado.value;
        cargarDatos(personaje);
    }
});