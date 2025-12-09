import get from "../src/get.js"
import { expect } from 'chai';

const object = { 'a': [{ 'b': { 'c': 3 } }] }
const duplicateKeyObject = { 'a': 1, 'a': 2 }


describe("get", function () {
    describe("String paths", function () {
        it("should return the value found at a path", function () {
            expect(get(object, "a[0].b.c", "default")).to.equal(3)
        });

        it("should return the default value when path is not found", function () {
            expect(get(object,"a[2].b.c", "default")).to.equal("default")
        });
        
        // is this a bug or a feature?
        it("should not be case sensitive", function () {
            expect(get(object,"A[0].b.C", "default")).to.equal(3)
        });
        
        it("should ignore trailing spaces", function () {
            expect(get(object,"    a[0].b.c    ", "default")).to.equal(3)
        });

        it("should return the first in order when the object has duplicate keys", function () {
            expect(get(duplicateKeyObject, "a", "default")).to.equal(1)
        });

    });

    describe("Array paths", function () {
        it("should return the value found at a path", function () {
            expect(get(object, ["a", "0", "b", "c"], "default")).to.equal(3)
        });

        it("should return the default value when path is not found", function () {
            expect(get(object, ["a", "2", "b", "c"], "default")).to.equal("default")
        });

        it("should not be case sensitive", function () {
            expect(get(object, ["A", "0", "b", "C"], "default")).to.equal(3)
        });

        it("should return the first in order when the object has duplicate keys", function () {
            expect(get(duplicateKeyObject, ["a"], "default")).to.equal(1)
        });

        it("should parse string path wrapped in an array", function () {
            expect(get(object, ["a[0].b.c"], "default")).to.equal(3)
        });

    });

    describe("Falsey inputs", function () {
        it("should return undefined when default value is missing and resolve value is not found", function () {
            expect(get({}, ['a', '0'])).to.be.undefined
        });

        it("should return undefined when path is invalid and default value is missing", function () {
            expect(get({}, '')).to.be.undefined
            expect(get({}, undefined)).to.be.undefined
            expect(get({}, null)).to.be.undefined
            expect(get({}, 0)).to.be.undefined
            expect(get({}, [])).to.be.undefined
            expect(get({}, NaN)).to.be.undefined
        });

        it("should return undefined when the object is of wrong datatype and default value is missing", function () {
            expect(get(0, '0')).to.be.undefined
            expect(get(undefined, '0')).to.be.undefined
            expect(get(null, '0')).to.be.undefined
            expect(get([], '0')).to.be.undefined
            expect(get(NaN, '0')).to.be.undefined
        })

        it("should resolve special default values correctly", function () {
            expect(get({}, ['a', '0'], undefined)).to.be.undefined
            expect(get({}, ['a', '0'], NaN)).to.be.NaN
        });

    })
});