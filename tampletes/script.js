const songList = [
    {
        name:"Jazz In Paris",
        artist:"Media Right Productions",
        src:"tampletes/assets/imgDoPorDoSol.mp3",
        cover:"tampletes/assets/music/musicaTeste01.jpg"
    },
    {
        name:"Blue Skies",
        artist:"Silent Partner",
        src:"tampletes/assets/1.mp3",
        cover:"tampletes/assets/1.jpg"
    },
    {
        name:"Crimson Fly",
        artist:"Huma-Huma",
        src:"tampletes/assets/2.mp3",
        cover:"tampletes/assets/music/2.jpg"
    },
];
const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.querySelector('#cover');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const prog= document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing =false;

document.addEventListener('DOMContentLoaded',()=>{
    loadSong(currentSong);
    song.addEventListener('timeupdate',updateProgress);
    song.addEventListener('ended',nextSong);
    prevBtn.addEventListener('click',prevSong);
    nextBtn.addEventListener('click',nextSong);
    playBtn.addEventListener('click',togglePLayPause);
    prog.addEventListener('click',seek);
});

function loadSong(index){
    const {name, artist, src, cover:thunb} = songList[index];
    artistName.innerText = artist;
    musicName.innerText =name;
    song.src = src;
    cover.style.backgroundImage = `url(${thunb})`;
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
function formatTime(seconds){
    const minutes = math.floor(seconds/60);
    const secs = math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0': ''}${secs}`;
    
}

function togglePLayPause(){
    if(playing){
        song.pause()
    }else{
        song.play();
    }
    playing = !playing
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active',playing);

}
function nextSong(){
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}
function prevSong(){
    currentSong = (currentSong - 1 + songList.length);
    songList.length;
    playMusic();
}
function playMusic(){
    loadSong(currentSong);
    song.play();
    playing =true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}
function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}

