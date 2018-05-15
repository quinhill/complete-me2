import { assert } from 'chai';
import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


  describe('Trie', function () {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('should have default values', () => {
      assert.deepEqual(trie.root, new Node());
      assert.equal(trie.counter, 0);
    });

    describe('Insert', () => {
      it('should take in new words and create nodes for each letter', () => {
        trie.insert('word');
        const result = trie.root.children.w.children.o.children.r.children.d.complete;
        assert.deepEqual(result, 'word')
      })

      it('should increase the count', () => {
        assert.equal(trie.counter, 0);
        trie.insert('word')
        assert.equal(trie.counter, 1)
      })
    })

    describe('Count', () => {
      it('should return the number of words in the trie', () => {
        assert.equal(trie.count(), 0);
        trie.insert('word');
        assert.equal(trie.count(), 1);
      })
    })
    describe('Populate', () => {
      it('should insert an array of words', () => {
        let array = ['hello', 'goodbye', 'firefighter', 'poopyface', 'turducken'];

        trie.populate(array);

        assert.equal(trie.counter, 5);
      })

      it.skip('should insert a large array of words', () => {
        trie.populate(dictionary);

        assert.equal(trie.counter, 234371)
      })
    })

    describe('Suggest', () => {
      it('should suggest words', () => {
        trie.populate(['pizza', 'pizzaria'])
        trie.suggest('pi');

        assert.deepEqual(trie.suggestions, ['pizza', 'pizzaria'])
      })
    })
  });