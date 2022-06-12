import { Node } from "./Node";

export const createSimpleTree = () => {
  const zero = new Node(0);
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  const seven = new Node(7);
  const eight = new Node(8);
  const nine = new Node(9);

  seven.leftChild = three;
  three.leftChild = two;
  three.rightChild = five;
  two.leftChild = one;
  one.leftChild = zero;
  five.leftChild = four;
  five.rightChild = six;
  seven.rightChild = nine;
  nine.leftChild = eight;

  return seven;
};

export const treeTraverseInOrder = <T>(
  tree: Node<T>,
  action: typeof console.log
) => tree.traverseInOrder(action);

export const treeTraversePreOrder = <T>(
  tree: Node<T>,
  action: typeof console.log
) => tree.traversePreOrder(action);

export const treeTraversePostOrder = <T>(
  tree: Node<T>,
  action: typeof console.log
) => tree.traversePostOrder(action);

export const findNode = <T>(tree: Node<T>, value: any) => {
  const result = tree.search(value);
  console.log("findNode:", result);
};

export const getMinimum = <T>(tree: Node<T>) => {
  const result = tree.getMinimum(tree);
  console.log(result);
};

export const getMaximum = <T>(tree: Node<T>) => {
  const result = tree.getMaximum(tree);
  console.log(result);
};

export const insert = <T>(tree: Node<T>, value: T) => {
  const result = tree.insert(tree, value);
  console.log(result);
};

export const deleteNode = <T>(tree: Node<T>, value: T) => {
  const result = tree.delete(tree, value);
  console.log(result);
};
