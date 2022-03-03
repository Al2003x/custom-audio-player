const player = document.querySelector(".player");
const btnPrev = document.querySelector(".btn__prev");
const btnNext = document.querySelector(".btn__next");
const btnPlay = document.querySelector(".btn__play");
const audio = document.querySelector(".player__audio");
const progressContainer = document.querySelector(".player__progress-container");
const progress = document.querySelector(".player__progress-input");
const songName = document.querySelector(".song-name");
const playImg = document.querySelector(".player__picture-img");
const btnImgPlay = document.querySelector(".btn__img-play");
const timeCurrent = document.querySelector(".current");
const timeDuraction = document.querySelector(".duraction");

const songsList = ["Ария 1100", "Ария грязь", "Ария зверь", "Ария штиль"];

let songIndex = 0;

function loadSong(song) {
  songName.innerHTML = song;
  audio.src = `./assets/audio/${song}.mp3`;
  audio.currentTime = 0;
  playImg.src = `./assets/img/img${songIndex + 1}.jpg`;
}

loadSong(songsList[songIndex]);

function playAudio() {
  player.classList.add("play");
  btnImgPlay.src = `./assets/svg/pause.svg`;
  audio.play();
}

function pauseAudio() {
  player.classList.remove("play");
  btnImgPlay.src = `./assets/svg/play.svg`;
  audio.pause();
}

btnPlay.addEventListener("click", () => {
  const isPlay = player.classList.contains("play");
  if (isPlay) {
    pauseAudio();
  } else {
    playAudio();
  }
});

function nextAudio() {
  songIndex++;
  if (songIndex > songsList.length - 1) {
    songIndex = 0
  }
  loadSong(songsList[songIndex]);
  playAudio()
}

btnNext.addEventListener('click', nextAudio);

function prevAudio() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsList.length -1;
  }
  loadSong(songsList[songIndex]);
  playAudio()
}

btnPrev.addEventListener('click', prevAudio);

audio.addEventListener('ended', nextAudio)

function showTime(duration) {
  let minutes = Math.floor(audio.duration / 60);
  let seconds = Math.floor(audio.duration % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  timeDuraction.innerHTML = `${minutes}:${seconds}`;
}

setTimeout(showTime, 400);

function progressTime() {
  progress.value = (audio.currentTime / audio.duration) * 100;

  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
     seconds = '0' + String(seconds)
  };
  timeCurrent.innerHTML = `${minutes}:${seconds}`
};

audio.addEventListener('timeupdate', progressTime);

function progressTimeStatus() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

progress.addEventListener('change', progressTimeStatus);

audio.addEventListener('timeupdate', showTime)

