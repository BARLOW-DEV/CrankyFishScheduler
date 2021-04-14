'use strict';

const PROCESSES = ["P1", "P2", "P3", "P4", "P5", "P6"];

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

//===== Calculator START =======

// ROUND ROBIN 
// Structure 
const ProcInfo_RR = [
    {
        pro: "P1",
        burstTime: 15,
        priority: 40,
        arrival: 0
    },
    {
        pro: "P2",
        burstTime: 25,
        priority: 30,
        arrival: 20
    },
    {
        pro: "P3",
        burstTime: 20,
        priority: 30,
        arrival: 30
    },
    {
        pro: "P4",
        burstTime: 15,
        priority: 35,
        arrival: 50
    },
    {
        pro: "P5",
        burstTime: 15,
        priority: 5,
        arrival: 100
    },
    {
        pro: "P6",
        burstTime: 10,
        priority: 10,
        arrival: 105
    }

]


// MULTILEVEL QUEUE
const ProcInfo_ML = [
    {
        pro: "P1",
        burstTime: 12,
        priorityQ: 1,
        arrival: 0
    },
    {
        pro: "P2",
        burstTime: 8,
        priorityQ: 2,
        arrival: 4
    },
    {
        pro: "P3",
        burstTime: 6,
        priorityQ: 1,
        arrival: 5
    },
    {
        pro: "P4",
        burstTime: 5,
        priorityQ: 2,
        arrival: 12
    },
    {
        pro: "P5",
        burstTime: 10,
        priorityQ: 2,
        arrival: 18
    },

]


// Time qunatum/Time Slice 
//let TQ = 10; 

// Reference: https://codepen.io/faso/pen/zqWGQW?editors=0010

//https://shivammitra.com/operating%20system/roundrobin-scheduling-program/# - Deriving from this program


function CalculateButton() {
    // Access element from HTML doc
    let CalcButton = document.getElementById("").onclick;

    // Variable decleration for computations
    let total_turnaround_time = 0;
    let total_waiting_time = 0;
    let total_response_time = 0;
    let total_idle_time = 0;
    let indx;

    // Round robin scheduler 
    if (document.getElementById("algoritm").checked = true) {
        let num_proc = 6;
        // Note - Convert to JS
        sort(p, p + n, compare1);

        // Creates a queue for round robin process
        let queue = new Queue();
        let current_time = 0;
        queue.push(0);
        let completed = 0;
        let mark = mark[100];

        // Note- find workaround in JS
        //memset(mark,0,sizeof(mark));
        mark[0] = 1; 

        while (completed != n){

        }


    }

    // Note -Implement a queue using an array or possibly the data structure "queue"?

}

function ResetButton() {
    document.getElementById("").reset();
}
//===== Calculator END =======

// main() - Driver code 

// Note - In the calculator portion - Use conditional statements to replace the elements in these four functions below

displayCurrProcess('P1 P2 P3');
displayQuantum('1ms');
displayWtProcess('P1 P2');
displayFinProcess('P1 P2 P3');

