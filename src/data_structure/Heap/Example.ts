import { Heap, Priority } from ".";

const run = () => {
  // isEmpty();
  // insert();
  // remove();
  // removeAt();
  // indexOf();
  build();
}

// const isEmpty = (): void => {
//   const heap = new Heap();
//   const state = heap.isEmpty();
//   console.log(state);
// }

// const insert = () => {
//   const heap = new Heap<number>();
//   heap.insert(8);
//   heap.insert(6);
//   heap.insert(5);
//   heap.insert(4);
//   heap.insert(3);
//   heap.insert(2);
//   heap.insert(1);
//   console.log(heap);
//   heap.insert(7);
//   console.log(heap);
// }

// const remove = () => {
//   const heap = new Heap<number>();
//   heap.insert(10);
//   heap.insert(8);
//   heap.insert(5);
//   heap.insert(4);
//   heap.insert(6);
//   heap.insert(2);
//   heap.insert(1);
//   heap.insert(3);
//   const root = heap.remove();
//   console.log(root);
//   console.log(heap);
// }

// const removeAt = () => {
//   const heap = new Heap<number>();
//   heap.insert(10);
//   heap.insert(7);
//   heap.insert(2);
//   heap.insert(5);
//   heap.insert(1);
//   const index = 1;
//   heap.removeAt(index);
//   console.log(heap);
// }

// const indexOf = () => {
//   const heap = new Heap<number>();
//   heap.insert(10);
//   heap.insert(7);
//   heap.insert(2);
//   heap.insert(5);
//   heap.insert(1);
//   console.log(heap);

//   const index = heap.indexOf(1);
//   console.log(index);
// }

const build = () => {
  const array = [1, 12, 3, 4, 1, 6, 8, 7];
  const heap = new Heap(array, Priority.min);
  console.log(heap);

  while(!heap.isEmpty()) {
    console.log(heap.remove());
  }
}

run();