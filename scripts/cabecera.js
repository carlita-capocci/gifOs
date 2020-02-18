const temas= document.getElementById('temas');

temas.addEventListener('el_usuario_eligio', (e)=> {
    document.body.className= e.detail;
    localStorage.setItem('tema', e.detail);
});

const btnCrear= document.getElementById('btnCrear');
const btnMis= document.getElementById ('btnMis');



btnCrear.addEventListener('click', ()=>{
    location.href='/captura.html'
})


btnMis.addEventListener('click', ()=>{
    location.href='/misgifos.html'
})




document.body.className=localStorage.getItem('tema') || 'tema1';

document.querySelector(`a[data-value=${document.body.className}]`).className='elegido';