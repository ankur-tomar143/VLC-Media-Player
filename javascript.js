
let openBtn = document.querySelector("#openBtn");
let inputBtn = document.querySelector(".mediaBtn");

openBtn.addEventListener("click", () => {
  inputBtn.click();
});

inputBtn.addEventListener("change", () => {
  let file = inputBtn.files[0];
  if (file) {
    let videoUrl = URL.createObjectURL(file);
    let main = document.querySelector("main");
    main.innerHTML = "";

    let videoEle = document.createElement("video");
    videoEle.src = videoUrl;
    videoEle.autoplay = true;
    videoEle.style.maxHeight = "100%";
    videoEle.style.objectFit = "contain";
    main.appendChild(videoEle);
    video = videoEle; 
  }
});

// ------------------video controls ------

let video = document.querySelector("video");
let playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  if (video) video.play();
});

let pauseBtn = document.getElementById("pauseBtn");
pauseBtn.addEventListener("click", () => {
  if (video) video.pause();
});

let stopBtn = document.getElementById("stopBtn");
stopBtn.addEventListener("click", () => {
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
});

let rewindBtn = document.getElementById("rewindBtn");
rewindBtn.addEventListener("click", () => {
  if (video) {
    video.currentTime = Math.max(0, video.currentTime - 10);
  }
});

let forwardBtn = document.getElementById("forwardBtn");

forwardBtn.addEventListener("click", () => {
  if (video) {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  }
});

let muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  if (video) {
    video.muted = !video.muted;

    // Optional: Change button text/icon
    // muteBtn.textContent = video.muted ? "Unmute" : "Mute";
  }
});

let fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  if (video) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
});

// ----------------------speed and volume ----

const speedup = document.querySelector("#speedup");
const speeddown = document.querySelector("#speeddown");

const volumeup = document.querySelector("#volumeup");
const volumedown = document.querySelector("#volumedown");

speedup.addEventListener("click", () => {
  const video = document.querySelector("video");
  if (video && video.playbackRate < 3.0) {
    // set a reasonable max limit
    video.playbackRate += 0.25;
  }
});

speeddown.addEventListener("click", () => {
  const video = document.querySelector("video");
  if (video && video.playbackRate > 0.25) {
    // set a reasonable min limit
    video.playbackRate -= 0.25;
  }
});

volumeup.addEventListener("click", () => {
  const video = document.querySelector("video");
  if (video && video.volume < 1) {
    video.volume = Math.min(1, video.volume + 0.1);
  }
});

// let volumeDownBtn = document.getElementById("volumeDownBtn");

volumedown.addEventListener("click", () => {
  const video = document.querySelector("video");
  if (video && video.volume > 0) {
    video.volume = Math.max(0, video.volume - 0.1);
  }
});

// ----------------------drag and drop -----

let mainSection = document.querySelector("main");

mainSection.addEventListener("dragover", (event) => {
  event.preventDefault();
});
let videoD = document.querySelector("video"); // Select your video element here

mainSection.addEventListener("drop", (event) => {
  //prevent default action taken by browser itself . make sure file should drag and drop
  event.preventDefault();
  let files = event.dataTransfer.files;
  if (files.length === 0) return;

  let file = files[0];

  // Check if it is a video
  if (file.type.startsWith("video/")) {
    let videoURL = URL.createObjectURL(file);
    videoD.src = videoURL;
    videoD.load();
    videoD.play();
    videoD.autoplay = true;
  } else {
    alert("Please drop a valid video file!");
  }
});
