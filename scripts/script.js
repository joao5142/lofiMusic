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
  titleMusic.textContent = music.name + "__by_" + music.author;
  durationMusic.textContent = audioEl.duration;

  musicDuration = audioEl.duration;
}
function nextMusic() {
  indexMusic++;

  if (indexMusic > musicas.length - 1) {
    indexMusic = 0;
  }
  isPlaying = false;
  loadMusic(musicas[indexMusic]);
  playPauseMusic();
}

function prevMusic() {
  indexMusic--;

  if (indexMusic < 0) {
    indexMusic = musicas.length - 1;
  }
  isPlaying = false;
  loadMusic(musicas[indexMusic]);
  playPauseMusic();
}

function setProgress(fullDuration, currentTime) {
  let percentage = (currentTime / fullDuration) * 100;
  progress.style.width = `${percentage}%`;
}

// Listeners

//click no botão de play
btnPlay.addEventListener("click", playPauseMusic);

//evento que é disparado sempre que há uma mudança no tempo da música(tocando)
audioEl.addEventListener("timeupdate", (e) => {
  let currentTime = e.target.currentTime;
  let fullDuration = e.target.duration;
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);

  let timeString = `${"0" + minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  durationMusic.textContent = timeString;

  setProgress(fullDuration, currentTime);
});
//quando a música é finalizada
audioEl.addEventListener("ended", nextMusic);

//next e pre
btnNext.addEventListener("click", nextMusic);
btnPrev.addEventListener("click", prevMusic);

//volume range
volumeRange.addEventListener("input", (e) => {
  audioEl.volume = e.target.value / 100;
});

//progressContainer
progressContainer.addEventListener("click", function (e) {
  //e.offsetX pega onde o mouse foi clicado e o offsetWidth com o this ,pega o tamanho do container progresso maior(quem ta chamando o evento)
  let percentage = Math.floor((e.offsetX / this.offsetWidth) * 100);
  let duration = audioEl.duration;

  audioEl.currentTime = (percentage * duration) / 100;
});

//Carregando a música  quando o script é carregado
loadMusic(musicas[indexMusic]);
