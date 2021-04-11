'use strict';

const PROCESSES = ["P1", "P2", "P3", "P4", "P5", "P6"]

const priorProc = PROCESSES.map((el, i) => {
    return (
        {
            pro: el,
            priority: i + 1
        }
    );
})

console.log(priorProc)

// const priorProc = [
//                     {
//                         pro: "P1", 
//                         priority: "1"
//                     }, 
//                     {
//                         pro: "P2", 
//                         priority: "2"
//                     }
//                   ]

console.log(priorProc[0].priority)

const displayCurrProcess = function (message) {
    document.querySelector('.currProcess').textContent = message;
};

const displayQuantum = function (message) {
    document.querySelector('.quantum').textContent = message;
};

const displayWtProcess = function (message) {
    document.querySelector('.wtProcess').textContent = message;
};

const displayFinProcess = function (message) {
    document.querySelector('.finProcess').textContent = message;
};






displayCurrProcess('P1 P2 P3');
displayQuantum('1ms');
displayWtProcess('P1 P2');
displayFinProcess('P1 P2 P3');

