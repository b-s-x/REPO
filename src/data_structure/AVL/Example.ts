import { AvlTree } from './AvlTree';

const run = () => {
  const tree = new AvlTree();
  tree.insert(15);
  tree.insert(10);
  tree.insert(16);
  tree.insert(18);
  console.dir(tree);
  tree.remove(16);
  console.dir(tree);
};

run();
