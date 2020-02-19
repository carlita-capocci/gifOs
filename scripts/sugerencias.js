const suger = document.getElementById('sug');


const arr = ['Correcaminos','Mariposas','Audrey','Simpson']
    
const dibujarImagen = imagen => {
    const gif = document.createElement('img')
    gif.src = imagen.url;

    const caja = document.createElement('div');
    const ventana = document.createElement('div');
    const nombre = document.createElement('div');
    const cruz = document.createElement('div');
    const ver = document.createElement('div');

    caja.className = 'caja';
    ventana.className = 'ventana';
    nombre.className = 'nombre';
    cruz.className = 'cruz';
    ver.className = 'ver';
    gif.className = 'gif';

    nombre.innerHTML= '#' + imagen.title;
    ver.innerHTML= 'Ver mas...'
    

    ventana.appendChild(cruz)
    ventana.appendChild(nombre)
    caja.appendChild(ver)
    caja.appendChild(ventana)
    caja.appendChild(gif)
    
    ver.addEventListener('click', () => getSearchResults(imagen.title));


    suger.appendChild(caja)
}


function getSugerencias() {
    arr.forEach((termino)=>{
        
        fetch('https://api.giphy.com/v1/gifs/random?tag=' + termino +
            '&api_key=' + api_key)
        .then((respuesta) => respuesta.json().then((res) => dibujarImagen({
            url: res.data.images.original.url,
            title: res.data.title
        })));

    })

    
}

getSugerencias();