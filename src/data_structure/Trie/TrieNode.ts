export class TrieNode<T> {
  children: Map<T, TrieNode<T>>;
  isTerminating = false;

  constructor(public key: T, public parent: TrieNode<T>) {
    this.key = key;
    this.parent = parent;
    this.children = new Map();
  }
}
