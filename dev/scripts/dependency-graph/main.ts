#!/usr/bin/env node

import {dotGraph} from "./dot-graph.ts";

function main(): Promise<void> {
    return new Promise((resolve, reject) => {
        let input = "";

        process.stdin.on("data", (data) => {
            input += data;
        });

        process.stdin.on("end", () => {
            try {
                console.log(dotGraph(JSON.parse(input)));
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}

await main().catch(console.error);
