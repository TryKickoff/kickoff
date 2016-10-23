# Kickoff scss
> Find out more at https://trykickoff.now.sh/learn/css.html

## Important files

It’s important to become familiar with all of these files so you can make full use of the framework.

### `kickoff.scss`

All roads lead to here. This file is where all of Kickoff’s Sass dependencies are defined. It imports all of the scss files that will be compiled into your project. If you need to add or remove a file, do it here. The order of the imported files is the same order that the CSS will be compiled to.

### `_global.scss`
This file contains all styles that do not obviously fit within any other scss partial. For example, we include our body’s background styles and the main .l-container styles. Try not to fill this up with all your styles though. Your Sass should be written in a modular way, and so the majority of your Sass should be organised within the components, partials or views directories.

### `_helper-classes.scss`
This file contains a bunch of helper styles, like .clearfix (for clearing floats), .ir for using background image replacement, .is-hidden etc.

## Sass Variables
We take full advantage of Sass’ variables and there are two key files that should be edited at the start of development on any new Kickoff project. These are `_variables.scss` and `_color-palette.scss`.

### `_variables.scss`
This is where you define your global Sass variables. Here you can define your:

* Global typographic styles — including font choices and typographic scale.
* Responsive breakpoints — we try not to target specific devices or device types with these variables. Instead they should be set with the design in mind.

#### _color-palette.scss 
Text colour, link colours, background colour, form fields and various component colours can all be set in this file.

---

## Views, partials & components

Our distinction between views, partials and components:

### Components

Small, self-contained files that concern one type of thing, that crucially, are reusable. For example, lists, forms etc. We have included quite a few in the components directory: buttons, forms, fluid video or grid for example, but you should add your components there too. Please browse through the included components to see what Kickoff offers, or see some of them in action in our demo area.

### Partials

Partials are partial parts of a page, like a masthead, sidebar or footer. They can have components inside them and can also be reusable. The partials directory should contain style partials, like _footer.scss or _masthead.scss.

### Views

Used for entire views (or pages). Usually these files consist of small tweaks that only concern a particular view. The views directory should contain view-specific styles that don’t fit into their own module, think _home.scss or `_recipe-page.scss` for example.

N.b. We recommend that it is better to make reusable components rather than styling based on a view. Therefore, the styles in this folder _should _ be minimal.

### Mixins & Functions

We make use of a lot of these, but they are not stored within the repo. Please visit [github.com/TryKickoff/kickoff-utils.scss](https://github.com/TryKickoff/kickoff-utils.scss) to find out more about them.
