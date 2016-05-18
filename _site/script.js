var nextLaunch = new Date(document.getElementById('countdown').dataset.date);

function reverse() {
  var con = document.getElementById('flights');
  var els = Array.prototype.slice.call(con.childNodes);
  for (var i = els.length - 1; i >= 1; i--) {
    console.log(els[i]);
    con.appendChild(els[i]);
  }
}

// TIMER

calcTimer(nextLaunch);
var timer = setInterval(function() {
  calcTimer(nextLaunch);
}, 1000);

function calcTimer(date) {
  var now = new Date();
  var difference = nextLaunch.getTime() - now.getTime();
  if (difference <= 0) {
    clearInterval(timer);
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
