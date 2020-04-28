'use strict';

const rule = require( '../../src/rules/no-closest' );
const RuleTesterAndDocs = require( '../../tools/rule-tester-and-docs' );

const error = 'Prefer Element#closest to .closest';

const ruleTester = new RuleTesterAndDocs();
ruleTester.run( 'no-closest', rule, {
	valid: [ 'closest()', '[].closest()', 'div.closest()', 'div.closest' ],
	invalid: [
		{
			code: '$("div").closest()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.closest()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").first().closest()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").append($("input").closest())',
			errors: [ { message: error, type: 'CallExpression' } ]
		}
	]
} );