import Node from './Node.js';

export default class Trie {
  constructor() {
    this.counter = 0;
    this.root = new Node();
    this.suggestions = [];
  }

  count() {
    return this.counter;
  }

  insert(data) {
    let wordArray = [...data.toLowerCase()];
    let currentNode = this.root;

    wordArray.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.complete) {
      this.counter++;
      currentNode.complete = wordArray.join('');
    }
  }

  suggest(letters) {
    this.suggestions = [];
    let currentNode = this.root;
    let letterArray = [...letters.toLowerCase()];
    let childrenKeys = Object.keys(this.root.children);

    if (!childrenKeys.includes(letters[0])) {
      return this.suggestions;
    }

    for (let i = 0; i < letterArray.length; i++) {
      currentNode = currentNode.children[letterArray[i]];
    }

    this.findWords(currentNode);
    return this.suggestions;
  }

  findWords(currentNode) {
    let childrenNodes = Object.keys(currentNode.children);

    childrenNodes.forEach((child) => {
      if (currentNode.children[child].complete) {
        this.suggestions.push(currentNode.children[child].complete);
      }
      this.findWords(currentNode.children[child]);
    });
  }

  populate(array) {
    array.forEach(word => this.insert(word));
  }

  optimize() {

  }

  expand() {

  }
}