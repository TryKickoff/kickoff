# Kickoff Sass (.scss) source
> Find out more at http://trykickoff.com/learn/css.html

### The purpose of this repo is to separate the main CSS framework from the main kickoff repo. This is so that the CSS can be included into any project regardless of project type i.e. a React/Angular/Vue/Drupal/etc/etc project.

Kickoff's CSS framework is based on Sass, and this repo does not deal with compilation, only the source files.

## Installation

```sh
npm install -S @kickoff/scss

# or

yarn add @kickoff/scss
```

### Install the dependencies alongside the scss source
This might be useful if you want to update some of the 3rd party Sass dependencies (like our utils or include-media) and not Kickoff's scss source.

```sh
npm install -S @kickoff/scss kickoff-utils.scss kickoff-grid.css kickoff-fluidVideo.css include-media normalize.css

# or

yarn add @kickoff/scss kickoff-utils.scss kickoff-grid.css kickoff-fluidVideo.css include-media normalize.css
```

### Copy to your project directory
Once installed, copy the `node_modules/@kickoff/scss` directory to your main project directory

## Dependencies
### Kickoff's external Sass modules
* [kickoff-utils.scss](https://github.com/TryKickoff/kickoff-utils.scss) - Kickoff's Sass utility functions and mixins
* [kickoff-grid.css](https://github.com/TryKickoff/kickoff-grid.css) - our Sass grid framework
* [kickoff-fluidVideo.css](https://github.com/TryKickoff/kickoff-fluidVideo.css) - Simple fluid-width videos using only CSS

### 3rd party Sass modules
* [include-media](https://include-media.com) is used for improved media queries, [see below](#media-queries) for more about this
* [normalize.css](https://github.com/JohnAlbin/normalize-scss) - Normalize.css is now imported using a Sass port of the library

### Important Sass files

It’s important to become familiar with **all of these files** so you can make full use of the framework.

#### [kickoff.scss](https://github.com/TryKickoff/scss/blob/master/kickoff.scss)
All roads lead to here. This is the base SCSS file and is the hook by which Grunt compiles the projects CSS. `kickoff.scss` is compiled to `/assets/dist/css/kickoff.css` and is used on Internet Explorer 9+, Chrome, Safari, Firefox and Opera.

#### [_global.scss](https://github.com/TryKickoff/scss/blob/master/_global.scss)
This file contains all styles that do not obviously fit within any other scss partial. For example, we include our body's background styles and the main `.l-container` styles. **Try not to fill this up with all your styles though.** Your Sass should be written in a modular way, and so the majority of your Sass should be organised within the `components`, `partials` or `views` directories.

#### [_helper-classes.scss](https://github.com/TryKickoff/scss/blob/master/_helper-classes.scss)
This file contains a bunch of helper styles, like `.clearfix` (for clearing floats), `.ir` for using background image replacement, `.is-hidden` etc.

## Sass Variables
We take full advantage of Sass' variables and there are two key files that should be edited at the start of development on any new Kickoff project. These are `scss/_variables.scss` and `scss/_color-palette.scss`.

#### [_variables.scss](https://github.com/TryKickoff/scss/blob/master/_variables.scss)
This is where you define your global Sass variables. Here you can define your:

* **Global typographic styles** — including font choices and typographic scale.
* **Responsive breakpoints** — we try not to target specific devices or device types with these variables.  Instead they should be set with the design in mind. The `$breakpoints` sass map, contains our default breakpoints, these are used by the grid and can be referenced by using the `bp(mid)` sass function. See how to use the breakpoints when using our mixins, [below](#responsive).

#### [_color-palette.scss](https://github.com/TryKickoff/scss/blob/master/_color-palette.scss)
Text colour, link colours, background colour, form fields and various component colours can all be set in this file.

<hr class="sectionSplitter">
<a name="usefulclasses"></a>

## Useful CSS classes & styles

* `.l-container`: found in `/assets/src/scss/_global.scss`, this class controls the main content 'column' on your site.
* `.btn`: found in `/assets/src/scss/components/_buttons.scss` for buttons. See the possible modifiers on the [components demo page](/demos/components.html#buttons)
* Anchor links (`a`) are styled in `/assets/src/scss/components/_links.scss`
* `.l-mb0` or `.l-mt0`: for zeroing any `margin-bottom/top` values. See also the other helper classes in `/assets/src/scss/_helper-classes.scss`
* `.clearfix`: for clearing floats. See also the other helper classes in `/assets/src/scss/_helper-classes.scss`
* `.h1`, `.h2`, `.h3`, `.h4`: font-sizing helper classes for headings

<hr class="sectionSplitter">
<a name="responsive"></a>

## Responsive
Kickoff does not enforce a mobile first approach to CSS, but it is encouraged and it takes a fairly unique approach to responsive sites.

### Media queries
#### Media queries v8.0.0 and above
**Kickoff v8.0.0 introduced a new mixin library to handle media-queries**. This library, [include-media](http://include-media.com/) allows for a more simple syntax and better control of media-queries. There is just one mixin call that takes a few different options:

#### Example
```scss
// The keywords below are from the $breakpoints map in _variables.scss

// Equivalent to min-width query
@include media(">m") {
	width: 50%;
}

// Equivalent to min-width and max-width query
@include media(">s", "<=xl") {
	width: 50%;
}

// Equivalent to min-width
@include media(">200px") {
	width: 50%;
}
```

#### Better media query example
Rather than having all of your media queries for different widths stored in separate scss files or placed at the bottom of each SCSS partial, we suggest making use of Sass' nested media queries.

This means that all styles related to an element are together, for example:

```scss
a {
	padding: 1em;

	@include media('>800') {
		padding: 2em;
	}
}
```

## CSS Naming scheme
Kickoff uses a bespoke naming scheme for classnames, inspired loosely by the [BEM naming scheme](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

This obviously isn’t compulsory to use in your own Kickoff projects, but is documented here as guidance, and is what we use across our Kickoff projects.

```scss
/* Descriptors use camel-casing if more than one word: e.g. twoWords */
.form {
	...
}

/* ========= */

/* Child elements use single hyphens: - */
.form-controlGroup {
	...
}

/* ========= */

/* Modifier element use a double hyphen: -- */
.form {
	...
}
.form--horizontal {
	...
}

/* ========= */

/* Element state: .is- or .has- */
.is-active {
	...
}

/* ========= */

/* Sass variables use dash-case */
a {
	color: $color-primary;
}
```

---

### Elements, components, partials & views
We use a similar philosophy to [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) but instead of atoms, molecules, organisms & templates we use elements, components, partials & views; below is out distinction.

#### Elements
Elements are single elements.

#### Components
Components are small, self-contained files that concern one type of thing, that crucially, are reusable. For example, lists, forms etc. We have included quite a few in the [components](https://github.com/TryKickoff/scss/blob/master/components/) directory: [buttons](https://github.com/TryKickoff/scss/blob/master/components/_buttons.scss) & [forms](https://github.com/TryKickoff/scss/blob/master/components/_forms.scss) for example, but you should add your components there too. Please [browse through](https://github.com/TryKickoff/scss/blob/master/components/) the included components to see what Kickoff offers, or see some of them in action in our [demo area](../demos/).

#### Partials
Partials are partial parts of a page, like a masthead, sidebar or footer. They typically have multiple 'components' inside them and can also be reusable. The [partials](https://github.com/TryKickoff/scss/blob/master/partials/) directory should contain style partials, like `_footer.scss` or `_masthead.scss`.

#### Views
Used for entire views (or pages). Usually these files consist of small tweaks that only concern a particular view. The [views](https://github.com/TryKickoff/scss/blob/master/views/) directory should contain view-specific styles that don't fit into their own module, think `_home.scss` or `_recipe-page.scss` for example. **N.b.** We recommend that it is better to make reusable components rather than styling based on a view.  Therefore, the styles in this folder *should* be minimal.

### Mixins & Functions
We make use of a lot of these, but they are not stored within the repo. Please visit [github.com/TryKickoff/kickoff-utils.scss](https://github.com/TryKickoff/kickoff-utils.scss) to find out more about them. If you need your own, please create a relevant `functions` or `mixins` directory for whichever you need.

---

## Upgrade path
As with anything Kickoff-related, it can be tricky to upgrade because this dependency shouldn't be treated like standard dependencies, it should be treated as another part of your codebase. With that in mind, updating to a newer version of this should be done with great care because local changes will be overwritten by the new update. Remember that after each update, you will need to copy these files into your project directory.
