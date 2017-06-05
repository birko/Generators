module Generators {
    "use strict";
    // rovnaka pravdepodobnost na padnutie hodnoty
    export function Uniform(): number {
        return Math.random();
    }

    export function UniformInterval(start: number, end: number): number {
        return (start + (Uniform() * (end - start)));
    }

    export function UniformEnd(end: number): number {
        return UniformInterval(0, end);
    }

    //The following method generates a random integer that follows a Poisson distribution.
    //The integer is such that the average of the random integers approaches the given mean number when this method is called repeatedly with the same mean.Note that the mean can also be a fractional number
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

    // probability of success
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
    //The following method generates a random number that follows a triangular distribution, a distribution that starts at startpt, peaks at midpt, and ends at endpt.
    export function Triangular(min: number, modus: number, max: number): number {
        var rand: number = Uniform();
        var result: number = 0;
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

    //The following method generates two normally-distributed random numbers with mean mu (μ) and standard deviation sigma (σ).
    //(In a standard normal distribution, μ = 0 and σ = 1.), using the so- called Box- Muller transformation.
    export function Normal2(mean: number, sigma: number): number[] {
        var s = Math.sqrt(-2 * Math.log(Uniform())) * sigma;
        var t = 2 * Math.PI * Uniform();
        return [mean + s * Math.sin(t), mean + s * Math.cos(t)];
    }

    // as normal but returns the fisrt or second one accordnig first parameter
    export function Normal(mean: number, sigma: number, first: boolean = true) {
        var res = Normal2(mean, sigma);
        return (first) ? res[0] : res[1];
    }

    //The following method generates a random integer that follows a binomial distribution.
    //This number expresses the number of successes that have happened after a given number of trials (expressed as trials below), where the probability of a success is p (ranging from 0, never, to 1, always).
    export function Binomal(trials: number, probability: number): number {
        if (trials < 0) { throw "Error"; }
        if (trials === 0) { return 0; }
        if (probability >= 1) { return trials; }
        if (probability <= 0) { return 0; }
        var count = 0;
        for (var i = 0; i < trials; i++) {
            if (Uniform() < probability) {
                count++;
            }
        }
        return count;
    }

    //The following method generates a random integer that follows a negative binomial distribution.
    //This number expresses the number of failures that have happened after seeing a given number of successes (expressed as successes below), where the probability of a success is p (ranging from 0, never, to 1, always).
    export function NegativeBinomal(successes: number, probability: number): number {
        if (successes < 0) { throw "Error"; }
        if (successes === 0) { return 0; }
        if (probability >= 1) { return 0; }
        if (probability <= 0) { return Infinity; }
        var count = 0;
        var total = 0;
        while (true) {
            if (Uniform() < probability) {
                total++;
                if (total >= successes) {
                    return count;
                }
                else {
                    count++;
                }
            }
        }
    }

    //The following method generates a random integer that follows a hypergeometric distribution.
    //When a given number of items are drawn at random without replacement from a set of items labeled either 1 or 0, the random integer expresses the number of items drawn this way that are labeled 1. In the method below, trials is the number of items drawn at random, ones is the number of items labeled 1 in the set, and count is the number of items labeled 1 or 0 in that set.
    export function Hypergeometric(trials: number, ones: number, count: number): number {
        if (ones < 0 || count < 0 || trials < 0 || ones > count || trials > count) {
            throw "Error";
        }
        if (ones == 0) { return 0; }
        var successes = 0;
        var i = 0;
        var currentCount = count;
        var currentOnes = ones;
        while (i < trials && currentOnes > 0) {
            if (UniformEnd(currentCount) < currentOnes) {
                currentOnes--;
                successes++;
            }
            currentCount--;
            i++;
        }
        return successes;
    }

    //The following method generates a random number that follows a gamma distribution
    export function Gamma(mean: number): number {
        if (mean <= -1) {
            throw "Error";
        }
        var d = mean;
        var v = 0
        if (mean < 1) {
            d++;
        }
        d -= (1 / 3);
        var c = 1 / Math.sqrt(9 * d);
        while (true) {
            var x = 0;
            while (true) {
                x = Normal(0, 1);
                v = c * x + 1;
                v = v * v * v;
                if (v > 0) { break; }
            }
            var u = Uniform();
            var x2 = x * x;
            if (u < (1 - (0.0331 * x2 * x2))) { break; }
            if (Math.log(u) < (0.5 * x2 + (d * (1 - v - Math.log(v))))) { break; }
        }
        if (mean < 1) {
            return d * v * Math.exp(Math.log(Uniform()) / mean);
        }
        return d * v;
    }

    // gama with two parameters;
    export function Gamma2(mean: number, b: number): number {
        return Gamma(mean) * b;
    }

    export function Beta(mean: number, b: number) {
        var x = Gamma(mean);
        return x / (x + Gamma(b));
    }

    export function BetaBinomial(trials: number, mean: number, b: number) {
        return Binomal(trials, Beta(mean, b));
    }

    export function Cauchy(scale: number, mean: number) {
        return scale * Math.tan(Math.PI * (Uniform() - 0.5)) + mean;
    }

    //where degrees is the number of degrees of freedom
    export function ChiSquared(degrees: number) {
        return Gamma(degrees + 0.5) * 2;
    }

    //where probability has the same meaning as in the negative binomial distribution.
    export function Geometic(probability: number) {
        return NegativeBinomal(1, probability);
    }

    //where mean and b have the same meaning as in the two-parameter gamma distribution.
    export function InverseGamma2(mean: number, b: number) {
        return b / Gamma(mean);
    }

    export function Laplace(scale: number, mean: number) {
        return (Math.log(Uniform()) - Math.log(Uniform())) * scale + mean;
    }

    // where mean and sigma have the same meaning as in the normal distribution.
    export function LogarithmicNormal(mean: number, sigma: number, first: boolean = true) {
        return Math.exp(Normal(mean, sigma, first));
    }

    // where mean and mean2 are the numbers of degrees of freedom of two random numbers with a chi-squared distribution.
    export function SnedecorsF(mean: number, mean2: number) {
        return Gamma(mean * 0.5) * mean2 / (Gamma(mean2 * 0.5) * mean);
    }

    // where degrees is the number of degrees of freedom.
    export function Student(degrees: number, first: boolean = true) {
        return Normal(0, 1, first) / Math.sqrt(Gamma(degrees * 0.5) * 2 / degrees);
    }
}