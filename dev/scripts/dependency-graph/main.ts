#!/usr/bin/env node

import {dotGraph} from "./dot-graph.ts";

async function main(): Promise<void> {
    const input = await read(process.stdin);
    console.log(dotGraph(JSON.parse(input)));
}

function read(stream: NodeJS.ReadStream): Promise<string> {
    let data = "";

    return new Promise((resolve) => {
        stream.on("data", (chunk) => {
            data += chunk;
        });

        stream.on("end", () => {
            resolve(data);
        });
    });
}

await main().catch(console.error);
