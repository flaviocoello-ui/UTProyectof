// ==============================
// VARIABLES GLOBALES
// ==============================
let mesSeleccionado = "";
let chartInstance = null;

// Inicializar elementos del DOM cuando la página cargue
let contenedorEventos, modal, modalStats, btnFlotante, btnEventosInscritos, form, cerrar, cerrarStats;
let adminCodeForm, adminCodeInput, adminError, modalTitle, adminPanel, listaEventosEliminar;

// Función para inicializar elementos del DOM
function initializeElements() {
  contenedorEventos = document.getElementById("eventos");
  modal = document.getElementById("modalAgregarEvento");
  modalStats = document.getElementById("modalEstadisticas");
  btnFlotante = document.getElementById("btnAgregarEvento");
  btnEventosInscritos = document.getElementById("btnEventosInscritos");
  form = document.getElementById("formNuevoEvento");
  cerrar = document.querySelector(".close-modal");
  cerrarStats = document.querySelector(".close-modal-stats");
  adminCodeForm = document.getElementById("adminCodeForm");
  adminCodeInput = document.getElementById("adminCode");
  adminError = document.getElementById("admin-error");
  modalTitle = document.getElementById("modal-title");
  adminPanel = document.getElementById("adminPanel");
  listaEventosEliminar = document.getElementById("listaEventosEliminar");
}

// Mostrar u ocultar el botón de agregar evento según el rol
function checkAdminRole() {
  const rolUsuario = localStorage.getItem("rol");
  // Temporalmente comentado para pruebas
  // if (rolUsuario !== "admin" && btnFlotante) {
  //   btnFlotante.style.display = "none";
  // }
}


// Nombres, imágenes y categorías de eventos
const nombres = {
  futbol: "Partido de Fútbol",
  voley: "Campeonato de Vóley",
  basquet: "Campeonato de Básquet",
  ajedrez: "Torneo de Ajedrez",
  boxeo: "Campeonato de Boxeo",
  karate: "Competencia de Karate",
  natacion: "Competencia de Natación",
  atletismo: "Torneo de Atletismo",
  conferencia: "Conferencia Académica",
  taller: "Taller Formativo",
  hackathon: "Hackathon Estudiantil",
  exposicion: "Exposición de Proyectos",
  foro: "Foro Universitario",
  debate: "Debate Académico",
  musica: "Práctica Musical",
  baile: "Competencia de Baile",
  canto: "Festival de Canto",
  teatro: "Obra de Teatro",
  pintura: "Exposición de Pintura",
  cine: "Proyección de Cine",
  poesia: "Lectura de Poesía",
  empleos: "Feria de Empleos",
  networking: "Evento de Networking",
  charla: "Charla Profesional",
  voluntariado: "Actividad de Voluntariado",
  donacion: "Campaña de Donación",
  feria: "Feria Comunitaria",
  picnic: "Picnic Estudiantil",
  juegos: "Juegos Recreativos"
};

const imagenes = {
  futbol: "image/futbol.jpg",
  voley: "image/voley.jpg",
  basquet: "image/basquet.jpg",
  ajedrez: "image/ajedrez.jpg",
  boxeo: "image/boxeo.jpg",
  karate: "image/karate.jpg",
  natacion: "image/natacion.jpg",
  atletismo: "image/atletismo.jpg",
  conferencia: "image/conferencia.jpg",
  taller: "image/taller.jpg",
  hackathon: "image/hackathon.jpg",
  exposicion: "image/exposicion.jpg",
  foro: "image/foro.jpg",
  debate: "image/debate.jpg",
  musica: "image/musica.jpg",
  baile: "image/baile.jpg",
  canto: "image/canto.jpg",
  teatro: "image/teatro.jpg",
  pintura: "image/pintura.jpg",
  cine: "image/cine.jpg",
  poesia: "image/poesia.jpg",
  empleos: "image/empleos.jpg",
  networking: "image/networking.jpg",
  charla: "image/charla.jpg",
  voluntariado: "image/voluntariado.jpg",
  donacion: "image/donacion.jpg",
  feria: "image/feria.jpg",
  picnic: "image/picnic.jpg",
  juegos: "image/juegos.jpg"
};

