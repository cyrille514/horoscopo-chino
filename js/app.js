// 1. Clase Entidad para representar cada signo
class AnimalSigno {
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }
}

// Clase de Negocio para la lógica matemática
class CalculadoraHoroscopo {
    constructor() {
        // Inicialización del catálogo usando instancias de la clase AnimalSigno
        this.catalogoSignos = [
            new AnimalSigno("Mono", "./imagenes/mono.avif"),
            new AnimalSigno("Gallo", "./imagenes/gallo.jpg"),
            new AnimalSigno("Perro", "./imagenes/perro.avif"),
            new AnimalSigno("Cerdo", "./imagenes/cerdo.jpg"),
            new AnimalSigno("Rata", "./imagenes/rata.jpeg"),
            new AnimalSigno("Buey", "./imagenes/buey.avif"),
            new AnimalSigno("Tigre", "./imagenes/tigre.jpg"),
            new AnimalSigno("Conejo", "./imagenes/canejo.jpg"),
            new AnimalSigno("Dragón", "./imagenes/dragon.png"),
            new AnimalSigno("Serpiente", "./imagenes/serpiente.jpg"),
            new AnimalSigno("Caballo", "./imagenes/caballo.avif"),
            new AnimalSigno("Cabra", "./imagenes/cabra.avif")
        ];
    }

    // Función flecha de clase para resolver el signo
    obtenerSigno = (anio, mes) => {
        let anioEfectivo = anio;
        if (mes === 1) {
            anioEfectivo -= 1;
        }
        const residuo = anioEfectivo % 12;
        return this.catalogoSignos[residuo];
    };
}

//  Clase Interfaz para controlar el DOM, Eventos y Validaciones
class HoroscopoApp {
    constructor() {
        // Instancia del objeto de negocio
        this.calculadora = new CalculadoraHoroscopo();
        
        // Elementos del DOM
        this.form = document.getElementById("horoscopoForm");
        this.errorDiv = document.getElementById("mensajeError");
        this.contenedorResultado = document.getElementById("resultado");
        this.textoSigno = document.getElementById("signoAnimal");
        this.imagenSigno = document.getElementById("signoImagen");

        // Inicializar los escuchadores
        this.registrarEventos();
    }

    // Función flecha para enlazar el escuchador de eventos
    registrarEventos = () => {
        this.form.addEventListener("submit", (evento) => this.procesarFormulario(evento));
    };

    // Función flecha para pintar errores
    mostrarError = (mensaje) => {
        this.errorDiv.textContent = mensaje;
        this.errorDiv.classList.remove("hidden");
        this.contenedorResultado.classList.add("hidden");
    };

    // Función flecha para limpiar la pantalla de errores
    limpiarError = () => {
        this.errorDiv.classList.add("hidden");
    };

    // Función flecha principal del Formulario
    procesarFormulario = (evento) => {
        evento.preventDefault(); 
        this.limpiarError();

        const txtMes = document.getElementById("mes").value.trim();
        const txtAnio = document.getElementById("anio").value.trim();
        
        const mes = parseInt(txtMes, 10);
        const anio = parseInt(txtAnio, 10);

        // --- VALIDACIONES ---
        if (txtMes === "" || txtAnio === "") {
            this.mostrarError("⚠️ Todos los campos son obligatorios.");
            return;
        }
        if (isNaN(mes) || mes < 1 || mes > 12) {
            this.mostrarError("⚠️ Introduce un mes válido (1 al 12).");
            return;
        }
        if (isNaN(anio) || anio < 0 || txtAnio.length !== 4) {
            this.mostrarError("⚠️ El año debe tener exactamente 4 dígitos positivos.");
            return;
        }

        // --- PROCESAMIENTO CON OBJETO CLASE ---
        const signoObjeto = this.calculadora.obtenerSigno(anio, mes);

        // --- RENDERIZADO RESPONSIVO ---
        this.textoSigno.textContent = signoObjeto.nombre;
        this.imagenSigno.src = signoObjeto.imagen;
        this.imagenSigno.alt = `Signo ${signoObjeto.nombre}`;

        this.contenedorResultado.classList.remove("hidden");
        setTimeout(() => {
            this.contenedorResultado.classList.remove("scale-95");
            this.contenedorResultado.classList.add("scale-100");
        }, 10);
    };
}

// Escuchador de inicialización del documento para instanciar la App
document.addEventListener("DOMContentLoaded", () => {
    new HoroscopoApp();
});
