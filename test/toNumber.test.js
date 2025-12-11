import toNumber from "../src/toNumber.js"
import { expect } from 'chai';
import isObject from "../src/isObject.js"

describe("toNumber", function () {
    describe("Number-to-number conversions", function () {
        it("should return the same value when passed a positive number", function () {
            expect(toNumber(1)).to.equal(1);
        });

        it("should return the same value when passed a negative number", function () {
            expect(toNumber(-1)).to.equal(-1);
        });

        it("should return the same value when passed a float", function () {
            expect(toNumber(1.2)).to.equal(1.2);
        });

        it("should convert Number.MIN_VALUE to 5e-324", function () {
            expect(toNumber(Number.MIN_VALUE)).to.equal(5e-324);
        });

        it("should convert Number.MAX_VALUE to 1.7976931348623157e+308", function () {
            expect(toNumber(Number.MAX_VALUE)).to.equal(1.7976931348623157e+308);
        });
    })

    describe("Basic string-to-number conversions", function () {
        it("should convert an integer given as a string", function () {
            expect(toNumber("1")).to.equal(1);
        });

        it("should convert a float given as a string", function () {
            expect(toNumber("1.2")).to.equal(1.2);
        });
        it("should convert non-number-string to NaN", function () {
            expect(toNumber("abc123")).to.be.NaN;
        });

        it("should ignore whitespaces", function () {
            expect(toNumber("    1    ")).to.equal(1);
        });

    }),

    describe("Object conversions", function () {
        it("should convert Infinity to Infinity", function () {
            expect(toNumber(Infinity)).to.equal(Infinity);
        });

        it("should convert undefined to NaN", function () {
            expect(toNumber(undefined)).to.be.NaN;
        });
    })

    describe("Special string conversions", function () {

        it("should convert Infinity string to Infinity", function () {
            expect(toNumber("Infinity")).to.equal(Infinity);
        });

        it("should convert undefined string to NaN", function () {
            expect(toNumber("undefined")).to.be.NaN;
        });

        it("should convert valid binary string to number", function () {
            expect(toNumber("0b1010")).to.equal(10);
        });

        it("should convert valid octal string to number", function () {
            expect(toNumber("0o720")).to.equal(464);
        });

        it("should convert valid  hexadecimal string to number", function () {
            expect(toNumber("0xAA1")).to.equal(2721);
        });

    })

    describe("Invalid inputs", function () {
        it("should return NaN for symbol input", function () {
            expect(toNumber("#!12")).to.be.NaN;
        });

        it("should return NaN if object is not convertable to number", function () {
            const obj = { foo: 1 };
            expect(toNumber(obj)).to.be.NaN;
        });

        it("should return NaN for bad hexadecimal string", function () {
            expect(toNumber("0xAZ1")).to.be.NaN;
        });

        it("should return NaN for bad octal string", function () {
            expect(toNumber("0oAZ1")).to.be.NaN;
        });

        it("should return NaN for bad binaryl string", function () {
            expect(toNumber("0bAZ1")).to.be.NaN;
        });

    })

});
