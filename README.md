# [spacexlaunches.com](https://spacexlaunches.com) ![Build Status](https://app.wercker.com/status/72fe331216257410751430e81003506b/s/master)
*Previous SpaceX launches and  next mission.*

## About
This website is a simple view of the previous SpaceX launches and the next mission.

The rockets and destinations images were designed by [@zlsa](https://github.com/zlsa/) (files ```_site/rockets.svg``` and ```_site/destinations.svg```)

## Build
#### Installation
You'll need [Sass](http://sass-lang.com/) and [node.js](https://nodejs.org/) (with [jsdom](https://github.com/tmpvar/jsdom) and [jquery](https://jquery.com/)) installed.

```bash
$ git clone https://github.com/spacexlaunches/data.git data
$ cp -r data/patches _site/patches
$ gem install sass
$ sudo apt-get install nodejs
$ npm install jsdom jquery
```

#### Building the site
The site is build in the ```_site``` folder
```bash
$ node generate.js
$ sass style.scss _site/style.css
```

## Contributing
Contributions are welcome!

## License
```_site/rockets.svg``` and ```_site/destinations.svg``` are copyrighted by [@zlsa](https://github.com/zlsa/)

The SpaceX logo (```_site/spacex.png```) is copyrighted by Space Exploration Technologies Corp.

Everything else is licensed under an MIT License. See ```LICENSE.md```
