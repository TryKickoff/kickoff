![Kickoff](http://i.imgur.com/bfMlVwe.jpg)

> A lightweight front-end framework for creating scalable and performant, responsive sites

[![devDependency Status](https://david-dm.org/trykickoff/kickoff/dev-status.png)](https://david-dm.org/trykickoff/kickoff#info=devDependencies) [![Build status](https://ci.appveyor.com/api/projects/status/g699smb2tsoakc8k/branch/master?svg=true)](https://ci.appveyor.com/project/mrmartineau/kickoff/branch/master) [![Dependency Status](https://dependencyci.com/github/TryKickoff/kickoff/badge)](https://dependencyci.com/github/TryKickoff/kickoff) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)  [![bitHound Overall Score](https://www.bithound.io/github/TryKickoff/kickoff/badges/score.svg)](https://www.bithound.io/github/TryKickoff/kickoff)

Developed and maintained by [Ashley Nolan](https://github.com/ashleynolan) & [Zander Martineau](https://github.com/mrmartineau)

## Features

[![Greenkeeper badge](https://badges.greenkeeper.io/TryKickoff/kickoff.svg)](https://greenkeeper.io/)
|                	| Feature                    	| Description                                                                                   	|
|----------------	|----------------------------	|-----------------------------------------------------------------------------------------------	|
| :fast_forward: 	| #webperf                   	| Performance-first, responsive philosophy                                                      	|
| :oncoming_bus: 	| Rock-solid build tasks     	| We use gulp & webpack to deliver the best task runner & developer experience for your project 	|
| :eyeglasses:   	| Unopinionated & extendable 	| A few common UI elements, a grid & some other base styles. The rest is up to you.             	|
| :crystal_ball: 	| Future proof               	| Build complex layouts with flexbox & use ES2015 (ES6) for your javascript.                                                  	|
| :angry:        	| Lean & mean                	| CSS: 8.68 kB gzipped<br> JS: 2 kB gzipped<br> It is a boilerplate after all :wink:                 	|

## Tasks
| Command | Description |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm start` | Basic dev server using [Browsersync](http://www.browsersync.io/) |
| `npm run watch` | Watch all files for changes |
| `npm run deploy` | Install all dependencies and compile all assets for production deployment |
| `npm run compile:all` | Compile the CSS & JS, compress the images and run any other compilation tasks needed to run your app |
| `npm run compile:release` | Add the `--release` flag to any other task, e.g. `gulp javascript --release` or `gulp css --release` |
| `npm run compile:css` | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Postcss](http://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps & more.. |
| `npm run compile:js` | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/) |
| `npm run compile:svg` | Auto-generated [SVG sprites](https://github.com/w0rm/gulp-svgstore) |
| `npm run compress:images` | Image compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin) |
| `npm run lint:js` | Lint JS using [xo](https://github.com/sindresorhus/xo) |
| `npm run fix:js` | Fix JS linting issues using [xo](https://github.com/sindresorhus/xo) |
| `npm run lint:css` | Lint CSS using [stylelint](https://github.com/stylelint/stylelint). We use the [https://github.com/stylelint/stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) rules for our linting |
| `npm test` | Run javascript and css tests |
| `npm run clean:all` | Clean the compiled files |
| `npm run copy:all` | Run the copy tasks - useful for things like webfonts etc |
| `npm run release-patch` | Creates a patch release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-minor` | Creates a minor release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-major` | Creates a major release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-premajor` | Creates a premajor release using [release-it](https://github.com/webpro/release-it) |

---

## :memo: Demos and documentation
Kickoff's demo and documentation site is hosted at [trykickoff.com](http://trykickoff.com/).

---

## Yeoman generator
Our Yeoman Generator is the best way to get Kickoff each time you want to start a new project, visit [trykickoff.com/docs/yeoman.html](http://trykickoff.com/learn/yeoman.html) for more info.

---

### ![Slack logo](http://i.imgur.com/1LNs3Q6.png?1) [Need real-time help? Find us on Slack](https://slackin-trykickoff.herokuapp.com/)

---

## :bug: Bugs and feature requests
Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/TryKickoff/kickoff/issues/new).

---

## Browser compatibility
Kickoff has been tested in the following browsers:

| [Chrome](https://www.google.com/chrome/) (latest) | [Firefox](https://www.mozilla.org/en-GB/firefox/new/) (latest) | [Safari](https://www.apple.com/safari/) (latest) | [Edge](http://www.microsoft.com/en-us/windows/microsoft-edge) (latest) | [Opera](https://www.opera.com/) (latest) |
|:----------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_64x64.png" width="48" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_64x64.png" width="48" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_64x64.png" width="48" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_64x64.png" alt="Microsoft Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_64x64.png" width="48" alt="Opera"> |

We also support older versions of Internet Explorer but the support is limited. For example, the Kickoff grid relies on flexbox so Modernizr is needed to detect for it and then we can provide a fallback.

---

## Maintainers and contributors
| Zander Martineau | Ashley Nolan | Nic Bell |
|:-------------------------------------------------------------------:|:--------------------------------------------------------------------:|:-----------------------------------------------------------------:|
| ![Zander](https://avatars0.githubusercontent.com/u/64883?v=3&s=100) | ![Ashley](https://avatars3.githubusercontent.com/u/805184?v=3&s=100) | ![Nic](https://avatars3.githubusercontent.com/u/151842?v=3&s=100) |
| [Twitter](http://twitter.com/mrmartineau) | [Twitter](http://twitter.com/AshNolan_) | [Twitter](http://twitter.com/nicbell) |
| [Github](https://github.com/mrmartineau/) | [Github](https://github.com/ashleynolan) | [Github](https://github.com/nicbell/) |
| [Site](http://zander.wtf) | [Site](http://ashleynolan.co.uk) | [Site](http://nicbell.net) |

### Community
If you're using Kickoff we'd love to hear about it; please e-mail us at trykickoff@gmail.com

Keep track of development and community news by following [@TryKickoff on Twitter](http://twitter.com/TryKickoff).

### Contributing
Please read our [contribution guidelines](https://github.com/TryKickoff/kickoff/wiki/Contributing-to-Kickoff) before contributing to Kickoff.

### Versioning
For transparency into our release cycle and in striving to maintain backward compatibility, Kickoff is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

---

### Sponsored by
![TMW Unlimited...](http://i.imgur.com/KIUIgi8.png?1)

Kickoff was created by Ash and Zander while working at TMW. TMW continue to provide sponsorship for the development of the project as well as trykickoff.com domain renewals, stickers etc.
