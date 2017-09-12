const fs = require('fs');
const jsdom = require('jsdom');

const htmlSource = fs.readFileSync('layout.html', 'utf8');

// ==== Helper functions ====

function getRocket(rocket) {
  const options = rocket.split('-');
  let res =
    '<svg xmlns="http://www.w3.org/2000/svg" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 535">';
  res += `<use xlink:href="img/rockets.svg#${options[0]}"></use>`;

  if (options.length > 1) {
    for (let i = 1; i < options.length; i++) {
      res += `<use xlink:href="img/rockets.svg#${options[i]}"></use>`;
    }
  }
  return `${res}</svg>`;
}

function getDestination(destination, next) {
  let res = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
  if (!next) {
    res += ' viewBox="30 300 139 67">';
  } else {
    res += ' width="2.6em" height="1.2em" viewBox="70 310 59 40">';
  }

  res += `<use xlink:href="img/destinations.svg#${destination}"></use>`;

  return `${res}</svg>`;
}

function getRocketName(rocket) {
  const infos = rocket.split('-')[0].split('_');
  const version = infos[1];
  switch (infos[0]) {
    case 'falcon1':
      return 'Falcon 1';
    case 'falcon9':
      return `Falcon 9 v${version}`;
    default:
      return infos[0];
  }
}

function getRocketClass(rocket) {
  let r = rocket.split('-')[0];
  r = r.split('_');
  if (r.length > 1) {
    r = r[0] + r[1];
  } else {
    r = r[0];
  }
  return r.replace(/_|\./g, '');
}

function getLandingOutcome(launch, showMissionFail) {
  const res = { class: 'outcome' };

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
  const res = {};
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
  const date = new Date(stdate);
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getYear(stdate) {
  const date = new Date(stdate);
  return date.getFullYear();
}

function getsrcset(patchFileName) {
  let res = '';
  [100, 200].forEach((val) => {
    res += `patches/${val}px/${patchFileName} ${val}w, `;
  });
  return res.slice(0, -2);
}

jsdom.env(htmlSource, ['https://code.jquery.com/jquery.js'], (err, window) => {
  const $ = require('jquery')(window);

  // Previous launches
  const years = {};
  const data = JSON.parse(fs.readFileSync('data/launches.json', 'utf8'));
  data.reverse();
  data.forEach((ele) => {
    if (typeof years[getYear(ele.date)] !== 'undefined') {
      years[getYear(ele.date)] += 1;
    } else {
      years[getYear(ele.date)] = 1;
    }
    let patchFileName = ele.payloads[0].name
      .replace(/([^a-z0-9]+)/gi, '-')
      .replace(/-$/, '')
      .toLowerCase();
    patchFileName += '.png';
    // List
    $('#flights').append(
      $('<div/>', { class: `flight ${getRocketClass(ele.rocket, false)}` })
        .append(
          $('<span/>', {
            class: `destination ${ele.payloads[0].destination}`,
            title: ele.payloads[0].destination,
          }).html(
            getDestination(
              ele.payloads[0].success ? ele.payloads[0].destination : 'failure',
              false,
            ),
          ),
        )
        .append(
          $('<div/>', { class: 'rocket', title: getRocketName(ele.rocket) }).html(
            getRocket(ele.rocket),
          ),
        )
        .append(
          $('<div/>', { class: 'caption' })
            .append($('<span/>', { class: 'name', text: ele.payloads[0].name }))
            .append($('<div/>', getLandingOutcome(ele, true))),
        )
        .append(
          $('<img />', {
            class: 'patch',
            src: `patches/${patchFileName}`,
            srcset: getsrcset(patchFileName),
            width: '5em',
            height: '5em',
            alt: `${ele.payloads[0].name} patch`,
          }),
        ),
    );
    // Table
    $('#flights-table')
      .first()
      .append(
        $('<tr/>')
          .append($('<td/>').html(printDate(ele.date)))
          .append($('<td/>').html(getRocketName(ele.rocket)))
          .append($('<td/>', { style: 'text-align: left' }).html(ele.payloads[0].name))
          .append($('<td/>').html(ele.payloads[0].destination))
          .append($('<td/>', getMissionOutcome(ele)))
          .append($('<td/>', getLandingOutcome(ele, false))),
      );
  });
  $.each(years, (index, value) => {
    $('#years').prepend(
      $('<span/>', { style: `width: ${(value * 5.6 / 0.8).toFixed(1)}em` }).html(index),
    );
  });
  $('#launches').html(`(${data.length})`);

  // Remove jsdom scripts (jquery)
  const scripts = window.document.getElementsByTagName('script');
  let i = scripts.length;
  while (i--) {
    if (scripts[i].className == 'jsdom') {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }

  // Write file
  fs.writeFile(
    '_site/index.html',
    `<!DOCTYPE html>${window.document.documentElement.outerHTML}`,
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
  console.log('Done');
});
