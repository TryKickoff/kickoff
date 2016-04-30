# Kickoff scss
## Views, partials & components

Our distinction between views, partials and components:

### Components

Small, self-contained files that concern one type of thing, that crucially, are reusable. For example, lists, forms etc. We have included quite a few in the components directory: buttons, forms, fluid video or grid for example, but you should add your components there too. Please browse through the included components to see what Kickoff offers, or see some of them in action in our demo area.

### Partials

Partials are partial parts of a page, like a masthead, sidebar or footer. They can have components inside them and can also be reusable. The partials directory should contain style partials, like _footer.scss or _masthead.scss.

### Views

Used for entire views (or pages). Usually these files consist of small tweaks that only concern a particular view. The views directory should contain view-specific styles that don’t fit into their own module, think _home.scss or `_recipe-page.scss` for example.

N.b. We recommend that it is better to make reusable components rather than styling based on a view. Therefore, the styles in this folder _should _ be minimal.

### Mixins

The mixins directory contains a few mixins that will help you day-to-day. Amongst others, _responsive.scss contains our media query mixins , `_hidpi.scss` contains our mixins for working with hiDPi (retina) styles and `_utility.scss` has a bunch of helpful mixins. For example, the @include `font-size()` mixin for specifying your font sizes with a px value but outputting both rem and px in your compiled styles.

### Functions

The functions directory contains various Sass functions that are used in the framework and that you might find useful.
