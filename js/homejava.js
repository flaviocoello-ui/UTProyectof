//Efecto Typing
let words = ["Inscríbete", "Explora", "Descubre", "Bienvenido a UTP"];
const elementId = "text";
effectoTyping(words, elementId);
function effectoTyping(words, elementId) {
  const el = document.getElementById(elementId);
  const underscore = document.getElementById("underscore");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    let currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
    } else {
      charIndex--;
    }

    el.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      underscore.classList.add("stop");
      setTimeout(type, 1000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      underscore.classList.remove("stop");
    }

    setTimeout(type, isDeleting ? 120 : 210);
  }
  type();
}

// Inactividad
/* let tiempoInactividad;
const tiempoLimite = 50000;

function reiniciarTemporizador() {
  clearTimeout(tiempoInactividad);
  tiempoInactividad = setTimeout(usuarioInactivo, tiempoLimite);
}

function usuarioInactivo() {
  alert("Has estado inactivo por 30 segundos.");
}

window.onload = reiniciarTemporizador;
["mousemove", "keypress", "click", "scroll", "keydown"].forEach((evt) =>
  document.addEventListener(evt, reiniciarTemporizador),
);
 */
// Modo descanso

const modal = document.getElementById("modalRegistro");
const form = document.getElementById("form");
const botonEnviar = document.getElementById("button");
const bienvenida = document.getElementById("bienvenida");
const usuarioNombre = document.getElementById("usuarioNombre");

// Mostrar modal solo si no se ha registrado antes
if (!localStorage.getItem("registroCompletado")) {
  modal.style.display = "block";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("name").value.trim();
  const pass = document.getElementById("contrasena").value;
  const passConfirm = document.getElementById("confirmar_contrasena").value;

  if (pass !== passConfirm) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // ✅ Validar que nombre y contraseña sean ambos "admin"
  if (nombre.toLowerCase() === "admin" && pass === "admin") {
    localStorage.setItem("usuarioNombre", nombre);
    localStorage.setItem("registroCompletado", "true");
    localStorage.setItem("rol", "admin"); //  clave para validaciones futuras
    window.location.href = "calendario_utp.html";
    return;
  }

  botonEnviar.disabled = true;
  botonEnviar.value = "Enviando...";

  const serviceID = "default_service";
  const templateID = "template_cawkm5a";

  emailjs
    .sendForm(serviceID, templateID, this)
    .then(() => {
      localStorage.setItem("usuarioNombre", nombre);
      localStorage.setItem("rol", "usuario"); // ✅ rol estándar
      botonEnviar.value = "¡Correo Enviado!";
      botonEnviar.style.backgroundColor = "green";

      // ✅ Marcar como registrado y ocultar modal
      localStorage.setItem("registroCompletado", "true");
      modal.style.display = "none";
      usuarioNombre.textContent = nombre;
      bienvenida.style.display = "block";

      setTimeout(() => {
        botonEnviar.disabled = false;
        botonEnviar.value = "Send Email";
        botonEnviar.style.backgroundColor = "black";
        form.reset();
      }, 3000);
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      botonEnviar.disabled = false;
      botonEnviar.value = "Reintentar";
      alert("Hubo un problema al enviar el correo. Intenta nuevamente.");
    });
});

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
      transition: "opacity 0.3s ease",
    });
    document.body.appendChild(overlay);
    localStorage.setItem("modoDescanso", "on");
  }
}
//Barrido

const vacioUno = document.querySelector(".vacioUno");
const vacioDos = document.querySelector(".vacioDos");

const imagenesVacioUno = [
  "https://a-static.besthdwallpaper.com/spectacular-view-of-england-with-its-wonderful-nature-wallpaper-3840x2400-112606_9.jpg",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NGslMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://wallpapercave.com/wp/wp2506793.jpg",
  "https://images2.alphacoders.com/546/546449.jpg",
];

const imagenesVacioDos = [
  "IMG/dos1.jpg",
  "IMG/dos2.jpg",
  "IMG/dos3.jpg",
  "IMG/dos4.jpg",
];

function prepararFondoConFade(elemento, imagenes, intervalo) {
  // Crear dos capas para alternar entre ellas
  const capaA = document.createElement("div");
  const capaB = document.createElement("div");

  [capaA, capaB].forEach((capa) => {
    Object.assign(capa.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      transition: "opacity 1s ease-in-out",
      opacity: 0,
      zIndex: 0,
    });
    elemento.appendChild(capa);
  });

  let index = 0;
  let mostrando = capaA;
  let ocultando = capaB;

  // Precarga imágenes
  imagenes.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  mostrando.style.backgroundImage = `url(${imagenes[index]})`;
  mostrando.style.opacity = 1;
  mostrando.style.zIndex = 1;

  setInterval(() => {
    index = (index + 1) % imagenes.length;

    ocultando.style.backgroundImage = `url(${imagenes[index]})`;
    ocultando.style.opacity = 1;
    ocultando.style.zIndex = 1;

    mostrando.style.opacity = 0;
    mostrando.style.zIndex = 0;

    // Intercambiar referencias
    [mostrando, ocultando] = [ocultando, mostrando];
  }, intervalo);
}

// Estilos base para asegurar que vacioUno y vacioDos sean posicionados correctamente
[vacioUno, vacioDos].forEach((el) => {
  el.style.position = "relative";
  el.style.overflow = "hidden";
});
if (vacioUno) {
  prepararFondoConFade(vacioUno, imagenesVacioUno, 4000);
}
if (vacioDos) {
  prepararFondoConFade(vacioDos, imagenesVacioDos, 9000);
}
