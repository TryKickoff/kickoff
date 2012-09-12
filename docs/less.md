[Documentation table of contents](README.md)

These docs are still incomplete. If you have any questions, please email zmartineau@tmw.co.uk

# LESS

Kickoff is made with [Less](http://lesscss.org/) at its core, a dynamic stylesheet language created by our good friend, Alexis Sellier. It makes developing systems-based CSS faster, easier, and more fun.

### Why LESS?

One of Twitter Bootstrap's creators wrote a [quick blog post](http://www.wordsbyf.at/2012/03/08/why-less/) about this, summarized here:

* Bootstrap compiles faster ~6x faster with Less compared to Sass
* Less is written in JavaScript, making it easier to us to dive in and patch compared to Ruby with Sass.
* Less is more; we want to feel like we're writing CSS and making Bootstrap approachable to all.

### What's included?

As an extension of CSS, LESS includes variables, mixins for reusable snippets of code, operations for simple math, nesting, and even color functions.

### Learn more

Visit the official website at http://lesscss.org to learn more


## Compiling Kickoff with Less

Since our CSS is written with Less and utilizes variables and mixins, it needs to be compiled for final production implementation. Here's how:

### Apps

#### [Crunch](http://crunchapp.net/)
Crunch is a great looking LESS editor and compiler built on Adobe Air.

#### [CodeKit](http://incident57.com/codekit/)
Created by the same guy as the [unofficial **Mac** app](http://incident57.com/less/), CodeKit is a **Mac** app that compiles LESS, SASS, Stylus, and CoffeeScript.

#### [Simpless](http://wearekiss.com/simpless)
**Mac**, **Linux**, and **Windows** app for drag and drop compiling of LESS files. Plus, the [source code is on GitHub](https://github.com/Paratron/SimpLESS).

## Kickoff's default LESS files

The four most important .less files in any Kickoff project are:

#### 1. kickoff.less
All roads lead to here. `Kickoff.less` is the starting point for any kickoff project. Here you choose which other `.less` files your project needs. The order of the imported files is the same order that the CSS is compiled to.

Exclude any existing items by using a javascript comment `//` at the start of the line or remove that line completely.

#### 2. variables.less
This file contains all your app/site's global variables. For example, you can set your background colours, fonts, base text size etc here & use the variable names throughout the rest of your project.

#### 3. mixins.less
Mixins contains many useful items, but the most useful of which are the CSS3 mixins.

#### 4. app.less
Here you add all your app-specific css/less.

### Other useful LESS files

#### typography.less
You can use the brilliant [Gridlover](http://www.gridlover.net/) to work out your font sizings.

#### choreographic-grid.less
View the [example page](http://mrmartineau.github.com/Choreographic-Grid/test.html) for a demo then view the source to understand how it works.

#### forms.less