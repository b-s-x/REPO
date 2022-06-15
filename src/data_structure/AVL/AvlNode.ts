interface IAvlNode<T> {
  leftChild?: AvlNode<T>;
  rightChild?: AvlNode<T>;
  height: number;
  value: T;
  leftHeight: () => number;
  rightHeight: () => number;
  balanceFactor: () => number;
  traverseInOrder(action: (value: T) => void): void;
  traversePreOrder(action: (value: T) => void): void;
  traversePostOrder(action: (value: T) => void): void;
}

export class AvlNode<T> implements IAvlNode<T> {
  leftChild?: AvlNode<T>;
  rightChild?: AvlNode<T>;
  height: number;

  constructor(public value: T) {
    this.value = value;
    this.height = 0;
  }

  leftHeight(): number {
    return this.leftChild?.height ?? -1;
  }

  rightHeight(): number {
    return this.rightChild?.height ?? -1;
  }

  balanceFactor(): number {
    return this.leftHeight() - this.rightHeight();
  }

  traverseInOrder(action: (value: T) => void) {
    this.leftChild.traverseInOrder(action);
    action(this.value);
    this.rightChild.traverseInOrder(action);
  }

  traversePreOrder(action: (value: T) => void) {
    action(this.value);
    this.leftChild.traverseInOrder(action);
    this.rightChild.traverseInOrder(action);
  }

  traversePostOrder(action: (value: T) => void) {
    this.leftChild.traverseInOrder(action);
    this.rightChild.traverseInOrder(action);
    action(this.value);
  }
}
