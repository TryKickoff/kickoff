[![devDependency Status](https://david-dm.org/trykickoff/kickoff/dev-status.png)](https://david-dm.org/trykickoff/kickoff#info=devDependencies) [![Build Status](https://travis-ci.org/TryKickoff/kickoff.svg?branch=master)](https://travis-ci.org/trykickoff/kickoff) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Kickoff](http://i61.tinypic.com/1zyitqe.png)
# Kickoff
## A lightweight front-end framework for creating scalable and performant, responsive sites

Developed and maintained by [Ashley Nolan](https://github.com/ashleynolan) & [Zander Martineau](https://github.com/mrmartineau)

### Features
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

## Demos and documentation
Kickoff's demo and documentation site is hosted at [trykickoff.com](http://trykickoff.com/).

![Kickoff Yeoman generator](http://i.imgur.com/rWftxao.png?1)
## Yeoman generator
There is also a Yeoman generator for Kickoff, visit [trykickoff.com/docs/yeoman.html](http://trykickoff.com/docs/yeoman.html) for more info.

## Bugs and feature requests
Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/trykickoff/kickoff/issues/new).

### Browser compatibility
Kickoff has been tested in the following browsers:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Opera (latest)
- Internet Explorer 9+

If you're using Kickoff we'd love to hear about it; please e-mail us at trykickoff@gmail.com

## Creators

**Zander Martineau**

- <http://twitter.com/mrmartineau>
- <http://github.com/mrmartineau>

**Ashley Nolan**

- <http://twitter.com/AshNolan_>
- <http://github.com/ashleynolan>

### Community

Keep track of development and community news by following [@TryKickoff on Twitter](http://twitter.com/TryKickoff).

### Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Kickoff is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

### Contributing
Please read our [contribution guidelines](CONTRIBUTING.md) before contributing to Kickoff.

### Sponsored by TMW Unlimited...
![TMW Unlimited...](http://i.imgur.com/KIUIgi8.png?1)

Kickoff was created by Ash and Zander while working at TMW. TMW continue to provide sponsorship for the development of the project as well as trykickoff.com domain renewals and stickers.

