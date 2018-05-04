# promisify-func

Make function async (i.e. if function returns not Promise then it wraps it with Promise; if function throws error then wrap it with Promise.reject).

[![Coverage Status](https://coveralls.io/repos/github/artemdudkin/promisify-func/badge.svg)](https://coveralls.io/github/artemdudkin/promisify-func) [![Build Status](https://api.travis-ci.org/artemdudkin/promisify-func.svg?branch=master)](https://api.travis-ci.org/artemdudkin/promisify-func.svg?branch=master)

## Example

```js
const promisify = require('promisify-func');

const p = (url) => url;

promisify(p)(url).then(res => {
    //res == url
})

const t = () => {throw new Error()};

promisify(t)().catch(err => {
    //err == new Error()
})

//will do nothing for Promises
promisify(Promise.resolve("abc")).then(res => {
    //res == abc
})

```
