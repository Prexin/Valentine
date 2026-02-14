// Shared script for both pages: photo.html and song.html

// photo.html interactions
const surpriseBtn = document.getElementById("surprise-btn");
const surpriseBox = document.getElementById("surprise");
if (surpriseBtn && surpriseBox) {
  surpriseBtn.addEventListener("click", () => {
    surpriseBox.style.display = "block";
    surpriseBtn.style.display = "none";
  });
}

const yesBtn = document.getElementById("yes-btn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    alert("Yeyyy! I love you nduttt! <3");
  });
}

const heartsContainer = document.getElementById("hearts");
function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️‍🩹";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}
if (heartsContainer) {
  setInterval(createHeart, 500);
}

document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", () => {
    alert("A beautiful memory with u! <3");
  });
});

const bgMusic = document.getElementById("bg-music");
let shouldResumeMusic = false;

if (surpriseBtn && bgMusic) {
  surpriseBtn.addEventListener("click", () => {
    bgMusic.muted = false;
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
  });
}

if (bgMusic) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      shouldResumeMusic = !bgMusic.paused;
      bgMusic.pause();
    } else if (shouldResumeMusic) {
      bgMusic.play().catch(() => {});
      shouldResumeMusic = false;
    }
  });

  window.addEventListener("pagehide", () => {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  });
}

// song.html music player
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progressFill = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");
const songList = document.getElementById("songList");
const playerCard = document.getElementById("playerCard");

const songs = [
  {
    title: "Kekal",
    artist: "Nadin Amizah",
    file: "music/Nadin Amizah - Kekal (Official Lyric Video) - Nadin Amizah.mp3",
    cover: "image/kekal.jpg",
    themeA: "#bcbcbc",
    themeB: "#acacac",
    glow: "rgba(255, 255, 255, 0.45)",
    textMain: "#000000",
    textSoft: "rgba(255, 255, 255, 0.86)",
    titleColor: "#000000",
    subtitleColor: "#000000",
    listColor: "#3f4a66",
    listActiveColor: "#1f2640",
    linkColor: "#3f4a66",
  },
  {
    title: "Tapi Diterima",
    artist: "Nadin Amizah",
    file: "music/Nadin Amizah - Tapi Diterima (Official Lyric Video) - Nadin Amizah.mp3",
    cover: "image/kekal.jpg",
    themeA: "#999999",
    themeB: "#848484",
    glow: "rgba(255, 255, 255, 0.45)",
    textMain: "#525252",
    textSoft: "rgba(255, 255, 255, 0.86)",
    titleColor: "#555555",
    subtitleColor: "#4d4d4d",
    listColor: "#444444",
    listActiveColor: "#202020",
    linkColor: "#444444",
  },
  {
    title: "Semua Aku Dirayakan",
    artist: "Nadin Amizah",
    file: "music/Nadin Amizah - Semua Aku Dirayakan (Official Lyric Video) - Nadin Amizah.mp3",
    cover: "image/kekal.jpg",
    themeA: "#8d8d8d",
    themeB: "#646464",
    glow: "rgba(255, 255, 255, 0.45)",
    textMain: "#ffffff",
    textSoft: "rgba(255, 255, 255, 0.84)",
    titleColor: "#000000",
    subtitleColor: "#000000",
    listColor: "#3b3b3b",
    listActiveColor: "#121212",
    linkColor: "#3b3b3b",
  },
  {
    title: "Love.",
    artist: "Wave to Earth",
    file: "music/wave to earth - love. (Official Lyric Video) - wave to earth.mp3",
    cover: "image/love..jpg",
    themeA: "#bacce7",
    themeB: "#687da9",
    glow: "rgba(133, 133, 133, 0.45)",
    textMain: "#ffffff",
    textSoft: "rgba(240, 247, 255, 0.85)",
    titleColor: "#324f7c",
    subtitleColor: "#46618c",
    listColor: "#324f7c",
    listActiveColor: "#1b335b",
    linkColor: "#324f7c",
  },
    {
    title: "Lalu Biru",
    artist: "Elanor Whisper",
    file: "music/Lalu Biru - eleanor whisper.mp3",
    cover: "image/lalu biru.jpg",
    themeA: "#ff2b2b",
    themeB: "#aa0000",
    glow: "rgba(255, 112, 112, 0.45)",
    textMain: "#ffffff",
    textSoft: "rgba(255, 232, 232, 0.9)",
    titleColor: "#8f1111",
    subtitleColor: "#b01d1d",
    listColor: "#8f1111",
    listActiveColor: "#600909",
    linkColor: "#8f1111",
  },
];

