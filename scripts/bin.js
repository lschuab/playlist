const albumScroll = document.getElementById('album-scroll');
const bin = document.getElementById('bin');

axios.get('https://lit-fortress-6467.herokuapp.com/object')
  .then(response => {
      const data = response.data.results;
      for (const album of data) {
        albumScroll.insertAdjacentHTML('beforeend', `
          <img src="images/${album.cover_art}" alt="" class="add-album" id="${album.artist}: ${album.title}">
        `);
      }
});



albumScroll.addEventListener('click', e => {
  if (e.target && e.target.nodeName === "IMG") {
    bin.textContent += e.target.id + "\n";
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
