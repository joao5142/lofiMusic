const titleMusic = document.getElementById("titleMusic");
const durationMusic = document.getElementById("durationMusic");
const btnPrev = document.getElementById("btnPrev");
const btnPlay = document.getElementById("btnPlay");
const btnNext = document.getElementById("btnNext");
const volumeRange = document.getElementById("volumeRange");
const btnVolume = document.getElementById("btnVolume");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
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

function setProgress(fullDuration, currentTime) {
  let percentage = (currentTime / fullDuration) * 100;
  progress.style.width = `${percentage}%`;
  //   console.log("POrcentagem : " + percentage);
}

// Listeners
btnPlay.addEventListener("click", playPauseMusic);

audioEl.addEventListener("timeupdate", (e) => {
  let currentTime = e.target.currentTime;
  let fullDuration = e.target.duration;
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);

  let timeString = `${"0" + minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  durationMusic.textContent = timeString;

  setProgress(fullDuration, currentTime);

  //   console.log(audioEl.duration);
  console.log(minutes + ":" + seconds);
});
audioEl.addEventListener("ended", nextMusic);

btnNext.addEventListener("click", nextMusic);
btnPrev.addEventListener("click", prevMusic);

//volume range
volumeRange.addEventListener("input", (e) => {
  audioEl.volume = e.target.value / 100;
});
//progressContainer
progressContainer.addEventListener("click", (e) => {
  console.log(e.offsetX);
});

loadMusic(musicas[indexMusic]);
