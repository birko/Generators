var Generators;
(function (Generators) {
    "use strict";

    // rovnaka pravdepodobnost na padnutie hodnoty
    function Uniform() {
        return Math.random();
    }
    Generators.Uniform = Uniform;

    function UniformInterval(start, end) {
        return (start + (Uniform() * (end - start)));
    }
    Generators.UniformInterval = UniformInterval;

    // pocetnost nastania javu za fixny casovy interval lambda je intenzita (napr max 20 za hodinu)
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

    // pravdepodobnost uspechu
    function Alternative(probability) {
        return (Uniform() < probability) ? 1 : 0;
    }
    Generators.Alternative = Alternative;

    // vzdialenost "cas" medzi javmi (poruchami, prihodmi)
    // lambda maximalny cas
    function Exponential(lambda) {
        return (Math.log(1 - Uniform()) / ((-1) * lambda));
    }
    Generators.Exponential = Exponential;

    // celkovy cas trvania jednotlivych faz kde kazda faza ma Exponencionalne trvanie
    // k pocet Exponencianlych hodnot (pocet faz)
    function Erlang(lambda, k) {
        var result = 0;
        for (var i = 0; i < k; i++) {
            result += Exponential(lambda);
        }
        return result;
    }
    Generators.Erlang = Erlang;

    // cas medzi poruchami
    function Weibull(lambda, k) {
        return (lambda * Math.exp((1 / k) * Math.log(-Math.log(1 - Uniform()))));
    }

    // pri nedostatku dat mame maximalnu hodnotu minimalnu hodnotu a najpravdepodnonejsiu hodnotu
    function Triangular(min, modus, max) {
        var rand = Uniform();
        var result = 0;
        if (rand < (modus - min) / (max - min)) {
            result = min + Math.sqrt(rand * (max - min) * (modus - min));
        } else {
            result = max - Math.sqrt((1 - rand) * (max - min) * (max - modus));
        }
        return result;
    }

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
})(Generators || (Generators = {}));
//# sourceMappingURL=Generators.js.map
