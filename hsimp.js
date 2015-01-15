"use strict";

var main = require("main");

main.setNamedNumberDictionary(require("named-number/named-number-dictionary"));
main.setPeriodDictionary(require("period/period-dictionary"));
main.setCheckerDictionary(require("checker/checker-dictionary"));

var hsimp = function (input) {
    var parent = input.parentNode;
    var output = document.createElement("p");

    parent.appendChild(output);

    input.addEventListener("keyup", function () {
        var password = main(input.value);

        output.innerHTML = input.value.length ? password.getString() : "";
    });
};

module.exports = hsimp;