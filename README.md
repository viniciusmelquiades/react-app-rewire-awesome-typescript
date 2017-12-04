# react-app-rewire-awesome-typescript
Add awesome-typescript-loader to a react-app-rewired config.

## Usage

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
 - [useTslint] - If set to false, will skip the tslit-loader - Default: true
 - [lintOptions] - The tslint options. See https://www.npmjs.com/package/tslint-loader#loader-options for all options