var timer;
var defaultLayout = true;
init();

function reverse() {
  var divId;
  var keep;
  if (defaultLayout) {
    divId = 'flights';
    keep = 1;
  } else {
    divId = 'flights-table';
    keep = 2;
  }
  var div = document.getElementById(divId);
  var els = Array.prototype.slice.call(div.childNodes);
  for (var i = els.length - 1; i >= keep; i--) {
    div.appendChild(els[i]);
  }
}

function init() {
  var request = new XMLHttpRequest();
  request.open('GET', 'next.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      var now = new Date();
      var success = data.some(function(ele) {
        var t = new Date(ele.date);
        var time = t.getTime();
        if (time - now.getTime() > 0) {
          printNext(ele);
          return true;
        }
      });
      if (!success) {noInfoNext();}
    } else {
      noInfoNext();
    }
  };
  request.onerror = function() {noInfoNext();};
  request.send();
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

function getDestination(destination, next) {
  var res = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
  if (!next) {res += '  viewBox="30 300 139 67">';}
  else {res += 'width="2.6em" height="1.2em" viewBox="70 310 59 40">';}

  res += '<use xlink:href="destinations.svg#' + destination + '"></use>';

  return res + '</svg>';
}

function printNext(next) {
  function setDiv(divDate) {
    document.getElementById('infos').innerHTML =
      '<h2>Next mission</h2><div>' +
      '<div><div id="next-mission"></div><span>Mission</span></div>' +
      divDate + '<div><div id="next-destination"></div><span>Destination</span></div>' +
      '<div><div id="next-rocket"></div><span>Rocket</span></div></div>';
  }
  if (next.date.length > 7) {
    setDiv('<div id="countdown"><div><div id="days">00</div><span>days</span></div><div><div id="hours">00</div>' +
      '<span>hours</span></div><div><div id="minutes">00</div><span>minutes</span></div><div><div id="seconds">00' +
      '</div><span>seconds</span></div></div>');
    var t = new Date(next.date);
    var time = t.getTime();
    calcTimer(time);
    timer = setInterval(function() {
      calcTimer(time);
    }, 1000);
  } else {
    setDiv('<div><div>August 2016</div><span>Date</span></div>');
  }
  document.getElementById('next-destination').innerHTML = getDestination(next.payloads[0].destination, true);
  document.getElementById('next-rocket').innerHTML = getRocketName(next.rocket);
  document.getElementById('next-mission').innerHTML = next.payloads[0].name;
}

function calcTimer(date) {
  var now = new Date();
  var difference = date - now.getTime();
  if (difference <= 0) {
    clearInterval(timer);
    noInfoNext();
  } else {
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
  }
}

function noInfoNext() {
  document.getElementById('infos').innerHTML =
   '<h2>Next mission</h2><p>No information for the next mission. ' +
   'You can <a href="https://github.com/spacexlaunches/spacexlaunches.com">contribute on GitHub</a>.</p>';
}

function zoom(sign) {
  var actual = parseFloat(document.getElementById('flights').style['font-size']) || 1;
  document.getElementById('flights').style['font-size'] = (actual + sign * 0.1).toFixed(1) + 'em';
}

document.getElementById('switchLayout').onclick = switchLayout;
function switchLayout() {
  if (defaultLayout) {
    this.innerHTML = 'Show as list';
    document.getElementById('flights').style.display = 'none';
    document.getElementById('flights-table').style.display = '';
  } else {
    this.innerHTML = 'Show as table';
    document.getElementById('flights').style.display = '';
    document.getElementById('flights-table').style.display = 'none';
  }
  defaultLayout = !defaultLayout;
}