const categorias = {
  futbol: "deportes", voley: "deportes", basquet: "deportes", ajedrez: "deportes",
  boxeo: "deportes", karate: "deportes", natacion: "deportes", atletismo: "deportes",
  conferencia: "academico", taller: "academico", hackathon: "academico",
  exposicion: "academico", foro: "academico", debate: "academico",
  musica: "artistico", baile: "artistico", canto: "artistico", teatro: "artistico",
  pintura: "artistico", cine: "artistico", poesia: "artistico",
  empleos: "desarrollo", networking: "desarrollo", charla: "desarrollo",
  voluntariado: "comunitario", donacion: "comunitario", feria: "comunitario",
  picnic: "recreativos", juegos: "recreativos"
};

// Descripciones detalladas de eventos
const descripciones = {
  futbol: {
    descripcion: "Únete al emocionante mundo del fútbol universitario. Desarrolla tus habilidades técnicas, tácticas y físicas mientras formas parte de un equipo competitivo.",
    horario: "Lunes a Viernes: 4:00 PM - 6:00 PM",
    lugar: "Campo deportivo principal",
    requisitos: "Certificado médico, ropa deportiva adecuada",
    instructor: "Prof. Carlos Mendoza"
  },
  voley: {
    descripcion: "Participa en entrenamientos intensivos de voleibol. Mejora tu técnica de saque, recepción, armado y remate en un ambiente competitivo y divertido.",
    horario: "Martes y Jueves: 5:00 PM - 7:00 PM",
    lugar: "Gimnasio universitario",
    requisitos: "Zapatillas deportivas, rodilleras (opcional)",
    instructor: "Prof. Ana García"
  },
  basquet: {
    descripcion: "Desarrolla tus habilidades en el básquetbol universitario. Aprende estrategias de juego, mejora tu técnica de tiro y forma parte de un equipo competitivo.",
    horario: "Lunes, Miércoles y Viernes: 6:00 PM - 8:00 PM",
    lugar: "Cancha de básquetbol",
    requisitos: "Zapatillas de básquet, ropa deportiva",
    instructor: "Prof. Miguel Torres"
  },
  ajedrez: {
    descripcion: "Perfecciona tu estrategia y táctica en el ajedrez. Participa en torneos internos, aprende nuevas aperturas y mejora tu ranking ELO.",
    horario: "Miércoles: 3:00 PM - 5:00 PM, Sábados: 10:00 AM - 12:00 PM",
    lugar: "Aula 205 - Edificio académico",
    requisitos: "Conocimientos básicos de ajedrez",
    instructor: "Maestro Internacional Roberto Silva"
  },
  boxeo: {
    descripcion: "Entrena en el noble arte del boxeo. Desarrolla disciplina, resistencia física y técnicas de combate en un ambiente seguro y profesional.",
    horario: "Martes y Jueves: 7:00 PM - 9:00 PM",
    lugar: "Gimnasio de boxeo",
    requisitos: "Certificado médico, vendas, protector bucal",
    instructor: "Prof. Luis Ramírez"
  },
  karate: {
    descripcion: "Aprende el arte marcial del karate. Desarrolla disciplina mental, técnicas de defensa personal y participa en competencias universitarias.",
    horario: "Lunes y Miércoles: 7:00 PM - 9:00 PM",
    lugar: "Dojo universitario",
    requisitos: "Gi (uniforme de karate), disciplina y respeto",
    instructor: "Sensei María Yoshida"
  },
  natacion: {
    descripcion: "Mejora tu técnica de natación en los cuatro estilos. Participa en competencias y desarrolla resistencia cardiovascular excepcional.",
    horario: "Lunes a Viernes: 6:00 AM - 8:00 AM",
    lugar: "Piscina olímpica universitaria",
    requisitos: "Traje de baño, gorro, gafas de natación",
    instructor: "Prof. Carmen Aquino"
  },
  atletismo: {
    descripcion: "Desarrolla tus habilidades en diversas disciplinas atléticas: carreras, saltos, lanzamientos. Prepárate para competencias interuniversitarias.",
    horario: "Martes, Jueves y Sábados: 5:00 AM - 7:00 AM",
    lugar: "Pista atlética",
    requisitos: "Zapatillas de atletismo, ropa deportiva",
    instructor: "Prof. Diego Velasco"
  },
  conferencia: {
    descripcion: "Asiste a conferencias magistrales con expertos reconocidos. Amplía tu conocimiento académico y profesional en diversas áreas del saber.",
    horario: "Según programación mensual",
    lugar: "Auditorio principal",
    requisitos: "Registro previo obligatorio",
    instructor: "Conferencistas invitados"
  },
  taller: {
    descripcion: "Participa en talleres prácticos diseñados para desarrollar habilidades específicas. Aprende haciendo en un ambiente colaborativo.",
    horario: "Sábados: 9:00 AM - 12:00 PM",
    lugar: "Laboratorios especializados",
    requisitos: "Materiales según el taller específico",
    instructor: "Especialistas por área"
  },
  hackathon: {
    descripcion: "Participa en el evento de programación más emocionante del año. Desarrolla soluciones innovadoras en 48 horas intensivas de código.",
    horario: "Viernes 6:00 PM - Domingo 6:00 PM",
    lugar: "Laboratorio de cómputo principal",
    requisitos: "Laptop, conocimientos de programación",
    instructor: "Mentores especializados"
  },
  exposicion: {
    descripcion: "Presenta tus proyectos académicos y de investigación. Comparte tu conocimiento con la comunidad universitaria en un evento formal.",
    horario: "Según cronograma académico",
    lugar: "Hall principal",
    requisitos: "Proyecto aprobado por coordinación",
    instructor: "Docentes evaluadores"
  },
  foro: {
    descripcion: "Participa en debates académicos sobre temas de actualidad. Desarrolla tu pensamiento crítico y habilidades de argumentación.",
    horario: "Último viernes del mes: 4:00 PM - 6:00 PM",
    lugar: "Aula magna",
    requisitos: "Preparación previa del tema",
    instructor: "Moderadores académicos"
  },
  debate: {
    descripcion: "Forma parte del equipo de debate universitario. Desarrolla habilidades de oratoria, investigación y argumentación lógica.",
    horario: "Miércoles: 5:00 PM - 7:00 PM",
    lugar: "Aula de debates",
    requisitos: "Examen de admisión al equipo",
    instructor: "Prof. Patricia Morales"
  },
  musica: {
    descripcion: "Desarrolla tu talento musical en un ambiente académico. Participa en ensambles, conciertos y eventos culturales universitarios.",
    horario: "Martes y Jueves: 4:00 PM - 6:00 PM",
    lugar: "Aula de música",
    requisitos: "Instrumento propio (según especialidad)",
    instructor: "Maestro Fernando Castillo"
  },
  baile: {
    descripcion: "Aprende diversos estilos de danza y participa en presentaciones universitarias. Desarrolla expresión corporal y coordinación.",
    horario: "Lunes y Miércoles: 6:00 PM - 8:00 PM",
    lugar: "Estudio de danza",
    requisitos: "Ropa cómoda, zapatillas de danza",
    instructor: "Prof. Isabella Rodríguez"
  },
  canto: {
    descripcion: "Desarrolla tu técnica vocal y participa en el coro universitario. Aprende repertorio clásico y contemporáneo.",
    horario: "Viernes: 5:00 PM - 7:00 PM",
    lugar: "Aula de música vocal",
    requisitos: "Audición previa",
    instructor: "Maestra Sofía Herrera"
  },
  teatro: {
    descripcion: "Explora el arte dramático y participa en producciones teatrales universitarias. Desarrolla habilidades actorales y de expresión.",
    horario: "Sábados: 2:00 PM - 5:00 PM",
    lugar: "Teatro universitario",
    requisitos: "Audición y compromiso con ensayos",
    instructor: "Director Artístico Juan Pérez"
  },
  pintura: {
    descripcion: "Desarrolla tu creatividad artística a través de diferentes técnicas pictóricas. Participa en exposiciones estudiantiles.",
    horario: "Jueves: 3:00 PM - 6:00 PM",
    lugar: "Taller de artes plásticas",
    requisitos: "Materiales básicos de pintura",
    instructor: "Artista Plástico Elena Vargas"
  },
  cine: {
    descripcion: "Participa en el cine club universitario. Analiza obras cinematográficas y desarrolla pensamiento crítico sobre el séptimo arte.",
    horario: "Viernes: 7:00 PM - 10:00 PM",
    lugar: "Auditorio de cine",
    requisitos: "Interés por el análisis cinematográfico",
    instructor: "Crítico de cine Andrés Molina"
  },
  poesia: {
    descripcion: "Desarrolla tu expresión literaria y participa en recitales poéticos. Explora diferentes corrientes y técnicas poéticas.",
    horario: "Miércoles: 6:00 PM - 8:00 PM",
    lugar: "Biblioteca - Sala de lectura",
    requisitos: "Portafolio de poemas propios",
    instructor: "Poeta Laureado Carmen Delgado"
  },
  empleos: {
    descripcion: "Participa en la feria de empleos más importante del año. Conecta con empresas líderes y encuentra oportunidades laborales.",
    horario: "Día completo según programación",
    lugar: "Campus principal - Área de exposiciones",
    requisitos: "CV actualizado, vestimenta formal",
    instructor: "Coordinadores de empresas participantes"
  },
  networking: {
    descripcion: "Desarrolla tu red profesional en eventos de networking. Conecta con profesionales, egresados y empresarios exitosos.",
    horario: "Último jueves del mes: 6:00 PM - 9:00 PM",
    lugar: "Salón de eventos",
    requisitos: "Tarjetas de presentación, vestimenta ejecutiva",
    instructor: "Facilitadores profesionales"
  },
  charla: {
    descripcion: "Asiste a charlas magistrales con líderes empresariales. Aprende sobre tendencias del mercado y desarrollo profesional.",
    horario: "Según calendario de invitados",
    lugar: "Auditorio empresarial",
    requisitos: "Registro previo",
    instructor: "Ejecutivos y empresarios invitados"
  },
  voluntariado: {
    descripcion: "Participa en actividades de responsabilidad social. Contribuye al desarrollo de tu comunidad mientras desarrollas valores ciudadanos.",
    horario: "Sábados: 8:00 AM - 2:00 PM",
    lugar: "Comunidades locales",
    requisitos: "Compromiso social, disponibilidad de tiempo",
    instructor: "Coordinadores de proyectos sociales"
  },
  donacion: {
    descripcion: "Organiza y participa en campañas de donación para causas benéficas. Desarrolla conciencia social y solidaridad.",
    horario: "Según cronograma de campañas",
    lugar: "Diversos puntos del campus",
    requisitos: "Espíritu solidario",
    instructor: "Comité de responsabilidad social"
  },
  feria: {
    descripcion: "Participa en ferias comunitarias que promueven el intercambio cultural y comercial. Conoce emprendimientos locales.",
    horario: "Fines de semana según programación",
    lugar: "Plaza principal del campus",
    requisitos: "Participación voluntaria",
    instructor: "Organizadores comunitarios"
  },
  picnic: {
    descripcion: "Disfruta de actividades recreativas al aire libre. Fortalece lazos de amistad en un ambiente relajado y divertido.",
    horario: "Domingos: 10:00 AM - 4:00 PM",
    lugar: "Áreas verdes del campus",
    requisitos: "Comida para compartir, actitud positiva",
    instructor: "Comité estudiantil de recreación"
  },
  juegos: {
    descripcion: "Participa en torneos de juegos recreativos y de mesa. Desarrolla estrategia, competencia sana y compañerismo.",
    horario: "Viernes: 3:00 PM - 6:00 PM",
    lugar: "Sala de juegos estudiantil",
    requisitos: "Espíritu competitivo y fair play",
    instructor: "Coordinadores estudiantiles"
  }
};

