function guardarObjetoLocal(nombre, objeto){
    localStorage.setItem(nombre,JSON.stringify(objeto))
}

function obtenerObjetoLocal(nombre){
    return JSON.parse(localStorage.getItem(nombre));
}


