# postcss-rem-to-em-plugin

[PostCSS] plugin that converts 'rem' references to 'em' references.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  font-size: 30rem;
}
```

```css
.foo {
  font-size: 30em;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss @skipper-hospitality/postcss-rem-to-em-plugin
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list. If you are using a PostCSS postprocessor and bundler like TailwindCSS, you will want to run this after it:

```diff
module.exports = {
  plugins: [
+   require('postcss-rem-to-em-plugin'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
