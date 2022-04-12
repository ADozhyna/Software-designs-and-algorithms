class Job {
  public priority: number;

  constructor() {
    this.priority = this.getPriority();
  }

  private getPriority(jobLimit = 10000) {
    return Math.floor(Math.random() * jobLimit);
  }

  public run() {
    return console.log(`Job was run. Priority: ${this.priority}`);
  }
}

class PriorityQueue {
  private items: Array<Job> = [];

  public enqueue(item: Job) {
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > item.priority) {
        this.items.splice(i, 0, item);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(item);
    }
  }


  
  public dequeue() {
    return this.isEmpty() ? null : this.items.shift();
  }

  private isEmpty() {
    return this.items.length === 0;
  }

  public getQueueLength() {
    return this.items.length;
  }

  public getFirst() {
    return this.items[0];
  }

  public getLast() {
    return this.items[this.getQueueLength() -1];
  }
}

const queue = new PriorityQueue();

for (let i = 0; i < 10000; i++) {
  queue.enqueue(new Job());
}
for (let i = 0; i < 10000; i++) {
  queue.dequeue()?.run();
}
console.log(queue.getQueueLength());
/*queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.dequeue().run();
queue.getLast().run();*/