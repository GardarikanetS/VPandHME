import { describe, expect, it } from "vitest";
import { csvToJSON } from "../../src/lab3/csvToJSON";

describe("csvToJSON", () => {
    it("parses csv rows into objects", () => {
        const input = ["name,age", "Alice,30", "Bob,25"];
        const result = csvToJSON(input, ",");

        expect(result).toEqual([
            { name: "Alice", age: "30" },
            { name: "Bob", age: "25" }
        ]);
    });

    it("throws when delimiter is not a single character", () => {
        expect(() => csvToJSON(["a|b", "1|2"], "||")).toThrow("Delimiter must be 1 char");
    });

    it("throws when input does not contain rows", () => {
        expect(() => csvToJSON(["a,b"], ",")).toThrow("Bad input");
    });

    it("throws when a row has wrong number of columns", () => {
        expect(() => csvToJSON(["a,b", "1"], ",")).toThrow("Bad row");
    });
});
