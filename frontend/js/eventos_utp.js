let ultimoIndice = -1; // 👈 Variable fuera de la función para recordar el último índice

function generarEvento() {
    const display = document.getElementById('eventoSeleccionado');
    const eventosIds = ["cardsalud", "cardcinema", "cardcachimbos", "cardfilutp", "cardhackathonutp",
        "cardcosplayutp", "cardbandasutp", "cardecuputp", "cardemprendimientoutp", "cardfitopaez"];
    const mensajesEspera = [
        "Lanzando dados cuánticos...",
        "Generando números aleatorios...",
        "Aplicando la tercera ley de Newton...",
        "Calculando destino universitario...",
        "Sacudiendo la bola mágica..."
    ];

    const espera = mensajesEspera[Math.floor(Math.random() * mensajesEspera.length)];
    display.innerHTML = `<p style="font-style: italic; color: #555;">${espera}</p>`;

    setTimeout(() => {
        let nuevoIndice;
        do {
            nuevoIndice = Math.floor(Math.random() * eventosIds.length);
        } while (nuevoIndice == ultimoIndice);

        ultimoIndice = nuevoIndice;
        const randomId = eventosIds[nuevoIndice];
        const cardOriginal = document.getElementById(randomId);

        if (cardOriginal) {
            const titulo = cardOriginal.querySelector("h3")?.textContent || "Evento sin título";
            const imagen = cardOriginal.querySelector("img")?.src;

            // Crear nuevo mini-card
            const miniCard = document.createElement("div");
            miniCard.style.display = "flex";
            miniCard.style.flexDirection = "column";
            miniCard.style.alignItems = "center";
            miniCard.style.justifyContent = "center";
            miniCard.style.height = "100%";

            const tituloElemento = document.createElement("h4");
            tituloElemento.textContent = titulo;
            tituloElemento.style.marginBottom = "1rem";
            tituloElemento.style.color = "black";

            const imagenElemento = document.createElement("img");
            imagenElemento.src = imagen;
            imagenElemento.alt = titulo;
            imagenElemento.style.maxWidth = "100%";
            imagenElemento.style.maxHeight = "20rem";
            imagenElemento.style.borderRadius = "1rem";

            miniCard.appendChild(tituloElemento);
            miniCard.appendChild(imagenElemento);

            display.innerHTML = '';
            display.appendChild(miniCard);
        } else {
            display.innerHTML = "<p>Evento no encontrado.</p>";
        }
    }, 2000);
}

const track = document.querySelector('.carrusel-track');
const slides = document.querySelectorAll('.carrusel-slide');
let index = 0;

function moveSlide() {
    index = (index + 1) % slides.length;
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
}

setInterval(moveSlide, 5000);

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("modoDescanso") === "on") {
        activarBlackTheme();
    }
});

function activarBlackTheme() {
    let overlay = document.getElementById("modoDescansoOverlay");

    if (overlay) {
        overlay.remove();
        localStorage.setItem("modoDescanso", "off");
    } else {
        overlay = document.createElement("div");
        overlay.id = "modoDescansoOverlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(154, 144, 54, 0.26)",
            zIndex: 9999,
            pointerEvents: "none",
            transition: "opacity 0.3s ease"
        });
        document.body.appendChild(overlay);
        localStorage.setItem("modoDescanso", "on");
    }
}

//Inactividad
let tiempoInactividad;
const tiempoLimite = 5000;
let audio = new Audio("ASClouds.mp3");
audio.loop = true;
audio.volume = 0.2;

let estaMuteado = false;

function reiniciarTemporizador() {
    clearTimeout(tiempoInactividad);
    tiempoInactividad = setTimeout(usuarioInactivo, tiempoLimite);

    // Ocultar modal si está activo
    const modal = document.getElementById("modal-musica");
    if (modal) modal.classList.remove("activo");

    // Mostrar mini-modal si ya se había activado el audio
    if (!audio.paused) {
        const mini = document.getElementById("mini-widget");
        if (mini && !mini.classList.contains("visible")) {
            mini.classList.add("visible", "destacar");
            setTimeout(() => {
                mini.classList.remove("destacar");
            }, 2000);
        }
    }
}

function usuarioInactivo() {
    if (!audio.paused) return;

    audio.currentTime = 0;
    fadeInAudio(audio, 0.5, 3000);

    const modal = document.getElementById("modal-musica");
    modal.classList.add("activo");
}

function fadeInAudio(audio, targetVolume = 0.3, duration = 2000) {
    audio.volume = 0;
    audio.play().catch(err => {
        console.error("Error al iniciar el audio:", err);
    });

    let step = targetVolume / (duration / 100);
    let fade = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(audio.volume + step, targetVolume);
        } else {
            clearInterval(fade);
        }
    }, 100);
}

function fadeAudioVolume(toVolume, duration = 1000) {
    const fromVolume = audio.volume;
    const diff = toVolume - fromVolume;
    let step = diff / (duration / 100);
    let fade = setInterval(() => {
        let newVol = audio.volume + step;
        if ((step > 0 && newVol >= toVolume) || (step < 0 && newVol <= toVolume)) {
            audio.volume = toVolume;
            clearInterval(fade);
        } else {
            audio.volume = newVol;
        }
    }, 100);
}

// Control del mini-widget
document.addEventListener("DOMContentLoaded", () => {
    const mini = document.getElementById("mini-widget");
    mini.addEventListener("click", () => {
        estaMuteado = !estaMuteado;
        fadeAudioVolume(estaMuteado ? 0 : 0.5, 800);
        mini.querySelector("span.estado").textContent = estaMuteado ? "🔇" : "🔊";
    });
});

window.onload = reiniciarTemporizador;
['mousemove', 'keypress', 'click', 'scroll', 'keydown'].forEach(evt =>
    document.addEventListener(evt, reiniciarTemporizador)
);






