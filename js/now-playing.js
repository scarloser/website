// Discord avatar + Spotify "listening to" via the Lanyard API.
const DISCORD_ID = "259449904047456256";
const REFRESH_MS = 20000;

const avatar = document.getElementById("avatar");
const nowPlaying = document.getElementById("now-playing");
const nowPlayingLink = document.getElementById("np-link");

async function update() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
    const { data } = await res.json();

    const user = data?.discord_user;
    if (user?.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      avatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
    }

    const spotify = data?.spotify;
    if (data?.listening_to_spotify && spotify) {
      nowPlayingLink.textContent = `${spotify.song} – ${spotify.artist}`;
      nowPlayingLink.href = `https://open.spotify.com/track/${spotify.track_id}`;
      nowPlaying.hidden = false;
    } else {
      nowPlaying.hidden = true;
    }
  } catch {
    // API unreachable, keep the default state
  }
}

update();
setInterval(update, REFRESH_MS);