let index = 0;
let isPlaying = false;
let shouldResumePlayer = false;

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function updatePlaylistUI() {
  if (!songList) return;
  document.querySelectorAll(".song-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function animateChange() {
  if (!playerCard || !cover) return;
  playerCard.classList.add("animate");
  cover.classList.add("animate");

  setTimeout(() => {
    playerCard.classList.remove("animate");
    cover.classList.remove("animate");
  }, 500);
}

function applySongTheme(song) {
  const root = document.documentElement;
  if (!root || !song) return;
  root.style.setProperty("--theme-a", song.themeA || "#bcbcbc");
  root.style.setProperty("--theme-b", song.themeB || "#cfe5ff");
  root.style.setProperty("--theme-glow", song.glow || "rgba(125, 184, 255, 0.45)");
  root.style.setProperty("--text-main", song.textMain || "#ffffff");
  root.style.setProperty("--text-soft", song.textSoft || "rgba(255, 255, 255, 0.85)");
  root.style.setProperty("--title-color", song.titleColor || "#365a94");
  root.style.setProperty("--subtitle-color", song.subtitleColor || "#4c6ea7");
  root.style.setProperty("--list-color", song.listColor || "#365a94");
  root.style.setProperty("--list-active-color", song.listActiveColor || "#1f3c6c");
  root.style.setProperty("--link-color", song.linkColor || "#3a5f9e");
}

function loadSong(i) {
  if (!audio || !title || !artist || !cover) return;
  title.textContent = songs[i].title;
  artist.textContent = songs[i].artist;
  cover.src = songs[i].cover;
  audio.src = songs[i].file;
  applySongTheme(songs[i]);
  updatePlaylistUI();
  animateChange();
}

function renderPlaylist() {
  if (!songList) return;
  songList.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song-item");
    div.textContent = `${song.title} - ${song.artist}`;

    div.onclick = () => {
      index = i;
      loadSong(index);
      if (!audio || !playBtn) return;
      audio.play().catch(() => {});
      playBtn.textContent = "⏸";
      isPlaying = true;
      document.body.classList.add("playing");
    };

    songList.appendChild(div);
  });
}

function togglePlay() {
  if (!audio || !playBtn) return;
  if (!isPlaying) {
    audio.play().catch(() => {});
    playBtn.textContent = "⏸";
    isPlaying = true;
    document.body.classList.add("playing");
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
    document.body.classList.remove("playing");
  }
}

function nextSong() {
  if (!audio || !playBtn) return;
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play().catch(() => {});
  playBtn.textContent = "⏸";
  isPlaying = true;
  document.body.classList.add("playing");
}

function prevSong() {
  if (!audio || !playBtn) return;
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play().catch(() => {});
  playBtn.textContent = "⏸";
  isPlaying = true;
  document.body.classList.add("playing");
}

function setProgress(event) {
  if (!audio || !audio.duration) return;
  const bar = event.currentTarget;
  const rect = bar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  audio.currentTime = (clickX / rect.width) * audio.duration;
}

if (audio && progressFill && currentTimeEl && durationEl) {
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressFill.style.width = progress + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", () => {
    nextSong();
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    if (playBtn) playBtn.textContent = "⏸";
    document.body.classList.add("playing");
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    if (playBtn) playBtn.textContent = "▶";
    document.body.classList.remove("playing");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      shouldResumePlayer = !audio.paused;
      audio.pause();
    } else if (shouldResumePlayer) {
      audio.play().catch(() => {});
      shouldResumePlayer = false;
    }
  });
}

if (audio && title && artist && cover && songList && playBtn) {
  renderPlaylist();
  loadSong(index);
  window.togglePlay = togglePlay;
  window.nextSong = nextSong;
  window.prevSong = prevSong;
  window.setProgress = setProgress;
}
