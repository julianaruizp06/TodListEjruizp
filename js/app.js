const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const botonEnter = document.getElementById('boton-enter');

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let LIST;


// =====CREACIÓN DE FECHA=====
const FECHA = new Date();
let fechaFormateada = FECHA.toLocaleDateString('es-MX', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
});

// Capitaliza la primera letra de la fecha
fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

document.getElementById('fecha').innerHTML = fechaFormateada;


/* const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {weekday: 'long',month:'short',day:'numeric'}) */

// =====FUNCION AGREGAR TAREA=====
const agregarTarea = (tarea, id, realizado, eliminado) =>{

    if (eliminado) {return;}

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
    <li id="elemento">
        <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
        <p class="text ${LINE}">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id=${id}></i>
    </li>`
    
    lista.insertAdjacentHTML("beforeend", elemento);
}

// =====BOTON CLICK Y ENTER=====
botonEnter.addEventListener('click', () =>{
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST));
    input.value = '';
    id++
});

document.addEventListener('keyup', (event) =>{
    if (event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LIST));
        input.value = '';
        id++
    }
})


lista.addEventListener('click', (event) =>{
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'realizado') {
        tareaRealizada(element)
    }else if (elementData === 'eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST));
})


// =====LOCAL STORAGE GET ITEM=====
let data = localStorage.getItem('TODO');
if (data) {
    LIST=JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else{
    LIST = [];
    id= 0;
}

function cargarLista (DATA){
    DATA.forEach(i => {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    });
}

// =====TAREA REALIZADA=====
const tareaRealizada = (element) =>{
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true;
}

// =====TAREA ELIMINADA=====
const tareaEliminada = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

