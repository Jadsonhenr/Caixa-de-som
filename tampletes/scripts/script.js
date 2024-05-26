const songsList = [
    {
        name: "Ainda Gosto Dela",
        artist: "Skank",
        src: "tampletes/assets/music/1.m4a",
        cover: "tampletes/assets/1.jpg"
    },
    {
        name: "Agora o Meu Coração É Um Lixeiro",
        artist: "Cidade Dormitório",
        src: "tampletes/assets/music/2.m4a",
        cover: "tampletes/assets/2.jpg"
    },
    {
        name: "Automotivo",
        artist: "Bibi Fogosa ",
        src: "tampletes/assets/music/3.m4a",
        cover: "tampletes/assets/3.jpg"
    },
    {
        name: "SPIT IN MY FACE!",
        artist: "ThxSoMch",
        src: "tampletes/assets/music/4.m4a",
        cover: "tampletes/assets/4.jpg"
    },
    {
        name: "Psycho Dreams",
        artist: "Kill Eva",
        src: "tampletes/assets/music/5.m4a",
        cover: "tampletes/assets/5.jpg"
    },
    {
        name: "JOÃO E MARIA",
        artist: "Chico Buarque",
        src: "tampletes/assets/music/6.m4a",
        cover: "tampletes/assets/6.png"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}