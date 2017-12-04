// @ts-check

"use strict";

const path = require('path');
const fs = require('fs');
const { getBabelLoader } = require('react-app-rewired');

/**
 * @typedef AwesomeTypescriptRewireOptions
 * @property {*} [loaderOptions] - The 'awesome-typescript-loader' loader options
 * @property {boolean} [useTslint] @default true - If set to false, will skip the tslit-loader
 * @property {*} [lintOptions] - The tslint options. See https://www.npmjs.com/package/tslint-loader#loader-options for all options
 */

/**
 * @param {AwesomeTypescriptRewireOptions} [options]
 */
module.exports = (options = { useTslint: true }) =>
	/**
	 * @param {string} env
	 */
	(config, env) => {
		// Monkey patch react-scripts paths to use just `src` instead of
		// `src/index.js` specifically. Hopefully this can get removed at some point.
		// @see https://github.com/facebookincubator/create-react-app/issues/3052

		// Copied from https://github.com/lwd-technology/react-app-rewire-typescript
		const paths = require('react-scripts/config/paths')
		if(paths) {
			paths.appIndexJs = path.resolve(fs.realpathSync(process.cwd()), 'src')
		}

		// Replaces the "index.js" file to simply "index", in the entries
		const lastEntry = config.entry.pop();
		config.entry.push(lastEntry.replace(/.js?$/, ''));

		// Tells webpack to use TypeScript's extensions
		config.resolve.extensions.push(".web.tsx", ".web.ts", ".tsx", ".ts");

		/**
		 *  @type {*}
		 * Code complains without this
		*/
		const babelLoader = getBabelLoader(config.module.rules);

		if(babelLoader === undefined)
			throw new Error('Could not get the Babel loader');

		const tsExtensionMatcher = /\.tsx?$/;
		const tsRule = {
			test: tsExtensionMatcher,
			use: [
				{ loader: babelLoader.loader, options: babelLoader.options },
				{ loader: 'awesome-typescript-loader', options: options.loaderOptions }
			]
		};

		// The rule 0 is the linter.
		// The rule 1 is the compilation, with all the filters in the oneOf property
		// So we add the tsRule as the first rule of the compilation
		config.module.rules[1].oneOf.splice(0, 0, tsRule);

		// This adds the tslint rules. It is enabled by default, and can be disabled in the options.
		if(options.useTslint) {

			const tsLinterRule = {
				test: tsExtensionMatcher,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: options.lintOptions
			}

			config.module.rules.unshift(tsLinterRule);
		}

		return config;
	};
