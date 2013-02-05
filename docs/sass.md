[Documentation table of contents](readme.md)

These docs are still incomplete. If you have any questions, please email zmartineau@tmw.co.uk

# SASS

Kickoff is made with [SASS](http://sass-lang.com/) at its core ( we used to use [Less](http://lesscss.org/) which is now used on legacy projects), a dynamic stylesheet language created by, [Hampton Catlin](http://www.hamptoncatlin.com/). It makes developing systems-based CSS faster, easier, and more fun.

### Why SASS?

Sass makes CSS fun again. Sass is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more. It’s translated to well-formatted, standard CSS using the command line tool or a web-framework plugin.

Sass has two syntaxes. The most commonly used syntax is known as “SCSS” (for “Sassy CSS”), and is a superset of CSS3’s syntax. This means that every valid CSS3 stylesheet is valid SCSS as well. SCSS files use the extension `.scss`; we use this version at TMW.

### What's included?

As an extension of CSS, LESS includes variables, mixins for reusable snippets of code, operations for simple math, nesting, and even color functions.

### Learn more

Visit the official website at [http://sass-lang.com/](http://sass-lang.com/) to learn more

## Installing SASS

#### Install Ruby and Sass

First of all, let’s get Sass up and running. If you’re using OS X, you’ll already have Ruby installed. Windows users can install Ruby via [the Windows installer](http://rubyinstaller.org/downloads/), and Linux users can install it via their package manager.

Once you have Ruby installed, you can install Sass by running

`gem install sass`

## Compiling Kickoff with SASS

Since our CSS is written with Less and utilizes variables and mixins, it needs to be compiled for final production implementation. Here's how:

### Use the command line

If you prefer to not use an app, you can use the command line. `cd` into your project directory, then run `sass --watch scss:css`. Kickoff usually compiles to two CSS files: `kickoff.css` & `kickoff-old-ie.css`

### Apps

#### [CodeKit](http://incident57.com/codekit/) - Mac
CodeKit is a **Mac** app that compiles LESS, SASS, Stylus, CoffeeScript and many more. It can minify, concatinate & lint your code too.

#### [Scout](http://mhs.github.com/scout-app/) - Mac & Windows
Scout is a cross-platform app that delivers the power of Sass & Compass into the hands of web designers.


## Kickoff's default SASS files

The four most important .scss files in any Kickoff project are:

#### 1. [kickoff.scss](https://github.com/tmwagency/kickoff/blob/master/scss/kickoff.scss) & [kickoff-old-ie.scss](https://github.com/tmwagency/kickoff/blob/master/scss/kickoff-old-ie.scss)
All roads lead to here. `Kickoff.scss` is the starting point for any kickoff project. Here you choose which other `.scss` files your project needs. The order of the imported files is the same order that the CSS is compiled to.

Exclude any existing items by using a javascript comment `//` at the start of the line or remove that line completely.

#### 2. [variables.scss](https://github.com/tmwagency/kickoff/blob/master/scss/variables.scss)
This file contains all your app/site's global variables. For example, you can set your background colours, fonts, base text size etc here & use the variable names throughout the rest of your project.

#### 3. [mixins.scss](https://github.com/tmwagency/kickoff/blob/master/scss/mixins.scss)
Mixins contains many useful items, but the most useful of which are the CSS3 mixins.

#### 4. [app.scss](https://github.com/tmwagency/kickoff/blob/master/scss/app.scss)
Here you add all your app-specific css/scss.

### Other useful scss files

#### [typography.scss](https://github.com/tmwagency/kickoff/blob/master/scss/typography.scss)
You can use the brilliant [Gridlover](http://www.gridlover.net/) to work out your font sizings & spacings

#### [choreographic-grid.scss](https://github.com/tmwagency/kickoff/blob/master/scss/choreographic-grid.scss)
View the [example page](http://mrmartineau.github.com/Choreographic-Grid/test.html) for a demo then view the source to understand how it works.


## Useful SASS resources

* [SASS Documentation](http://www.kaelig.fr/bettersassdocs/)
	- [SASS functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html) - includes colour & math functions **VERY USEFUL**
* [sass-lang.com](http://sass-lang.com/)
* [thesassway.com](http://thesassway.com/)
	- [Referencing Parent Selectors using the ampersand (&) character](http://thesassway.com/intermediate/referencing-parent-selectors-using-ampersand)
	- [Sass control directives: @if, @for, @each and @while](http://thesassway.com/intermediate/if-for-each-while)
	- [Nested Selectors: The Inception Rule](http://thesassway.com/beginner/the-inception-rule)
* [SASS Meister](http://sassmeister.com/)
* [Getting Started with Sass](http://alistapart.com/article/getting-started-with-sass)
