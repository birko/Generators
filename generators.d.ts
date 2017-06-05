declare module Generators {
    function Uniform(): number;
    function UniformInterval(start: number, end: number): number;
    function UniformEnd(end: number): number;
    function Poisson(lambda: number): number;
    function Alternative(probability: number): number;
    function Exponential(lambda: number): number;
    function Erlang(lambda: number, k: number): number;
    function Weibull(lambda: number, k: number): number;
    function Triangular(min: number, modus: number, max: number): number;
    function Discrete(values: Array<number>, probabilities: Array<number>): number;
    function Normal2(mean: number, sigma: number): number[];
    function Normal(mean: number, sigma: number, first?: boolean): number;
    function Binomal(trials: number, probability: number): number;
    function NegativeBinomal(successes: number, probability: number): number;
    function Hypergeometric(trials: number, ones: number, count: number): number;
    function Gamma(mean: number): number;
    function Gamma2(mean: number, b: number): number;
    function Beta(mean: number, b: number): number;
    function BetaBinomial(trials: number, mean: number, b: number): number;
    function Cauchy(scale: number, mean: number): number;
    function ChiSquared(degrees: number): number;
    function Geometic(probability: number): number;
    function InverseGamma2(mean: number, b: number): number;
    function Laplace(scale: number, mean: number): number;
    function LogarithmicNormal(mean: number, sigma: number, first?: boolean): number;
    function SnedecorsF(mean: number, mean2: number): number;
    function Student(degrees: number, first?: boolean): number;
}
