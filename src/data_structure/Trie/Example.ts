import { Trie } from './Trie';

// const insert = () => {
//   const trie = new Trie();
//   trie.insert('text');
//   if (trie.contains('text')) {
//     console.log('text is in the trie');
//   }
// };

// const remove = () => {
//   const trie = new Trie();
//   trie.insert('cut');
//   trie.insert('cute');

//   trie.contains('cut');
//   console.log('"cut" is in the trie');
//   console.assert(trie.contains('cute'));
//   console.log('"cute" is in the trie');

//   console.log('\n--- Removing "cut" ---');
//   trie.remove('cut');
//   console.assert(!trie.contains('cut'));
//   console.assert(trie.contains('cute'));
//   console.log('"cute" is still in the trie');
// };



const matches = () => {
  const trie = new Trie();
  trie.insert('car');
  trie.insert('card');
  trie.insert('coo');
  trie.insert('cart');
  trie.insert('care');
  trie.insert('cared');
  trie.insert('cars');
  trie.insert('carbs');
  trie.insert('carapace');
  trie.insert('cargo');

  console.log('Collections starting with "car"');
  const prefixedWithCar = trie.matchPrefix('car');
  console.log('prefixedWithCar', prefixedWithCar);

  console.log('\nCollections starting with "care"');
  const prefixedWithCare = trie.matchPrefix('care');
  console.log(prefixedWithCare);
};

const run = () => {
  // insert();
  // remove();
  matches();
};

run();
