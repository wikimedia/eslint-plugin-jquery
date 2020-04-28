'use strict';

const rule = require( '../../src/rules/no-find' );
const RuleTesterAndDocs = require( '../../tools/rule-tester-and-docs' );

const error = 'Prefer Document#querySelectorAll to .find/$.find';

const ruleTester = new RuleTesterAndDocs();
ruleTester.run( 'no-find', rule, {
	valid: [ 'find()', '[].find()', 'div.find()', 'div.find', '$.extend().find()', '$div.myPlugin("foo").find()' ],
	invalid: [
		{
			code: '$.find()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").find()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.find()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").first().find()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").append($("input").find())',
			errors: [ { message: error, type: 'CallExpression' } ]
		}
	]
} );