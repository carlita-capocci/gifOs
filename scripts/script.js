const api_key= 'OSt9LdJZM63uJZAzm1wTSiw3xxpTy2Lo';


function getSearchResults(search) {
    resultados.innerHTML= "";
    const found =
        fetch('http://api.giphy.com/v1/gifs/search?q=' + search +
            '&api_key=' + api_key + '&limit=32')
        .then((response) => {
            return response.json()
        }).then(data => data.data.map(gifos))
        .catch((error) => {
            return error
        })
    return found
}


const boton= document.getElementById('btn_buscar');
const input= document.getElementById('buscar');
const resultados= document.getElementById('resultados')
boton.addEventListener('click', () => getSearchResults(input.value));



function gifos (gif){
  const div = document.createElement('div');
  div.className= 'gif';
  div.style= 'background-image: url("' + gif.images['480w_still'].url + '")';
  resultados.appendChild(div);
  const img= document.createElement('img');
  img.src= gif.images['480w_still'].url;



}


