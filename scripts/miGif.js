document.getElementById('flecha').addEventListener('click', () => {
    location.href = '/index.html'
})




const localName= 'misGifos';
const contenedor= document.getElementById('misGif')

guardarObjetoLocal(localName, obtenerObjetoLocal(localName) || []);


function dibujarMisGifos(){
    const idsGuardadosEnLocalStorage= obtenerObjetoLocal(localName);
    idsGuardadosEnLocalStorage.forEach(dibujarGif)
}


function dibujarGif(id) {
    const div = document.createElement('div');
    div.className = 'migif';
    div.style = `background-image: url("https://media.giphy.com/media/${id}/giphy.gif")`;
    contenedor.appendChild(div);


}

dibujarMisGifos();
