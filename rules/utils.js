'use strict';

// Methods which always return something else than a jQuery collection
const nonCollectionReturningMethods = [ 'toArray', 'get', 'position', 'serializeArray', 'serialize', 'index' ];
// Methods that return something else than a jQuery collection when called without arguments
const nonCollectionReturningAccessors = [ 'val', 'text', 'html', 'data', 'innerHeight', 'innerWidth', 'height', 'width', 'outerHeight', 'outerWidth', 'offset', 'scrollLeft', 'scrollTop' ];
// Methods that return something else than a jQuery collection when called with a single argument
const nonCollectionReturningValueAccessors = [ 'css', 'attr', 'prop' ];

function traverse( node, variableTest, constructorTest ) {
	while ( node ) {
		switch ( node.type ) {
			case 'CallExpression':
				if ( node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier' ) {
					const name = node.callee.property.name;

					if ( nonCollectionReturningMethods.indexOf( name ) !== -1 ) {
						// e.g. $foo.toArray(), returns false
						return false;
					}

					if (
						nonCollectionReturningAccessors.indexOf( name ) !== -1 &&
						node.arguments.length === 0
					) {
						// e.g. $foo.val(), returns false
						return false;
					}

					if (
						nonCollectionReturningValueAccessors.indexOf( name ) !== -1 &&
						node.arguments.length === 1
					) {
						// e.g. $foo.css("margin"), returns false
						return false;
					}
				}

				node = node.callee;

				break;
			case 'MemberExpression':
				node = node.object;
				if ( node.property ) {
					if ( node.property.type === 'Identifier' ) {
						// e.g. $foo in this.$foo.bar(), returns true
						// or foo in $this.foo.bar(), returns false
						return variableTest( node.property );
					}
					if ( node.property.type === 'Literal' ) {
						// e.g. 0 in $foo[0].bar()
						// or 'prop' in $foo['prop'].bar()
						return false;
					}
				}
				break;
			case 'Identifier':
				if ( node.parent && node.parent.type === 'CallExpression' ) {
					return constructorTest( node );
				} else {
					return variableTest( node ) || constructorTest( node );
				}
			default:
				return false;
		}
	}
}

function isjQueryConstructor( context, name ) {
	const constructorAliases =
		( context.settings && context.settings[ 'no-jquery' ] && context.settings[ 'no-jquery' ].constructorAliases ) ||
		[ '$', 'jQuery' ];
	return constructorAliases.indexOf( name ) !== -1;
}

// Traverses from a node up to its root parent to determine if it
// originated from a jQuery `$()` function.
//
// node - The CallExpression node to start the traversal.
//
// Examples
//
//   Returns true for:
//     $('div').find('p').focus()
//     $div.find('p').focus()
//     this.$div.find('p').focus()
//     $.each()
//
//   Returns false for:
//     div.focus()
//     $div[0].focus()
//     $div.remove.bind()
//     $method('foo').focus()
//
// Returns true if the function call node is attached to a jQuery element set.
function isjQuery( context, node ) {
	const variablePattern = new RegExp(
		( context.settings && context.settings[ 'no-jquery' ] && context.settings[ 'no-jquery' ].variablePattern ) ||
		'^\\$.'
	);
	return traverse(
		node,
		// variableTest
		( id ) => !!id && variablePattern.test( id.name ),
		// constructorTest
		( id ) => !!id && isjQueryConstructor( context, id.name )
	);
}

function isFunction( node ) {
	return node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
}

function createRule( create, description, fixable ) {
	return {
		meta: {
			docs: {
				description: description
			},
			fixable: fixable,
			schema: []
		},
		create: create
	};
}

function createCollectionMethodRule( methods, message, fixable, fix ) {
	methods = Array.isArray( methods ) ? methods : [ methods ];

	let description = 'Disallows the .' + methods.join( '/' ) + ' ' +
			( methods.length > 1 ? 'methods' : 'method' ) + '.';

	if ( typeof message === 'string' ) {
		description += ' ' + message + '.';
	}

	return createRule( function ( context ) {
		return {
			CallExpression: function ( node ) {
				if ( node.callee.type !== 'MemberExpression' ) {
					return;
				}
				const name = node.callee.property.name;
				if (
					methods.indexOf( name ) === -1 ||
					isjQueryConstructor( context, node.callee.object.name )
				) {
					return;
				}

				if ( isjQuery( context, node.callee ) ) {
					context.report( {
						node: node,
						message: typeof message === 'function' ?
							message( node ) :
							message || '$.' + name + ' is not allowed',
						fix: fix && fix.bind( this, node )
					} );
				}
			}
		};
	}, description, fixable );
}

