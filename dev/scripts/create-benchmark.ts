import Benchmark from "benchmark";

export function createBenchmark(): Benchmark.Suite {
    const suite = new Benchmark.Suite()
        .on("cycle", (event: any) => console.log(String(event.target)))
        .on("complete", () =>
            console.log(
                "Fastest: " + suite.filter("fastest").map("name").join(", "),
            ),
        );
    return suite;
}
