# [spacexlaunches.com](https://spacexlaunches.com) ![Build Status](https://app.wercker.com/status/72fe331216257410751430e81003506b/s/master)
*Previous SpaceX launches and  next mission.*

## About
This website is a simple view of the previous SpaceX launches and the next mission.

The rockets and destinations images were designed by [@zlsa](https://github.com/zlsa/) (files ```_site/img/rockets.svg``` and ```_site/img/destinations.svg```)

## Build
#### Installation
You'll need [Node.js](https://nodejs.org/) 8.

```bash
$ git clone https://github.com/spacexlaunches/data.git data
$ cp -r data/patches _site/patches
$ sudo apt-get install nodejs
$ npm install
```

#### Building the site
The site is build in the ```_site``` folder
```bash
$ npm run build
```

## Contributing
Contributions are welcome!

## License
```_site/img/rockets.svg``` and ```_site/img/destinations.svg``` are copyrighted by [@zlsa](https://github.com/zlsa/)

The SpaceX logo (```_site/img/spacex.png```) is copyrighted by Space Exploration Technologies Corp.

Everything else is licensed under an MIT License. See ```LICENSE.md```
