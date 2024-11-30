// Sample music data
const songs = [{
    id: 1,
    title: "Shape of you",
    artist: "Ed Sheeran",
    genre: "rock",
    image: "https://i.ytimg.com/vi/JGwWNGJdvx8/sddefault.jpg",
    audio: "./media/Shape of You.mp3",
  },
  {
    id: 2,
    title: "Tum Hi Ho ",
    artist: "Mithoon and Arijit Singh",
    genre: "romantic",
    image: "https://i1.sndcdn.com/artworks-000303244365-9rtyxm-t500x500.jpg",
    audio: "./media/01 Tum Hi Ho - Aashiqui 2 (Arijit Singh) 320Kbps.mp3",
  },
  {
    id: 3,
    title: "Sajde",
    artist: "Arijit Singh, Gulzar, and Nihira Josh",
    genre: "pop",
    image: "https://c.saavncdn.com/579/Kill-Dil-Hindi-2014-20190329150126-500x500.jpg",
    audio: "./media/02 - Sajde.mp3",
  },
  {
    id: 4,
    title: "Tu Zaroori",
    artist: "Shaarib Sabri and Sunidhi Chauhan",
    genre: "rock",
    image: "https://i.scdn.co/image/ab67616d0000b27399945eca0458b5483d460579",
    audio: "./media/02 Tu Zaroori - 320kbps.mp3",
  },
];

let currentSongIndex = -1;
let isPlaying = false;
let playlists = [{
  name: "My Favorites",
  songs: [],
}, ];

// Initialize the app
function init() {
  renderSongs(songs);
}

// Render songs list
function renderSongs(songsToRender) {
  const songsList = document.getElementById("songs-list");
  songsList.innerHTML = songsToRender
    .map(
      (song, index) => `
        <li class="song-item" onclick="selectSong(${index})">
            ${song.title} - ${song.artist}
        </li>
    `
    )
    .join("");
}

// Filter songs by genre
function filterSongs() {
  const genre = document.getElementById("genre-filter").value;
  const filteredSongs =
    genre === "all" ? songs : songs.filter((song) => song.genre === genre);
  renderSongs(filteredSongs);
}

function selectSong(index) {
  currentSongIndex = index;
  const song = songs[index];

  // Update song details
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-artist").textContent = song.artist;
  document.querySelector(".song-image").src = song.image;

  // Update and play audio
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = song.audio;
  audioPlayer.play();

  // Update play/pause button
  const playButton = document.querySelector(".control-btn:nth-child(2)");
  playButton.textContent = "next";
  isPlaying = true;
}

function playSong() {
  const audioPlayer = document.getElementById("audio-player");
  isPlaying = !isPlaying;

  if (isPlaying) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }

  // Update play/pause button text
  const playButton = document.querySelector(".control-btn:nth-child(2)");
  playButton.textContent = isPlaying ? "Pause" : "Play";
}

// // Previous song

// Previous song
function prevSong() {
  if (currentSongIndex > 0) {
    selectSong(currentSongIndex - 1);
  } else {
    selectSong(songs.length - 1);
  }
}

// Next song
function nextSong() {
  if (currentSongIndex < songs.length - 1) {
    selectSong(currentSongIndex + 1);
  } else {
    selectSong(songs.length + 1);
  }
}

// Create new playlist
function createPlaylist() {
  const name = prompt("Enter playlist name:");
  if (name) {
    playlists.push({
      name,
      songs: [],
    });
    renderPlaylists();
  }
}

// Add current song to playlist
function addToPlaylist() {
  if (currentSongIndex === -1) return;
  const playlistIndex = prompt("Enter playlist number (0 for My Favorites):");
  if (playlistIndex !== null && playlists[playlistIndex]) {
    playlists[playlistIndex].songs.push(songs[currentSongIndex]);
    alert("Song added to playlist!");
  }
}

// Render playlists
function renderPlaylists() {
  const playlistsContainer = document.getElementById("playlists");
  playlistsContainer.innerHTML = playlists
    .map(
      (playlist) => `
        <div class="playlist-item">${playlist.name}</div>
    `
    )
    .join("");
}
// Theme toggle functionality
function toggleTheme(checkbox) {
  // Toggle theme class
  document.body.classList.toggle("light-theme");

  // Update label text
  const label = document.getElementById("theme-label");
  label.textContent = checkbox.checked ? "Light Mode" : "Dark Mode";

  // Save preference to localStorage (optional)
  localStorage.setItem("theme", checkbox.checked ? "light" : "dark");
}

// Check for saved user preference
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    const checkbox = document.getElementById("checkbox");
    checkbox.checked = savedTheme === "light";
    toggleTheme(checkbox);
  }
};

// Initialize the app
init();