import {
  createSimpleTree,
  treeTraverseInOrder,
  treeTraversePreOrder,
  treeTraversePostOrder,
  findNode,
  getMinimum,
  getMaximum,
  insert,
  deleteNode
} from "./Example";

const tree = createSimpleTree();

const run = () => {
  // treeTraverseInOrder(tree, console.log);
  // treeTraversePreOrder(tree, console.log);
  // treeTraversePostOrder(tree, console.log);
  // findNode(tree, 3);
  // getMinimum(tree);
  // getMaximum(tree);
  // insert(tree, 42);
  deleteNode(tree, 0);
};

run();
