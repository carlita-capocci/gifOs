const trend= document.getElementById('trend')


function getTendecias() {
    const found =
        fetch('http://api.giphy.com/v1/gifs/trending?api_key=' + api_key + '&limit=8')
            .then((respuesta)=> respuesta.json().then((res)=> res.data.forEach(imagen => {
                const gif = document.createElement('img')
                gif.src = imagen.images.original.url
    
                const caja = document.createElement('div');
                const barra= document.createElement('div');
                const nombre= document.createElement('div')
 
    
                caja.className = 'caja';
                gif.className = 'gif';
                barra.className= 'ventana';
                nombre.className= 'nombre';
      
                caja.appendChild(gif)
                caja.appendChild(barra)
                barra.appendChild(nombre)

                nombre.innerHTML= '#' + imagen.title;
                
    
                
             
    
    
                trend.appendChild(caja)
            })));
            




            }
            


getTendecias();
