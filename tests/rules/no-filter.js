'use strict';

const rule = require( '../../src/rules/no-filter' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer Array#filter to .filter/$.filter';

const ruleTester = new RuleTester();
ruleTester.run( 'no-filter', rule, {
	valid: [ 'filter()', '[].filter()', 'div.filter()', 'div.filter' ],
	invalid: [
		{
			code: '$.filter()',
			errors: [ error ]
		},
		{
			code: '$("div").filter()',
			errors: [ error ]
		},
		{
			code: '$div.filter()',
			errors: [ error ]
		},
		{
			code: '$("div").first().filter()',
			errors: [ error ]
		},
		{
			code: '$("div").append($("input").filter())',
			errors: [ error ]
		}
	]
} );
