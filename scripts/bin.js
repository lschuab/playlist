const albumScroll = document.getElementById('album-scroll');
const bin = document.getElementById('bin');
const apiKey = '27c16b31f7afa331a59fd0bed30d96e1';
const tracks = document.getElementById('tracks');

// Implementation using original API
// axios.get('https://lit-fortress-6467.herokuapp.com/object')
//   .then(response => {
//       const data = response.data.results;
//       for (const album of data) {
//         albumScroll.insertAdjacentHTML('beforeend', `
//           <img src="images/${album.cover_art}" alt="" class="add-album" id="${album.artist}: ${album.title}">
//         `);
//       }
// });


document.getElementById('search-btn').addEventListener('click', e => {
  e.preventDefault();
  albumScroll.textContent = '';
  const searchTerms = document.getElementById('search-input').value;
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerms}&api_key=${apiKey}&format=json&limit=20`)
  .then(response => {
    const data = response.data.results.albummatches.album;
    for (const album of data) {
      albumScroll.insertAdjacentHTML('beforeend', `
        <img src="${album.image[3]['#text']}" alt="" class="add-album" id="${album.artist}: ${album.name}">
      `);
    }


  });
});



albumScroll.addEventListener('click', e => {
  if (e.target && e.target.nodeName === "IMG") {
    const selectedAlbum = document.getElementById('selected-album');
    selectedAlbum.textContent = '';

    tracks.textContent = '';

    const albumName = e.target.id.split(': ');
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${albumName[0]}&album=${albumName[1]}&api_key=${apiKey}&format=json`)
    .then(response => {
      const albumData = response.data.album;
      selectedAlbum.insertAdjacentHTML('beforeend', `
        <p>Add tracks from<p>
        <p>${e.target.id}</p>
        <img src="${albumData.image[3]['#text']}" alt="" id="selected-art">
      `);
      for (const track of albumData.tracks.track) {
        tracks.insertAdjacentHTML('beforeend', `
          <option>${track.name} \t${Math.floor(track.duration / 60)}:${track.duration % 60}</option>
        `);
      }
    });
  }
});

document.getElementById('arrow').addEventListener('click', e => {
  const selectedTrack = tracks.value;
  if (selectedTrack) {
    bin.textContent += selectedTrack + "\n";
  }
});

document.getElementById('clear-tracks-btn').addEventListener('click', e => {
  bin.textContent = '';
});

document.getElementById('submit-bin-btn').addEventListener( 'click', e => {
  axios.post('https://lit-fortress-6467.herokuapp.com/post', bin.textContent)
  .then(response => {
    console.log(response.data);
  });
});
