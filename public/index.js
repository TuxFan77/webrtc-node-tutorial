navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(
    (stream) => (document.querySelector(".local-video").srcObject = stream)
  );
