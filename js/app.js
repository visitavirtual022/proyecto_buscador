// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const precioMinimo = document.querySelector('#minimo');
const precioMaximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// --> contenedor para los resultados
const resultado = document.querySelector('#resultado');


const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// --> Generar un objeto con la busqueda
const datosBusqueda = {
  marca : '',
  year : '',
  precioMinimo : '',
  precioMaximo : '',
  puertas : '',
  transmision : '',
  color: '',
}





// Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos (autos);  //muestra los automoviles al cargar

  // Llenar las opciones de años
  llenarSelect();
})

// --> Eventos (event listener) para los select de busqueda
marca.addEventListener('change', (e)=>{
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
  });

  year.addEventListener('change', (e)=> {
    datosBusqueda.year = e.target.value;
    filtrarAuto();   
  })

  precioMinimo.addEventListener('change', (escoja)=>{
    datosBusqueda.precioMinimo = escoja.target.value;
    filtrarAuto();   
  })

  precioMaximo.addEventListener('change', (escoja)=> {
    datosBusqueda.precioMaximo = escoja.target.value;
    filtrarAuto();  
  })

  puertas.addEventListener('change', (e)=> {
    datosBusqueda.puertas = e.target.value;  
    filtrarAuto();  
  })

  transmision.addEventListener('change', (e)=> {
    datosBusqueda.transmision = e.target.value;  
    filtrarAuto();  
  })

  color.addEventListener('change', (e)=> {
    datosBusqueda.color = e.target.value; 
    filtrarAuto(); 
  })

// Funciones
function mostrarAutos(autos) {

  LimpiarHtml();  //-->> Elimina el html previo

  autos.forEach( auto => {

    const {marca, modelo, year, precio, puertas, color, transmision} = auto;
    const autoHtml = document.createElement('p');

    autoHtml.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}

    `;

    // insertar en el html en resultado
    resultado.appendChild(autoHtml)
  })
}

// --> Limpiar el html
function LimpiarHtml() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

};

// --> Genera los años del select
function llenarSelect () {

  for (let i = maxYear; i >= minYear; i-- ){
    const optionYear = document.createElement('option');
    optionYear.value = i;
    optionYear.textContent = i;
    year.appendChild(optionYear); // --> Agregar las opciones de año al select
  }
}

// --> Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMinimo).filter(filtrarPrecioMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
 
  if (resultado.length) {
    console.log(resultado);
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado (){

  LimpiarHtml();  //-->> con esto borramos el html y luego generamos el div con el mensaje de error

  const sinResultado = document.createElement('div');
  sinResultado.classList.add('alerta','error');
  sinResultado.textContent ='Tú búsqueda no tuvo resultados, intenta con otra combinación';
  resultado.appendChild(sinResultado);
} 


function filtrarMarca(auto){
  if ( datosBusqueda.marca ) {
    return auto.marca === datosBusqueda.marca
  }
  return auto;
}
function filtrarYear(auto){
  if ( datosBusqueda.year ) {
    return auto.year === parseInt(datosBusqueda.year)  //--> los años generados vienen como string hay que transformarlos a int
  }
  return auto;
}
function filtrarPrecioMinimo(auto){
  if ( datosBusqueda.precioMinimo ) {
    return auto.precio >= datosBusqueda.precioMinimo;
  }
  return auto;
}
function filtrarPrecioMaximo(auto){
  if ( datosBusqueda.precioMaximo ) {
    return auto.precio <= datosBusqueda.precioMaximo;
  }
  return auto;
}
function filtrarPuertas(auto){
  if( datosBusqueda.puertas) {
    return auto.puertas === parseInt(datosBusqueda.puertas);
  }
  return auto;
}
function filtrarTransmision(auto){
  if( datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}
function filtrarColor(auto){
  if(datosBusqueda.color){
    return auto.color === datosBusqueda.color;
  }
  return auto;
}