// ==============================
// FUNCIONES PRINCIPALES
// ==============================

// Mostrar eventos por mes
function mostrarEventos(mesTexto) {
  const meses = [
    "enero", "febrero", "marzo", "abril",
    "mayo", "junio", "julio", "agosto",
    "setiembre", "octubre", "noviembre", "diciembre"
  ];
  const mesNumero = (meses.indexOf(mesTexto) + 1).toString().padStart(2, "0");
  mesSeleccionado = mesNumero;
  mostrarEventosGuardados();
}

// Mostrar eventos guardados del mes seleccionado
function mostrarEventosGuardados() {
  const eventos = JSON.parse(localStorage.getItem("eventos") || "[]");
  const contenedor = document.getElementById("eventos");
  
  if (!contenedor) {
    console.error("No se encontró el contenedor de eventos");
    return;
  }
  
  contenedor.innerHTML = "";
  
  const eventosFiltrados = eventos.filter(e => e.mes === mesSeleccionado);
  
  if (eventosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No hay eventos programados para este mes</p>";
    return;
  }
  
  eventosFiltrados.forEach(e => {
    const div = document.createElement("div");
    div.className = `evento categoria-${e.tipo} categoria-${categorias[e.tipo] || 'otros'}`;

    const descripcionEvento = descripciones[e.tipo] || {
      descripcion: "Descripción no disponible",
      horario: "Por definir",
      lugar: "Por definir",
      requisitos: "Ninguno específico",
      instructor: "Por asignar"
    };

    // Verificar si el usuario ya está inscrito
    const inscripciones = JSON.parse(localStorage.getItem("inscripciones") || "[]");
    const yaInscrito = inscripciones.find(i => i.tipo === e.tipo);

    div.innerHTML = `
      <img src="${e.imagen}" alt="${e.tipo}">
      <div class="evento-info">
        <div class="evento-titulo">
          <strong>${e.nombre}:</strong> ${e.dia} de ${obtenerNombreMes(e.mes)} de 2025
        </div>
      </div>
      <button class="btn-dropdown-arrow" onclick="toggleEventDescription(this)" aria-label="Ver descripción">
        <span class="arrow-icon">▼</span>
      </button>
      ${yaInscrito ? 
        `<div class="inscrito-container">
          <span class="texto-inscrito">✅ Inscrito</span>
          <button class="btn-anular">Anular inscripción</button>
        </div>` : 
        `<button class="btn-inscribirme">Inscribirme</button>`
      }
      <div class="evento-descripcion" style="display: none;">
        <div class="descripcion-content">
          <p><strong>Descripción:</strong> ${descripcionEvento.descripcion}</p>
          <p><strong>Horario:</strong> ${descripcionEvento.horario}</p>
          <p><strong>Lugar:</strong> ${descripcionEvento.lugar}</p>
          <p><strong>Requisitos:</strong> ${descripcionEvento.requisitos}</p>
          <p><strong>Instructor:</strong> ${descripcionEvento.instructor}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// Obtener nombre del mes
function obtenerNombreMes(numero) {
  const nombres = {
    "01": "enero", "02": "febrero", "03": "marzo", "04": "abril",
    "05": "mayo", "06": "junio", "07": "julio", "08": "agosto",
    "09": "setiembre", "10": "octubre", "11": "noviembre", "12": "diciembre"
  };
  return nombres[numero] || "";
}

// ==============================
// INICIALIZACIÓN Y EVENT LISTENERS
// ==============================

// Función para configurar todos los event listeners
function setupEventListeners() {
  // Event listener para botón admin
  if (btnFlotante) {
    btnFlotante.addEventListener("click", () => {
      if (!mesSeleccionado) {
        alert("Selecciona un mes primero.");
        return;
      }

      modal.classList.add("show");
      const rolUsuario = localStorage.getItem("rol");

      if (rolUsuario === "admin") {
        // Si ya es admin, muestra directamente el panel de administración
        adminCodeForm.style.display = "none";
        adminPanel.style.display = "block";
        modalTitle.textContent = "Administrar Eventos";
        actualizarListaEventosEliminar();
      } else {
        // Si no es admin, solicita el código
        adminCodeForm.style.display = "block";
        adminPanel.style.display = "none";
        adminError.style.display = "none";
        adminCodeInput.value = "";
        modalTitle.textContent = "Código de Administrador";
      }
    });
  }

  // Event listener para botón estadísticas
  if (btnEventosInscritos) {
    btnEventosInscritos.addEventListener("click", () => {
      modalStats.classList.add("show");
      actualizarEstadisticas();
    });
  }

  // Event listeners para cerrar modales
  if (cerrar) {
    cerrar.addEventListener("click", () => {
      modal.classList.remove("show");
      resetearModalAdmin();
    });
  }

  if (cerrarStats) {
    cerrarStats.addEventListener("click", () => {
      modalStats.classList.remove("show");
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    });
  }

  // Event listener para cerrar modales haciendo clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      resetearModalAdmin();
    }
    if (e.target === modalStats) {
      modalStats.classList.remove("show");
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    }
  });

  // Event listener para formulario de código admin
  if (adminCodeForm) {
    adminCodeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (adminCodeInput.value === ADMIN_CODE) {
        // Correcto: muestra panel de administración
        adminCodeForm.style.display = "none";
        adminPanel.style.display = "block";
        modalTitle.textContent = "Administrar Eventos";
        actualizarListaEventosEliminar();
      } else {
        adminError.style.display = "block";
      }
    });
  }

  // Event listener para formulario de agregar evento
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const tipo = document.getElementById("tipo").value;
      const dia = document.getElementById("dia").value;

      if (!mesSeleccionado || !tipo || !dia) {
        alert("Completa todos los campos correctamente.");
        return;
      }

      // Verificar si ya existe un evento del mismo tipo en el mismo día y mes
      let eventos = JSON.parse(localStorage.getItem("eventos") || "[]");
      
      // Asegurar que todos los eventos tengan ID
      eventos = eventos.map(evento => {
        if (!evento.id) {
          evento.id = Date.now() + Math.random();
        }
        return evento;
      });

      const eventoExistente = eventos.find(e => 
        e.tipo === tipo && e.dia === dia && e.mes === mesSeleccionado
      );

      if (eventoExistente) {
        alert("Ya existe un evento de este tipo en esta fecha.");
        return;
      }

      const evento = {
        id: Date.now() + Math.random(), // ID único más robusto
        tipo,
        dia,
        mes: mesSeleccionado,
        nombre: nombres[tipo],
        imagen: imagenes[tipo]
      };

      eventos.push(evento);
      localStorage.setItem("eventos", JSON.stringify(eventos));

      form.reset();
      modal.classList.remove("show");
      mostrarEventosGuardados();
      actualizarListaEventosEliminar();
    });
  }
}

// Función para resetear modal admin
function resetearModalAdmin() {
  if (adminCodeForm && adminPanel && adminError && adminCodeInput && modalTitle) {
    adminCodeForm.style.display = "block";
    adminPanel.style.display = "none";
    adminError.style.display = "none";
    adminCodeInput.value = "";
    modalTitle.textContent = "Código de Administrador";
    // Resetear tabs
    showTab('agregar');
  }
}

// código de admin
const ADMIN_CODE = "utp2025";

// ==============================
// INICIALIZACIÓN PRINCIPAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar elementos del DOM
  initializeElements();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Verificar rol de admin
  checkAdminRole();
  
  // Verificar modo descanso
  if (localStorage.getItem("modoDescanso") === "on") {
    activarBlackTheme();
  }
});

// ==============================
// INSCRIPCIÓN Y ANULACIÓN
// ==============================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-inscribirme")) {
    const contenedor = e.target.parentElement;
    const eventoInfo = contenedor.querySelector(".evento-titulo").textContent;
    
    // Guardar inscripción
    const inscripciones = JSON.parse(localStorage.getItem("inscripciones") || "[]");
    const eventoTipo = contenedor.className.match(/categoria-(\w+)/)[1];
    
    if (!inscripciones.find(i => i.tipo === eventoTipo)) {
      inscripciones.push({
        tipo: eventoTipo,
        nombre: nombres[eventoTipo],
        fecha: eventoInfo
      });
      localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
    }

    e.target.remove();
    const inscritoContainer = document.createElement("div");
    inscritoContainer.className = "inscrito-container";
    inscritoContainer.innerHTML = `
      <span class="texto-inscrito">✅ Inscrito</span>
      <button class="btn-anular">Anular inscripción</button>
    `;
    contenedor.appendChild(inscritoContainer);
  }

  if (e.target.classList.contains("btn-anular")) {
    const contenedor = e.target.closest(".evento");
    const eventoTipo = contenedor.className.match(/categoria-(\w+)/)[1];
    
    // Remover inscripción
    let inscripciones = JSON.parse(localStorage.getItem("inscripciones") || "[]");
    inscripciones = inscripciones.filter(i => i.tipo !== eventoTipo);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    // Refrescar la vista de eventos para asegurar que se actualice correctamente
    mostrarEventosGuardados();
  }

  // Eliminar evento
  if (e.target.classList.contains("btn-eliminar")) {
    const eventoId = e.target.dataset.eventoId;
    if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      let eventos = JSON.parse(localStorage.getItem("eventos") || "[]");
      eventos = eventos.filter(e => e.id != eventoId); // Usar != en lugar de !==
      localStorage.setItem("eventos", JSON.stringify(eventos));
      
      mostrarEventosGuardados();
      actualizarListaEventosEliminar();
    }
  }
});

// ==============================
// FILTRAR POR CATEGORÍA
// ==============================
function filtrarCategoria(categoria) {
  const eventos = document.querySelectorAll(".evento");
  eventos.forEach(evento => {
    if (categoria === "todos" || evento.classList.contains("categoria-" + categoria)) {
      evento.style.display = "flex";
    } else {
      evento.style.display = "none";
    }
  });
  document.querySelectorAll('.categoria-dropdown').forEach(el => el.classList.remove('active'));
}

function toggleSubmenu(button) {
  const dropdown = button.parentElement;
  document.querySelectorAll('.categoria-dropdown').forEach(el => {
    if (el !== dropdown) el.classList.remove('active');
  });
  dropdown.classList.toggle('active');
}

// Cierra todos los submenús si haces clic fuera
document.addEventListener('click', function (e) {
  if (!e.target.closest('.categoria-dropdown')) {
    document.querySelectorAll('.categoria-dropdown').forEach(el => el.classList.remove('active'));
  }
});
function toggleEventDescription(button) {
  const descripcion = button.parentElement.querySelector(".evento-descripcion");
  const arrow = button.querySelector(".arrow-icon");

  if (descripcion.style.display === "none" || descripcion.style.display === "") {
    descripcion.style.display = "block";
    arrow.textContent = "▲"; // Flecha hacia arriba
  } else {
    descripcion.style.display = "none";
    arrow.textContent = "▼"; // Flecha hacia abajo
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("modoDescanso") === "on") {
    activarBlackTheme();
  }
});

// ==============================
// FUNCIONES PARA TABS
// ==============================
function showTab(tabName) {
  // Ocultar todos los tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Mostrar tab seleccionado
  document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
  event.target.classList.add('active');

  if (tabName === 'eliminar') {
    actualizarListaEventosEliminar();
  }
}

// ==============================
// FUNCIONES PARA ELIMINAR EVENTOS
// ==============================
function actualizarListaEventosEliminar() {
  if (!mesSeleccionado) {
    listaEventosEliminar.innerHTML = "<p>Selecciona un mes primero</p>";
    return;
  }

  let eventos = JSON.parse(localStorage.getItem("eventos") || "[]");
  
  // Asegurar que todos los eventos tengan ID
  eventos = eventos.map(evento => {
    if (!evento.id) {
      evento.id = Date.now() + Math.random();
    }
    return evento;
  });
  
  // Guardar eventos actualizados
  localStorage.setItem("eventos", JSON.stringify(eventos));
  
  const eventosMes = eventos.filter(e => e.mes === mesSeleccionado);

  if (eventosMes.length === 0) {
    listaEventosEliminar.innerHTML = "<p>No hay eventos en este mes</p>";
    return;
  }

  listaEventosEliminar.innerHTML = eventosMes.map(evento => `
    <div class="evento-eliminar">
      <div class="evento-eliminar-info">
        <img src="${evento.imagen}" alt="${evento.tipo}">
        <div class="evento-eliminar-texto">
          <strong>${evento.nombre}</strong><br>
          ${evento.dia} de ${obtenerNombreMes(evento.mes)}
        </div>
      </div>
      <button class="btn-eliminar" data-evento-id="${evento.id}">Eliminar</button>
    </div>
  `).join('');
}

// ==============================
// FUNCIONES PARA ESTADÍSTICAS
// ==============================
function actualizarEstadisticas() {
  const inscripciones = JSON.parse(localStorage.getItem("inscripciones") || "[]");
  
  if (inscripciones.length === 0) {
    document.getElementById("statsDetails").innerHTML = "<p>No hay eventos inscritos aún</p>";
    document.getElementById("totalInscritos").textContent = "0";
    document.getElementById("listaEventosInscritos").innerHTML = "<p>No hay eventos inscritos</p>";
    return;
  }

  // Contar eventos por categoría
  const categoriaCount = {};
  const colores = {
    deportes: '#FF6384',
    academico: '#36A2EB', 
    artistico: '#FFCE56',
    desarrollo: '#4BC0C0',
    comunitario: '#9966FF',
    recreativos: '#FF9F40'
  };

  inscripciones.forEach(inscripcion => {
    const categoria = categorias[inscripcion.tipo] || 'otros';
    categoriaCount[categoria] = (categoriaCount[categoria] || 0) + 1;
  });

  // Actualizar total
  document.getElementById("totalInscritos").textContent = inscripciones.length;

  // Crear detalles
  const statsDetails = document.getElementById("statsDetails");
  statsDetails.innerHTML = `
    <h3>Eventos por Categoría</h3>
    <ul>
      ${Object.entries(categoriaCount).map(([categoria, count]) => `
        <li>
          <div class="evento-stat">
            <div class="evento-stat-color" style="background-color: ${colores[categoria]}"></div>
            <span>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</span>
          </div>
          <span>${count}</span>
        </li>
      `).join('')}
    </ul>
  `;

  // Crear lista de eventos inscritos
  const listaEventosInscritos = document.getElementById("listaEventosInscritos");
  listaEventosInscritos.innerHTML = inscripciones.map(inscripcion => {
    const categoria = categorias[inscripcion.tipo] || 'otros';
    const colorCategoria = colores[categoria] || '#888';
    
    return `
      <div class="evento-inscrito-item">
        <img src="${imagenes[inscripcion.tipo]}" alt="${inscripcion.tipo}">
        <div class="evento-inscrito-info">
          <div class="evento-inscrito-nombre">${inscripcion.nombre}</div>
          <div class="evento-inscrito-fecha">${inscripcion.fecha}</div>
        </div>
        <div class="evento-inscrito-categoria" style="background-color: ${colorCategoria}">
          ${categoria}
        </div>
      </div>
    `;
  }).join('');

  // Crear gráfico
  crearGraficoCircular(categoriaCount, colores);
}

function crearGraficoCircular(data, colores) {
  const ctx = document.getElementById('chartEventos').getContext('2d');
  
  // Destruir gráfico anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = Object.keys(data).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1));
  const valores = Object.values(data);
  const backgroundColors = Object.keys(data).map(cat => colores[cat]);

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: valores,
        backgroundColor: backgroundColors,
        borderColor: '#141414',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#e0e0e0',
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

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
      height: "100%",
      backgroundColor: "rgba(154, 144, 54, 0.26)",
      zIndex: 9999,
      pointerEvents: "none",
      transition: "opacity 0.3s ease"
    });
    document.body.appendChild(overlay);
    localStorage.setItem("modoDescanso", "on");
  }
}

// ==============================
// DATOS DE EJEMPLO (SOLO PARA DEMOSTRACIÓN)
// ==============================
function inicializarEventosEjemplo() {
  const eventosExistentes = JSON.parse(localStorage.getItem("eventos") || "[]");
  
  // Solo agregar eventos de ejemplo si no hay eventos guardados
  if (eventosExistentes.length === 0) {
    const eventosEjemplo = [
      {
        id: Date.now() + 1,
        tipo: "futbol",
        dia: "15",
        mes: "01",
        nombre: nombres.futbol,
        imagen: imagenes.futbol
      },
      {
        id: Date.now() + 2,
        tipo: "voley",
        dia: "20",
        mes: "01",
        nombre: nombres.voley,
        imagen: imagenes.voley
      },
      {
        id: Date.now() + 3,
        tipo: "conferencia",
        dia: "25",
        mes: "01",
        nombre: nombres.conferencia,
        imagen: imagenes.conferencia
      },
      {
        id: Date.now() + 4,
        tipo: "musica",
        dia: "10",
        mes: "02",
        nombre: nombres.musica,
        imagen: imagenes.musica
      },
      {
        id: Date.now() + 5,
        tipo: "hackathon",
        dia: "14",
        mes: "02",
        nombre: nombres.hackathon,
        imagen: imagenes.hackathon
      }
    ];
    
    localStorage.setItem("eventos", JSON.stringify(eventosEjemplo));
  }
}

// Inicializar eventos de ejemplo cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  inicializarEventosEjemplo();
});
