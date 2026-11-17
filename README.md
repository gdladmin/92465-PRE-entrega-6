# Pre-Entrega 7 -- Simulador de cotizacion autos 
 
Simula un Cotizador de Seguros de Autos
-ORDEN DE IMPORTANCIA 
1. SE DECLARA EL ARRAY BASE - (COTIZACION)
2. DATOS Y REFERENCIAS AL DOM
3. FUNCIONES - 
3.1 MostrarCotizaciones la mas importante Dibuja y actualiza pantalla
3.2 AgregarCotización - aGREGA DATOS AL formulario, selecciona cobertura
3.3 ManejarAccionesLista - Maneja los botones solicitar y eliminar , calcula el Premio del segur
3.4 FiltrarCotizaciones  - filtra de cotizaciones - importancia media puede no estar
3.5 mostrarFeedback - Muestra mensajes en pantalla
4. Event Listener - ("submit", agregarCotizacion)("click", manejarAccionesLista);("input", filtrarCotizaciones);
5. CARGA INICIAL DEL COTIZADOR.

EXPLICACION DE QUE HACE EL COTIZADOR  

Registro de vehículos: Permite ingresar los datos de un auto (marca, modelo, año, valor asegurado en miles de pesos y tipo de cobertura) mediante un formulario web.

Tipos de cobertura: 
RC (Responsabilidad Civil)
TC (Terceros Completo)
TR (Todo Riesgo)

Cálculo de la cotización: se calcula mediante un boton el Premio mensual del seguro en función del valor del vehículo y la cobertura seleccionada.

Búsqueda en tiempo real: Dispone de un buscador para filtrar y encontrar rápidamente las cotizaciones guardadas según la marca, modelo o tipo de cobertura.

Gestión de la lista: Permite visualizar todas las cotizaciones tipo carrito calcular el premio y eliminar las mismas , al recargar la pagina se ingresan las iniciales nuevamente.

S