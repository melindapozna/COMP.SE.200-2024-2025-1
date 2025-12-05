import map from "../src/map.js"
import { expect } from "chai"

describe("map", function () {
    describe("Basic mapping", function () {
        it("should apply iteratee to each element of the array", function () {
            function square(n) {
                return n * n
            }

            const result = map([1, 2, 3], square)
            expect(result).to.deep.equal([1, 4, 9])
        })

        it("should work with empty arrays", function () {
            const result = map([], (x) => x * 2)
            expect(result).to.deep.equal([])
        })

        it("should not mutate the original array", function () {
            const array = [1, 2, 3]
            const result = map(array, (x) => x * 2)

            expect(array).to.deep.equal([1, 2, 3])
            expect(result).to.deep.equal([2, 4, 6])
        })

        it("should support mapping non-numeric values", function () {
            const result = map(["a", "b"], (ch) => ch.toUpperCase())
            expect(result).to.deep.equal(["A", "B"])
        })
    })

    describe("Iteratee arguments", function () {
        it("should pass value, index and array to iteratee", function () {
            const array = ["x", "y"]
            const calls = []

            map(array, function (value, index, arr) {
                calls.push({
                    value,
                    index,
                    sameArray: arr === array
                })
                return value
            })

            expect(calls).to.deep.equal([
                { value: "x", index: 0, sameArray: true },
                { value: "y", index: 1, sameArray: true }
            ])
        })
    })

    describe("Edge cases", function () {
        it("should return an empty array when array is null", function () {
            const result = map(null, (x) => x)
            expect(result).to.deep.equal([])
        })

        it("should return an empty array when array is undefined", function () {
            const result = map(undefined, (x) => x)
            expect(result).to.deep.equal([])
        })
    })
})
