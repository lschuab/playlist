axios.get('https://lit-fortress-6467.herokuapp.com/object')
  .then(response => {
      const data = response.data.results;
      const selectedPics = [];
      let picIndex = 0;
      for (let i = 1; i <= 3; i++) {
        do {
          picIndex = Math.floor(Math.random() * data.length);
        } while (selectedPics.includes(picIndex));
        selectedPics.push(picIndex);
        document.getElementById(`album${i}`).src = `images/${data[picIndex].cover_art}`;
      }
});
