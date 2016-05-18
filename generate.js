var fs = require('fs');
var jsdom = require('jsdom');
var htmlSource = fs.readFileSync('layout.html', 'utf8');

// ==== Helper functions ====

function getRocket(rocket) {
  var options = rocket.split('-');
  var res = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="538" ' +
  'xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 369 48 500">';
  res += '<use xlink:href="rockets.svg#' + options[0] + '"></use>';

  if (options.length > 1) {
    for (var i = 1; i < options.length; i++) {
      res += '<use xlink:href="rockets.svg#' + options[i] + '"></use>';
    }
  }
  return res + '</svg>';
}

function getDestination(destination, next) {
  var res = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="45"';
  if (!next) {res += ' width="95" viewBox="30 300 139 67">';}
  else {res += 'width="90" viewBox="70 310 59 40">';}

  res += '<use xlink:href="destinations.svg#' + destination + '"></use>';

  return res + '</svg>';
}

function getRocketClass(rocket) {
  var r = rocket.split('-')[0];
  r = r.split('_');
  if (r.length > 1) {
    r = r[0] + r[1];
  } else {
    r = r[0];
  }
  return r.replace(/_|\./g, '');
}

function getRocketName(rocket) {
  // TODO future proofing
  var version = rocket.split('-')[0].split('_')[1];
  return 'Falcon 9 v' + version;
}

// ====== Main ======

jsdom.env(
  htmlSource,
  ['https://code.jquery.com/jquery.js'],
  function(err, window) {
    var $ = require('jquery')(window);
    // Next launch
    var next = JSON.parse(fs.readFileSync('data/next.json', 'utf8'));
    $('#next-destination').html(getDestination(next.payloads[0].destination, true));
    $('#next-rocket').html(getRocketName(next.rocket));
    $('#next-mission').html(next.payloads[0].name);
    $('#countdown').attr('data-date', next.date);

    // Previous launches
    var data = JSON.parse(fs.readFileSync('data/launches.json', 'utf8'));
    data.forEach(function(ele) {
      $('#flights').append(
          $('<div/>', {class: 'flight'})
            .append($('<span/>', {class: 'destination ' + ele.payloads[0].destination})
              .html(getDestination(ele.payloads[0].destination)))
            .append($('<div/>', {class: 'rocket'}).html(getRocket(ele.rocket)))
            .append($('<span/>', {class: 'name ' + getRocketClass(ele.rocket, false), text: ele.payloads[0].name}))
      );
    });
    $('#launches').html('(' + data.length + ')');

    // Write file
    fs.writeFile('_site/index.html', '<!DOCTYPE html>' + window.document.documentElement.outerHTML,
      function(error) {if (error) {throw error;}}
    );
    console.log('Done');
  }
);
