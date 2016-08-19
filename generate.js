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
  if (!next) {
    res += ' viewBox="30 300 139 67">';
  } else {
    res += ' width="2.6em" height="1.2em" viewBox="70 310 59 40">';
  }

  res += '<use xlink:href="destinations.svg#' + destination + '"></use>';

  return res + '</svg>';
}

function getRocketName(rocket) {
  var infos = rocket.split('-')[0].split('_');
  var version = infos[1];
  switch (infos[0]) {
    case 'falcon1':
      return 'Falcon 1';
    case 'falcon9':
      return 'Falcon 9 v' + version;
    default:
      return infos[0];
  }
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

function getLandingOutcome(launch, showMissionFail) {
  var res = {class: 'outcome'};

  if (!launch.payloads[0].success && showMissionFail) {
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
  } else if (!showMissionFail) {
    res.html = '<span>';
    res.html += 'No attempt';
    res.html += '</span>';
    res.class += ' grey';
  }
  return res;
}

function getMissionOutcome(launch) {
  var res = {};
  if (launch.payloads[0].success) {
    res.class = 'success';
    res.html = 'Success';
  } else {
    res.class = 'fail';
    res.html = 'Failure';
  }
  return res;
}

// ====== Main ======

function printDate(stdate) {
  var date = new Date(stdate);
  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  return day + '/' + month + '/' + year;
}

function getYear(stdate) {
  var date = new Date(stdate);
  return date.getFullYear();
}

jsdom.env(
  htmlSource,
  ['https://code.jquery.com/jquery.js'],
  function(err, window) {
    var $ = require('jquery')(window);

    // Previous launches
    var years = {};
    var data = JSON.parse(fs.readFileSync('data/launches.json', 'utf8'));
    data.reverse();
    data.forEach(function(ele) {
      if (typeof years[getYear(ele.date)] != 'undefined') {
        years[getYear(ele.date)] += 1;
      } else {
        years[getYear(ele.date)] = 1;
      }
      // List
      $('#flights').append(
          $('<div/>', {class: 'flight ' + getRocketClass(ele.rocket, false)})
            .append($('<span/>', {
              class: 'destination ' + ele.payloads[0].destination, title: ele.payloads[0].destination})
              .html(getDestination(ele.payloads[0].success ? ele.payloads[0].destination : 'failure', false)))
            .append($('<div/>', {class: 'rocket', title: getRocketName(ele.rocket)}).html(getRocket(ele.rocket)))
            .append($('<div/>', {class: 'caption'})
              .append($('<span/>', {class: 'name', text: ele.payloads[0].name}))
              .append($('<div/>', getLandingOutcome(ele, true)))
            )
      );
      // Table
      $('#flights-table').first().append(
        $('<tr/>')
        .append($('<td/>').html(printDate(ele.date)))
        .append($('<td/>').html(getRocketName(ele.rocket)))
        .append($('<td/>', {style: 'text-align: left'}).html(ele.payloads[0].name))
        .append($('<td/>').html(ele.payloads[0].destination))
        .append($('<td/>', getMissionOutcome(ele)))
        .append($('<td/>', getLandingOutcome(ele, false)))
      );
    });
    $.each(years, function(index, value) {
      $('#years').prepend($('<span/>', {style: 'width: ' + (value * 5.6 / 0.8).toFixed(1) + 'em'}).html(index));
    });
    $('#launches').html('(' + data.length + ')');

    // Write file
    fs.writeFile('_site/index.html', '<!DOCTYPE html>' + window.document.documentElement.outerHTML,
      function(error) {if (error) {throw error;}}
    );
    console.log('Done');
  }
);
