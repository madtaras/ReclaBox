(function () {
  require('../../node_modules/materialize-css/dist/js/materialize.js')

  document.querySelector('.sharing-block_favorite-btn')
    .addEventListener('click', function () {
      this.classList.toggle('favorited')
    })
})()