function createCollectionPropertyRule( property, message ) {
	let description = 'Disallows the $.' + property + ' property.';

	if ( typeof message === 'string' ) {
		description += ' ' + message + '.';
	}

	return createRule( function ( context ) {
		return {
			MemberExpression: function ( node ) {
				const name = node.property.name;
				if (
					name !== property ||
					node.parent.callee === node
				) {
					return;
				}

				if ( isjQuery( context, node ) ) {
					context.report( {
						node: node,
						message: typeof message === 'function' ?
							message( node ) :
							message || '$.' + name + ' is not allowed'
					} );
				}
			}
		};
	}, description );
}

function createUtilMethodRule( methods, message, fixable, fix ) {
	methods = Array.isArray( methods ) ? methods : [ methods ];

	let description = 'Disallows the $.' + methods.join( '/' ) + ' ' +
			( methods.length > 1 ? 'utilies' : 'utility' ) + '.';

	if ( typeof message === 'string' ) {
		description += ' ' + message + '.';
	}

	return createRule( function ( context ) {
		return {
			CallExpression: function ( node ) {
				if ( node.callee.type !== 'MemberExpression' ) {
					return;
				}
				const name = node.callee.property.name;
				if (
					methods.indexOf( name ) === -1 ||
					!isjQueryConstructor( context, node.callee.object.name )
				) {
					return;
				}

				context.report( {
					node: node,
					message: typeof message === 'function' ?
						message( node ) :
						message || '$.' + name + ' is not allowed',
					fix: fix && fix.bind( this, node )
				} );
			}
		};
	}, description, fixable );
}

function createUtilPropertyRule( property, message ) {
	let description = 'Disallows the $.' + property + ' property.';

	if ( typeof message === 'string' ) {
		description += ' ' + message + '.';
	}

	return createRule( function ( context ) {
		return {
			MemberExpression: function ( node ) {
				if ( !isjQueryConstructor( context, node.object.name ) ) {
					return;
				}
				const name = node.property.name;
				if ( name !== property ) {
					return;
				}

				context.report( {
					node: node,
					message: typeof message === 'function' ?
						message( node ) :
						message || '$.' + name + ' is not allowed'
				} );
			}
		};
	}, description );
}

function createCollectionOrUtilMethodRule( methods, message ) {
	methods = Array.isArray( methods ) ? methods : [ methods ];

	let description = 'Disallows the .' + methods.join( '/' ) + ' ' +
			( methods.length > 1 ? 'methods' : 'method' );

	description += ' and $.' + methods.join( '/' ) + ' ' +
			( methods.length > 1 ? 'utilies' : 'utility' ) + '.';

	if ( typeof message === 'string' ) {
		description += ' ' + message + '.';
	}

	return createRule( function ( context ) {
		return {
			CallExpression: function ( node ) {
				if ( node.callee.type !== 'MemberExpression' ) {
					return;
				}
				const name = node.callee.property.name;
				if ( methods.indexOf( name ) === -1 ) {
					return;
				}
				if ( isjQuery( context, node.callee ) ) {
					context.report( {
						node: node,
						message: typeof message === 'function' ?
							message( node ) :
							message || '$.' + name + ' is not allowed'
					} );
				}
			}
		};
	}, description );
}

module.exports = {
	isjQuery: isjQuery,
	isjQueryConstructor: isjQueryConstructor,
	isFunction: isFunction,
	createCollectionMethodRule: createCollectionMethodRule,
	createCollectionPropertyRule: createCollectionPropertyRule,
	createUtilMethodRule: createUtilMethodRule,
	createUtilPropertyRule: createUtilPropertyRule,
	createCollectionOrUtilMethodRule: createCollectionOrUtilMethodRule
};
