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
      imgRequest.onload = addImages;
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

  function addImages() {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data && data.results && data.results.length > 1 ) {
          htmlContent = data.results.map(image => `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src="${image.urls.thumb}" class="card-img-top" alt="${image.alt_description}">
              <div class="card-body">
                <p class="card-text">
                  ${image.description}
                
            
            <span class="text-muted">
              ${image.user.name}
            </span></p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary"><a href="${image.links.download}">View</a></button>
                  <button type="button" class="btn btn-sm btn-outline-secondary"><a href="${image.links.html}">Download</button>
                </div>
              </div>
          </div> </div> </div>`).join('');
      } else {
          htmlContent = `<div class="error-no-image">No Image Available </div>`;
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
  }

})();