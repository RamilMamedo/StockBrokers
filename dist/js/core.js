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

  // Preloader
  var articles = $('.articles--grid');
  articles.prev('.preload--spinner').fadeOut(100, function () {
    articles.css({
      opacity: '1'
    });
  });

  // Currency rates
  var ticker = $('.currency-ticker');
  if (ticker.length > 0) {
    var ratesAPI = location.origin + ticker.data('api');
    // Taking "EUR" as a base currency by default
    if (ticker.data('base').length > 0) ratesAPI += '?base=' + ticker.data('base');else ratesAPI += '?base=EUR';
    // Specify which currencies to fetch
    if (ticker.data('symbols').length > 0) ratesAPI += '&symbols=' + ticker.data('symbols');

    $.getJSON(ratesAPI, function (data, status) {
      if (status === 'success') {
        var exchangeRates = {
          base: data.data['today'].base,
          today: data.data['today'].rates,
          yesterday: data.data['yesterday'].rates
        };

        initCurrencyTicker(ticker, exchangeRates);
      }
    });
  }

  // Initialize ticker
  function initCurrencyTicker(ticker, exchangeRates) {
    var tickerList = ticker.find('.ticker--content ul');
    var tickerListHTML = tickerList.html();
    // Place data into separate objects
    var latest = exchangeRates['today'],
        last = exchangeRates['yesterday'],
        base = exchangeRates['base'];
    // Calculate flow, difference and percent change before passing items to DOM
    for (var c in latest) {
      var diff, flow, percent;
      diff = latest[c] - last[c];
      percent = (diff / last[c] * 100.0).toFixed(2);
      percent = percent == 0 ? 0 .toFixed(2) : percent;
      if (percent == 0) flow = 'const';else if (percent > 0) flow = 'asc';else if (percent < 0) flow = 'desc';
      // HTML list item as a string
      var tickerItem = '<li class="ticker--currency">\n        <span>' + base + ' ' + c + '</span>\n        <span>' + latest[c].toFixed(4) + '</span>\n        <span class="percent ' + flow + '">' + percent + '%</span>\n      </li>';
      tickerListHTML += tickerItem;
    }
    // Pass items to HTML list
    tickerList.prev('.preload--spinner').fadeOut(100, function () {
      tickerList.html(tickerListHTML);
      ticker.currencyTicker({
        effect: 'scroll',
        scrollType: 'continuous',
        scrollStart: 'inside',
        scrollInterval: 20,
        transitionTime: 500,
        autoplay: true
      });
    });
  }
});