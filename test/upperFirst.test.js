import { expect } from "chai";
import upperFirst from '../src/upperFirst.js';

describe('upperFirst', function () {
  describe('Basic capitalization', function () {
    it('should capitalize the first character of a lowercase word', function () {
      expect(upperFirst('fred')).to.equal('Fred');
    });

    it('should leave an already-capitalized first character unchanged', function () {
      expect(upperFirst('Fred')).to.equal('Fred');
    });

    it('should only modify the first character and leave the rest as-is', function () {
      expect(upperFirst('fRED')).to.equal('FRED');
    });

    it('should work with multi-word strings', function () {
      expect(upperFirst('hello world')).to.equal('Hello world');
    });
  });

  describe('Empty or missing input', function () {
    it('should return an empty string when called with an empty string', function () {
      expect(upperFirst('')).to.equal('');
    });

    it('should return an empty string when called with no arguments', function () {
      expect(upperFirst()).to.equal('');
    });
  });

  describe('Strings starting with non-letters', function () {
    it('should handle strings that start with non-letters correctly', function () {
      expect(upperFirst('1abc')).to.equal('1abc');
      expect(upperFirst('!hello')).to.equal('!hello');
    });
  });
});