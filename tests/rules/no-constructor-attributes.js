'use strict';

const rule = require( '../../src/rules/no-constructor-attributes' );
const RuleTesterAndDocs = require( '../../tools/rule-tester-and-docs' );

const error = 'Prefer .attr to constructor attributes';

const ruleTester = new RuleTesterAndDocs();
ruleTester.run( 'no-constructor-attributes', rule, {
	valid: [
		'$(".div")',
		'$("<div>")',
		'$(".div", context)',
		'$("<div>", ownerDocument)',
		'$("<div/>", ownerDocument)',
		'$div.add("<div>", context)',
		{
			code: '(function(){$(".div")})()',
			noDoc: true
		}
	],
	invalid: [
		{
			code: '$("<div>", {width:100, class:"foo"})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("<div>", {on: {click:function(){}}})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("<div/>", {data:{foo:"bar"}})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		// This isn't a documented signature of $.add, but due to the
		// way it is implemented it does work
		{
			code: '$div.add("<div>", {width:100, class:"foo"})',
			errors: [ { message: error, type: 'CallExpression' } ]
		}
	]
} );
