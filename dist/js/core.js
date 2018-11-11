'use strict';

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: './js/data.json',
    success: function success(data) {
      console.log(data);
      console.log(data.data.today.rates);
      var txt = JSON.stringify(data.data.today.rates);
      // $('.currency-ticker').text(txt)
      jQuery.each(data.results, function (i, val) {
        // here you can do your magic
        $('.currency-ticker').append(document.createTextNode(val.term));
        $('.currency-ticker').append(document.createTextNode(val.count));
      });
    }
  });

  $('.currency').marquee({
    //speed in milliseconds of the marquee
    duration: 15000,
    //gap in pixels between the tickers
    gap: 50,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
    pauseOnHover: true,
    startVisible: true
  });

  // Hamburger
  $('.hamburger').click(navbarMenu);
  $(document).on('click', function (e) {
    if (e.target.className == 'navbar-overlay') {
      navbarMenu();
    }
  });
  function navbarMenu() {
    $('body').toggleClass('overflow-y-hide');
    setTimeout(function () {
      $('.hamburger').toggleClass('active');
      $('.header-navbar').toggleClass('open');
    }, 10);
  }

  // Filer Isotope
  var $grid = $('.partners-table').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows'
  });
  // Bind filter on select change
  $('#filter').on('change', function () {
    var filterValue = this.value;
    $grid.isotope({ filter: filterValue });
  });

  //  Rating Stars
  $('.stars li').on('mouseover', function () {
    var onStar = parseInt($(this).data('value'), 10);
    $(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('hover');
      } else {
        $(this).removeClass('hover');
      }
    });
  }).on('mouseout', function () {
    $(this).parent().children('li.star').each(function (e) {
      $(this).removeClass('hover');
    });
  });
  $('.stars li').one('click', function () {
    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
  });
  //  Sticky Sidebar
  $('.sticky-sidebar').theiaStickySidebar({
    containerSelector: '.sticky-sidebar-parent',
    additionalMarginTop: 20,
    additionalMarginBottom: 30
  });
});