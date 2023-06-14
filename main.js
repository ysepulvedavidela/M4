// Obtén una referencia al elemento en el que deseas mostrar los datos
const resultadoElemento = document.getElementById('resultado');

// Realiza la solicitud utilizando fetch a la API Random User Generator
fetch('https://randomuser.me/api/')
  .then(response => response.json()) // Convierte la respuesta en formato JSON
  .then(data => {
    // Extrae el primer usuario de los resultados
    const usuario = data.results[0];

    // Obtén los detalles del usuario
    const nombre = `${usuario.name.first} ${usuario.name.last}`;
    const email = usuario.email;
    const foto = usuario.picture.large;

    // Crea elementos para mostrar la información
    const nombreElemento = document.createElement('p');
    nombreElemento.textContent = `Nombre: ${nombre}`;

    const emailElemento = document.createElement('p');
    emailElemento.textContent = `Email: ${email}`;

    const fotoElemento = document.createElement('img');
    fotoElemento.src = foto;

    // Agrega los elementos al elemento resultado
    resultadoElemento.appendChild(nombreElemento);
    resultadoElemento.appendChild(emailElemento);
    resultadoElemento.appendChild(fotoElemento);
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error('Error:', error);
  });