# no-parse-html-literal

Disallows parsing of HTML literal strings using either the jQuery method [`$()`](https://api.jquery.com/jquery/) or [`$.parseHTML`](https://api.jquery.com/jQuery.parseHTML/). Single tags are still allowed for creating new nodes as these don't tirgger the HTML parser. DOM build and manipulation methods should be used instead.

The format of single tags can be specified using the `singleTagStyle` option:
* `"minimal"` (default) no whitespace or self-closing i.e. `<div>`
* `"self-closing"` no whitespace and self-closing i.e. `<div/>`
* `"any"` no style enforced

## Rule details

❌ Examples of **incorrect** code:
```js
$( '<div>contents</div>' );
$( '<div attr=val>' );
$( '<div attr=val />' );
$( '<div>' + 'content' + '</div>' );
$div.html( '<div>contents</div>' );
$div.append( '<div>contents</div>' );
$div.add( '<div>contents</div>' );
$.parseHTML( '<div>contents</div>' );
$.parseHTML( '<div>' );
$( '<div/>' );
$( '<div></div>' );
```

✔️ Examples of **correct** code:
```js
$( '' );
$( '#id > .class[attr]' );
$( variable );
$( function () {} );
$( '<div>' );
$( '<div>', { width: 100 } );
$( '<' + 'div' + '>' );
$div.html();
$div.html( variable );
$.html( '<div>contents</div>' );
$div.append( variable );
$div.add( variable );
$.parseHTML( variable );
$.parseHTML( variable1 + variable2 );
$.parseHTML( 'string' + variable );
```

❌ Examples of **incorrect** code with `[{"singleTagStyle":"any"}]` options:
```js
$( '<div attr=val>' );
$( '<div><div>' );
```

✔️ Examples of **correct** code with `[{"singleTagStyle":"any"}]` options:
```js
$( '<div />' );
$( '<div></div>' );
$( '<div>' + '</div>' );
```

❌ Examples of **incorrect** code with `[{"singleTagStyle":"minimal"}]` options:
```js
$( '<div/>' );
$( '<div></div>' );
```

✔️ Examples of **correct** code with `[{"singleTagStyle":"minimal"}]` options:
```js
$( '<div>' );
```

❌ Examples of **incorrect** code with `[{"singleTagStyle":"self-closing"}]` options:
```js
$( '<div>' );
$( '<div />' );
$( '<div></div>' );
```

✔️ Examples of **correct** code with `[{"singleTagStyle":"self-closing"}]` options:
```js
$( '<div/>' );
```

## Resources

* [Rule source](/src/rules/no-parse-html-literal.js)
* [Test source](/src/tests/no-parse-html-literal.js)