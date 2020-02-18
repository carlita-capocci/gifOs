const flecha = document.getElementById('flecha');
const cancelar = document.getElementById('cancelar');
const titulo = document.getElementById('tituloBarra');

flecha.addEventListener('click', () => {
    location.href = 'index.html'
})


cancelar.addEventListener('click', () => {
    location.href = 'index.html'
})



const comenzar = document.getElementById('comenzar');
const cuerpo = document.getElementById('cuerpo');
const capturar = document.getElementById('capturar');

function iniciarContador(contador) {
    let count = 0;
    let calcTime = () => {
        let min = 0,
            hor = 0,
            seg = 0;
        count += 1;
        seg = count;
        if (count > 60) {
            min = Math.floor(count / 60);
            seg = count - (min * 60)
            if (min > 60) {
                hor = Math.floor(min / 60);
                min = min - (hor * 60)
            }
        }
        return `${
            hor.toString().padStart(2,"0")
        }:${
            min.toString().padStart(2,"0")
        }:${
            seg.toString().padStart(2,"0")
        }`
    }
    let i = setInterval(() => {
        contador.value = calcTime();
    }, 1000);
    return () => {
        clearInterval(i);
        return calcTime();
    }
}

function verVideo() {
    const player = document.createElement('div');
    const video = document.createElement('video');
    const botones = document.createElement('div');

    titulo.innerHTML = 'Un Cheque Antes de Empezar';
    botones.innerHTML = `<div id='capturar' style='display: inline-block;
    height: 36px;'><button class="botoncam"> </button>
    <button class="botoncap" id=""> Capturar</button></div>`;
    cuerpo.innerHTML = '';
    botones.className = 'cap';
    player.style.height = '485px';
    player.appendChild(video);
    cuerpo.appendChild(player);
    cuerpo.appendChild(botones);
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
                max: 480
            }
        }
    }).then(function (stream) {
        const capturar = document.getElementById('capturar');
        video.srcObject = stream;
        video.play()

        const recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 640,
            height: 480,
            onGifRecordingStarted: function () {
                console.log('started')
            },
        });
        capturar.addEventListener('click', () => {
            recorder.startRecording();
            titulo.innerHTML = 'Capturando tu Guifo';
            botones.innerHTML = '<input type="text" readonly value="00:00:00" class="timer reloj" id="contador"/><div id="chimpum"><button class="camlisto"></button><button class="botlisto" id="chimpum">Listo</button></div>';
            const listo = document.getElementById('chimpum');
            const frenarContador = iniciarContador(document.getElementById('contador'))
            listo.addEventListener('click', () => {
                const tiempoFinal = frenarContador();
                recorder.stopRecording(() => {
                    titulo.innerHTML = 'Vista Previa';
                    const repro = document.createElement('img');
                    botones.innerHTML = '<input type="text" readonly value="' + tiempoFinal + '" class="timer reloj" id="contador"/><button id="rehacer" class="repetir">Repetir Captura</button><button id="subir" class="subir">Subir Guifo</button>';
                    video.style.display = 'none'
                    player.appendChild(repro);
                    const blob = recorder.getBlob();
                    repro.src = URL.createObjectURL(blob);
                    document.getElementById('rehacer').addEventListener('click', verVideo);
                    document.getElementById('subir').addEventListener('click', () => {
                        titulo.innerHTML = 'Subiendo Guifo';
                        cuerpo.innerHTML = `
                        <div class="blanco">
                        <div class="globo">
                            <img src="imgs/globe_img.png" alt="globo">
                        </div>
                        <div class="estamos">
                            <p>Estamos subiendo tu guifo...</p>
                        </div>
                        </div>
                        <div class="cance">
                            <button class="repetir" id="cancelarSubida">Cancelar</button>
                        </div>`;

                        const controller= new AbortController();
                        document.getElementById('cancelarSubida').addEventListener('click', ()=>{
                            controller.abort();
                            verVideo();
                        })

                        subirBlob(blob,controller.signal);
                    });

                });
            })
        })
    });
}

comenzar.addEventListener('click', verVideo)

function subirBlob(blob, signal) {
    const form = new FormData();
    form.append('file', blob, 'myGif.gif');
    form.append('api_key', api_key);
    fetch('https://upload.giphy.com/v1/gifs', {
            method: 'post',
            body: form,
            signal
        })
        .then((res) => res.json())
        .then((res) => {
            guardarId(res.data.id)
            titulo.innerHTML = 'Subiendo Guifo';
            cuerpo.innerHTML = `<img src="https://media.giphy.com/media/${res.data.id}/giphy.gif" style="
                    width: 365px;
                    margin-right: 27px;
                "><div class="bloque">

                                    <div class="exito">
                                        <h3>Guifo creado con exito</h3>
                                    </div>
                
                                    <div>
                
                                        <button class="repetir gf" id="copiar"> Copiar enlace Guifo</button>
                                    </div>
                
                                    <div>
                
                                        <button class="repetir gf" id="descargar"> Descargar Guifo</button>
                                        <a id="descargarArchivo"></a>
                                    </div>
                
                                </div>
                
                
                                <div class="creadolis">
                
                                    <button class="subir lis" id="listo"> Listo </button>
                
                                </div>`;

            document.getElementById('copiar').addEventListener('click', () => {
                navigator.clipboard.writeText(`https://media.giphy.com/media/${res.data.id}/giphy.gif`)
            });

            document.getElementById('listo').addEventListener('click', verVideo);


            document.getElementById('descargar').addEventListener('click', () => {
                const a = document.getElementById('descargarArchivo');
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = name;
                a.click();
                window.URL.revokeObjectURL(url);
            })
        })
        .catch(()=>{
            console.log('el usuario cancelo');
        })

}




function guardarId(id) {
    const listado = obtenerObjetoLocal(localName);
    listado.push(id);

    guardarObjetoLocal(localName, listado);

}


document.body.className=localStorage.getItem('tema') || 'tema1';