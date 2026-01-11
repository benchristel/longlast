/**
 * A subset of the fields output by `pnpm list --recursive --json`.
 */

export interface PnpmListPackage {
    name: string;
    dependencies?: Record<string, {}>;
}

/**
 * Converts `pnpm list --recursive --json` output to dot format.
 * (See: https://www.graphviz.org/doc/info/lang.html)
 */

export function dotGraph(list: PnpmListPackage[]): string {
    return [
        "digraph {",
        ...arcs(list).map(dotFromArc).map(addPrefix("    ")),
        "}",
    ].join("\n");
}

interface Arc {
    head: string;
    tail: string;
}

function arcs(packages: PnpmListPackage[]): Arc[] {
    return packages.flatMap((pkg) => {
        return getDeps(pkg).map((depName) => ({
            head: pkg.name,
            tail: depName,
        }));
    });
}

function getDeps(pkg: PnpmListPackage): string[] {
    const {dependencies = {}} = pkg;
    return Object.keys(dependencies);
}

function dotFromArc(arc: Arc): string {
    return `${quote(arc.head)} -> ${quote(arc.tail)}`;
}

const addPrefix = (prefix: string) => (s: string) => {
    return prefix + s;
};

function quote(s: string): string {
    return JSON.stringify(s);
}
