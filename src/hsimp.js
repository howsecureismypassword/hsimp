"use strict";

var main = require("main");
var L = require("library");

main.setNamedNumberDictionary(require("named-number/named-number-dictionary"));
main.setPeriodDictionary(require("period/period-dictionary"));
main.setCheckerDictionary(require("checker/checker-dictionary"));

var hsimp = L.curry(function (options, input) {
    if (!input || !L.isFunction(input.click)) {
        throw new Error("input not supplied");
    }

    var classes = input.getAttribute("class") + " hsimp-level";
    var outputText = L.isFunction(options.outputTime) ? options.outputTime : L.noOp;
    var outputChecks = L.isFunction(options.outputChecks) ? options.outputChecks : L.noOp;
    var hsimpOptions = L.isObject(options.options) ? options.options : {};

    input.setAttribute("class", classes);

    main.setOptions(hsimpOptions);

    input.addEventListener("keyup", function () {
        var password = main(input.value);

        if (input.value.length) {
            input.setAttribute("class", classes + " hsimp-level--" + password.getSecurityLevel());
            outputText(password.getString(), input);
            outputChecks(password.getChecks(), input);
        } else {
            input.setAttribute("class", classes);
            outputText(false, input);
            outputChecks([]);
        }
    });
});

module.exports = hsimp;