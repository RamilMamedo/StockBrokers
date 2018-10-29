'use strict';

$(document).ready(function () {
  // Hamburger
  $('.hamburger').click(navbarMenu);
  $(document).on('click keydown', function (e) {
    if (e.target.className == 'navbar-overlay') {
      navbarMenu();
    }
    if (e.keyCode == 27) {
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
  //  Filter
  $('#filter').change(function () {
    var selectedID = $(this)[0].selectedIndex;
    var $selected = $(this).children('option:nth-child(' + (selectedID + 1) + ')');
    var option = $selected.attr('value').replace('option-', '');
    filterRowsBy(option);
  });
  //  Filtering reviews
  function filterRowsBy(options) {
    $('.partners-table--item').each(function () {
      if (options !== 'all' && options.length > 0) {
        var reviewShow = false,
            reviewCats = $(this).data('options').split(' ');
        console.log(reviewCats);
        // Display apposite elements
        for (i = 0; i < reviewCats.length - 1; i++) {
          if (options.indexOf(reviewCats[i]) != -1) {
            $(this).show(0);
            reviewShow = true;
            break;
          }
        }
        if (!reviewShow) $(this).hide(0);
      } else {
        $(this).show(0);
      }
    });
  }
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