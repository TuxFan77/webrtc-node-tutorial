const startButton = document.querySelector("#start-btn");
const endButton = document.querySelector("#end-btn");
const localVideo = document.querySelector(".local-video");

endButton.disabled = true;

const socket = io();
socket.on("gotmedia", msg => console.log("Other peer got media: ", msg));
socket.on("end", msg => console.log("Other peer ended call: ", msg));

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  endButton.disabled = false;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  localVideo.srcObject = stream;
  socket.emit("gotmedia", "Got webcam feed");
});

endButton.addEventListener("click", () => {
  const tracks = localVideo.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  localVideo.srcObject = null;
  startButton.disabled = false;
  endButton.disabled = true;
  socket.emit("end", "End call");
});
