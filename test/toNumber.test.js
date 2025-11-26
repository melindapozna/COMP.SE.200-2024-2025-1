import toNumber from "../src/toNumber.js"
import {expect} from 'chai';

describe("toNumber", function () {
    it("should return the same value when passed a positive number", function () {
        expect(toNumber(1)).to.equal(1);
    });

    it("should return the same value when passed a negative number", function () {
        expect(toNumber(-1)).to.equal(-1);
    });

    it("should return the same value when passed a float", function () {
        expect(toNumber(1.2)).to.equal(1.2);
    });

    it("should convert an integer given as a string", function () {
        expect(toNumber("1")).to.equal(1);
    });

    it("should convert a float given as a string", function () {
        expect(toNumber("1.2")).to.equal(1.2);
    });

    it("should convert Infinity to Infinity", function () {
        expect(toNumber(Infinity)).to.equal(Infinity);
    });

    it("should convert Number.MIN_VALUE to 5e-324", function () {
        expect(toNumber(Number.MIN_VALUE)).to.equal(5e-324);
    });

    it("should convert Number.MAX_VALUE to 1.7976931348623157e+308", function () {
        expect(toNumber(Number.MAX_VALUE)).to.equal(1.7976931348623157e+308);
    });

    it("should convert non-number-string to NaN", function () {
        expect(toNumber("asd")).to.be.NaN;
    });

    it("should ignore whitespaces", function () {
        expect(toNumber("    1    ")).to.equal(1);
    });
    
    it("should convert valid binary string to number", function () {
        expect(toNumber("0b1010")).to.equal(10);
    });

    it("should convert valid octal string to number", function () {
        expect(toNumber("0o720")).to.equal(464);
    });


});
