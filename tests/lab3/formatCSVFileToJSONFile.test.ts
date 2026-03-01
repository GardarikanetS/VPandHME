import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", () => {
    return {
        readFile: vi.fn(),
        writeFile: vi.fn()
    };
});

import { readFile, writeFile } from "node:fs/promises";
import { formatCSVFileToJSONFile } from "../../src/lab3/formatCSVFileToJSONFile";

describe("formatCSVFileToJSONFile", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("calls writeFile with json converted from readFile data", async () => {
        const inputPath = "input.csv";
        const outputPath = "output.json";
        const csv = "name,age\nAlice,30\nBob,25\n";

        vi.mocked(readFile).mockResolvedValue(csv);

        await formatCSVFileToJSONFile(inputPath, outputPath, ",");

        expect(readFile).toHaveBeenCalledWith(inputPath, { encoding: "utf-8" });
        expect(writeFile).toHaveBeenCalledWith(
            outputPath,
            JSON.stringify([
                { name: "Alice", age: "30" },
                { name: "Bob", age: "25" }
            ]),
            { encoding: "utf-8" }
        );
    });

    it("throws on invalid input path", async () => {
        await expect(formatCSVFileToJSONFile("", "out.json", ","))
            .rejects.toThrow("Invalid input path");
    });

    it("throws on invalid output path", async () => {
        await expect(formatCSVFileToJSONFile("in.csv", "", ","))
            .rejects.toThrow("Invalid output path");
    });

    it("throws on invalid delimiter", async () => {
        await expect(formatCSVFileToJSONFile("in.csv", "out.json", ""))
            .rejects.toThrow("Invalid delimiter");
    });
});
