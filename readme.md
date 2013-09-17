# TMW's front-end framework

Developed by [Ashley Nolan](https://github.com/dragongraphics) & [Zander Martineau](https://github.com/mrmartineau)

### Browser support
Simple: Internet Explorer 8+

## Demos and documentation
Please visit [tmwagency.github.io/kickoff/](http://tmwagency.github.io/kickoff/) all demos and documentation for Kickoff.

## Want to use Grunt?
[Ruby](https://www.ruby-lang.org/en/) v2 is needed. Update using [rvm](http://rvm.io/) or [brew](http://brew.sh) (if you use a Mac) then install the packages below

* Install Sass globally - `sudo gem install sass --pre`
* Install Node from [nodejs.org](http://nodejs.org/)
* Install Grunt CLI - `npm install -g grunt-cli`
* Navigate to (`cd`) your project directory and run `npm install` which will install all Grunt's dependencies
* Run `grunt watch` to watch for changes and compile Sass/Javascript

When using Grunt with Kickoff, source maps are created for both the Javascript and Sass. Javascript is compiled to the `/js/dist` and Sass is compiled to the '/css' folder.

## Using Git?
Kickoff's [.gitignore](https://github.com/tmwagency/kickoff/blob/master/.gitignore#L30) file ignores the `/dist` folder by default. You will want to uncomment this line if you are **not** compiling these on the server.
