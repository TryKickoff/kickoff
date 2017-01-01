# SVG
SVG's in Kickoff are converted into an svg spritesheet. They are then used by using the `use` syntax, see below:

## Usage

```html
<!-- source file: `logo-twitter.svg` -->
<svg role="img" title="Twitter" class="icon icon--large">
	<use xlink:href="/assets/dist/img/icons.svg#logo-twitter"/>
</svg>
```

## SVG
Wherever possible, in your SVG source file, you should ensure that the fill or stroke value is set to `currentColor`. That way you can set the value using CSS :+1:

The name of the svg file will be its `id` that you use to reference it.

## Polyfill
[svg4everybody](https://github.com/jonathantneal/svg4everybody) is used to polyfill older browsers so we can benefit from the new workflow.
