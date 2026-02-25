import { describe, expect, it } from 'vitest';
import {
    calculateArea,
    capitalizeFirstLetter,
    createBook,
    createUser,
    findById,
    getFirstElement,
    getStatusColor,
    trimAndFormat,
    type Product
} from './lab1';

describe('lab1 module', () => {
    it('createUser creates active user by default', () => {
        expect(createUser(1, 'Alex')).toEqual({
            id: 1,
            name: 'Alex',
            email: undefined,
            isActive: true
        });
    });

    it('createUser supports optional email and status', () => {
        expect(createUser(2, 'Sam', 'sam@example.com', false)).toEqual({
            id: 2,
            name: 'Sam',
            email: 'sam@example.com',
            isActive: false
        });
    });

    it('createBook returns book object unchanged', () => {
        const book = {
            title: '1984',
            author: 'George Orwell',
            year: 1948,
            genre: 'fiction' as const
        };

        expect(createBook(book)).toEqual(book);
    });

    it('calculateArea calculates circle area', () => {
        expect(calculateArea('circle', 2)).toBeCloseTo(12.566370614359172);
    });

    it('calculateArea calculates square area', () => {
        expect(calculateArea('square', 3)).toBe(9);
    });

    it('getStatusColor maps status to color', () => {
        expect(getStatusColor('active')).toBe('green');
        expect(getStatusColor('inactive')).toBe('red');
        expect(getStatusColor('new')).toBe('blue');
    });

    it('capitalizeFirstLetter formats string', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello');
        expect(capitalizeFirstLetter('hello', true)).toBe('HELLO');
    });

    it('trimAndFormat trims and uppercases when requested', () => {
        expect(trimAndFormat('  hello  ')).toBe('hello');
        expect(trimAndFormat('  hello  ', true)).toBe('HELLO');
    });

    it('getFirstElement returns first element or undefined', () => {
        expect(getFirstElement([10, 20, 30])).toBe(10);
        expect(getFirstElement<string>([])).toBeUndefined();
    });

    it('findById finds item by id or returns undefined', () => {
        const products: Product[] = [
            { id: 1, name: 'Laptop', price: 1200 },
            { id: 2, name: 'Mouse', price: 40 }
        ];

        expect(findById(products, 2)).toEqual({ id: 2, name: 'Mouse', price: 40 });
        expect(findById(products, 99)).toBeUndefined();
    });
});
