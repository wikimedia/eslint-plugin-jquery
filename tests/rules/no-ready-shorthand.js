'use strict';

const rule = require( '../../src/rules/no-ready-shorthand' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer $() to .ready';

const ruleTester = new RuleTester();
ruleTester.run( 'no-ready-shorthand', rule, {
	valid: [
		'ready(fn)',
		'[].ready(fn)',
		'div.ready(fn)',
		'div.ready',
		'$.ready(fn)',
		'$(document).on("ready", fn)',
		'$(fn)'
	],
	invalid: [
		{
			code: '$(document).ready(fn)',
			errors: [ error ],
			output: '$(fn)'
		},
		{
			code: '$div.ready(fn)',
			errors: [ error ],
			output: '$(fn)'
		},
		{
			code: '$("div").first().ready(fn)',
			errors: [ error ],
			output: '$(fn)'
		},
		// Can't fix if the result might be used
		{
			code: '$("div").append($("input").ready(fn))',
			errors: [ error ]
		},
		{
			code: '$div = $("div").ready(fn)',
			errors: [ error ]
		}
	]
} );
