'use strict';

const rule = require( '../../src/rules/no-animate' );
const RuleTesterAndDocs = require( '../../tools/rule-tester-and-docs' );

const error = 'Prefer CSS transitions or CSS scroll-behaviour to .animate';
const errorNoScroll = 'Prefer CSS transitions to .animate';

const ruleTester = new RuleTesterAndDocs();
ruleTester.run( 'no-animate', rule, {
	valid: [
		'animate()',
		'[].animate()',
		'div.animate()',
		'div.animate',
		{
			code: '$div.animate({scrollTop: 100})',
			options: [ { allowScroll: true } ]
		},
		{
			code: '$div.animate({scrollLeft: 200})',
			options: [ { allowScroll: true } ]
		},
		{
			code: '$div.animate({scrollTop: 100, scrollLeft: 200})',
			options: [ { allowScroll: true } ]
		}
	],
	invalid: [
		{
			code: '$("div").animate()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate()',
			options: [ { allowScroll: true } ],
			errors: [ { message: errorNoScroll, type: 'CallExpression' } ]
		},
		{
			code: '$("div").first().animate()',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$("div").append($("input").animate())',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollTop: 100})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollTop: 100})',
			options: [ { allowScroll: false } ],
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollLeft: 200})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollTop: 100, scrollLeft: 200})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollTop: 100, width: 300})',
			errors: [ { message: error, type: 'CallExpression' } ]
		},
		{
			code: '$div.animate({scrollTop: 100, width: 300})',
			options: [ { allowScroll: true } ],
			errors: [ { message: errorNoScroll, type: 'CallExpression' } ]
		}
	]
} );
