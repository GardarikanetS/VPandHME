import { describe, it, expect } from 'vitest';
import { query } from '../../src/lab4/lab4';

describe('query', () => {
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'David', age: 25 },
  ];

  it('should return the original data if no steps are provided', () => {
    const result = query()(data);
    expect(result).toEqual(data);
  });

  it('should filter data with a where clause', () => {
    const where = <T, K extends keyof T>(key: K, value: T[K]) => (array: T[]) =>
      array.filter(item => item[key] === value);

    const result = query(where('age', 25))(data);
    expect(result).toEqual([
      { id: 2, name: 'Bob', age: 25 },
      { id: 4, name: 'David', age: 25 },
    ]);
  });

  it('should sort data with a sort clause', () => {
    const sort = <T, K extends keyof T>(key: K) => (array: T[]) =>
      [...array].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });

    const result = query(sort('age'))(data);
    expect(result).toEqual([
      { id: 2, name: 'Bob', age: 25 },
      { id: 4, name: 'David', age: 25 },
      { id: 1, name: 'Alice', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]);
  });

  it('should group data with a groupBy clause', () => {
    const groupBy = <T, K extends keyof T>(key: K) => (array: T[]) => {
      const groups = new Map<T[K], T[]>();
      array.forEach(item => {
        const groupKey = item[key];
        if (!groups.has(groupKey)) {
          groups.set(groupKey, []);
        }
        groups.get(groupKey)!.push(item);
      });
      return Array.from(groups.entries()).map(([groupKey, items]) => ({ key: groupKey, items }));
    };

    const result = query(groupBy('age'))(data);
    expect(result).toEqual([
      { key: 30, items: [{ id: 1, name: 'Alice', age: 30 }] },
      { key: 25, items: [{ id: 2, name: 'Bob', age: 25 }, { id: 4, name: 'David', age: 25 }] },
      { key: 35, items: [{ id: 3, name: 'Charlie', age: 35 }] },
    ]);
  });

  it('should filter groups with a having clause', () => {
    const groupBy = <T, K extends keyof T>(key: K) => (array: T[]) => {
        const groups = new Map<T[K], T[]>();
        array.forEach(item => {
            const groupKey = item[key];
            if (!groups.has(groupKey)) {
                groups.set(groupKey, []);
            }
            groups.get(groupKey)!.push(item);
        });
        return Array.from(groups.entries()).map(([groupKey, items]) => ({ key: groupKey, items }));
    };

    const having = <T, K extends keyof T>(predicate: (group: { key: T[K], items: T[] }) => boolean) => (groups: { key: T[K], items: T[] }[]) =>
        groups.filter(predicate);

    const result = query(
        groupBy('age'),
        having(group => group.items.length > 1)
    )(data);

    expect(result).toEqual([
        { key: 25, items: [{ id: 2, name: 'Bob', age: 25 }, { id: 4, name: 'David', age: 25 }] },
    ]);
  });

  it('should chain multiple operations correctly', () => {
    const where = <T, K extends keyof T>(key: K, value: T[K]) => (array: T[]) =>
        array.filter(item => item[key] !== value);

    const sort = <T, K extends keyof T>(key: K) => (array: T[]) =>
        [...array].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });

    const result = query(
        where('name', 'Alice'),
        sort('age')
    )(data);

    expect(result).toEqual([
        { id: 2, name: 'Bob', age: 25 },
        { id: 4, name: 'David', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
    ]);
  });
});
