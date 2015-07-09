$.fn.onAvailable = function(fn){
    var sel = this.selector;
    var timer;
    var self = this;
    if (this.length > 0) {
        fn.call(this);
    } else {
        timer = setInterval(function(){
            if ($(sel).length > 0) {
                fn.call($(sel));
                clearInterval(timer);
            }
        },50);
    }
};

function getEngadgetFeed()
{
  $('#engadget-container').html('');
  $.get('http://www.engadget.com/rss.xml', function (data) {
    var count = 1;
    $(data).find('item').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      
      $('#engadget-container').append('<button id="expand-' + contentID + '">+</button><a href="' + $(this).find('link').text() + '" target="_blank">' + $(this).find('title').text() + '</a><br>');
      $('#engadget-container').append('<span id="description-' + contentID + '" class="hidden">' + $(this).find('description').text() + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

$(getEngadgetFeed);

function getFinanceFeed()
{
  $('#google-finance-container').html('');
  var stocks = ['MUTF:FCNTX', 'NASDAQ:GOOG', 'NASDAQ:AAPL', 'NASDAQ:MSFT', 'NASDAQ:AMZN', 'NASDAQ:FB', 'NYSE:TWTR'];
  $.each(stocks, function(index, value) {
      $.get('https://www.google.com/finance?q=' + value, function (data) {
        $('#google-finance-container').append('<div><a href="https://www.google.com/finance?q=' + value + '" target="_blank">' + value + '</a></div>');
        var changeDollars = $(data).find('.ch').children('span:first-child').text();
        var changePercent = $(data).find('.ch').children('span:nth-child(2)').text();
        if (changeDollars >= 0) {
          var color = 'green';
        } else {
          var color = 'red';
        }
        if (value == 'MUTF:FCNTX') {
          $('#google-finance-container').append('<div style="color: ' + color + '">' + $(data).find('#price-panel').children('span:first-child').text() + ' ' + changeDollars + ' ' + changePercent + '</div>');
        } else {
          $('#google-finance-container').append('<div style="color: ' + color + '">' + $(data).find('#price-panel').children('div:first-child').text() + '</div>');
        }
      });
  });
  
}

$(getFinanceFeed);

function getESPNFeed()
{
  $('#espn-container').html('');
  $.get('http://sports.espn.go.com/espn/rss/nfl/news', function (data) {
    var count = 1;
    $(data).find('item').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      
      $('#espn-container').append('<button id="expand-' + contentID + '">+</button><a href="' + $(this).find('link').text() + '" target="_blank">' + $(this).find('title').text() + '</a><br>');
      $('#espn-container').append('<span id="description-' + contentID + '" class="hidden details">' + $(this).find('description').text() + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

$(getESPNFeed);

function getSeahawksFeed()
{
  $('#seahawks-container').html('');
  $.get('http://www.seattletimes.com/sports/feed/', function (data) {
    var count = 1;
    $(data).find('item').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      
      $('#seahawks-container').append('<button id="expand-' + contentID + '">+</button><a href="' + $(this).find('link').text() + '" target="_blank">' + $(this).find('title').text() + '</a><br>');
      $('#seahawks-container').append('<span id="description-' + contentID + '" class="hidden details">' + $(this).find('description').text() + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

$(getSeahawksFeed);

function getProductSearchFeed()
{
  var searchTerm = encodeURI('Seahawks Season Tickets');
  $('#psearch div.heading').append(' <i>' + decodeURI(searchTerm) + '</i>');
  $('#psearch-container').html('');
  getCraigslistResults(searchTerm);
  //getAmazonResults(searchTerm);
  //getEbayResults(searchTerm);
  //getGoogleResults(searchTerm);
}

$(getProductSearchFeed);

$(document).ready(function() {
  setInterval(function() {
    location.reload();
  }, 300000);
});

function getCraigslistResults(searchTerm)
{
  $.get('http://seattle.craigslist.org/search/sss?hasPic=1&query=' + searchTerm + '&srchType=T&format=rss', function (data) {
    var count = 1;
    $('#psearch-container').append('<b>Craigslist</b><br>');
    $(data).find('item').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      
      $('#psearch-container').append('<button id="expand-' + contentID + '">+</button><a href="' + $(this).find('link').text() + '" target="_blank">' + $(this).find('title').first().text() + '</a><br>');
      $('#psearch-container').append('<span id="description-' + contentID + '" class="hidden details">' + $(this).find('description').text() + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

function getAmazonResults(searchTerm)
{
  $('#tempAmazon').load('http://www.amazon.com/s/field-keywords=' + searchTerm + ' #atfResults');
  var count = 1;
  $('#atfResults').onAvailable(function () {
    $('#psearch-container').append('<b>Amazon</b><br>');
    $('#atfResults').children('div').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      var title = $(this).find('h3 a span').html();
      var price = $(this).find('span.price').html();
      var link = $(this).find('h3 a').attr('href');
      var description = $(this).html();
      
      $('#psearch-container').append('<button id="expand-' + contentID + '">+</button><a href="http://www.amazon.com' + link + '" target="_blank">' + title + '</a> <span class="price">' + price + '</span><br>');
      $('#psearch-container').append('<span id="description-' + contentID + '" class="hidden details">' + description + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

function getEbayResults(searchTerm)
{
  $('#tempEbay').load('http://www.ebay.com/dsc/i.html?_sadis=200&LH_SALE_CURRENCY=0&_sacat=0&_from=R40&_samihi=&_fpos=&_oexkw=&_sop=12&LH_PayPal=1&_okw=&_fsct=&_ipg=25&LH_BIN=1&LH_TitleDesc=1&_samilow=&_ftrt=901&_sabdhi=&_ftrv=1&_sabdlo=&_adv=1&_dmd=1&_nkw=%22%22' + searchTerm + '%22%22&LH_LocatedIn=1 #ResultSetItems:first');
  var count = 1;
  $('#ResultSetItems').onAvailable(function () {
    $('#psearch-container').append('<b>Ebay</b><br>');
    $('#ResultSetItems').children('table').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      var title = $(this).find('div.ittl h3 a').html();
      var price = $(this).find('div.g-b div.g-b').html();
      var link = $(this).find('div.ittl h3 a').attr('href');
      var description = $(this).html();
      
      $('#psearch-container').append('<button id="expand-' + contentID + '">+</button><a href="' + link + '" target="_blank">' + title + '</a> <span class="price">' + price + '</span><br>');
      $('#psearch-container').append('<span id="description-' + contentID + '" class="hidden details">' + description + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}

function getGoogleResults(searchTerm)
{
  $('#tempGoogle').load('https://www.google.com/search?q=' + searchTerm + '&tbm=shop #search');
  var count = 1;
  $('#search').onAvailable(function () {
    $('#psearch-container').append('<b>Google Shopping</b><br>');
    $('#ires ol').children('li').each(function () {
      var contentID = Math.floor((Math.random()*1000000)+1);
      var title = $(this).find('div.pslimain h3 a').html();
      var price = $(this).find('div.psliprice').html();
      var link = $(this).find('div.pslimain h3 a').attr('href');
      var description = $(this).html();
      
      $('#psearch-container').append('<button id="expand-' + contentID + '">+</button><a href="http://www.google.com' + link + '" target="_blank">' + title + '</a> <span class="price">' + price + '</span><br>');
      $('#psearch-container').append('<span id="description-' + contentID + '" class="hidden details">' + description + '<br>');
      $('#expand-' + contentID).bind('click', function() {
        var buttonLabel = $('#expand-' + contentID).html();
        if (buttonLabel == '+') {
          $('#expand-' + contentID).html('-');
        } else {
          $('#expand-' + contentID).html('+');
        }
        $('#description-' + contentID).toggle();
      });
      if (count == 10) {
        return false;
      }
      count++;
    });
  });
}