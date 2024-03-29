document.addEventListener('DOMContentLoaded', (evento) => {
    const preguntas = [
        { pregunta: "¿Cuál es el planeta más cercano al Sol?", respuestas: [{ texto: "Mercurio", correcta: true }, { texto: "Venus", correcta: false }, { texto: "Tierra", correcta: false }, { texto: "Marte", correcta: false }]},
        { pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?", respuestas: [{ texto: "206", correcta: true }, { texto: "205", correcta: false }, { texto: "201", correcta: false }, { texto: "208", correcta: false }]},
        { pregunta: "¿Qué gas es esencial para la respiración de los seres humanos?", respuestas: [{ texto: "Oxígeno", correcta: true }, { texto: "Hidrógeno", correcta: false }, { texto: "Dióxido", correcta: false }, { texto: "Metano", correcta: false }]},
      
    ];
    let indicePreguntaActual = 0;
    let puntuacion = 0;

    const contenedorPregunta = document.getElementById('question-container');
    const contenedorRespuestas = document.getElementById('answers-container');
    const botonSiguiente = document.getElementById('next-btn');
    const textoProgreso = document.getElementById('progress');
    botonSiguiente.style.display = 'none'; // Ocultar botón al inicio

    function mostrarPregunta(pregunta) {
        // Limpiar área de preguntas anteriores
        contenedorRespuestas.innerHTML = '';
        contenedorPregunta.innerText = pregunta.pregunta;

        pregunta.respuestas.forEach((respuesta) => {
            const boton = document.createElement('button');
            boton.innerText = respuesta.texto;
            boton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mr-2');
            boton.addEventListener('click', () => seleccionarRespuesta(respuesta.correcta));
            contenedorRespuestas.appendChild(boton);
        });
    }

    function seleccionarRespuesta(esCorrecta) {
        if (esCorrecta) {
            puntuacion++;
        }
        document.querySelectorAll('#answers-container button').forEach(boton => {
            boton.disabled = true; // Desactivar botones después de seleccionar una respuesta
        });
        botonSiguiente.style.display = ''; // Mostrar botón de siguiente
    }

    botonSiguiente.addEventListener('click', () => {
        indicePreguntaActual++;
        if (indicePreguntaActual < preguntas.length) {
            mostrarPregunta(preguntas[indicePreguntaActual]);
            botonSiguiente.style.display = 'none'; // Ocultar botón de siguiente hasta seleccionar una respuesta
        } else {
            mostrarResultados();
        }
        actualizarProgreso();
    });

    function mostrarResultados() {
        contenedorPregunta.innerText = `Tu puntuación es: ${puntuacion} de ${preguntas.length}`;
        contenedorRespuestas.innerHTML = '';
        botonSiguiente.style.display = 'none'; // Ocultar botón de siguiente en los resultados
    }

    function actualizarProgreso() {
        textoProgreso.innerText = `Pregunta ${indicePreguntaActual + 1} de ${preguntas.length}`;
    }

    function iniciarCuestionario() {
        mostrarPregunta(preguntas[indicePreguntaActual]);
        actualizarProgreso();
    }

    iniciarCuestionario();
});
