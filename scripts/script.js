const titleMusic = document.getElementById("titleMusic");
const durationMusic = document.getElementById("durationMusic");
const btnPrev = document.getElementById("btnPrev");
const btnPlay = document.getElementById("btnPlay");
const btnNext = document.getElementById("btnNext");
const volumeRange = document.getElementById("volumeRange");
const btnVolume = document.getElementById("btnVolume");

const audioEl = document.getElementById("audio");

let isPlaying = false;
let musicDuration = "";
let indexMusic = 0;
//Functions
function playPauseMusic() {
  if (isPlaying) {
    audioEl.pause();
    btnPlay.src = "assets/play-button.svg";
  } else {
    audioEl.play();
    btnPlay.src = "assets/pause-button.svg";
  }
  isPlaying = !isPlaying;
}
function loadMusic(music) {
  audioEl.src = music.url;

  titleMusic.textContent = music.name;

  durationMusic.textContent = audioEl.duration;
  musicDuration = audioEl.duration;

  playPauseMusic();
  console.log(musicDuration);
}
function nextMusic() {
  indexMusic++;

  if (indexMusic > musicas.length - 1) {
    indexMusic = 0;
  }
  isPlaying = false;
  loadMusic(musicas[indexMusic]);
}
function prevMusic() {
  indexMusic--;

  if (indexMusic < 0) {
    indexMusic = musicas.length - 1;
  }
  isPlaying = false;
  loadMusic(musicas[indexMusic]);
}
function setProgress() {}

// Listeners
btnPlay.addEventListener("click", playPauseMusic);

audioEl.addEventListener("timeupdate", (e) => {
  let currentTime = e.target.currentTime;
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);

  let timeString = `${"0" + minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  durationMusic.textContent = timeString;

  setProgress();

  console.log(audioEl.duration);
  console.log(minutes + ":" + seconds);
});

btnNext.addEventListener("click", nextMusic);
btnPrev.addEventListener("click", prevMusic);

//volume range
volumeRange.addEventListener("input", (e) => {
  audioEl.volume = e.target.value / 100;
});

loadMusic(musicas[indexMusic]);
