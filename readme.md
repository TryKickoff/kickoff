# 🏈 Kickoff
> A lightweight front-end framework for creating scalable and performant, responsive sites

[![devDependency Status](https://david-dm.org/trykickoff/kickoff/dev-status.png)](https://david-dm.org/trykickoff/kickoff#info=devDependencies) [![Build status](https://ci.appveyor.com/api/projects/status/g699smb2tsoakc8k/branch/master?svg=true)](https://ci.appveyor.com/project/mrmartineau/kickoff/branch/master) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![bitHound Overall Score](https://www.bithound.io/github/TryKickoff/kickoff/badges/score.svg)](https://www.bithound.io/github/TryKickoff/kickoff)

![Kickoff](http://i61.tinypic.com/1zyitqe.png)

Developed and maintained by [Ashley Nolan](https://github.com/ashleynolan) & [Zander Martineau](https://github.com/mrmartineau)

---

## Features
* Mobile-first, responsive philosophy
* Rock-solid **CSS** framework using **Sass** (`.scss`) preprocessor
 * Starter content styles: [typography](http://trykickoff.com/demos/typography.html), [grids](http://trykickoff.com/demos/grids.html) & [components](http://trykickoff.com/demos/components.html)
 * Starter form element styles ([see demo](http://trykickoff.com/demos/forms.html)): stacked on small-screen to 2-column (if you choose) at the breakpoint of your choice, validation states
 * Lots of helper classes & Sass mixins for many CSS3 features like [media-queries](https://github.com/TryKickoff/kickoff/blob/master/assets/src/scss/mixins/_responsive.scss)
* Simple **Javascript** [boilerplate](https://github.com/TryKickoff/kickoff/blob/master/assets/src/js/script.js) that makes very little assumptions about your chosen style or workflow.
 * JS bundled with [Browserify](http://browserify.org)
 * ES2015/ES6 syntax supported using the Babel transpiler
* **[Grunt](http://gruntjs.com)** task runner used extensively to ease common development bottlenecks
 * Sass is compiled using [node-sass](https://github.com/sass/node-sass) and we use [Autoprefixer](https://github.com/postcss/autoprefixer) to dynamically add vendor prefixes so you don't even have to think about them :)
 * PostCSS plugins can also be used to transform your CSS
* Simple server using [BrowserSync](http://browsersync.io)

---

## Demos and documentation
Kickoff's demo and documentation site is hosted at [trykickoff.com](http://trykickoff.com/).

---

## ![Kickoff Yeoman generator](http://i.imgur.com/rWftxao.png?1) Yeoman generator
Our Yeoman Generator is the best way to get Kickoff each time you want to start a new project, visit [trykickoff.com/docs/yeoman.html](http://trykickoff.com/learn/yeoman.html) for more info.

---

### ![Slack logo](http://i.imgur.com/1LNs3Q6.png?1) [Need real-time help? Find us on Slack](https://slackin-trykickoff.herokuapp.com/)

---

## Bugs and feature requests
Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/TryKickoff/kickoff/issues/new).

---

## Browser compatibility
Kickoff has been tested in the following browsers:

| [Chrome](https://www.google.com/chrome/) (latest)                                                               | [Firefox](https://www.mozilla.org/en-GB/firefox/new/) (latest)                                                     | [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer_9) (9+)                                                       | [Safari](https://www.apple.com/safari/) (latest)                                                                | [Safari (iOS)](https://www.apple.com/safari/) (latest)                                                                 | [Opera](https://www.opera.com/) (latest)                                                                     |
|:---------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------:|------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/alrra/browser-logos/raw/master/chrome/chrome_256x256.png" width="80" alt="Chrome"> | <img src="https://github.com/alrra/browser-logos/raw/master/firefox/firefox_256x256.png" width="80" alt="Firefox"> | <img src="https://github.com/alrra/browser-logos/raw/master/internet-explorer/internet-explorer_256x256.png" width="80" alt="IE"> | <img src="https://github.com/alrra/browser-logos/raw/master/safari/safari_256x256.png" width="80" alt="Safari"> | <img src="https://github.com/alrra/browser-logos/raw/master/safari-ios/safari-ios_256x256.png" width="80" alt="Safari">| <img src="https://github.com/alrra/browser-logos/raw/master/opera/opera_256x256.png" width="80" alt="Opera"> |

---

## Maintainers and contributors
|                           Zander Martineau                          |                             Ashley Nolan                             |                              Nic Bell                             |
|:-------------------------------------------------------------------:|:--------------------------------------------------------------------:|:-----------------------------------------------------------------:|
| ![Zander](https://avatars0.githubusercontent.com/u/64883?v=3&s=100) | ![Ashley](https://avatars3.githubusercontent.com/u/805184?v=3&s=100) | ![Nic](https://avatars3.githubusercontent.com/u/151842?v=3&s=100) |
| [Twitter](http://twitter.com/mrmartineau)                           | [Twitter](http://twitter.com/AshNolan_)                              | [Twitter](http://twitter.com/nicbell)                                     |
| [Github](https://github.com/mrmartineau/)                           | [Github](https://github.com/ashleynolan)                             | [Github](https://github.com/nicbell/)                             |
| [Site](http://martineau.tv)                                         | [Site](http://ashleynolan.co.uk)                                     | [Site](http://nicbell.net)                                        |

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

Kickoff was created by Ash and Zander while working at TMW. TMW continue to provide sponsorship for the development of the project as well as trykickoff.com domain renewals and stickers.
