
type Transform<T> = (array: T[]) => T[];

type Where<T, K extends keyof T> = (key: K, value: T[K]) => Transform<T>;

type Sort<T, K extends keyof T> = (key: K) => Transform<T>;

type Group<T, K extends keyof T> = {key: T[K], items: T[]};
type GroupBy<T, K extends keyof T> = (key: K) => (data: T[]) => Group<T, K>[];
type GroupTransform<T, K extends keyof T> = Transform<Group<T, K>>;
type Having<T, K extends keyof T> = (pridicate: ((group: Group<T, K>) => boolean))=>GroupTransform<T, K>;
function query<T>(...steps: Function[]): Transform<T> {
    return (arrayOfData: T[]) => {
        let currentData = arrayOfData;
        steps.forEach(step => {
            currentData = step(currentData);
        })
        return currentData;
    }
}