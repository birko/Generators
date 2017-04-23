module Generators {
    "use strict";
    // rovnaka pravdepodobnost na padnutie hodnoty
    export function Uniform(): number {
        return Math.random();
    }

    export function UniformInterval(start: number, end: number): number {
        return (start + (Uniform() * (end - start)));
    }

    // pocetnost nastania javu za fixny casovy interval lambda je intenzita (napr max 20 za hodinu)
    export function Poisson(lambda: number): number {
        var k: number = 0;
        var limit: number = Math.exp((-1) * lambda);
        var p: number = Uniform();
        while (p > limit) {
            p *= Uniform();
            k += 1;
        }
        return k;
    }

    // pravdepodobnost uspechu
    export function Alternative(probability: number): number {
        return (Uniform() < probability) ? 1 : 0;
    }

    // vzdialenost "cas" medzi javmi (poruchami, prihodmi)
    // lambda maximalny cas
    export function Exponential(lambda: number): number {
        return (Math.log(1 - Uniform()) / ((-1) * lambda));
    }

    // celkovy cas trvania jednotlivych faz kde kazda faza ma Exponencionalne trvanie
    // k pocet Exponencianlych hodnot (pocet faz)
    export function Erlang(lambda: number, k: number): number {
        var result: number = 0;
        for (var i: number = 0; i < k; i++) {
            result += Exponential(lambda);
        }
        return result;
    }

    // cas medzi poruchami
    export function Weibull(lambda: number, k: number): number {
        return (lambda * Math.exp((1 / k) * Math.log(-Math.log(1 - Uniform()))));
    }

    // pri nedostatku dat mame maximalnu hodnotu minimalnu hodnotu a najpravdepodnonejsiu hodnotu
    export function Triangular(min: number, modus: number, max: number): number {
        var rand: number = Uniform();
        var result:number = 0;
        if (rand < (modus - min) / (max - min)) {
            result = min + Math.sqrt(rand * (max - min) * (modus - min));
        } else {
            result = max - Math.sqrt((1 - rand) * (max - min) * (max - modus));
        }
        return result;
    }

    export function Discrete(values: Array<number>, probabilities: Array<number>): number {
        var rand: number = Uniform();
        var pos: number = 0;
        var pom: number = 0;
        for (var i: number = 0; i < probabilities.length; i++) {
            pom += probabilities[i];
            if (rand <= pom) {
                pos = i;
                break;
            }
        }
        return values[pos];
    }
}