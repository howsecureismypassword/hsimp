# How Secure Is My Password?

Now you can use the [howsecureismypassword.net](https://howsecureismypassword.net) password strength meter on your own sites.

# About

Rather than just saying a password is "weak" or "strong", *How Secure is My Password?* lets your users know how long it would take someone to crack their password. It also checks against the top 10,000 most common passwords as well as a number of other checks (such as repeated strings, telephone numbers, and words followed by numbers).

## Other Versions

This is the vanilla JS version of the plugin. Other versions are also available:

- jQuery Version: [howsecureismypassword/jquery](https://github.com/howsecureismypassword/jquery)
- WordPress Version: [howsecureismypassword/wordpress](https://github.com/howsecureismypassword/wordpress)

# Setup

## Installation

```shell
bower install hsimp
```

## CSS
Copy the `build/hsimp.css` file to your `css` directory and include it in your document `<head>`:

```html
<link rel="stylesheet" href="/css/hsimp.css">
```

## JavaScript
Copy the `build/hsimp.min.js` file to your `js` directory and include it at the bottom of the document `<body>`:

```html
<script src="/js/hsimp.min.js"></script>
<!-- Other scripts go here -->
```

The `hsimp.min.js` file can optionally be used with AMD and Common JS module loaders using the module name `hsimp`. If no module loader is found a global `hsimp` function will be made available.

# Usage

The `hsimp` function takes two arguments: a configuration object and an HTML `<input>` element

```javascript
hsimp({
    options: {
        calculationsPerSecond: 1e10 // 10 billion,
        good: 31557600e3, // 1,000 years
        ok: 31557600 // 1 year
    },
    outputTime: function (time, input) {
        console.log(time, input);
    },
    outputChecks: function (checks, input) {
        console.log(checks, input);
    }
}, document.getElementById("password"));
```

## Configuration

The configuration object supports three properties:

- `options`: an object of options that affect calculations
- `outputTime`: a function that is passed the length of time it would take to crack the given password
- `outputChecks`: a function that is passed a list of results from various checks

### `options`

Currently there are three supported options:

- `calculationsPerSecond`: the assumed number of calculations per second a cracker could make (default: 10e9 - 10 billion)
- `good`: the minimum time (in seconds) that a "good" (green) password would take to crack (default: 31557600e6 - 1 million years)
- `ok`: the minimum time (in seconds) that an "ok" (orange) password would take to crack (default: 31557600 - 1 year)

### `outputTime`

The `outputTime` function is passed two variables: the time it would take to crack the password (as a human-readable string) and (optionally) the input which it refers to.

```javascript
var renderTime = function (time, input) {
    document.getElementById("password-strength").innerHTML(time);
}

hsimp({ outputTime: renderTime }, document.getElementById("password"));
```

### `outputChecks`

The `outputChecks` function is passed two variables: an array of check results and (optionally) the input which it refers to.

Each check result is an object with three properties:

- `name`: the check name/title
- `message`: some explanatory text
- `level`: the severity level (insecure, warning, notice, achievement)

```javascript
{
    name: "Length: Very Short",
    message: "Your password is very short. The longer a password is the more secure it will be.",
    level: "warning"
}
```

## Currying

The `hsimp` function supports currying. This means you can set the options once and then use the returned function to setup more than one input:

```javascript
var attachHSIMP = hsimp({
    // shared options here
});

attachHSIMP(document.getElementById("input-1"));
attachHSIMP(document.getElementById("input-2"));
```


# License

The MIT License (MIT)

Copyright (c) 2015, Mark Nicholas Wales / Small Hadron Collider

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
