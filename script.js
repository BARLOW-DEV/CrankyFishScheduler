// function p_priority(){
//     // Processors Priority
//     // Fixed values 
//     document.getElementsByID("").value = 40;
//     document.getElementById("").value = 30;
//     document.getElementById("").value = 30;
//     document.getElementById("").value = 35;
//     document.getElementById("").value = 5;
//     document.getElementById("").value = 10;
// }
// function calculate(){
//     // Access calculate button 
//     var CalculateButton = document.getElementById(""); 

//     // Access 
    

// }
'use strict';
//===== Calculator START =======
const PROCESSES = ["P1", "P2", "P3", "P4", "P5", "P6"]

// const priorProc = PROCESSES.map((el, i) => {
//     return (
//         {
//             pro: el,
//             priority: i + 1
//         }
//     );
// })

//console.log(priorProc)

// ROUND ROBIN 
const ProcInfo_RR = [
                    {
                        pro: "P1", 
                        burstTime:15,
                        priority:40,
                        arrival:0
                    }, 
                    {
                        pro: "P2", 
                        burstTime:25,
                        priority: 30,
                        arrival:20
                    },
                    {
                        pro: "P3", 
                        burstTime:20,
                        priority: 30,
                        arrival:30
                    },
                     {
                        pro: "P4", 
                        burstTime:15,
                        priority: 35,
                        arrival:50
                    },
                     {
                        pro: "P5", 
                        burstTime:15,
                        priority: 5,
                        arrival:100
                    },
                     {
                        pro: "P6", 
                        burstTime:10,
                        priority: 10,
                        arrival:105
                    }

                  ]

// Time qunatum/Time Slice 
let TQ = 10; 
// MULTILEVEL QUEUE
const ProcInfo_ML = [
                    {
                        pro: "P1", 
                        burstTime:12,
                        priorityQ:1,
                        arrival:0
                    }, 
                    {
                        pro: "P2", 
                        burstTime:8,
                        priorityQ: 2,
                        arrival:4
                    },
                    {
                        pro: "P3", 
                        burstTime:6,
                        priorityQ: 1,
                        arrival:5
                    },
                     {
                        pro: "P4", 
                        burstTime:5,
                        priorityQ: 2,
                        arrival:12
                    },
                     {
                        pro: "P5", 
                        burstTime:10,
                        priorityQ: 2,
                        arrival:18
                    },
                 
                  ]


function CalculateButton(){
    // Access element from HTML doc
    let CalcButton = document.getElementById("").onclick;

    // Sum of burst time - Will serve as the end of the process 
    tot_BT = ProcInfo_RR[1].BurstTime + ProcInfo_RR[2].BurstTime + ProcInfo_RR[3].BurstTime + ProcInfo_RR[4].BurstTime + ProcInfo_RR[5].BurstTime;  

    

    // Iterate through each process
    let i = 0; 
    let zeroIndex; 
    for (i = 0; i < tot_BT; i++){
       
    }

    // Implement a queue using an array or possibly the data structure "queue"?
}

function ResetButton(){
    var ResButton = document.getElementById("").onclick;
}
//===== Calculator END =======
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