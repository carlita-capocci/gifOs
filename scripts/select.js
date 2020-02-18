
const dropdowns= document.querySelectorAll('.dropdown');
Array.from(dropdowns).forEach(addDropdownBehavior);

function addDropdownBehavior(dropdown){
    const botonLargo= dropdown.querySelector('.dropbtn');
    const options= dropdown.querySelectorAll('a');

    Array.from(options).forEach(
        (a)=> a.addEventListener(
            'click', 
            ()=> {
                options.forEach((o)=>{
                    o.className='';
                })
                a.className='elegido';
                const e= new CustomEvent(
                    'el_usuario_eligio',
                    { detail: a.getAttribute('data-value') }
                )
                dropdown.dispatchEvent(e);
            }
        )
    )
}





