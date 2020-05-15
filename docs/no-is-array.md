# no-is-array

Disallows the [`$.isArray`](https://api.jquery.com/jQuery.isArray/) utility. Prefer `Array.isArray`.

This rule is enabled in `plugin:no-jquery/deprecated-3.2`.

## Rule details

❌ The following patterns are considered errors:
```js
$.isArray( [] );
```

✔️ The following patterns are not considered errors:
```js
isArray();
'test'.isArray();
'test'.isArray;
```

🔧 The `--fix` option can be used to fix problems reported by this rule:
```js
$.isArray( [] ); /* → */ Array.isArray( [] );
```

## Resources

* [Rule source](/src/rules/no-is-array.js)
* [Test source](/src/tests/no-is-array.js)
