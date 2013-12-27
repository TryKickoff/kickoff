![](http://f.cl.ly/items/3d0o1O190m0U443I0B1I/Screen%20Shot%202013-10-07%20at%2022.05.42.png)

# Kickoff

Developed and maintained by [Ashley Nolan](https://github.com/dragongraphics) & [Zander Martineau](https://github.com/mrmartineau)

If you're using Kickoff we'd love to hear about it; please e-mail us at labs@tmw.co.uk

[![devDependency Status](https://david-dm.org/tmwagency/kickoff/dev-status.png)](https://david-dm.org/tmwagency/kickoff#info=devDependencies)

### Features

* Built in a mobile-first, responsive philosophy *(but can easily be used for fixed sites as well)*
* Mixins for lots of CSS3 features including gradients, rems with fallbacks
* Starter content styles, including clean typography, lists, tables, etc
* Starter form element styles
* Concatenation and minification of JS files with and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

### Browser support
Simple: Internet Explorer 8+

## Demos and documentation
Please visit [tmwagency.github.io/kickoff/](http://tmwagency.github.io/kickoff/) all demos and documentation for Kickoff.

## Want to use Grunt?
* Install Node from [nodejs.org](http://nodejs.org/)
* Install Grunt CLI - `npm install -g grunt-cli`
* Install Sass globally - `sudo gem install sass --pre`. [Ruby](https://www.ruby-lang.org/en/) v2 is needed. Update using [rvm](http://rvm.io/), [brew](http://brew.sh) (if you use a Mac) or from [ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/) then install the packages below
* Navigate to (`cd`) your project directory and run `npm install` which will install all Grunt's dependencies
* Run `grunt watch` or `grunt serve` (if you want to create a simple local server) to watch for changes and compile Sass/Javascript

When using Grunt with Kickoff, source maps are created for both the Javascript and Sass. Javascript is compiled to the `/js/dist` and Sass is compiled to the '/css' folder.

## Using Git?
Kickoff's [.gitignore](https://github.com/tmwagency/kickoff/blob/master/.gitignore#L30) file ignores the `/dist` folder by default. You will want to uncomment this line if you are **not** compiling these on the server.

## Yeoman generator
There is also a Yeoman generator for Kickoff, visit [tmwagency.github.io/kickoff/docs/yeoman.html](http://tmwagency.github.io/kickoff/docs/yeoman.html) for more info.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/tmwagency/kickoff/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
