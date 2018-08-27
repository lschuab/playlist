// Implementation with original API
// axios.get('https://lit-fortress-6467.herokuapp.com/object')
//   .then(response => {
//       const data = response.data.results;
//       const selectedPics = [];
//       let picIndex = 0;
//       for (let i = 1; i <= 3; i++) {
//         do {
//           picIndex = Math.floor(Math.random() * data.length);
//         } while (selectedPics.includes(picIndex));
//         selectedPics.push(picIndex);
//         document.getElementById(`album${i}`).src = `images/${data[picIndex].cover_art}`;
//       }
// });

// Uses lastFM API to get current top 50 artists, chooses three f those at radom, then uses the api again to get the image of the top album of each of those three artists
const apiKey = '27c16b31f7afa331a59fd0bed30d96e1';
const albums = [];

axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`)
.then(response => {
  const promiseArr = [];
  const topArtists = response.data.artists.artist;
  const selectedArtists = [];
  let artistIndex = 0;
  for (let i = 1; i <= 3; i++) {
    do {
      artistIndex = Math.floor(Math.random() * topArtists.length);
    } while (selectedArtists.includes(artistIndex));
    selectedArtists.push(artistIndex);
    promiseArr.push(axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${topArtists[artistIndex].name}&api_key=${apiKey}&format=json&limit=1`));
  }
  return Promise.all(promiseArr);
})
.then(promises => {
  for (let i = 0; i< 3; i++ ) {
      document.getElementById(`album${i + 1}`).src = promises[i].data.topalbums.album[0].image[3]['#text'];
  }
});
