/*
 * Calculator Operator
 * https://github.com/lets-fiware/calculator-operator
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var safeEval = function safeEval(formula) {
        for (var i = 0; i < formula.length; i++) {
            if (' 0123456789.()+-*/A'.indexOf(formula.substr(i, 1)) === -1) {
                return null;
            }
        }
        return new Function('A', '"use strict";return (' + formula + ')');
    }

    var formula = safeEval(MashupPlatform.prefs.get('formula'));

    MashupPlatform.prefs.registerCallback(function (new_preferences) {
        formula = safeEval(MashupPlatform.prefs.get('formula'));
    }.bind(this));

    MashupPlatform.wiring.registerCallback("input", function (value) {
        if (!isNaN(value) && formula != null) {
            MashupPlatform.wiring.pushEvent("output", formula(value));
        } else {
            throw new MashupPlatform.wiring.EndpointTypeError();
        }
    });

})();
