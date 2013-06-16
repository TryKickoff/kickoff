[Documentation table of contents](readme.md)

These docs are still incomplete. If you have any questions, please [file an issue](https://github.com/tmwagency/kickoff/issues/new)

# Grunt.js

Kickoff has support for Grunt, the Javascript task runner.

## Setup

Setting up Kickoff to use Grunt is extremely simple, follow these simple steps.

### Step 1 - Install Node
Download and install Node.js from [nodejs.org](http://nodejs.org/)

### Step 2 - Install the Grunt CLI
In order to get started, you'll want to install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

Run `npm install -g grunt-cli`. This will put the grunt command in your system path, allowing it to be run from any directory.

### Step 3 - Install Sass
Make sure you have Ruby installed, then run `gem install sass` (or possibly `sudo gem install sass`) - you can also install the pre-release version using `gem install sass --pre`. This will install it globally on your machine so Grunt has access to it.

### Step 4 - Install LiveReload browser extension
In order to have your browser's styles refresh when a Sass file is modified you will need to install the [LiveReload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) (there are versions for Chrome, Safari and Firefox). 

### Step 5 - Checkout Kickoff
Checkout the latest version of Kickoff there using `git clone https://github.com/tmwagency/kickoff.git ProjectName`

### Step 6 - Install Node dependencies
Grunt will not work without having installed it's dependencies. Kickoff's [package.json](https://github.com/tmwagency/kickoff/blob/master/package.json#L23) uses a few essential Grunt plugins to operate. To install them, `cd` into the project directory, then run `npm install` which will add a new folder called `node_modules` with all the dependencies.

### Step 7 - Run Grunt
Out of the box, Kickoff is setup to use 3 Grunt tasks, but many more can be used options can be used.

Running **`grunt`** in the command line will do a one-time build using the default setup.

Running **`grunt watch`** will watch your working directory for any changes and build, compile or run any task that related to that file type. For example, editing a `.scss` file will effectively run the `grunt sass:dev` sub-task which compiles the sass to css. Changing any javascript will effectively run the `grunt uglify` task. 