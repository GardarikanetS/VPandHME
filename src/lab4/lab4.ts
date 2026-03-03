
export type Lab4<T> = (array: T[]) => T[];

export type Where<T, K extends keyof T> = (key: K, value: T[K]) => Lab4<T>;

export type Sort<T, K extends keyof T> = (key: K) => Lab4<T>;

export type Group<T, K extends keyof T> = {key: T[K], items: T[]};
export type GroupBy<T, K extends keyof T> = (key: K) => (data: T[]) => Group<T, K>[];
export type GroupTransform<T, K extends keyof T> = Lab4<Group<T, K>>;
export type Having<T, K extends keyof T> = (pridicate: ((group: Group<T, K>) => boolean))=>GroupTransform<T, K>;

export function query<T>(...steps: Function[]): Lab4<T> {
    return (arrayOfData: T[]) => {
        let currentData = arrayOfData;
        steps.forEach(step => {
            currentData = step(currentData);
        })
        return currentData;
    }
}
