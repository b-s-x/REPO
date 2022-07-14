export enum Priority {
  max,
  min,
}

interface IHeap<E> {
  isEmpty: () => boolean,
  size: () => number,
  peek: () => E | null,
  insert: (value: E) => void,
  remove(): E | null,
  removeAt(index: number): E | null,
  indexOf(value: E, index?: number): number,
}

export class Heap<E> implements IHeap<E> {
  constructor(
    public elements?: Array<E>,
    public priority?: Priority,
  ) {
    this.elements = elements || [];
    this.priority = priority || Priority.max;

    this.buildHeap();
  }

  public isEmpty = (): boolean => !this.elements.length;
  public size = () => this.elements.length;
  public peek = () => this.isEmpty() ? null : this.elements[0];

  public insert(value: E) {
    this.elements.push(value);
    this.siftUp(this.elements.length - 1);
  }

  public remove(): E | null {
    if (this.isEmpty()) return null;
    this.swap(0, this.elements.length - 1);
    const value = this.elements.pop();
    this.siftDown(0);
    return value;
  }

  public removeAt(index: number): E | null {
    const lastIndex = this.elements.length - 1;
    if (index < 0 || index > lastIndex) return null;
    if (index == lastIndex) return this.elements.pop();

    this.swap(index, lastIndex);
    const value = this.elements.pop();
    this.siftDown(index);
    this.siftUp(index);
    return value;
  }

  public indexOf(value: E, index = 0): number {
    if (index >= this.elements.length) return -1;
    if (this.firstHasHigherPriority(value, this.elements[index])) return -1;
    if (value === this.elements[index]) return index;

    const left = this.indexOf(value, this.leftChildIndex(index));
    if (left !== -1) return left;
    return this.indexOf(value, this.rightChildIndex(index));
  }

  private leftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  private rightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  private parentIndex(childIndex: number) {
    return Math.trunc((childIndex - 1) / 2);
  }

  private buildHeap(): void {
    if (this.isEmpty()) return;
    const start = Math.trunc(this.elements.length / 2) - 1;

    for (let i = start; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private siftUp(index: number) {
    let child = index;
    let parent = this.parentIndex(child);
    while(child > 0 && child === this.higherPriority(child, parent)) {
      this.swap(child, parent);
      child = parent;
      parent = this.parentIndex(child);
    }
  }

  private siftDown(index: number): void {
    let parent = index;
    // eslint-disable-next-line no-constant-condition
    while(true) {
      const left = this.leftChildIndex(parent);
      const right = this.rightChildIndex(parent);
      let chosen = this.higherPriority(left, parent);
      chosen = this.higherPriority(right, chosen);
      if (chosen == parent) return;
      this.swap(parent, chosen);
      parent = chosen;
    }
  }

  private higherPriority(indexA: number, indexB: number): number {
    if (indexA >= this.elements.length) return indexB;
    const valueA = this.elements[indexA];
    const valueB = this.elements[indexB];
    const isFirst = this.firstHasHigherPriority(valueA, valueB);
    return isFirst ? indexA : indexB;
  }

  private firstHasHigherPriority(valueA: E, valueB: E) {
    return this.priority == Priority.max
      ? valueA > valueB
      : valueA < valueB;
  }

  private swap(indexA: number, indexB: number): void {
    const temp = this.elements[indexA];
    this.elements[indexA] = this.elements[indexB];
    this.elements[indexB] = temp;
  }
}
