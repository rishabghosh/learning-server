class Counter {
  constructor(initialCount) {
    this.count = initialCount;
  }
  increment() {
    this.count++;
  }
  decrement(){
    this.count--;
  }
  reset(){
    this.count = 0;
  }
  getCount(){
    return this.count;
  }
}

const createCountListener = function (initialCount) {
  const counter = new Counter(initialCount);
  return function (request, response) {
    if (request.url === "/up") { counter.increment(); }
    if (request.url === "/down") { counter.decrement(); }
    if (request.url === "/reset") { counter.reset(); }
    response.write("count: " + counter.getCount());
    response.end();
    return;
  };
};


module.exports = { createCountListener, };