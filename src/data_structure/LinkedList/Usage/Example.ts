import { LinkedList } from '../List';

export class ExampleLinkedList {
  public push() {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    console.log('push', list);
  }

  public append() {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    console.log('append', list);
  }

  public nodeAt(index: number) {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const node = list.nodeAt(index);
    console.log('nodeAt', node);
  }

  public insertAfter() {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const node = list.nodeAt(1);
    const newNode = list.insertAfter(node, 42);
    console.log('insertAfter', newNode);
    console.log('list', list);
  }

  public pop() {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const value = list.pop();
    console.log('value', value);
    console.log('list after', list);
  }

  public removeLast() {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const value = list.removeLast();
    console.log('value', value);
    console.log('list after', list);
  }

  public removeAfter(index: number) {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const node = list.nodeAt(index);
    const newNode = list.removeAfter(node);
    console.log('removeAfter', newNode);
    console.log('list', list);
  }

  public size() {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    const size = list.size();
    console.log('size', size);
  }
}
