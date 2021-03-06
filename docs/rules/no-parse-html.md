# no-parse-html

Disallows the [`$.parseHTML`](https://api.jquery.com/jQuery.parseHTML/) utility. Prefer `DOMImplementation#createHTMLDocument`.

⚙️ This rule is enabled in `plugin:no-jquery/all`.

## Rule details

❌ Examples of **incorrect** code:
```js
$.parseHTML( '<b>test</b>' );
```

✔️ Examples of **correct** code:
```js
parseHTML( '<b>test</b>' );
'test'.parseHTML( '<b>test</b>' );
'<b>test</b>'.parseHTML;
```

## Resources

* [Rule source](/src/rules/no-parse-html.js)
* [Test source](/src/tests/no-parse-html.js)
