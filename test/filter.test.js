import filter from "../src/filter.js"
import { expect } from 'chai';


describe("filter", function () {
    describe("Simple predicates", function () {

        it("should return original array for always true predicate", function () {
            expect(filter([1, 2, 3], () => true)).to.deep.equal([1, 2, 3])
            expect(filter(["t", "e", "s", "t"], () => true)).to.deep.equal(["t", "e", "s", "t"])
        });

        it("should return empty array for always false predicate", function () {
            expect(filter([1, 2, 3], () => false)).to.deep.equal([])
            expect(filter(["t", "e", "s", "t"], () => false)).to.deep.equal([])
        });

        it("should only return values that match the predicate", function () {
            expect(filter([1, 2, 3], (val) => val === 1)).to.deep.equal([1])
            expect(filter(["t", "e", "s", "t"], (val) => val === "t")).to.deep.equal(["t", "t"])
        });

        it("should return original array if all values match the predicate", function () {
            expect(filter([1, 2, 3], (val) => val >= 1)).to.deep.equal([1, 2, 3])
        });

        it("should return empty array if no values match the predicate", function () {
            expect(filter([1, 2, 3], (val) => val < 1)).to.deep.equal([])
            expect(filter(["t", "e", "s", "t"], (val) => val === "test")).to.deep.equal([])
        });
    });

    describe("Complex predicates", function () {
        it("should return numbers divisible by 2", function () {
            expect(filter([1, 2, 3, 4], (val) => (val % 2) === 0)).to.deep.equal([2, 4])
        });
        
        it("should return values that fulfil 'OR' logic", function () {
            expect(filter(["t", "e", "s", "t"], (val) => (val === "t") || (val === "s"))).to.deep.equal(["t", "s", "t"])
        });

        it("should return values that fulfil 'AND' logic", function () {
            expect(filter(["T", "e", "s", "t"], (val) => (val === "t") && (val === val.toLowerCase()))).to.deep.equal(["t"])
        });

    }),

    describe("Special arrays", function () {
        it("should return [] for empty array", function () {
            expect(filter([], () => true)).to.deep.equal([])
        });

        it("should return [[]] for empty array", function () {
            expect(filter([[]], () => true)).to.deep.equal([[]])
        });

        it("should handle other iterable objects", function () {
            expect(filter("test", () => true)).to.deep.equal(["t", "e", "s", "t"])
            expect(filter([["t", 0], ["e", 1], ["s", 2], ["t", 3]], () => true)).to.deep.equal([["t", 0], ["e", 1], ["s", 2], ["t", 3]])
        });


    }),

    describe("Faulty inputs", function () {
        it("should return [] if array is not a valid array", function () {
            expect(filter(NaN, () => true)).to.deep.equal([])
            expect(filter(null, () => true)).to.deep.equal([])
            expect(filter(0, () => true)).to.deep.equal([])
        });

        it("should return original array if predicate is not a function", function () {
            expect(filter([1, 2, 3], "")).to.deep.equal([1, 2, 3])
            expect(filter([1, 2, 3], 1)).to.deep.equal([1, 2, 3])
        });
    })
});