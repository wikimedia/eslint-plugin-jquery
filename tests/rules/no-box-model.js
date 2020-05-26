'use strict';

const rule = require( '../../src/rules/no-box-model' );
const RuleTester = require( '../../tools/rule-tester' );

const error = '$.boxModel is not allowed';

const ruleTester = new RuleTester();
ruleTester.run( 'no-box-model', rule, {
	valid: [ 'boxModel', 'a.boxModel', 'boxModel.foo', 'a.boxModel.foo' ],
	invalid: [
		{
			code: '$.boxModel',
			errors: [ error ]
		},
		{
			code: '$.boxModel.style',
			errors: [ error ]
		}
	]
} );
