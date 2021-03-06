'use strict';

const rule = require( '../../src/rules/no-closest' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer Element#closest to .closest';

const ruleTester = new RuleTester();
ruleTester.run( 'no-closest', rule, {
	valid: [ 'closest()', '[].closest()', 'div.closest()', 'div.closest' ],
	invalid: [
		{
			code: '$("div").closest()',
			errors: [ error ]
		},
		{
			code: '$div.closest()',
			errors: [ error ]
		},
		{
			code: '$("div").first().closest()',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").closest())',
			errors: [ error ]
		}
	]
} );
