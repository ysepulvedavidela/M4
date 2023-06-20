//3.1 Definimos constante global con la url base a consumir
const URL_BASE = "https://swapi.dev/api/"

//8.1 Variables globales para manipular DOM
let rojo = document.getElementById("clickRojo")
let verde = document.getElementById("clickVerde")
let azul = document.getElementById("clickAzul")

// 1. Definiendo clase constructora
class Personaje {
    constructor(nombre, estatura, peso, fila) {
        this.nombre = nombre
        this.estatura = estatura
        this.peso = peso
        this.fila = fila
    }

	//5. Agregamos tarjetas y propiedad fila a la clase
	cargarTarjeta = (color) => {

        document.getElementById(`${this.fila}`).innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon ${color}"></div>
                    <div class="timeline-text">
                        <h6>${this.nombre}</h6>
                        <p>Estatura: ${this.estatura} cms</p>
                        <p>Peso: ${this.peso} kg </p>
                    </div>
                </div>
            </div>
        `
    }
};

// 2. Funcion que creara objetos de personajes automaticamente
const crearPersonaje = (data, fila) => {
    let personaje = new Personaje (data.name, data.height, data.mass, fila)
    return personaje
}

// 3. Consumo de API
const traerPersonaje = async(id, fila, color) => {
    try{
        let resultado = await fetch(`${URL_BASE}people/${id}`)
        let respuesta = await resultado.json();
        let personaje = crearPersonaje(respuesta, fila)
        personaje.cargarTarjeta(color)
        console.log(personaje)
    }catch (err){
        throw new Error (err)
    }
} 

// 4 Función generadora
function * generadorPersonaje(id, fila, color) {
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
}

//6. generar variables con generador

let generadorRojo = generadorPersonaje(1, "firstRow", "rojo")
let generadorVerde = generadorPersonaje(6, "secondRow", "verde")
let generadorAzul = generadorPersonaje(11, "thirdRow", "azul")

//8 cargar elementos en el DOM
rojo.addEventListener("click", async () => {
    let data = generadorRojo.next()
	!data.done ? data.value : alert("No hay más personajes para mostrar")
})

verde.addEventListener("click", async () => {
    let data = generadorVerde.next()
    !data.done ? data.value : alert("No hay más personajes para mostrar")
})

azul.addEventListener("click", async () => {
    let data = generadorAzul.next()
    !data.done ? data.value : alert("No hay más personajes para mostrar")
})