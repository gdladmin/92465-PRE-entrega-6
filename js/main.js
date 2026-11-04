class Producto {
  constructor(id, nombre, stock, precio) {
    this.id = id;
    this.nombre = nombre.toLowerCase(); 
    this.stock = parseInt(stock);       
    this.cantidad = 0; // SOLICITADAS POR EL CLIENTE                 
    this.precioUnidad = parseFloat(precio); 
    this.precioCompra = 0 // se inicializa 
    this.vendido = false;               
  }

  vender(cantVendida) {
    this.cantidad = parseInt(cantVendida);
    this.precioCompra = this.cantidad * this.precioUnidad;
    this.stock -= this.cantidad // nuevo actualizo stock
    this.vendido = true;
  }
}

// CARGA EL STOCK 
const stockEmpanadas = [];

stockEmpanadas.push(new Producto(0, "CARNE", 200, 1200));
stockEmpanadas.push(new Producto(1, "POLLO", 140, 1100));
stockEmpanadas.push(new Producto(2, "BONDIOLA", 60, 1100));
stockEmpanadas.push(new Producto(3, "JAMON", 40, 1100));
stockEmpanadas.push(new Producto(4, "CAPRESE", 0, 1150)); 
stockEmpanadas.push(new Producto(5, "HUMITA", 100, 1300));

// nuevo , filter : filtra los productos disponibles .
const productosDisponibles = stockEmpanadas.filter(producto => producto.stock > 0);


console.log("=== EMPANADAS DISPONIBLES EN EL LOCAL ===");
console.table(productosDisponibles);

//  ATENCION DE PEDIDOS DEL CLIENTE  
// nuevo , recorre únicamente los productos disponibles 
for (const producto of productosDisponibles) {
  // * esto ya no hace falta * 
  //if (producto.stock === 0) {
  //  alert("Lo sentimos, el gusto " + producto.nombre.toUpperCase() +  " sin stock.");
  //  continue;
  //}

  let respuesta = prompt(
    "Cuantas unidades de " + producto.nombre.toUpperCase()+ " desea llevar ? ");

  let cantidadPedida = parseInt(respuesta);

  if (!isNaN(cantidadPedida) && cantidadPedida > 0) {
    // Controlamos si la cantidad pedida supera el stock disponible
    if (cantidadPedida > producto.stock) {
      alert("Solo tenemos " + producto.stock + " unidades disponibles de " + producto.nombre.toUpperCase() + "Se ajustara su pedido a ese stock.");
      cantidadPedida = producto.stock; 
    }
    producto.vender(cantidadPedida);
  }
}

// nuevo :  usa reduce  para calcular el total vendido 

function calcularTotalVendido(pedido) {
  return pedido.reduce((acumulador, producto) => {
    if (producto.vendido === true) {
      return acumulador + producto.precioCompra;
    }
    return acumulador;
  }, 0);
}


// nuevo  usa filter  para buscar  los productos solicitados 
const productosVendidos = productosDisponibles.filter(producto => producto.vendido === true);

// nuevo usa map  para el detalle del ticket 
const detalleTicket = productosVendidos.map(producto => ({
  nombre: producto.nombre,
  cantidad: producto.cantidad,
  precioUnidad: producto.precioUnidad,
  subtotal: producto.precioCompra
}));


console.log("=== TICKET DE COMPRA ===");
console.table(detalleTicket);

let totalRecaudado = calcularTotalVendido(stockEmpanadas);

console.log("TOTAL A PAGAR: $" + totalRecaudado);

alert("GRACIAS POR SU COMPRA "+ "TOTAL A PAGAR " + totalRecaudado);


// NUEVO - para cumplir con la consigna find , se simula una consulta  
// y se le promete incorporar al stock el gusto solicitado. 

let consultaGusto = prompt("Desea consultar algún gusto especial para su próxima compra? (S/N)");

if (consultaGusto.toUpperCase() === "S") {
  let gustoBuscado = prompt("Ingrese el gusto que desea consultar:");

  const productoBuscado = stockEmpanadas.find(
    producto => producto.nombre === gustoBuscado.toLowerCase()
  );

  if (productoBuscado) {
    console.log("=== GUSTO CONSULTADO ===");
      console.table(productoBuscado);
      console.log("Gusto existe: " + productoBuscado.nombre.toUpperCase());
      console.log("Stock actual: " + productoBuscado.stock + " unidades");
      alert("Hay Stock de su producto: " + productoBuscado.stock + " unidades");
     
      if (productoBuscado.stock = 0) {
        alert("El stock del producto buscado sera restablecido ");
      }
  } else {
    alert("Su gusto sera incorporado proximamente");
  }
}
