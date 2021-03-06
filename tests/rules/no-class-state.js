'use strict';

const rule = require( '../../src/rules/no-class-state' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Where possible, maintain application state in JS to avoid slower DOM queries';

const ruleTester = new RuleTester();
ruleTester.run( 'no-class-state', rule, {
	valid: [
		'hasClass()',
		'[].hasClass()',
		'div.hasClass()',
		'div.hasClass',

		'toggleClass()',
		'[].toggleClass()',
		'div.toggleClass()',
		'div.toggleClass',

		// These are equivalent to addClass/removeClass and so
		// don't query the DOM for state information.
		'$div.toggleClass("myClass", true)',
		'$div.toggleClass("myClass", false)'
	],
	invalid: [
		{
			code: '$("div").hasClass()',
			errors: [ error ]
		},
		{
			code: '$div.hasClass()',
			errors: [ error ]
		},
		{
			code: '$("div").first().hasClass()',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").hasClass())',
			errors: [ error ]
		},
		{
			code: '$("div").toggleClass("myClass")',
			errors: [ error ]
		},
		{
			code: '$div.toggleClass("myClass")',
			errors: [ error ]
		},
		{
			code: '$("div").first().toggleClass("myClass")',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").toggleClass("myClass"))',
			errors: [ error ]
		}
	]
} );
