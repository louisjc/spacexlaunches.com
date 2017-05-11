var timer;
var defaultLayout = true;
var moreNext = false;
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
  $('.patch').each(function() {
    $(this).click(function(e) {$('#patch-hover').attr({src: this.src}).fadeIn('fast');});
    $(this).mouseleave(function() {$('#patch-hover').fadeOut('fast');});
    $(this).mousemove(function(e) {
      $('#patch-hover')
      .css('left', e.pageX + 5 + 'px')
      .css('top', e.pageY - 225 - 15 + 'px');
    });
  });

  var request = new XMLHttpRequest();
  request.open('GET', 'next.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      var now = new Date();
      var i = 0;
      data.forEach(function(ele, index) {
        var t = new Date(ele.date);
        var time = t.getTime();
        if (time - now.getTime() > 0) {
          i += 1;
          printNext(ele, i);
        }
      });
      if (i == 0) {noInfoNext();}
      if (i > 1) {
        document.getElementById('next').innerHTML +=
          '<span id="togglenext" onclick="toggleNext()">Show more ▼</span>';
      }
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

function getDestination(destination) {
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    'width="2.6em" height="1.2em" viewBox="70 310 59 40">' +
    '<use xlink:href="img/destinations.svg#' + destination + '"></use></svg>';
}

function addRow(next) {
  var table = document.getElementById('next-table');
  table.innerHTML += '<tr><td>' + next.payloads[0].name + '</td><td> ' + next.dateString
                 + '</td><td>' + getDestination(next.payloads[0].destination)
                 + '</td><td>' + getRocketName(next.rocket) + '</td></tr>';
}

function printNext(next, id) {
  if (id == 1) {
    function setDiv(divDate) {
      var html = '<div id="next-' + id + '"><div><div class="next-mission"></div><span>Mission</span></div>' +
        divDate + '<div><div class="next-destination"></div><span>Destination</span></div>' +
        '<div><div class="next-rocket"></div><span>Rocket</span></div></div>';
      document.getElementById('next').innerHTML = '<h2>Next mission</h2>' +
          '<div>' + html + '</div><div id="more-next"><table class="hide" id="next-table-warper"><tbody id="next-table"></tbody></table></div>';
    }
    var t = new Date(next.date);
    if (next.date.length > 7) {
      setDiv('<div id="countdown"><div>' +
        '<div class="days">00</div><span>days</span></div>' +
        '<div><div class="hours">00</div><span>hours</span></div>' +
        '<div><div class="minutes">00</div><span>minutes</span></div>' +
        '<div><div class="seconds">00</div><span>seconds</span></div></div>');
      var time = t.getTime();
      calcTimer(time, id);
      timer = setInterval(function() {
        calcTimer(time, id);
      }, 1000);
    } else {
      setDiv('<div class="date"><div>' + next.dateString + '</div><span>Date</span></div>');
    }
    var div = document.getElementById('next-' + id);
    div.getElementsByClassName('next-destination')[0].title = next.payloads[0].destination;
    div.getElementsByClassName('next-destination')[0].innerHTML = getDestination(next.payloads[0].destination);
    div.getElementsByClassName('next-rocket')[0].innerHTML = getRocketName(next.rocket);
    div.getElementsByClassName('next-mission')[0].innerHTML = next.payloads[0].name;
  } else {
    addRow(next);
  }
}

function calcTimer(date, id) {
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

    var div = document.getElementById('next-' + id);

    div.getElementsByClassName('days')[0].innerHTML = days;
    div.getElementsByClassName('hours')[0].innerHTML = hours;
    div.getElementsByClassName('minutes')[0].innerHTML = minutes;
    div.getElementsByClassName('seconds')[0].innerHTML = seconds;
  }
}

function noInfoNext() {
  document.getElementById('next').innerHTML =
   '<h2>Next mission</h2><p>No information for the next mission. ' +
   'You can <a href="https://github.com/spacexlaunches/launches-data">contribute on GitHub</a>.</p>';
}

function zoom(sign) {
  var actual = parseFloat(document.getElementById('flights').style['font-size']) || 1;
  document.getElementById('flights').style['font-size'] = (actual + sign * 0.1).toFixed(1) + 'em';
  document.getElementById('years').style['font-size'] = (actual + sign * 0.1).toFixed(1) + 'em';
}

function toggleNext() {
  document.getElementById('next-table-warper').className = moreNext ? 'hide' : 'show';
  document.getElementById('togglenext').innerHTML = moreNext ? 'Show more ▼' : 'Hide ▲';
  moreNext = !moreNext;
}

document.getElementById('switchLayout').onclick = switchLayout;
function switchLayout() {
  if (defaultLayout) {
    this.innerHTML = 'Show as list';
    document.getElementById('flights-container').style.display = 'none';
    document.getElementById('years').style.display = 'none';
    document.getElementById('flights-table').style.display = '';
  } else {
    this.innerHTML = 'Show as table';
    document.getElementById('flights-container').style.display = '';
    document.getElementById('years').style.display = '';
    document.getElementById('flights-table').style.display = 'none';
  }
  defaultLayout = !defaultLayout;
}
