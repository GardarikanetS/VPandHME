
import { readFile, writeFile } from "node:fs/promises";
import { csvToJSON } from "./csvToJSON";

export async function formatCSVFileToJSONFile(input: string, output: string,
    delimiter: string): Promise<void> {
    if (input.trim().length === 0) {
        throw new Error("Invalid input path");
    }
    if (output.trim().length === 0) {
        throw new Error("Invalid output path");
    }
    if (delimiter.length !== 1) {
        throw new Error("Invalid delimiter");
    }

    const data = await readFile(input, { encoding: "utf-8" });
    const rows = data.split(/\r?\n/);
    if (rows.length > 0 && rows[rows.length - 1] === "") rows.pop();

    const json = csvToJSON(rows, delimiter);
    await writeFile(output, JSON.stringify(json), { encoding: "utf-8" });
}
