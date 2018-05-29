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
      assert.deepEqual(trie.suggestions, [])
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

      it.skip('should suggest() words from the dictionary', () => {
        trie.populate(dictionary);

        assert.deepEqual(trie.suggest('zapa'), ['zapara', 'zaparan', 'zaparo', 'zaparoan', 'zapas', 'zapatero']);
      });
    })

    describe('Suggest', () => {
      it('should suggest words', () => {
        trie.populate(['pizza', 'pizzaria'])
        trie.suggest('pi');

        assert.deepEqual(trie.suggestions, ['pizza', 'pizzaria'])
      })

      it('should return an empty array if no matching words are in the trie', () => {
        trie.populate(['pizza', 'pizzaria'])

        trie.suggest('ok')
        assert.deepEqual(trie.suggestions, [])
      })
    })

    describe('Optimize', () => {
      it('should compact the data from nodes with a single child into its parent node', () => {
        trie.populate(['cake', 'caketopper', 'cherry', 'chi'])

        trie.optimize();

        assert.deepEqual(trie.root.children.c.children.a.data, 'ake')
      })
    })

    describe('Expand', () => {
      it('should split nodes that have been optimized back into single letter nodes', () => {
        trie.populate(['cake', 'caketopper', 'cherry', 'chi'])
        trie.optimize();
        assert.deepEqual(trie.root.children.c.children.a.data, 'ake')

        trie.expand();
        assert.deepEqual(trie.root.children.c.children.a.data, 'a');
      })
    })
  });