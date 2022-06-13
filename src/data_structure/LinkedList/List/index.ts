import { Node } from './Node';

interface ILinkedList<T> {
  push(value: T): void;
  append(value: T): void;
  nodeAt(index: number): Node<T> | null | undefined;
  insertAfter(node: Node<T>, value: T): Node<T> | null | undefined;
  pop(): T | undefined;
  removeLast(): T | undefined;
  removeAfter(node: Node<T>): T | undefined;
  size(): number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null | undefined = null;
  private tail: Node<T> | null | undefined = null;

  public isEmpty(): boolean {
    return this.head === null;
  }

  public push(value: T) {
    this.head = new Node(value, this.head);
    if (this.tail === null) this.tail = this.head;
  }

  public append(value: T) {
    if (this.isEmpty()) return this.push(value);

    this.tail.next = new Node(value);
    this.tail = this.tail.next;
  }

  public nodeAt(index: number) {
    let currentNode: Node<T> | null | undefined = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      currentNode = currentNode?.next;
      currentIndex++;
    }

    return currentNode;
  }

  public insertAfter(node: Node<T>, value: T) {
    if (node === this.tail) {
      this.append(value);
      return this.tail;
    }

    node.next = new Node(value, node.next);
    return node.next;
  }

  public pop() {
    const value = this.head?.value;
    this.head = this.head?.next;
    return value;
  }

  public removeLast() {
    if (this.head?.next === null) return this.pop();

    let currentNode = this.head;
    while (currentNode?.next !== this.tail) {
      currentNode = currentNode?.next;
    }

    const value = this.tail?.value;
    this.tail = currentNode;
    this.tail.next = null;
    return value;
  }

  public removeAfter(node: Node<T>) {
    const value = node?.next?.value;
    node.next = node.next?.next;
    return value;
  }

  public size() {
    if (this.isEmpty()) return 0;

    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode?.next;
    }

    return count;
  }
}
