//initialising variables

let songIndex = 0;
let audioEle = new Audio("audio/audio1.mp4");
let play = document.getElementById("Play");
let progressBar = document.getElementById("progress");

let songs = [
  {
    songNm: "Fight Back - Neffex",
    filePath: "audio/audio1.mp4",
    coverPath: "cover-img/cover1.jpg",
  },
  {
    songNm: "Grateful - Neffex",
    filePath: "audio/audio2.mp4",
    coverPath: "cover-img/cover2.jpg",
  },
  {
    songNm: "Careless - Neffex",
    filePath: "audio/audio3.mp4",
    coverPath: "cover-img/cover3.jpg",
  },
  {
    songNm: "Rumors - Neffex",
    filePath: "audio/audio4.mp4",
    coverPath: "cover-img/cover4.jpg",
  },
  {
    songNm: "Cold - Neffex",
    filePath: "audio/audio5.mp4",
    coverPath: "cover-img/cover5.jpg",
  },
  {
    songNm: "Destiny - Neffex",
    filePath: "audio/audio6.mp4",
    coverPath: "cover-img/cover6.jpg",
  },
];

//handling play/pause
play.addEventListener("click", () => {
  if (audioEle.paused || audioEle.currentTime <= 0) {
    audioEle.play();

    // play.remove('svg');
  } else {
    audioEle.pause();
  }
});

//progress bar updation

audioEle.addEventListener("timeupdate", () => {
  progress = parseInt((audioEle.currentTime / audioEle.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioEle.currentTime = (progressBar.value * audioEle.duration) / 100;
});

//handling audio list

let songItems = Array.from(document.getElementsByClassName("songItem"));

songItems.forEach((element, i) => {
  // console.log(element, i);

  element.getElementsByTagName("img")[0].src = songs[i].coverPath;

  element.getElementsByClassName("songName")[0].innerText = songs[i].songNm;
});

//handling it's button

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // console.log(e);

      songIndex = parseInt(e.target.id);

      audioEle.src = `audio/audio${songIndex + 1}.mp4`;
      audioEle.currentTime = 0;
      audioEle.play();
    });
  }
);

//handling next/prev button

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioEle.src = `audio/audio${songIndex + 1}.mp4`;
  audioEle.currentTime = 0;
  audioEle.play();
});

document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioEle.src = `audio/audio${songIndex + 1}.mp4`;
  audioEle.currentTime = 0;
  audioEle.play();
});

let ascendingOrder = true;

function sortSongs() {
  const songContainer = document.querySelector(".songItemContainer");
  const songItems = Array.from(songContainer.querySelectorAll(".songItem"));

  songItems.sort((a, b) => {
    const songNameA = a.querySelector(".songName").textContent.toLowerCase();
    const songNameB = b.querySelector(".songName").textContent.toLowerCase();

    const orderFactor = ascendingOrder ? 1 : -1;

    return orderFactor * songNameA.localeCompare(songNameB);
  });

  songContainer.innerHTML = "";
  songItems.forEach((songItem) => {
    songContainer.appendChild(songItem);
  });

  ascendingOrder = !ascendingOrder;
}

//deleting logic

let delIcons = document.querySelectorAll(".del-icon");

delIcons.forEach(function (delIcon) {
  delIcon.addEventListener("click", function () {
    let songItem = this.parentElement;
    songItem.parentElement.removeChild(songItem);
  });
});
