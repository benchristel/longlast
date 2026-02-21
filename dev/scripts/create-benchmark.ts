import Benchmark from "benchmark";

export function createBenchmark(name?: string): Benchmark.Suite {
    const suite = new Benchmark.Suite(name)
        .on("cycle", (event: any) => console.log(String(event.target)))
        .on("complete", () =>
            console.log(
                "Fastest: " + suite.filter("fastest").map("name").join(", "),
            ),
        );
    return suite;
}
