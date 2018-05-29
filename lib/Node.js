export default class Node {
  constructor(data) {
    this.data = data || null;
    this.complete = null;
    this.children = {};
  }
}