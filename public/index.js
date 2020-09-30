const startButton = document.querySelector("#start-btn");
const endButton = document.querySelector("#end-btn");
const localVideo = document.querySelector(".local-video");

endButton.disabled = true;

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  endButton.disabled = false;
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => {
      console.log(stream);
      localVideo.srcObject = stream;
    });
});

endButton.addEventListener("click", () => {
  const tracks = localVideo.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  localVideo.srcObject = null;
  startButton.disabled = false;
  endButton.disabled = true;
});
