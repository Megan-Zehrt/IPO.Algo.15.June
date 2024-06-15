// 502. IPO


// Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital,
// LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited
// resources, it can only finish at most "k" distinct before the IPO. Help LeetCode design the best way to maximize
// its total capital after finishing at most "k" distinct projects.

// You are given "n" projects where the "ith" project has a pure profit "profits[i]" and a minimum capital of
// "capital[i]" is needed to start it.

// Initially, you have "w" capital. When you finish a project, you will obtain its pure profit and the profit will
// be added to the total capital.

// Pick a list of at most "k" distinct projects from given projects to maximize your final capital, and return the
// final maximized capital.

// The answer is guarenteed to fit in a 32-bit signed integer.




/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */


class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent.capital <= element.capital) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extract() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        let leftChildIndex;
        let rightChildIndex;
        let length = this.heap.length;
        let element = this.heap[index];
        while (true) {
            leftChildIndex = 2 * index + 1;
            rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.capital < element.capital) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.capital < element.capital) ||
                    (swap !== null && rightChild.capital < leftChild.capital)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent >= element) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extract() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(index) {
        let leftChildIndex;
        let rightChildIndex;
        let length = this.heap.length;
        let element = this.heap[index];
        while (true) {
            leftChildIndex = 2 * index + 1;
            rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild > element) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}


var findMaximizedCapital = function(k, w, profits, capital) {
    const minHeap = new MinHeap()
    const maxHeap = new MaxHeap()

    // Combine projects and push them to the min-heap based on capital requirements
    for (let i = 0; i < profits.length; i++) {
        minHeap.insert({ profit: profits[i], capital: capital[i] });
    }

    let currentCapital = w;

    // Iterate up to k times to select projects
    for (let i = 0; i < k; i++) {
        // Move all affordable projects from min-heap to max-heap
        while (!minHeap.isEmpty() && minHeap.peek().capital <= currentCapital) {
            let project = minHeap.extract();
            maxHeap.insert(project.profit);
        }

        // If no project can be afforded, break the loop
        if (maxHeap.isEmpty()) break;

        // Select the most profitable project and update current capital
        currentCapital += maxHeap.extract();
    }

    return currentCapital;
};