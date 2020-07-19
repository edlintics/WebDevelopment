const {performance} = require('perf_hooks');

function addUpTo(n) {
    return n * (n+1) /2
}

var t1 = performance.now()
addUpTo(1000000000000)
var t2 = performance.now()
console.log(`Time elapsed: ${(t2-t1)/1000} seconds`)