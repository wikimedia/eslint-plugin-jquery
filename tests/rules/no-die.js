'use strict';

const rule = require( '../../src/rules/no-die' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer .off/EventTarget#removeEventListener to .die. This rule is deprecated, use no-live.';

const ruleTester = new RuleTester();
ruleTester.run( 'no-die', rule, {
	valid: [ 'die()', '[].die()', 'div.die()', 'div.die' ],
	invalid: [
		{
			code: '$("div").die()',
			errors: [ error ]
		},
		{
			code: '$div.die()',
			errors: [ error ]
		},
		{
			code: '$("div").first().die()',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").die())',
			errors: [ error ]
		}
	]
} );
