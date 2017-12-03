const fs = require('fs');
const jsdom = require('jsdom');

const htmlSource = fs.readFileSync('layout.html', 'utf8');

// ==== Helper functions ====

function generateSrcset(org, sizes) {
  return sizes.map(size => `${org}&w=${size}&h=${size} ${size}w`).join(',');
}

function getOptions(id) {
  // if (id >= 26) {
  //   return ['fairing', 'legs'];
  // }
  return [];
}

function getDestination(destination, next) {
  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="${next ? '70 310 59 40" width="2.6em" height="1.2em"' : '30 300 139 67"'}
  >
    <use xlink:href="img/destinations.svg#${destination}"></use>
  </svg>`;
}

function getSvgRocketId(rocket, payloads) {
  const dragon = payloads.some(payload => payload.payload_type.toLowerCase().includes('dragon'));
  const res = `${rocket.rocket_id}_${rocket.rocket_type}${(dragon && '_dragon') || ''}`;
  return res;
}

function getRocket(ele) {
  const id = getSvgRocketId(ele.rocket, ele.rocket.second_stage.payloads);
  const options = getOptions(ele.flight_number);
  return `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50 535"
  >
    <use xlink:href="img/rockets.svg#${id}"></use>
    ${options.map(
    option =>
      `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/rockets.svg#${
        option
      }"></use>`,
  )}
  </svg>`;
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

  if (!launch.launch_success && showMissionFail) {
    res.html = '<span>';
    res.html += '// Failure \\\\';
    res.class += ' fail';
    res.style = 'font-weight: 800;';
    res.html += '</span>';
  } else if (launch.landing_type != null) {
    res.class += ' landing';
    res.html = '<span>';
    if (launch.landing_type === 'Ocean') {
      res.html += 'Water landing';
      res.class += ' neutral';
    } else if (launch.land_success) {
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
  if (launch.launch_success) {
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
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getYear(stdate) {
  const date = new Date(stdate);
  return date.getFullYear();
}

jsdom.env(htmlSource, ['https://code.jquery.com/jquery.js'], async (err, window) => {
  const $ = require('jquery')(window); // eslint-disable-line

  // Previous launches
  const years = {};

  const data = await $.getJSON('https://api.spacexdata.com/v2/launches');
  data.reverse();
  data.forEach((ele) => {
    years[ele.launch_year] = (years[ele.launch_year] || 0) + 1;
    /* let patchFileName = ele.rocket.second_stage.payloads[0].name
      .replace(/([^a-z0-9]+)/gi, '-')
      .replace(/-$/, '')
      .toLowerCase();
    patchFileName += '.png'; */
    const patchFileName = `https://images.weserv.nl/?url=${encodeURIComponent(
      ele.links.mission_patch.replace(/(^\w+:|^)\/\//, ''),
    )}`;
    console.log(patchFileName);
    // List
    $('#flights').append(
      // $('<div/>', { class: `flight ${getRocketClass(ele.rocket, false)}` })
      $('<div/>', { class: 'flight' })
        .append(
          $('<span/>', {
            class: `destination ${ele.rocket.second_stage.payloads[0].orbit}`,
            title: ele.rocket.second_stage.payloads[0].orbit,
          }).html(getDestination(ele.rocket.second_stage.payloads[0].orbit, false)),
        )
        .append(
          $('<div/>', {
            class: 'rocket',
            title: getSvgRocketId(ele.rocket, ele.rocket.second_stage.payloads),
          }).html(getRocket(ele)),
        )
        .append(
          $('<div/>', { class: 'caption' })
            .append(
              $('<span/>', { class: 'name', text: ele.rocket.second_stage.payloads[0].payload_id }),
            )
            .append($('<div/>', getLandingOutcome(ele, true))),
        )
        .append(
          $('<img />', {
            class: 'patch',
            src: `${patchFileName}&w=200&h=200`,
            width: '5em',
            height: '5em',
            alt: `${ele.rocket.second_stage.payloads[0].name} patch`,
          }),
        ),
    );
    // Table
    $('#flights-table')
      .first()
      .append(
        $('<tr/>')
          .append($('<td/>').html(printDate(ele.launch_date_utc)))
          .append($('<td/>').html(getSvgRocketId(ele.rocket, ele.rocket.second_stage.payloads)))
          .append(
            $('<td/>', { style: 'text-align: left' }).html(
              ele.rocket.second_stage.payloads[0].payload_id,
            ),
          )
          .append($('<td/>').html(ele.rocket.second_stage.payloads[0].orbit))
          .append($('<td/>', getMissionOutcome(ele)))
          .append($('<td/>', getLandingOutcome(ele, false))),
      );
  });
  $.each(years, (index, value) => {
    $('#years').prepend(
      $('<span/>', {
        style: `width: ${(value * 7).toFixed(1)}em`,
      }).html(index),
    );
  });
  $('#launches').html(`(${data.length})`);

  // Remove jsdom scripts (jquery)
  const scripts = window.document.getElementsByTagName('script');
  let i = scripts.length;
  while (i--) {
    if (scripts[i].className === 'jsdom') {
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
