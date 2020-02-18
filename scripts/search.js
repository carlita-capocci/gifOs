

const boton = document.getElementById('btn_buscar');
const input = document.getElementById('texto-a-buscar');
const resultados = document.getElementById('resultados');
const similar = document.getElementById('similar');


function getSearchResults(search) {
    resultados.innerHTML = "";
    const found =
        fetch('http://api.giphy.com/v1/gifs/search?q=' + search +
            '&api_key=' + api_key + '&limit=32')
        .then((respuesta) => respuesta.json().then((res) => res.data.forEach(gifos)));
    return found
}



function gifos(gif) {
    const div = document.createElement('div');
    div.className = 'gif';
    div.style = 'background-image: url("' + gif.images.original.url + '")';
    resultados.appendChild(div);


}



boton.addEventListener('click', () => {
    getSearchResults(input.value);
    const busquedas= obtenerObjetoLocal(localSearch);
    busquedas.push(input.value);
    guardarObjetoLocal(localSearch,busquedas)
});

input.addEventListener('input', () => {
    if (input.value != '') {
        similar.style.display = ' block';
        boton.classList.add('rosa');
        similar.innerHTML='';
        const busquedas= obtenerObjetoLocal(localSearch);
        const sugerencias= busquedas.filter((elemento)=> elemento.startsWith(input.value))
        sugerencias.forEach((b)=>{
            const boton= document.createElement('button');
            boton.innerHTML= b;
            similar.appendChild(boton);
            boton.addEventListener('click',()=>{
                getSearchResults(b);
                input.value=b;
            })
        })
    } else {
        similar.style.display = 'none';
        boton.classList.remove('rosa');
    }

})






const localSearch= 'Gifos-search';

guardarObjetoLocal(localSearch, obtenerObjetoLocal(localSearch) || []);
