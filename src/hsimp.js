"use strict";

var main = require("hsimp-main/bootstrap")(require("hsimp-main"));
var L = require("hsimp-library");

// define hsimp
var hsimp = L.curry(function (options, input) {
    if (!input || !L.isFunction(input.click)) {
        throw new Error("input not supplied");
    }

    var classes = input.getAttribute("class") + " hsimp-level";
    var outputTime = L.isFunction(options.outputTime) ? options.outputTime : L.noOp;
    var outputSecurityLevel = L.isFunction(options.outputSecurityLevel) ? options.outputSecurityLevel : L.noOp;
    var outputTimeInSeconds = L.isFunction(options.outputTimeInSeconds) ? options.outputTimeInSeconds : L.noOp;
    var outputChecks = L.isFunction(options.outputChecks) ? options.outputChecks : L.noOp;
    var hsimpOptions = L.isObject(options.options) ? options.options : {};

    input.setAttribute("class", classes);

    main.setOptions(hsimpOptions);

    input.addEventListener("keyup", function () {
        var password = main(input.value);

        if (input.value.length) {
            input.setAttribute("class", classes + " hsimp-level--" + password.getSecurityLevel());
            outputSecurityLevel(password.getSecurityLevel(), input);
            outputTime(password.getString(), input);
            outputTimeInSeconds(password.getTimeInSeconds(), input);
            outputChecks(password.getChecks(), input);
        } else {
            input.setAttribute("class", classes);
            outputSecurityLevel(password.getSecurityLevel(), input);
            outputTime(false, input);
            outputTimeInSeconds(0, input);
            outputChecks([], input);
        }
    });
});

// see https://github.com/howsecureismypassword/modules-main/blob/develop/dictionary.json
hsimp.setDictionary = main.setDictionary; 

// see https://github.com/howsecureismypassword/modules-period/blob/develop/period-dictionary.json
hsimp.setPeriodDictionary = main.setPeriodDictionary;

// see https://github.com/howsecureismypassword/modules-named-number/blob/develop/named-number-dictionary.json
hsimp.setNamedNumberDictionary = main.setNamedNumberDictionary 

// see https://github.com/howsecureismypassword/modules-checker/blob/develop/checker-dictionary.json
hsimp.setCheckerDictionary = main.setCheckerDictionary;

module.exports = hsimp;
