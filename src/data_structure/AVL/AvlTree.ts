import { AvlNode } from './AvlNode';

export class AvlTree<T> {
  root?: AvlNode<T>;

  insert(value: T) {
    this.root = this._insertAt(this.root, value);
  }

  _insertAt(node: AvlNode<T>, value: T): AvlNode<T> {
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

  leftRotate(node: AvlNode<T>): AvlNode<T> {
    const pivot = node.rightChild;
    node.rightChild = pivot.leftChild;
    pivot.leftChild = node;

    node.height = 1 + Math.max(node.leftHeight(), node.rightHeight());
    pivot.height = 1 + Math.max(pivot.leftHeight(), pivot.rightHeight());
    return pivot;
  }

  rightRotate(node: AvlNode<T>): AvlNode<T> {
    const pivot = node.leftChild;
    node.leftChild = pivot.rightChild;
    pivot.rightChild = node;

    node.height = 1 + Math.max(node.leftHeight(), node.rightHeight());
    pivot.height = 1 + Math.max(pivot.leftHeight(), node.rightHeight());
    return pivot;
  }

  rightLeftRotate(node: AvlNode<T>): AvlNode<T> {
    if (node.rightChild == null) return node;
    node.rightChild = this.rightRotate(node.rightChild);
    return this.leftRotate(node);
  }

  leftRightRotate(node: AvlNode<T>): AvlNode<T> {
    if (node.leftChild == null) return node;
    node.leftChild = this.leftRotate(node.leftChild);
    return this.rightRotate(node);
  }

  // remove(value: T): void {
  //   this.root = this._remove(this.root, value);
  // }

  // _remove(node: AvlNode<T>, value: T): AvlNode<T> {
  //   if (node == null) return null;
  //   if (value === node.value) {
  //     if (node.leftChild === null && node.rightChild === null) {
  //       return null;
  //     }
  //     if (node.leftChild === null) return node.rightChild;
  //     if (node.rightChild === null) return node.leftChild;
  //     node.value = Math.min
  //   }
  // }

  balanced(node: AvlNode<T>): AvlNode<T> {
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
}
