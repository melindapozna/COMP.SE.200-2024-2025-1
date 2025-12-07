import countBy from "../src/countBy.js"
import { expect } from "chai"

describe("countBy", function () {
    describe("Array collections", function () {
        it("should count values based on iteratee result", function () {
            const result = countBy([6.1, 4.2, 6.3], Math.floor)
            expect(result).to.deep.equal({ "4": 1, "6": 2 })
        })

        it("should handle empty arrays", function () {
            const result = countBy([], (value) => value)
            expect(result).to.deep.equal({})
        })

        it("should group by a custom function", function () {
            const result = countBy([1, 2, 3, 4, 5], function (value) {
                return value % 2 === 0 ? "even" : "odd"
            })
            expect(result).to.deep.equal({ odd: 3, even: 2 })
        })
    })

    describe("Object collections", function () {
        it("should count values from object collections", function () {
            const users = {
                a: { user: "barney", active: true },
                b: { user: "betty", active: true },
                c: { user: "fred", active: false }
            }

            const result = countBy(users, function (user) {
                return user.active ? "active" : "inactive"
            })

            expect(result).to.deep.equal({ active: 2, inactive: 1 })
        })
    })

    describe("Edge cases", function () {
        it("should treat each distinct key from iteratee as a separate group", function () {
            const result = countBy(["one", "two", "three"], function (value) {
                return value.length
            })
            expect(result).to.deep.equal({ "3": 2, "5": 1 })
        })

        it("should return an empty object when collection is null", function () {
            const result = countBy(null, () => "key")
            expect(result).to.deep.equal({})
        })

        it("should return an empty object when collection is undefined", function () {
            const result = countBy(undefined, () => "key")
            expect(result).to.deep.equal({})
        })
    })
})
