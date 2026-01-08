const video = document.getElementById("bg-video");
const hasPlayed = localStorage.getItem("bgVideoPlayed");

function setImageBackground() {
  document.body.style.background =
    'url("/naach.png") center / cover no-repeat fixed';
}

if (!video) {
  setImageBackground();
} else if (hasPlayed) {
  // Video already played earlier
  video.style.display = "none";
  setImageBackground();
} else {
  // First visit: play video once
  video.addEventListener("ended", () => {
    localStorage.setItem("bgVideoPlayed", "true");
    video.style.display = "none";
    setImageBackground();
  });
}
