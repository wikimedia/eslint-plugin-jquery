'use strict';

const utils = require( './utils.js' );

module.exports = utils.createCollectionMethodRule(
	'unload',
	'Prefer $.on or $.trigger to $.unload',
	'code',
	utils.eventShorthandFixer
);
