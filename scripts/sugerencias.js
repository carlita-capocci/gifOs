const suger = document.getElementById('sug');


const arr = [{
        url: "https://media1.giphy.com/media/xThtaaVNrPdQ64U9vq/giphy.gif?cid=ab13c81f902338b6706296f7b6ad0f5395beacef9e5d0206&rid=giphy.gif",
        title: 'Correcaminos'
    },

    {
        url: "https://media0.giphy.com/media/Uiujny6Aqrg40/giphy.gif?cid=ab13c81f56cca08c7a363f67ba6205b69cf467102051aa2d&rid=giphy.gif",
        title: 'Mariposas'
    },

    {
        url: "https://media2.giphy.com/media/VykjOQICUzxjW/giphy.gif?cid=ab13c81f1b243ee93072d61cbec383ba42b08b4e6ea9f29d&rid=giphy.gif",
        title: 'Audrey'
    },

    {
        url: "https://media2.giphy.com/media/dPIPDAF8hOlZC/giphy.gif?cid=ab13c81fa99efea99c7aea90c86631a0d3634538178f2182&rid=giphy.gif",
        title: 'Simpson'
    }

]

function getSugerencias() {

    arr.forEach(imagen => {
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
        })
}

getSugerencias();