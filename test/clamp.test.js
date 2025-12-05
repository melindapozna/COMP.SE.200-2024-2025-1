import clamp from "../src/clamp.js"
import { expect } from "chai"

describe("clamp", function () {
    describe("Basic clamping", function () {
        it("should return the same number when it is within the bounds", function () {
            expect(clamp(3, -5, 5)).to.equal(3)
        })

        it("should clamp to the lower bound when the number is below lower", function () {
            expect(clamp(-10, -5, 5)).to.equal(-5)
        })

        it("should clamp to the upper bound when the number is above upper", function () {
            expect(clamp(10, -5, 5)).to.equal(5)
        })

        it("should return the lower bound when the number equals lower", function () {
            expect(clamp(-5, -5, 5)).to.equal(-5)
        })

        it("should return the upper bound when the number equals upper", function () {
            expect(clamp(5, -5, 5)).to.equal(5)
        })
    })

    describe("Type coercion and special values", function () {
        it("should coerce string inputs to numbers", function () {
            expect(clamp("3", "-5", "5")).to.equal(3)
        })

        it("should coerce Number objects to primitive numbers", function () {
            expect(clamp(new Number(3), new Number(-5), new Number(5))).to.equal(3)
        })

        it("should clamp positive and negative Infinity correctly", function () {
            expect(clamp(Infinity, -5, 5)).to.equal(5)
            expect(clamp(-Infinity, -5, 5)).to.equal(-5)
        })
    })

    describe("Invalid inputs", function () {
        it("should return NaN when number is NaN", function () {
            expect(clamp(NaN, -5, 5)).to.be.NaN
        })
    })
})
