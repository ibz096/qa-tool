const start = document.getElementById("start");
const stop = document.getElementById("stop");
const download = document.getElementById("download");
const video = document.querySelector("video");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = (e) => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
    download.href = video.src;
    console.log(video.src);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});

// function blobToFile(theBlob, fileName){
//   //A Blob() is almost a File() - it's just missing the two properties below which we will add
//   theBlob.lastModifiedDate = new Date();
//   theBlob.name = fileName;
//   return theBlob;
// }
