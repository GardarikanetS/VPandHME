import { it, describe, expect, beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
import { add, isEven } from './math'

describe('math utils', () => {
    beforeAll(() => {
        console.log("beforAll!");
    });

    beforeEach(() => {
        console.log("befareEach!");
    });

    afterAll(() => {
        console.log("afterAll");
    });

    afterEach(() => {
        console.log("afterEach!");
    })

    it('sum adds two numbers',
        () => {
            expect(add(2,5)).toBe(7);
        }
    );

    it('isEven detects even numbers',
        () => {
            expect(isEven(2)).toBe(true);
            expect(isEven(3)).toBe(false);
        }
    )
})

