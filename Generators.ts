
// Module
module Generators {
    //rovnaka pravdepodobnost na padnutie hodnoty
    export function Uniform() {
        return Math.random();
    }

    export function UniformInterval(start: number, end: number) {
        return (start + (Uniform() * (end - start)));
    }

    //Pocetnost nastania javu za fixny casovy interval lambda je intenzita (napr max 20 za hodinu)
    export function Poisson(lambda: number) {
        var k = 0;
        var limit = Math.exp((-1) * lambda)
        var p = Uniform();
        while (p > limit) {
            p *= Uniform();
            k += 1;
        }
        return k;
    }

    //pravdepodobnost uspechu
    export function Alternative(probability: number) {
        return (Uniform() < probability) ? 1 : 0;
    }

    //Vzdialenost "cas" medzi javmi (poruchami, prihodmi)
    // lambda maximalny cas
    export function Exponential(lambda: number) {
        return (Math.log(1 - Uniform()) / ((-1) * lambda));
    }

    //celkovy cas trvania jednotlivych faz kde kazda faza ma Exponencionalne trvanie
    // k pocet Exponencianlych hodnot (pocet faz)
    export function Erlang(lambda: number, k: number) {
        var result = 0;
        for (var i = 0; i < k; i++) {
            result += Exponential(lambda);
        }
        return result;
    }

    //cas medzi poruchami
    function Weibull(lambda: number, k: number) {
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

    function Discrete(values: number[], probabilities: number[]) {
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
}