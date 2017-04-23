declare module Generators {
    function Uniform(): number;
    function UniformInterval(start: number, end: number): number;
    function Poisson(lambda: number): number;
    function Alternative(probability: number): number;
    function Exponential(lambda: number): number;
    function Erlang(lambda: number, k: number): number;
    function Weibull(lambda: number, k: number): number;
    function Triangular(min: number, modus: number, max: number): number;
    function Discrete(values: Array<number>, probabilities: Array<number>): number;
}
