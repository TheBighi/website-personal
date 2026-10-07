const API_KEY = "4d288c1c7310848430dd818561af10c7";
const USER = "TheBighi";

const get = id => document.getElementById(id);


// LAST.FM
async function updateMusic() {
    try {
        const url =
            `https://ws.audioscrobbler.com/2.0/` +
            `?method=user.getrecenttracks` +
            `&user=${USER}` +
            `&api_key=${API_KEY}` +
            `&format=json` +
            `&limit=1`;

        const response = await fetch(url);
        const data = await response.json();

        const track = data.recenttracks.track[0];

        const playing = track["@attr"]?.nowplaying === "true";

        get("status").textContent = playing
            ? "Now Playing:"
            : "Last Played:";

        get("song-title").textContent = track.name;
        get("artist").textContent = track.artist["#text"];

    } catch (error) {
        get("status").textContent = "Couldn't load music.";
    }
}

updateMusic();
setInterval(updateMusic, 15000);
