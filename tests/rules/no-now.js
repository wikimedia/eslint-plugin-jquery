'use strict';

const rule = require( '../../src/rules/no-now' );
const RuleTester = require( '../../tools/rule-tester' );

const error = 'Prefer (new Date).getTime() to $.now';

const ruleTester = new RuleTester();
ruleTester.run( 'no-now', rule, {
	valid: [ 'now()', 'myClass.now()', '$div.now()' ],
	invalid: [
		{
			code: '$.now()',
			errors: [ { message: error, type: 'CallExpression' } ],
			output: 'Date.now()'
		}
	]
} );
