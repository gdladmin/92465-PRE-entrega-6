// 1. se declara el array base (con valores en miles de $ y coberturas cortas RC, TC, TR)
const cotizacion = [
  { id: 1, marca: "Toyota", modelo: "Corolla", año: 2023, cobertura: "TC", valorVehiculo: 18500, premio: 0 },
  { id: 2, marca: "Volkswagen", modelo: "Golf", año: 2022, cobertura: "TR", valorVehiculo: 16200, premio: 0 },
  { id: 3, marca: "Ford", modelo: "Focus", año: 2021, cobertura: "RC", valorVehiculo: 14000, premio: 0 }
];

// 2. DATOS Y REFERENCIAS AL DOM
const formCotizacion = document.getElementById("form-cotizacion");
const inputMarca = document.getElementById("input-marca");
const inputModelo = document.getElementById("input-modelo");
const inputAnio = document.getElementById("input-anio");
const inputCobertura = document.getElementById("input-cobertura");
const inputValorVehiculo = document.getElementById("input-valor-vehiculo");

const listaCotizaciones = document.getElementById("lista-cotizaciones");
const inputBuscar = document.getElementById("input-buscar");
const feedbackMsg = document.getElementById("feedback-msg");

// 3. DECLARACION DE FUNCIONES - segun orden de importancia 

function mostrarCotizaciones(cotizacionesActuales) {
  listaCotizaciones.innerHTML = "";

  if (cotizacionesActuales.length === 0) {
    listaCotizaciones.innerHTML = "<p style='text-align:center; color: #888;'>No se encontraron cotizaciones.</p>";
    return;
  }

  cotizacionesActuales.forEach((item) => {
    const li = document.createElement("li");
    li.className = "item-card";
   
    li.innerHTML = `
      <div class="item-info">
        <span class="item-titulo">${item.marca} ${item.modelo} (${item.año})</span>
        <span class="item-detalles">Cobertura: <strong>${item.cobertura}</strong></span>
        <span class="item-detalles">Valor Asegurado: $${item.valorVehiculo.toLocaleString()}.000</span>
        <span class="item-precio">Premio Mensual: $${item.premio ? item.premio.toLocaleString() : " Calcular"}</span>
      </div>
      <div class="item-acciones">
        <button class="btn-calcular" data-id="${item.id}">Calcular Cotización</button>
        <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
      </div>
    `;
     
    listaCotizaciones.appendChild(li);
  });
}

// AGREGA DATOS AL FORMULARIO 
function agregarCotizacion(evento) {
  evento.preventDefault();

  const marca = inputMarca.value.trim();
  const modelo = inputModelo.value.trim();
  const año = Number(inputAnio.value);
  
  //  CAPTURA COBERTURA PASA A MAYUSCULAS 
  const cobertura = inputCobertura ? inputCobertura.value.trim().toUpperCase() : "TC";
  const valorVehiculo = inputValorVehiculo ? Number(inputValorVehiculo.value) : 15000;

  if (marca === "" || modelo === "" || isNaN(año) || isNaN(valorVehiculo) || valorVehiculo <= 0) {
    mostrarFeedback("Por favor, completa todos los campos correctamente.", "error");
    return;
  }

  // VALIDA ENTRADA DE COBERTURA 
  if (cobertura !== "RC" && cobertura !== "TC" && cobertura !== "TR") {
    mostrarFeedback("Cobertura inválida. Ingrese RC, TC o TR.", "error");
    return;
  }

  const nuevaCotizacion = {
    id: Date.now(),
    marca: marca,
    modelo: modelo,
    año: año,
    cobertura: cobertura,
    valorVehiculo: valorVehiculo,
    premio: 0 // Se calcula al presionar el botón Calcular Cotización
  };

  cotizacion.push(nuevaCotizacion);
  mostrarCotizaciones(cotizacion); 
  mostrarFeedback("¡Vehículo " + marca + " " + modelo + " agregado con éxito!", "success");
 
  formCotizacion.reset();
  inputMarca.focus();
}

// CALCULO DEL PREMIO Y ELIMINACIONES 
function manejarAccionesLista(evento) {
  const botonCalcular = evento.target.closest(".btn-calcular");
  const botonEliminar = evento.target.closest(".btn-eliminar");

  if (botonCalcular) {
    const idElemento = Number(botonCalcular.getAttribute("data-id"));
    const itemEncontrado = cotizacion.find(item => item.id === idElemento);
    
    if (itemEncontrado) {
      // TASAS FIJAS SEGÚN RC, TC o TR
      let tasa = 0.02;  // Tasa base para RC
      if (itemEncontrado.cobertura === "TC") {
        tasa = 0.045;
      } else if (itemEncontrado.cobertura === "TR") {
        tasa = 0.075;
      }

      // Cálculo del premio mensual  
      const premioCalculado = Math.round((itemEncontrado.valorVehiculo * 1000) * tasa / 12);
      itemEncontrado.premio = premioCalculado;

      // Actualizamos la vista
      mostrarCotizaciones(cotizacion);
      mostrarFeedback("Cotización calculada para " + itemEncontrado.marca + " " + itemEncontrado.modelo + ". Premio: $" + premioCalculado.toLocaleString(), "success");
    }
  }

  if (botonEliminar) {
    const idElemento = Number(botonEliminar.getAttribute("data-id"));
    const indice = cotizacion.findIndex(item => item.id === idElemento);
   
    if (indice !== -1) {
      const eliminado = cotizacion.splice(indice, 1)[0];
      mostrarCotizaciones(cotizacion); 
      mostrarFeedback("Cotización de " + eliminado.marca + " " + eliminado.modelo + " eliminada.", "error");
    }
  }
}

// FILTRAR COTIZACIONES
function filtrarCotizaciones(evento) {
  const textoBusqueda = evento.target.value.toLowerCase();
  const filtrados = cotizacion.filter(item =>
    item.marca.toLowerCase().includes(textoBusqueda) ||
    item.modelo.toLowerCase().includes(textoBusqueda) ||
    item.cobertura.toLowerCase().includes(textoBusqueda)
  );
  mostrarCotizaciones(filtrados); 
} 

// MUESTRA MENSAJES DE FEEDBACK
function mostrarFeedback(mensaje, tipo = "success") {
  feedbackMsg.textContent = mensaje;
  feedbackMsg.className = "feedback " + tipo;
 
  const ocultarAlHacerClic = () => {
    feedbackMsg.className = "feedback hidden";
    feedbackMsg.removeEventListener("click", ocultarAlHacerClic);
  };

  feedbackMsg.addEventListener("click", ocultarAlHacerClic);
}

// Event Listeners
formCotizacion.addEventListener("submit", agregarCotizacion);
listaCotizaciones.addEventListener("click", manejarAccionesLista);
inputBuscar.addEventListener("input", filtrarCotizaciones);

// CARGA LA APLICACION 
mostrarCotizaciones(cotizacion);