export enum SlideDirection {
	Right = -1,
	Left = 1,
}

export class Circular<T> {
	constructor(private arr: T[], private currentIndex: number) {}

	next(): T {
		const i = this.currentIndex;
		const arr = this.arr;
		this.currentIndex = i < arr.length - 1 ? i + 1 : 0;
		return this.current();
	}

	prev(): T {
		const i = this.currentIndex;
		const arr = this.arr;
		this.currentIndex = i > 0 && i < arr.length ? i - 1 : arr.length - 1;
		return this.current();
	}

	current(): T {
		return this.arr[this.currentIndex];
	}
}
