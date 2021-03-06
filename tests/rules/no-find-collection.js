'use strict';

const rule = require( '../../src/rules/no-find-collection' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer Document#querySelectorAll to .find';

const ruleTester = new RuleTester();
ruleTester.run( 'no-find-collection', rule, {
	valid: [ '$.find()', 'find()', '[].find()', 'div.find()', 'div.find', '$.extend().find()', '$div.myPlugin("foo").find()' ],
	invalid: [
		{
			code: '$("div").find()',
			errors: [ error ]
		},
		{
			code: '$div.find()',
			errors: [ error ]
		},
		{
			code: '$("div").first().find()',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").find())',
			errors: [ error ]
		}
	]
} );
