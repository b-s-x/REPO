interface INode<T> {
  value: T;
  leftChild?: Node<T>;
  rightChild?: Node<T>;
  root?: Node<T>;
  traverseInOrder(action: (value: T) => void): void;
  traversePreOrder(action: (value: T) => void): void;
  traversePostOrder(action: (value: T) => void): void;
  search(value: T): Node<T> | undefined;
  getMinimum(node: Node<T>): Node<T> | undefined;
  getMaximum(node: Node<T>): Node<T> | undefined;
  insert(node: Node<T> | undefined, value: T): Node<T>;
  delete(node: Node<T>, value: T): Node<T>;
}

export class Node<T> implements INode<T> {
  leftChild?: Node<T>;
  rightChild?: Node<T>;
  root?: Node<T>;

  constructor(public value: T) {
    this.value = value;
  }

  traverseInOrder(action: (value: T) => void) {
    this.leftChild?.traverseInOrder(action);
    action(this.value);
    this.rightChild?.traverseInOrder(action);
  }

  traversePreOrder(action: (value: T) => void) {
    action(this.value);
    this.leftChild?.traverseInOrder(action);
    this.rightChild?.traverseInOrder(action);
  }

  traversePostOrder(action: (value: T) => void) {
    this.leftChild?.traverseInOrder(action);
    this.rightChild?.traverseInOrder(action);
    action(this.value);
  }

  search(value: T): Node<T> | undefined {
    if (value === this.value) return this;
    if (value < this.value) {
      return this.leftChild?.search(value);
    } else {
      return this.rightChild?.search(value);
    }
  }

  getMinimum(node: Node<T>): Node<T> | undefined {
    if (!node.leftChild) return node;
    return node.leftChild.getMinimum(node.leftChild);
  }

  getMaximum(node: Node<T>): Node<T> | undefined {
    if (!node.rightChild) return node;
    return node.rightChild.getMinimum(node.rightChild);
  }

  insert(node: Node<T> | undefined, value: T): Node<T> {
    if (!node) return new Node(value);
    else if (value < node.value) {
      node.leftChild = this.insert(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this.insert(node.rightChild, value);
    }
    return node;
  }

  delete(node: Node<T>, value: T): Node<T> {
    if (!node) return node;
    if (value < node.value) {
      node.leftChild = node.delete(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = node.delete(node.rightChild, value);
    } else if (node.leftChild && node.rightChild) {
      node.value = node.getMinimum(node.rightChild).value;
      node.rightChild = node.delete(node.rightChild, node.value);
    } else {
      if (node.leftChild) node = node.leftChild;
      else if (node.rightChild) node = node.rightChild;
      else node = undefined;
    }

    return node;
  }
}
