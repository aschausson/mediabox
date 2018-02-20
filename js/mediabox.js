var media = [
    '<video height="500px"><track label="Español" kind="subtitles" srclang="es" src="data/subt/sub.vtt" default><p>Tu navegador no soporta este formato de video.</p></video>',
    '<img id="imagenAudio" src="data/img/foofighters.jpeg"><audio><source src="data/audio/foofighters.mp3" type="audio/mpeg"></audio><img id="iconoAudio" src="data/img/sound.svg">',
    '<video height="500px"><source src="data/video/fallout4.mp4" type="video/mp4"><source src="data/video/fallout4.webm" type="video/webm"><source src="data/video/fallout4.ogv" type="video/ogg"><p>Tu navegador no soporta este formato de video.</p></video>',
    '<img id="imagenAudio" src="data/img/mumford.jpeg"><audio><source src="data/audio/mumford.mp3" type="audio/mpeg"></audio><img id="iconoAudio" src="data/img/sound.svg">',
    '<video height="500px"><source src="data/video/3.mp4" type="video/mp4"><p>Tu navegador no soporta este formato de video.</p></video>',
    '<img id="imagenAudio" src="data/img/soundgarden.jpeg"><audio><source src="data/audio/soundgarden.mp3" type="audio/mpeg"></audio><img id="iconoAudio" src="data/img/sound.svg">'
]

var thumbnail

var posicion

var volumenTotal = 0.5

$(document).ready(function () {
    posicion = 0

    cargaMedia(posicion)
    seleccionaMedia('#0')

    listeners()
    acabaMedia()
})


function cargaMedia(pos) {
    $('#visualizacion').empty()
    $('#visualizacion').append(media[pos])
}


function seleccionaMedia(media) {
    posicion = $(media).attr('id')
    cargaMedia($(media).attr('id'))

    $('#subdiv').remove()
    if ($('video').length) {
        var video = $('video');

        if (video.find('track').length) {

            $('#cajaControl').append('<div id="subdiv"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="subtitulo" class="control" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve" width="512px" height="512px"><path d="M384,42.667H42.667C19.2,42.667,0,61.867,0,85.333v256C0,364.8,19.2,384,42.667,384H384    c23.467,0,42.667-19.2,42.667-42.667v-256C426.667,61.867,407.467,42.667,384,42.667z M42.667,213.333H128V256H42.667V213.333z     M256,341.333H42.667v-42.667H256V341.333z M384,341.333h-85.333v-42.667H384V341.333z M384,256H170.667v-42.667H384V256z" fill="#FFFFFF"/></svg></div>')
            listenerSubtitulo()
            $('video')[0].textTracks[0].mode = 'hidden';
        }

        var WindowWidth = $(window).width();

        if (WindowWidth < 1200) {
            //Video para movil
            video.append("<source src='data/video/1vga.mp4' type='video/mp4' >");
        } else {
            //video para escritorio
            video.append("<source src='data/video/1hd.mp4' type='video/mp4' >");
        }
    }

    $('.selected').addClass('noselect')
    $('.selected').removeClass('selected')

    $(media).removeClass('noselect')
    $(media).addClass('selected')

    $('.flecha').remove()
    $(media).before('<img class="flecha" src="data/img/arrow.svg">')

    cambiarVolumen(volumenTotal)
}


function listeners() {
    $('.select').click(function () {
        seleccionaMedia(this)
        acabaMedia()
        if ($('audio').length)
            $('audio')[0].play()
        else
            $('video')[0].play()
    })

    $("#volumen").click(function (e) {
        var relX = e.pageX - $(this).offset().left;
        $('#volumenSel').css('width', relX)
        var vol = relX / 80
        cambiarVolumen(vol)
    })

    $('#play').click(function (e) {
        if ($('audio').length)
            $('audio')[0].play()
        else
            $('video')[0].play()
    })

    $('#pause').click(function (e) {
        if ($('audio').length)
            $('audio')[0].pause()
        else
            $('video')[0].pause()
    })

    $('#pause').click(function (e) {
        if ($('audio').length)
            $('audio')[0].pause()
        else
            $('video')[0].pause()
    })

    $('#adelantar').click(function (e) {
        adelantar()
    })

    $('#masVol').click(function (e) {
        if ($('audio').length){
            $('audio')[0].volume += 0.1
            $('#volumenSel').css('width', ($('audio')[0].volume)*80)
        }
        else{
            $('video')[0].volume += 0.1
            $('#volumenSel').css('width', ($('video')[0].volume)*80)
        }
    })

    $('#menosVol').click(function (e) {
        if ($('audio').length){
            $('audio')[0].volume -= 0.1
            $('#volumenSel').css('width', ($('audio')[0].volume)*80)
        }
        else{
            $('video')[0].volume -= 0.1
            $('#volumenSel').css('width', ($('video')[0].volume)*80)
        }
    })

}

function listenerSubtitulo() {
    $('#subdiv').click(function (e) {
        var modo = $('video')[0].textTracks[0].mode
        if (modo == 'hidden')
            $('video')[0].textTracks[0].mode = 'showing';
        else
            $('video')[0].textTracks[0].mode = 'hidden'
    })
}


function acabaMedia() {
    $('video').off('ended')
    $('audio').off('ended')

    $('video').on('ended', function () {
        posicion++
        if (posicion == media.length)
            posicion = 0
        seleccionaMedia('#' + posicion)
        acabaMedia()
        if ($('audio').length)
            $('audio')[0].play()
        else
            $('video')[0].play()
    })

    $('audio').on('ended', function () {
        posicion++
        if (posicion == media.length)
            posicion = 0
        seleccionaMedia('#' + posicion)
        acabaMedia()
        if ($('audio').length)
            $('audio')[0].play()
        else
            $('video')[0].play()
    })
}


function cambiarVolumen(vol) {
    if ($('audio').length)
        $('audio')[0].volume = vol
    else
        $('video')[0].volume = vol
    volumenTotal = vol
}


function adelantar() {
    if ($('audio').length)
        $('audio')[0].currentTime += 10
    else
        $('video')[0].currentTime += 10
}