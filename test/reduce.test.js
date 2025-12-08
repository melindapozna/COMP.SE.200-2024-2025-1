import reduce from "../src/reduce.js"
import { expect } from 'chai';


describe("reduce", function () {
    describe("Basic functionalities", function () {
        it("should sum integer array", function () {
            expect(reduce([1, 2, 3], (sum, next) => sum + next, 0)).to.equal(6)
        });
        
        it("should sum float array", function () {
            expect(reduce([1.1, 2.2, 3.3], (sum, next) => sum + next, 0)).to.equal(6.6)
        });

        it("should concatenate string array", function () {
            expect(reduce(["a", "b", "c"], (sum, next) => sum + next, "")).to.equal("abc")
        });

        it("should return collection items grouped by their value", function () {
            const collection = { 'a': 1, 'b': 2, 'c': 1 }
            expect(reduce(collection, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key) 
                return result},
            {})).to.deep.equal({ '1': ['a', 'c'], '2': ['b'] })
        });
    });

    describe("Missing accumulator", function () {
        it("should infer accumulator when none is given", function () {
            expect(reduce([1, 2, 3], (sum, next) => sum + next)).to.equal(6)
            expect(reduce([1.1, 2.2, 3.3], (sum, next) => sum + next)).to.equal(6.6)
            expect(reduce(["a", "b", "c"], (sum, next) => sum + next)).to.equal("abc")
        })
    });

    describe("Invalid inputs", function () {
        it("should handle array with falsey items", function () {
            expect(reduce([1, null, NaN, undefined, 2], (sum, next) => sum + (next || 0), 0)).to.equal(3)
        });

        it("should throw an error when iteratee is not a function", function () {
            expect(reduce([1, 2, 3], 0, 0)).to.throw()
            expect(reduce([1, 2, 3], "abc", 0)).to.throw()
        });

        it("should throw an error when collection is not iterable", function () {
            expect(reduce(NaN, 0, 0)).to.throw()
            expect(reduce(undefined, "abc", 0)).to.throw()
        });



    })
});