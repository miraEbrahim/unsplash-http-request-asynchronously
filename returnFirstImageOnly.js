(function () {

  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
      e.preventDefault();
      responseContainer.innerHTML = '';
      searchedForText = searchField.value;

      /**
          Steps you need to take to send an HTTP request asynchronously with JavaScript
      **/
      // 1. create an XHR object with the s constructor function
      const imgRequest = new XMLHttpRequest();
      // 2. set the .onload property - set this to a function that will run upon a successful fetch
      imgRequest.onload = addImage;
      // 3. set the .onerror property - set this to a function that will run when an error occurs
      imgRequest.onerror = function (err) {
          requestError(err, 'image');
      };
      // 4. use the .open() method - set the HTTP method and the URL of the resource to be fetched
      imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
      // 5. include a header with the request is setRequestHeader.
      imgRequest.setRequestHeader('Authorization', 'Client-ID 39cf9cf458a5a9af2344973dfde0c5a2ab44ff570395c9f6f09dacb42af11caa');
      // 6. use the .send() method - send the request
      imgRequest.send();
  });

  function addImage() {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data && data.results && data.results[0]) {
          const firstImage = data.results[0];

          htmlContent = 
      `<div class="card">
      <img src="${firstImage.urls.regular}" class="card-img-top" alt="${firstImage.alt_description}">
      <div class="card-body">
        <h5 class="card-title">${firstImage.user.name}</h5>
        <p class="card-text">${firstImage.description}</p>
    </div> `;
      } else {
          htmlContent = `<div class="error-no-image">No Image Available </div>`;
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
  }

})();