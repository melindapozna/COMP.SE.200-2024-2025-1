import isEmpty from "../src/isEmpty.js"
import { expect } from "chai"

describe("isEmpty", function () {
    describe("Null and undefined", function () {
        it("should return true for null", function () {
            expect(isEmpty(null)).to.equal(true)
        })

        it("should return true for undefined", function () {
            expect(isEmpty(undefined)).to.equal(true)
        })
    })

    describe("Array-like values", function () {
        it("should return true for an empty array", function () {
            expect(isEmpty([])).to.equal(true)
        })

        it("should return false for a non-empty array", function () {
            expect(isEmpty([1, 2, 3])).to.equal(false)
        })

        it("should return true for an empty string", function () {
            expect(isEmpty("")).to.equal(true)
        })

        it("should return false for a non-empty string", function () {
            expect(isEmpty("abc")).to.equal(false)
        })

        it("should handle arguments objects correctly", function () {
            (function () {
                expect(isEmpty(arguments)).to.equal(true)
            })()

            ;(function () {
                expect(isEmpty(arguments)).to.equal(false)
            })(1)
        })
    })

    describe("Objects and prototypes", function () {
        it("should return true for an empty plain object", function () {
            expect(isEmpty({})).to.equal(true)
        })

        it("should return false for a plain object with own properties", function () {
            expect(isEmpty({ a: 1 })).to.equal(false)
        })

        it("should ignore inherited properties and treat object as empty", function () {
            const proto = { a: 1 }
            const obj = Object.create(proto)

            expect(isEmpty(obj)).to.equal(true)
        })
    })

    describe("Maps and Sets", function () {
        it("should return true for an empty Map", function () {
            const map = new Map()
            expect(isEmpty(map)).to.equal(true)
        })

        it("should return false for a non-empty Map", function () {
            const map = new Map()
            map.set("a", 1)
            expect(isEmpty(map)).to.equal(false)
        })

        it("should return true for an empty Set", function () {
            const set = new Set()
            expect(isEmpty(set)).to.equal(true)
        })

        it("should return false for a non-empty Set", function () {
            const set = new Set()
            set.add(1)
            expect(isEmpty(set)).to.equal(false)
        })
    })
})
