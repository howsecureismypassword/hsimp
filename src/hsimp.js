"use strict";

var main = require("hsimp-main");
var L = require("hsimp-library");

main.setNamedNumberDictionary(require("hsimp-named-number/named-number-dictionary"));
main.setPeriodDictionary(require("hsimp-period/period-dictionary"));
main.setCheckerDictionary(require("hsimp-checker/checker-dictionary"));
main.setCheckerChecks(require("hsimp-checker/checks/patterns").concat(require("hsimp-checker/checks/top10k")));

var hsimp = L.curry(function (options, input) {
    if (!input || !L.isFunction(input.click)) {
        throw new Error("input not supplied");
    }

    var classes = input.getAttribute("class") + " hsimp-level";
    var outputTime = L.isFunction(options.outputTime) ? options.outputTime : L.noOp;
    var outputChecks = L.isFunction(options.outputChecks) ? options.outputChecks : L.noOp;
    var hsimpOptions = L.isObject(options.options) ? options.options : {};

    input.setAttribute("class", classes);

    main.setOptions(hsimpOptions);

    input.addEventListener("keyup", function () {
        var password = main(input.value);

        if (input.value.length) {
            input.setAttribute("class", classes + " hsimp-level--" + password.getSecurityLevel());
            outputTime(password.getString(), input);
            outputChecks(password.getChecks(), input);
        } else {
            input.setAttribute("class", classes);
            outputTime(false, input);
            outputChecks([]);
        }
    });
});

module.exports = hsimp;
