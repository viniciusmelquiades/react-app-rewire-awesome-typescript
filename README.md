# react-app-rewire-awesome-typescript
Add awesome-typescript-loader to a react-app-rewired config.

**NOT YET TESTED FOR PRODUCTION BUILDS**

## How this package works

- First we tell webpack the entry file doesn't need to be a .js file, just be named `index`
- Then tell webpack to understand ALL .ts, .tsx, etc files.
- Add the awesome-typescript-loader (by default), using babel as well, in the compilation rule.
- Optionaly (true by default) adds tslint-loader as the fisrt rule ever, so ts files can be linted.

## Usage

See the sample [tsconfig.json](./tsconfig.sample.json) File.
Define your linting rules in a file in the root with the name `tslint.json`. (Yes, the default one).

```javascript

module.exports = require('react-app-rewire-awesome-typescript')(/* options */);

// or

module.exports = function override(config, env) {

	const rewire = react_app_rewired.compose(
		//...
		require('react-app-rewire-awesome-typescript')(),
		//...
	);

	return rewire(config, env);
};

```

## Options

 - [loaderOptions] - The 'awesome-typescript-loader' loader options
 - [tsLoader] - The name of the loader to use. Will default to 'awesome-typescript-loader'
 - [tsLintLoader] - The tslit-loader to use. If set to NULL (or false values), will skip the lint. Defaults to `tslit-loader`
 - [lintOptions] - The tslint options. See https://www.npmjs.com/package/tslint-loader#loader-options for all options