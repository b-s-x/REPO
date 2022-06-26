import { TrieNode } from './TrieNode';

interface ITrie {
  insert(text: string): void;
  contains(text: string): boolean;
  remove(text: string): void;
  matchPrefix(prefix: string): string[];
}

export class Trie implements ITrie {
  private root: TrieNode<number>;
  private _length: number;

  constructor() {
    this.root = new TrieNode(null, null);
    this._length = 0;
  }

  public get length(): number {
    return this._length;
  }

  public insert(text: string): void {
    let current = this.root;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (!current.children.has(charCode)) {
        current.children.set(charCode, new TrieNode(charCode, current));
        this._length += 1;
      }
      current = current?.children.get(charCode);
    }

    current.isTerminating = true;
  }

  public contains(text: string): boolean {
    let current = this.root;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const child = current.children.get(charCode);
      if (child == null) return false;
      current = child;
    }
    return current.isTerminating;
  }

  public remove(text: string): void {
    let current = this.root;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const child = current.children.get(charCode);
      if (child == null) return;
      current = child;
    }
    if (!current.isTerminating) return;
    current.isTerminating = false;

    while (
      current.parent != null &&
      current.children.size &&
      !current.isTerminating
    ) {
      current.parent.children.set(current.key, null);
      this._length -= 1;
      current = current.parent;
    }
  }

  public matchPrefix(prefix: string): string[] {
    let current = this.root;

    for (let i = 0; i <= prefix.length; i++) {
      const charCode = prefix.charCodeAt(i);
      const child = current.children.get(charCode);

      if (!child) break;
      current = child;
    }

    return this.moreMatches(prefix, current);
  }

  private moreMatches(prefix: string, node: TrieNode<number>): string[] {
    let results = [];
    if (node.isTerminating) results.push(prefix);

    for (const child of node.children.values()) {
      const charCode = child.key;
      results = [
        ...results,
        ...this.moreMatches(`${prefix}${String.fromCharCode(charCode)}`, child),
      ];
    }
    return results;
  }
}
