import ceil from "../src/ceil.js"
import { expect } from 'chai';

describe("ceil", function () {
    describe("Basic number conversions", function () {
        it("should return the ceiling of a positive float", function () {
            expect(ceil(1.5)).to.equal(2)
        })

        it("should return the ceiling of a negative float", function () {
            expect(ceil(-1.5)).to.equal(-1)
        })

        it("should return same value when passed a positive integer", function () {
            expect(ceil(1)).to.equal(1)
        })

        it("should return same value when passed a negative integer", function () {
            expect(ceil(-1)).to.equal(-1)
        })

        it("should return 0 when passed 0", function () {
            expect(ceil(0)).to.equal(0)
        })

        it("should return MAX_VALUE for MAX_VALUE input", function () {
            expect(ceil(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE)
        })

        it("should return MIN_VALUE for MIN_VALUE input", function () {
            expect(ceil(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE)
        })

    }),

    describe("Precision conversions", function () {
        it("should return the ceiling with positive precision", function () {
            expect(ceil(1.52, 1)).to.equal(1.6)
        })

        it("should return the ceiling with negative precision", function () {
            expect(ceil(1.52, -1)).to.equal(10)
        })

        it("should return the ceiling without precision if precision is 0", function () {
            expect(ceil(1.52, 0)).to.equal(2)
        })

        it("should treat invalid precision input as 0", function () {
            expect(ceil(1.52, "abc")).to.equal(2)
        })

        it("should return the same number if precision is Infinity", function () {
            expect(ceil(1.52, Infinity)).to.equal(1.52)
        })

        it("should be able to process high precisions", function () {
            expect(ceil(1.52, 10000000)).to.equal(1.52)
        })

    }),

    describe("Boolean conversions", function () {
        it("should return 1 when given true", function () {
             expect(ceil(true)).to.equal(1)
        })
        it("should return 0 when given false", function () {
             expect(ceil(false)).to.equal(0)
        })
    })

    describe("Invalid inputs", function () {
        it("should return NaN for NaN", function () {
            expect(ceil(NaN)).to.be.NaN
        })
        it("should return NaN for string", function () {
            expect(ceil("abc")).to.be.NaN
        })

        it("should return NaN for missing input", function () {
            expect(ceil()).to.be.NaN
        })
    })
})