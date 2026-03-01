export function csvToJSON(input: string[], delimiter: string): object[] {
    if (delimiter.length !== 1) throw new Error("Delimiter must be 1 char");
    if (input.length < 2) throw new Error("Bad input");

    for (let i = 0; i < input.length; i++) if (input[i] === undefined) throw new Error("Bad input");

    const header = input[0]!.split(delimiter);
    const result: Record<string, string>[] = [];

    for (let i = 1; i < input.length; i++) {
        const row = input[i]!.split(delimiter);
        if (row.length !== header.length) throw new Error("Bad row");

        const obj: Record<string, string> = {};
        for (let j = 0; j < header.length; j++) obj[header[j]!] = row[j]!;
        result.push(obj);
    }

    return result;
}