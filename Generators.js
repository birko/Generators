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
    function UniformEnd(end) {
        return UniformInterval(0, end);
    }
    Generators.UniformEnd = UniformEnd;
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
    function Normal2(mean, sigma) {
        var s = Math.sqrt(-2 * Math.log(Uniform())) * sigma;
        var t = 2 * Math.PI * Uniform();
        return [mean + s * Math.sin(t), mean + s * Math.cos(t)];
    }
    Generators.Normal2 = Normal2;
    function Normal(mean, sigma, first) {
        if (first === void 0) { first = true; }
        var res = Normal2(mean, sigma);
        return (first) ? res[0] : res[1];
    }
    Generators.Normal = Normal;
    function Binomal(trials, probability) {
        if (trials < 0) {
            throw "Error";
        }
        if (trials === 0) {
            return 0;
        }
        if (probability >= 1) {
            return trials;
        }
        if (probability <= 0) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < trials; i++) {
            if (Uniform() < probability) {
                count++;
            }
        }
        return count;
    }
    Generators.Binomal = Binomal;
    function NegativeBinomal(successes, probability) {
        if (successes < 0) {
            throw "Error";
        }
        if (successes === 0) {
            return 0;
        }
        if (probability >= 1) {
            return 0;
        }
        if (probability <= 0) {
            return Infinity;
        }
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
    Generators.NegativeBinomal = NegativeBinomal;
    function Hypergeometric(trials, ones, count) {
        if (ones < 0 || count < 0 || trials < 0 || ones > count || trials > count) {
            throw "Error";
        }
        if (ones == 0) {
            return 0;
        }
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
    Generators.Hypergeometric = Hypergeometric;
    function Gamma(mean) {
        if (mean <= -1) {
            throw "Error";
        }
        var d = mean;
        var v = 0;
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
                if (v > 0) {
                    break;
                }
            }
            var u = Uniform();
            var x2 = x * x;
            if (u < (1 - (0.0331 * x2 * x2))) {
                break;
            }
            if (Math.log(u) < (0.5 * x2 + (d * (1 - v - Math.log(v))))) {
                break;
            }
        }
        if (mean < 1) {
            return d * v * Math.exp(Math.log(Uniform()) / mean);
        }
        return d * v;
    }
    Generators.Gamma = Gamma;
    function Gamma2(mean, b) {
        return Gamma(mean) * b;
    }
    Generators.Gamma2 = Gamma2;
    function Beta(mean, b) {
        var x = Gamma(mean);
        return x / (x + Gamma(b));
    }
    Generators.Beta = Beta;
    function BetaBinomial(trials, mean, b) {
        return Binomal(trials, Beta(mean, b));
    }
    Generators.BetaBinomial = BetaBinomial;
    function Cauchy(scale, mean) {
        return scale * Math.tan(Math.PI * (Uniform() - 0.5)) + mean;
    }
    Generators.Cauchy = Cauchy;
    function ChiSquared(degrees) {
        return Gamma(degrees + 0.5) * 2;
    }
    Generators.ChiSquared = ChiSquared;
    function Geometic(probability) {
        return NegativeBinomal(1, probability);
    }
    Generators.Geometic = Geometic;
    function InverseGamma2(mean, b) {
        return b / Gamma(mean);
    }
    Generators.InverseGamma2 = InverseGamma2;
    function Laplace(scale, mean) {
        return (Math.log(Uniform()) - Math.log(Uniform())) * scale + mean;
    }
    Generators.Laplace = Laplace;
    function LogarithmicNormal(mean, sigma, first) {
        if (first === void 0) { first = true; }
        return Math.exp(Normal(mean, sigma, first));
    }
    Generators.LogarithmicNormal = LogarithmicNormal;
    function SnedecorsF(mean, mean2) {
        return Gamma(mean * 0.5) * mean2 / (Gamma(mean2 * 0.5) * mean);
    }
    Generators.SnedecorsF = SnedecorsF;
    function Student(degrees, first) {
        if (first === void 0) { first = true; }
        return Normal(0, 1, first) / Math.sqrt(Gamma(degrees * 0.5) * 2 / degrees);
    }
    Generators.Student = Student;
})(Generators || (Generators = {}));
//# sourceMappingURL=generators.js.map