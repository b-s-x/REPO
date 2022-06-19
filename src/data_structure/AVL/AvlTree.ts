import { AvlNode } from './AvlNode';

interface IAvlTree<T> {
  root?: AvlNode<T>;
  insert(value: T): void;
  remove(value: T): void;
  leftRotate(node: AvlNode<T>): AvlNode<T>;
  rightRotate(node: AvlNode<T>): AvlNode<T>;
  rightLeftRotate(node: AvlNode<T>): AvlNode<T>;
  leftRightRotate(node: AvlNode<T>): AvlNode<T>;
}

export class AvlTree<T> implements IAvlTree<T> {
  root?: AvlNode<T>;

  public insert(value: T) {
    this.root = this._insertAt(this.root, value);
  }

  public remove(value: T): void {
    this.root = this._remove(this.root, value);
  }

  public leftRotate(node: AvlNode<T>): AvlNode<T> {
    const pivot = node.rightChild;
    node.rightChild = pivot.leftChild;
    pivot.leftChild = node;

    node.height = this._updateBalanced(node);
    pivot.height = this._updateBalanced(pivot);
    return pivot;
  }

  public rightRotate(node: AvlNode<T>): AvlNode<T> {
    const pivot = node.leftChild;
    node.leftChild = pivot.rightChild;
    pivot.rightChild = node;

    node.height = this._updateBalanced(node);
    pivot.height = this._updateBalanced(pivot);
    return pivot;
  }

  public rightLeftRotate(node: AvlNode<T>): AvlNode<T> {
    if (node.rightChild == null) return node;
    node.rightChild = this.rightRotate(node.rightChild);
    return this.leftRotate(node);
  }

  public leftRightRotate(node: AvlNode<T>): AvlNode<T> {
    if (node.leftChild == null) return node;
    node.leftChild = this.leftRotate(node.leftChild);
    return this.rightRotate(node);
  }

  protected findMin(node: AvlNode<T>): AvlNode<T> {
    return node.leftChild ? this.findMin(node.leftChild) : node;
  }

  protected balanced(node: AvlNode<T>): AvlNode<T> {
    switch (node.balanceFactor()) {
      case 2: {
        const left = node.leftChild;
        if (left !== null && left.balanceFactor() === -1) {
          return this.leftRightRotate(node);
        } else {
          return this.rightRotate(node);
        }
      }
      case -2: {
        const right = node.rightChild;
        if (right !== null && right.balanceFactor() === 1) {
          this.rightLeftRotate(node);
        } else {
          return this.leftRotate(node);
        }
        break;
      }
      default: {
        return node;
      }
    }
  }

  protected _insertAt(node: AvlNode<T>, value: T): AvlNode<T> {
    if (node == null) return new AvlNode(value);

    if (value < node.value) {
      node.leftChild = this._insertAt(node.leftChild, value);
    } else {
      node.rightChild = this._insertAt(node.rightChild, value);
    }

    const balanceNode = this.balanced(node);
    balanceNode.height =
      1 + Math.max(balanceNode.leftHeight(), balanceNode.rightHeight());

    return balanceNode;
  }

  protected _remove(node: AvlNode<T>, value: T): AvlNode<T> {
    if (!node) return null;

    if (value < node.value) {
      node.leftChild = this._remove(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this._remove(node.rightChild, value);
    } else {
      if (!node.rightChild) return node.leftChild;
      const min = this.findMin(node.rightChild);
      min.leftChild = node.leftChild;
      min.rightChild = this._removeMin(node.rightChild);

      node = this.balanced(min);
    }

    return node;
  }

  protected _removeMin(node: AvlNode<T>): AvlNode<T> {
    if (!node.leftChild) return node.rightChild;
    node.leftChild = this._removeMin(node.leftChild);
    return this.balanced(node);
  }

  protected _updateBalanced(node: AvlNode<T>): number {
    return 1 + Math.max(node.leftHeight(), node.rightHeight());
  }
}
