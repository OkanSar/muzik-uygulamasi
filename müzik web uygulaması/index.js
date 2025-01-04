const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    oncekiBtn = document.getElementById('onceki'),
    sonrakiBtn = document.getElementById('sonraki'),
    oynatBtn = document.getElementById('oynat'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/lofi_1000.mp3',
        displayName: 'Dream Rain',
        cover: 'assets/lofi_japon.jpg',
        artist: 'musicbyscandinavianz'
    },
    {
        path: 'assets/lofi_1001.mp3',
        displayName: 'Chill Loop - Cat',
        cover: 'assets/lofi_cat.png',
        artist: 'top chill lofi music'
    },
    {
        path: 'assets/lofi_1002.mp3',
        displayName: 'Scandinavianz - Tranvik',
        cover: 'assets/lofi_nature.jpg',
        artist: 'musicbyscandinavianz'
    },
    {
        path: 'assets/dance_1000.mp3',
        displayName: 'More Dance',
        cover: 'assets/dance.jpg',
        artist: 'Okan Sarıoğlu'
    },
    {
        path: 'assets/relax_1000.mp3',
        displayName: 'Piano(Relax-Slowed)',
        cover: 'assets/relax_piano.jpg',
        artist: 'Gustavo Daniel Sanches'
    }
];

let musicIndex =0;
let isPlaying =false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    oynatBtn.classList.replace('fa-play','fa-pause');
    oynatBtn.setAttribute('title','Durdur');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    oynatBtn.classList.replace('fa-pause','fa-play');
    oynatBtn.setAttribute('title','Oynat');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width)* music.duration;
}

oynatBtn.addEventListener('click',togglePlay);
oncekiBtn.addEventListener('click', () => changeMusic(-1));
sonrakiBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended',() => changeMusic(1));
music.addEventListener('timeupdate',updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);

