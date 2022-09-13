document.addEventListener('DOMContentLoaded', () => {
    const player = document.createElement('audio')
    player.style = 'display: none;'
    document.querySelector('body').appendChild(player)
    window.player = player

    document.querySelectorAll('.startasession__option').forEach(elem => {
        elem.addEventListener('click', (e) => {
            mountPlayerModal(
                e.target.getAttribute('data-file'),
                e.target.getAttribute('data-name')
            )
        })
    })
    
})

let mounted = false

function mountTrack() {
    const elem = document.querySelector('.controls')
    window.player.src = '/static/' + elem.getAttribute('data-track')
    window.player.load()
    mounted = true
}


function handlePlayButton() {
    if (window.player.paused) {
        if (!mounted) {
            mountTrack()
        }
        window.player.play()
        document.querySelector('#pause').innerHTML = 'pause'
    } else {
        window.player.pause()
        document.querySelector('#pause').innerHTML = 'play_arrow'
    }
}

function handleRestartButton() {
    window.player.currentTime = 0
}

function mountPlayerModal(file, name) {
    const div = document.createElement('div')
    div.setAttribute('id', 'modal')
    div.setAttribute('class', 'playmodal')
    div.innerHTML = `
        <div class="playmodal__header">${name}</div>
        <img src="../static/logo.png" alt="" class="logo">
        <div class="controls" data-track="${file}">
            <i onclick="handlePlayButton()" class="material-icons control" id="pause">play_arrow</i>
            <i onclick="handleRestartButton()" class="material-icons control" id="restart">replay</i>
            <i onclick="unMountPlayerModal()" class="material-icons control" id="exit">cancel</i>
        </div>
    `
    document.querySelector('body').appendChild(div)
}

function unMountPlayerModal() {
    const modal = document.getElementById('modal')
    modal.remove()
    window.player.src = '#'
    window.player.load()
    mounted = false
}