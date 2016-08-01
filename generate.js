var fs = require('fs');
var jsdom = require('jsdom');
var htmlSource = fs.readFileSync('layout.html', 'utf8');

// ==== Helper functions ====

function getRocket(rocket) {
  var options = rocket.split('-');
  var res = '<svg xmlns="http://www.w3.org/2000/svg" ' +
  'xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 535">';
  res += '<use xlink:href="rockets.svg#' + options[0] + '"></use>';

  if (options.length > 1) {
    for (var i = 1; i < options.length; i++) {
      res += '<use xlink:href="rockets.svg#' + options[i] + '"></use>';
    }
  }
  return res + '</svg>';
}

function getDestination(destination, next) {
  var res = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
  if (!next) {res += '  viewBox="30 300 139 67">';}
  else {res += 'width="2.6em" height="1.2em" viewBox="70 310 59 40">';}

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

function getOutcome(launch) {
  var res = {class: 'outcome'};

  if (!launch.payloads[0].success) {
    res.html = '<span>';
    res.html += '// Failure \\\\';
    res.class += ' fail';
    res.style = 'font-weight: 800;';
    res.html += '</span>';
  } else if (launch.hasOwnProperty('landing')) {
    res.class += ' landing';
    res.html = '<span>';
    if (launch.landing.destination == 'water') {
      res.html += 'Water landing';
      res.class += ' neutral';
    } else if (launch.landing.success) {
      res.html += 'Landed';
      res.class += ' success';
    } else {
      res.html += 'Landing fail';
      res.class += ' fail';
    }
    res.html += '</span>';
  }
  return res;
}

// ====== Main ======

jsdom.env(
  htmlSource,
  ['https://code.jquery.com/jquery.js'],
  function(err, window) {
    var $ = require('jquery')(window);

    // Previous launches
    var data = JSON.parse(fs.readFileSync('data/launches.json', 'utf8'));
    data.reverse();
    data.forEach(function(ele) {
      $('#flights').append(
          $('<div/>', {class: 'flight ' + getRocketClass(ele.rocket, false)})
            .append($('<span/>', {
              class: 'destination ' + ele.payloads[0].destination, title: ele.payloads[0].destination})
              .html(getDestination(ele.payloads[0].success ? ele.payloads[0].destination : 'failure', false)))
            .append($('<div/>', {class: 'rocket', title: getRocketName(ele.rocket)}).html(getRocket(ele.rocket)))
            .append($('<span/>', {class: 'name', text: ele.payloads[0].name}))
            .append($('<div/>', getOutcome(ele)))
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
