$(() => {
	class Personaje {
		constructor(nombre, estatura, peso, fila, color) {
			this.nombre = nombre;
			this.estatura = estatura;
			this.peso = peso;
			this.fila = fila;
			this.color = color;
		}
		generarCard = () => {
			$(this.fila).append(`
	    <div class="col-12 col-md-6 col-lg-4">
	        <div
	            class="single-timeline-content d-flex wow fadeInLeft 2021"
	            data-wow-delay="0.3s"
	            style="
	                visibility: visible;
	                animation-delay: 0.3s;
	                animation-name: fadeInLeft;
	            "
	        >
	            <div
	                class="timeline-icon"
	                style="background-color: ${this.color}"
	            >
	                <i class="fa fa-address-card" aria-hidden="true"></i>
	            </div>
	            <div class="timeline-text">
	                <h6>${this.nombre}</h6>
	                <p>
	                    Altura: ${this.estatura}cm. Peso: ${this.peso}kg
	                </p>
	            </div>
	            </div>
	        </div>
	    </div>
	    `);
		};
	}

	const obtenerPersonaje = async (id, row, color) => {
		try {
			let response = await fetch(`https://swapi.dev/api/people/${id}`);
			let personaje = await response.json();
			generarPersonaje(personaje, row, color);
		} catch (error) {
			console.log(error);
		}
	};
	const generarPersonaje = (personaje, row, color) => {
		let char = new Personaje(
			personaje.name,
			personaje.height,
			personaje.mass,
			row,
			color
		);
		char.generarCard();
	};

	function* generador1(i, row, color) {
		yield obtenerPersonaje(i, row, color);
		i++;
		yield obtenerPersonaje(i, row, color);
		i++;
		yield obtenerPersonaje(i, row, color);
		i++;
		yield obtenerPersonaje(i, row, color);
		i++;
		yield obtenerPersonaje(i, row, color);
	}
	let gen1 = generador1(1, '.firstRow', 'salmon');
	let gen2 = generador2(6, '.secondRow', 'lightgreen');
	let gen3 = generador3(11, '.thirdRow', 'lightskyblue');
	$('#generador1').on('click', () => {
		let data = gen1.next();
		!data.done ? data.value : alert('No hay mas personajes por mostrar');
	});
	$('#generador2').on('click', () => {
		let data = gen2.next();
		!data.done ? data.value : alert('No hay mas personajes por mostrar');
	});
	$('#generador3').on('click', () => {
		let data = gen3.next();
		!data.done ? gen1.value : alert('No hay mas personajes por mostrar');
	});
});