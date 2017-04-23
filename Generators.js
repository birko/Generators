"use strict";
var Generators;
(function (Generators) {
    "use strict";
    function Uniform() {
        return Math.random();
    }
    Generators.Uniform = Uniform;
    function UniformInterval(start, end) {
        return (start + (Uniform() * (end - start)));
    }
    Generators.UniformInterval = UniformInterval;
    function Poisson(lambda) {
        var k = 0;
        var limit = Math.exp((-1) * lambda);
        var p = Uniform();
        while (p > limit) {
            p *= Uniform();
            k += 1;
        }
        return k;
    }
    Generators.Poisson = Poisson;
    function Alternative(probability) {
        return (Uniform() < probability) ? 1 : 0;
    }
    Generators.Alternative = Alternative;
    function Exponential(lambda) {
        return (Math.log(1 - Uniform()) / ((-1) * lambda));
    }
    Generators.Exponential = Exponential;
    function Erlang(lambda, k) {
        var result = 0;
        for (var i = 0; i < k; i++) {
            result += Exponential(lambda);
        }
        return result;
    }
    Generators.Erlang = Erlang;
    function Weibull(lambda, k) {
        return (lambda * Math.exp((1 / k) * Math.log(-Math.log(1 - Uniform()))));
    }
    Generators.Weibull = Weibull;
    function Triangular(min, modus, max) {
        var rand = Uniform();
        var result = 0;
        if (rand < (modus - min) / (max - min)) {
            result = min + Math.sqrt(rand * (max - min) * (modus - min));
        }
        else {
            result = max - Math.sqrt((1 - rand) * (max - min) * (max - modus));
        }
        return result;
    }
    Generators.Triangular = Triangular;
    function Discrete(values, probabilities) {
        var rand = Uniform();
        var pos = 0;
        var pom = 0;
        for (var i = 0; i < probabilities.length; i++) {
            pom += probabilities[i];
            if (rand <= pom) {
                pos = i;
                break;
            }
        }
        return values[pos];
    }
    Generators.Discrete = Discrete;
})(Generators || (Generators = {}));
//# sourceMappingURL=generators.js.map