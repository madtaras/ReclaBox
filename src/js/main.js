(function () {
  require('../../node_modules/materialize-css/dist/js/materialize.js')
  var $ = require('jquery')

  // reaction (like) button appearance
  $('.sharing-block_favorite-btn').click(function () {
    $(this).toggleClass('favorited')
  })

  // nav seleted link underline appearance
  var selectedNavLinkUnderline = $('.page-nav_selected-link-underline')

  var coords = document.querySelector('.page-nav_link.selected').getBoundingClientRect()
  selectedNavLinkUnderline.css('top', coords.bottom - 5 + window.scrollY)
  selectedNavLinkUnderline.css('left', coords.left - 330)
  selectedNavLinkUnderline.css('width', coords.width)

  $('.page-nav_link').mouseover(function () {
    if ($(this).hasClass('hover')) return

    $('.page-nav_link.hover').removeClass('hover')
    $(this).addClass('hover')

    var coords = document.querySelector('.page-nav_link.hover').getBoundingClientRect()
    selectedNavLinkUnderline.css('top', coords.bottom - 5 + window.scrollY)
    selectedNavLinkUnderline.css('left', coords.left - 330)
    selectedNavLinkUnderline.css('width', coords.width)

    $(this).one('mouseleave', function () {
      $(this).removeClass('hover')
      var coords = document.querySelector('.page-nav_link.selected').getBoundingClientRect()
      selectedNavLinkUnderline.css('top', coords.bottom - 5 + window.scrollY)
      selectedNavLinkUnderline.css('left', coords.left - 330)
      selectedNavLinkUnderline.css('width', coords.width)
      $('.page-nav_link.selected').addClass('hover')
    })
  })

  // show and hide login popup
  $('.page-header_auth_link').click(function () {
    $('.login-popup').toggleClass('hidden')
  })
})()
