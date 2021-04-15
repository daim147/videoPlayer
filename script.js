const player = document.querySelector('.player')
const video = document.querySelector("video");
const progresRange = document.querySelector(".progress-range");
const progresBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const currentDuration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function tooglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// Calculate Display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

// Update Progress  bbar as video plays
function updateProgress() {
  progresBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  currentDuration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = (e.offsetX / e.srcElement.offsetWidth) * video.duration;
  video.currentTime = newTime;
  updateProgress();
}
// Volume Controls --------------------------- //
let lastVolume = 1;

// volume icon depending on volume
function volumeIconclass(volume) {
  volumeIcon.className = "";
  volumeBar.style.width = `${volume * 100}%`;
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-mute");
  }
}
// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / e.srcElement.offsetWidth;
  // Rounding volume
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  video.volume = volume;
  // Change Icon
  volumeIconclass(volume);
}

// Mute and Unmute
function toggleMute() {
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIconclass(video.volume);
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeIconclass(lastVolume);
    volumeIcon.setAttribute("title", "Mute");
  }
}
// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')

}

let fullscreen = false;

function toggleFullscreen() {
    if(!fullscreen){
        openFullscreen(player)
    }else{
        closeFullscreen()
    }
    fullscreen = !fullscreen
}

// Event Listeners
playBtn.addEventListener("click", tooglePlay);
video.addEventListener("click", tooglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progresRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
