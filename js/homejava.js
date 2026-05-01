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

//Barrido
const bg = document.querySelector(".vacioUno .bg");

const imagenes = [
  "https://a-static.besthdwallpaper.com/spectacular-view-of-england-with-its-wonderful-nature-wallpaper-3840x2400-112606_9.jpg",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600",
  "https://wallpapercave.com/wp/wp2506793.jpg",
  "https://images2.alphacoders.com/546/546449.jpg",
];

let index = 0;

bg.style.backgroundImage = `url(${imagenes[0]})`;

function cambiarImagen() {
  bg.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % imagenes.length;
    bg.style.backgroundImage = `url(${imagenes[index]})`;
    bg.style.opacity = 1;
  }, 500);
}

setInterval(cambiarImagen, 4000);

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

//Modal
const modal = document.getElementById("modalRegistro");
const form = document.getElementById("form");
const botonEnviar = document.getElementById("button");
const bienvenida = document.getElementById("bienvenida");
const usuarioNombre = document.getElementById("usuarioNombre");

/* Abrir modal */
document.getElementById("abrirModal").addEventListener("click", function () {
  modal.style.display = "block";
});

/* Cerrar modal */
document.getElementById("cerrarModal").addEventListener("click", function () {
  modal.style.display = "none";
});

/* Cerrar modal click afuera */
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Mostrar modal solo si no se ha registrado antes
/* if (!localStorage.getItem("registroCompletado")) {
  modal.style.display = "block";
} */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  /* validación confirma contraseña */
  const pass = document.getElementById("contrasena").value;
  const passConfirm = document.getElementById("confirmar_contrasena").value;
  if (pass !== passConfirm) {
    alert("Las contraseñas no coinciden");
    return;
  }
  const usuario = {
    nombre: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contrasenia: document.getElementById("contrasena").value,
  };

  try {
    const response = await fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const text = await response.text();
    console.log(response.status);
    console.log(text);
    if (response.ok) {
      alert("Usuario registrado correctamente");
      modal.style.display = "none";
      form.reset();
    } else {
      alert("ERROR AL REGISTRAR EL USUARIO");
    }
  } catch (error) {
    console.log(error);
  }

  /* // ✅ Validar que nombre y contraseña sean ambos "admin"
  if (nombre.toLowerCase() === "admin" && pass === "admin") {
    localStorage.setItem("usuarioNombre", nombre);
    localStorage.setItem("registroCompletado", "true");
    localStorage.setItem("rol", "admin"); //  clave para validaciones futuras
    window.location.href = "calendario_utp.html";
    return;
  } */
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
