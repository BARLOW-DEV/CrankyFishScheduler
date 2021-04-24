'use strict';
// Round Robin
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

// Multilevel Queue 
const displayCurrProcess_MLQ = function (message) {
    document.querySelector('.currProcess_MLQ').textContent = message;
};

const displayQuantum_MLQ = function (message) {
    document.querySelector('.quantum_MLQ').textContent = message;
};

const displayQ1Waiting = function (message) {
    document.querySelector('.wtProcess_Q1').textContent = message;
};
const displayQ2Waiting = function (message) {
    document.querySelector('.wtProcess_Q2').textContent = message;
};

const displayFinProcess_MLQ = function (message) {
    document.querySelector('.finProcess_MLQ').textContent = message;
};


// ROUND ROBIN 
// Structure 
const ProcInfo_RR = [
    {
        process: 1,
        burstTime: 15,
        priority: 40,
        arrival: 0
    },
    {
        process: 2,
        burstTime: 25,
        priority: 30,
        arrival: 25
    },
    {
        process: 3,
        burstTime: 20,
        priority: 30,
        arrival: 30
    },
    {
        process: 4,
        burstTime: 15,
        priority: 35,
        arrival: 50
    },
    {
        process: 5,
        burstTime: 15,
        priority: 5,
        arrival: 100
    },
    {
        process: 6,
        burstTime: 10,
        priority: 10,
        arrival: 105 
    }

]


// MULTILEVEL QUEUE

let mqProcesses = [
    {

        id: 'P1',
        burst: 12,
        arrival: 0,
        priority: 1
    },
    {
        id: 'P2',
        burst: 8,
        arrival: 4,
        priority: 2
    },
    {
        id: 'P3',
        burst: 6,
        arrival: 5,
        priority: 1
    },
    {
        id: 'P4',
        burst: 5,
        arrival: 12,
        priority: 2
    },
    {
        id: 'P5',
        burst: 10,
        arrival: 18,
        priority: 2
    }
];

function mqAlgo(processes, mq1Quantum, mq2Quantum) {

    let finishedMQ = [];
    let timer = 0;
    let currTime = 0;
    let queue1 = [];
    let queue2 = [];
    let queue1Seq = [];
    let added = false;
    let processesCopy = JSON.parse(JSON.stringify(processes))
    console.log(processesCopy)
    // initialize timer
    processesCopy.forEach(el => timer += el.burst)
    // functions to mock queue functionality
    function enqueue(item, queue) {
        queue.push(item)
    };

    function dequeue(queue) {
        queue.shift()
    };

    // process queue1 and queue2
    while (currTime < timer) {
        let cycleTime = 0;

        // check for waiting processes and add to queue1 or queue2
        processesCopy.forEach(el => {
            if (el.arrival <= currTime) {
                if (el.priority === 1 && !queue1.includes(el) && el.burst > 0) {

                    enqueue(el, queue1)
                    queue1Seq.push([queue1])
                    processesCopy = processesCopy.filter(item => item.id !== el.id)
                }
                if (el.priority === 2 && !queue2.includes(el) && el.burst > 0) {
                    enqueue(el, queue2)
                    processesCopy = processesCopy.filter(item => item.id !== el.id)
                }
            }
        })

        // update queue1 and currTime and cycleTime
        queue1.forEach(el => {

            if (el.burst > 0 && !added) {

                dequeue(queue1)
                queue1Seq.push([queue1])
                currTime += mq1Quantum
                cycleTime += mq1Quantum

                if (el.burst > 0) {
                    processesCopy.forEach(el => {
                        if (el.arrival < currTime && el.priority === 1) {

                            enqueue(el, queue1)
                            queue1Seq.push([queue1])
                            processesCopy = processesCopy.filter(item => item.id !== el.id)
                        }
                    })
                    enqueue(el, queue1)
                    queue1Seq.push([queue1])
                }

                if (el.burst >= mq1Quantum) {
                    finishedMQ.push({ id: el.id, burst: mq1Quantum })
                } else {
                    finishedMQ.push({ id: el.id, burst: el.burst })
                }
                el.burst -= mq1Quantum;
                added = true;
            }
        })

        added = false;

        // update queue2 and currTime
        queue2.forEach(el => {

            if (el.burst > 0 && cycleTime === 0 && !added) {

                dequeue(queue2)
                if (el.burst > 0) {
                    enqueue(el, queue2)
                }

                if (el.burst >= mq2Quantum) {
                    finishedMQ.push({ id: el.id, burst: mq2Quantum })
                    currTime += mq2Quantum
                } else {
                    finishedMQ.push({ id: el.id, burst: el.burst })
                    currTime += el.burst
                }

                el.burst -= mq2Quantum;
                added = true;
            }
        })
    }
    console.log("finishedMQ =")
    console.log(finishedMQ)
    console.log("queue1Seq =")
    console.log(queue1Seq)
    return finishedMQ;
}


// Reference: https://codepen.io/faso/pen/zqWGQW?editors=0010

function ResetButton() {
    document.getElementById("").reset();
}

// ROUND ROBIN STUFF 

async function CalculateRRButton(quantum) {
   
    var numberOfProcesses = 0;
    var timeQuanta = quantum;
    var idle = false;
    var timeQuantaRemaining = timeQuanta;
    var timer = 0;
    var maxProcessIndex = 0;
    var avgWaitTime = 0.0;
    var avgTurnaroundTime = 0.0;
    var arrival = [];
    var burst = [];
    var waiting = [1, 2, 3, 4, 5, 6];
    var waitingProcesses = [];
    var turn = [];
    var queue = [];
    var burst_remaining = [];  
    var priority = [];  
    var complete = [];
    var completedP = [];
    var completedProcesses = [];

        for(var i = 0; i < ProcInfo_RR.length; i++) {
            arrival[i] = ProcInfo_RR[i].arrival;            //initializing queue, arrival time, burst time, remaining time
            burst[i] = ProcInfo_RR[i].burstTime;
            burst_remaining[i] = burst[i];
            priority[i] = ProcInfo_RR[i].priority;
            processPriority[i+1] = priority[i];
            queue[i] = 0;
            numberOfProcesses++;
        }

        while(timer < arrival[0]) {
            timer++;
        }


        for (var i = 0; i < numberOfProcesses; i++) { 
            complete[i] = false;   //Initializing the RR queue and completed processes array
            queue[i] = 0;
            if(arrival[i] == 0) {
                queue[i] = i + 1;
            }
        }

    }
 
        if(queue[0] == 0) {
            queue[0] = 1;
        }
        

        while(true) {
            var flag = new Boolean(true);
            for(var i = 0; i < numberOfProcesses; i++) {
                //if(burst_remaining[i] != 0) {
                if(ProcInfo_RR[i].burstTime != 0) {
                    flag = false;
                    break;
                }
            }
            if(flag) {
                break;
            }

            document.getElementById('currProcessRR').value = "P" + queue[0];
            document.getElementById('quantumRR').value = timeQuantaRemaining + "ms";
            for(var i = 0; (i < numberOfProcesses) && (queue[0] != 0); i++) {
                var counter = 0;
                document.getElementById('quantumRR').value = timeQuantaRemaining + "ms";
                //while((counter < timeQuanta) && (burst_remaining[queue[0]-1] > 0)) {
                    while((counter < timeQuanta) && (ProcInfo_RR[queue[0] - 1].burstTime > 0)) {
                    
                    await sleep(1000);
                    
                    waitingProcesses = [];
                    //get waiting processes
                    for(var i = 0; i < numberOfProcesses; i++) {
                        if(waiting[i] == queue[0]) {
                            waiting.splice(i, 1);
                        }
                    }
                    for(var i = 0; i < waiting.length; i++) {
                        waitingProcesses.push(" P" + waiting[i]);
                    }
                    //output waiting processes
                    if(waiting.length > 0) {
                        document.getElementById("wtProcessRR").value = waitingProcesses;
                    } else {
                        document.getElementById('wtProcessRR').value = "None";
                    }
                   
                    //output completed processes
                    completedProcesses = [];
                    for(var i = 0; i < completedP.length; i++) {
                        if(completedP[i] > 0) {
                            completedProcesses.push(" P" + completedP[i]);
                        }
                    }
                   
                    if(completedP.length > 0) {
                        document.getElementById("finProcessRR").value = completedProcesses;
                    } else {
                        document.getElementById('finProcessRR').value = "None";
                    }
                    document.getElementById('currProcessRR').value = "P" + queue[0];
                    timeQuantaRemaining--;
                    document.getElementById('quantumRR').value = timeQuantaRemaining + "ms";
                    //burst_remaining[queue[0] - 1] -= 1;
                    ProcInfo_RR[queue[0] - 1].burstTime -= 1;
                    //completedProcessesWaiting[queue[0]] = burst_remaining[queue[0] - 1];    
                    timer++;
                    counter++;
                    if(queue[numberOfProcesses - 1] == 0) {
                        //maxProcessIndex = newArrival(processPriority, timer, arrival, numberOfProcesses, maxProcessIndex, queue);
                        maxProcessIndex = newArrival(ProcInfo_RR, processPriority, timer, numberOfProcesses, maxProcessIndex, queue );
                    }
                    //put priority maintenance here
                }
                
                document.getElementById('quantumRR').value = timeQuantaRemaining + "ms";
                await sleep(100);

                //if ((burst_remaining[queue[0] - 1] == 0) && (complete[queue[0] - 1] == false)) {
                if ((ProcInfo_RR[queue[0]-1].burstTime == 0) && (complete[queue[0] - 1] == false)) {
                    turn[queue[0] - 1] = timer;        //turn currently stores exit times
                    complete[queue[0] - 1] = true; 
                    completedP.push(queue[0]); 
                    //completedProcesses[queue[0]] = true;  //if process burst time is zero then true tag
                }
                
                idle = true;
                if(queue[numberOfProcesses - 1] == 0) {
                    for(var k = 0; k < numberOfProcesses && queue[k] != 0; k++) {
                        if(complete[queue[k] - 1] == false) {
                            idle = false;
                        }
                    }
                } else {
                    idle = false;
                }
                if(idle) {
                    timer++;
                    //maxProcessIndex = newArrival(processPriority, timer, arrival, numberOfProcesses, maxProcessIndex, queue);
                    maxProcessIndex = newArrival(ProcInfo_RR, processPriority, timer, numberOfProcesses, maxProcessIndex, queue );
                }
                //if(burst_remaining[queue[0] - 1] != 0) {
                if(ProcInfo_RR[queue[0] - 1].burstTime != 0) {
                    waiting.push(queue[0]);
                }
                queueMaintainence(queue, numberOfProcesses);
                //queueMaintainence( queue, numberOfProcesses);
                timeQuantaRemaining = timeQuanta;
                
                    //document.getElementById('currProcessRR').value = "P" + queue[0];
                    //document.getElementById('quantumRR').value = timeQuantaRemaining + "ms";
                
            }
            if(completedP.length == numberOfProcesses) {
                document.getElementById('currProcessRR').value = "None";
                completedProcesses = [];
                for(var i = 0; i < completedP.length; i++) {
                    if(completedP[i] > 0) {
                        completedProcesses.push(" P" + completedP[i]);
                    }
                }
                document.getElementById("finProcessRR").value = completedProcesses;
            }
            if(idle == true) {
                document.getElementById('currProcessRR').value = "idle";
            }
          return completedP
        }

        function sleep(ms) {
            return new Promise((accept) => {
                setTimeout(() => {
                    accept();
                }, ms); 
            });
        }

        function updateQueue(queue, processPriority, numberOfProcesses, maxProcessIndex) {
            var processPriority = processPriority;
            var zeroIndex = -1;
            var i = 0;
            for (i = 0; i < numberOfProcesses; i++) {
                if(queue[i] == 0) {
                    zeroIndex = i;
                    break;
                }
            }
            if (zeroIndex == -1) {
                return;
            }
            queue[zeroIndex] = maxProcessIndex + 1;
        }

        function newArrival(ProcInfo_RR, processPriority, timer, numberOfProcesses, maxProcessIndex, queue) {
            var priorityNeedsUpdating = false;
            var processPriority = processPriority;
            var queue = queue;
            var arrivalHighest = Number.MIN_VALUE;
            var newArrival = false;
            for (var i = 0; i < numberOfProcesses; i++) {
                if(ProcInfo_RR[i].arrival > arrivalHighest) {
               // if (arrival[i] > arrivalHighest) {
                    //arrivalHighest = arrival[i];
                    arrivalHighest = ProcInfo_RR[i].arrival;
                }
            }
            if (timer <= arrivalHighest || arrivalHighest == 0) {
                if (timer == arrivalHighest) {
                    for(var i = 0; i < arrival.length; i++) {
                        if(ProcInfo_RR[i].arrival == arrivalHighest) {
                            maxProcessIndex = i;
                            newArrival = true;
                            break;
                        }
                    }
                } else {
                    for (var j = (maxProcessIndex); j < numberOfProcesses; j++) {
                        //if (arrival <= timer) {
                        if(ProcInfo_RR[j].arrival <= timer) {
                            if (maxProcessIndex < j) {
                                maxProcessIndex = j;
                                newArrival = true;
                                break;
                            }
                        }
                    }
                }

                if (newArrival) {
                   // updateQueue(processPriority, queue, timer, arrival, numberOfProcesses, maxProcessIndex); //adds the index of the arriving process(if any)
                   priorityNeedsUpdating = checkPriority(queue, timer, ProcInfo_RR, numberOfProcesses);
                   updateQueue(queue, processPriority, numberOfProcesses, maxProcessIndex);
                    if(priorityNeedsUpdating) {
                        updatePriorityQueue(queue, ProcInfo_RR, numberOfProcesses);
                    }
                }
            
            return maxProcessIndex;
            }
        }

        function checkPriority(queue, timer, ProcInfo_RR, numberOfProcesses) {
            var indexNewArrival = 0;
            var newArrivalCount = 0;
            var highestPriority = Number.MIN_VALUE;
            var highestPriorityInQueue = Number.MIN_VALUE;
            var priorityOfNewArrival = 0;

            for(var i = 0; i < ProcInfo_RR.length; i++) {
                if(timer == ProcInfo_RR[i].arrival) {
                    newArrivalCount++;
                    indexNewArrival = i;
                }
                if(queue[i] == 0) {
                    continue;
                }
                if(ProcInfo_RR[queue[i] - 1].priority > highestPriorityInQueue) {
                    highestPriorityInQueue = ProcInfo_RR[queue[i] - 1].priority;
                }     
            }
            priorityOfNewArrival = ProcInfo_RR[indexNewArrival].priority;

            if(newArrivalCount > 1) {
                for(var j = 0; j < numberOfProcesses; j++) {
                    if(timer == ProcInfo_RR[j].arrival && ProcInfo_RR[j].priority > highestPriority) {
                        highestPriority = ProcInfo_RR[j].process;
                    }
                    if(highestPriority > highestPriorityInQueue) {
                        return true;
                    }
                }
            } else if (newArrivalCount == 1) {
                if(priorityOfNewArrival > highestPriorityInQueue) {
                    return true;
                } else {
                    return false;
                }
            } 
                
        } 
        
        
        

        function queueMaintainence(queue, numberOfProcesses) {
            var i = 0;
            for(i; (i < numberOfProcesses-1) && (queue[i+1] != 0); i++) {
                var temp = queue[i];
                queue[i] = queue[i + 1];
                queue[i + 1] = temp;
            }
        }

        function updatePriorityQueue(queue, ProcInfo_RR, numberOfProcesses) {
            var storedValue = 0;
            var indexOfStoredValue = 0;
            for(var i = 0; i < queue.length; i++) {
                if(queue[i] == 0) {
                    break;
                }
                storedValue = queue[i];
                indexOfStoredValue = i;
            }
            queue.unshift(storedValue);
            for(var j = 0; j < queue.length; j++) {
                if(j >= indexOfStoredValue + 1) {
                    queue[j] = 0;
                }
            }
        }
}

function animate() {
    $('fresh').prepend('<div id="curtain" style="position: absolute; right: 0; width:100%; height:100px;"></div>');

    $('#curtain').width($('#resultTable').width());
    $('#curtain').css({ left: $('#resultTable').position().left });

    var sum = 0;
    ProcInfo_RR.forEach(el => sum += el.burstTime)

    console.log($('#resultTable').width());
    var distance = $("#curtain").css("width");

    animationStep(sum, 0);
    jQuery('#curtain').animate({ width: '0', marginLeft: distance }, sum * 500, 'linear');
}

function animationStep(steps, cur) {
    $('#timer').html(cur);
    if (cur < steps) {
        setTimeout(function () {
            animationStep(steps, cur + 1);
        }, 500);
    }
    else {
    }
}

function RRdraw() {
    $('fresh').html('');
    var inputTable = $('#inputTable tr');
    var th = '';
    var td = '';


    var quantum = $('#quantum').val();
    var executeTimes = [];

    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        var priority = parseInt($(value.children[3]).children().first().val())
        executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1, "priority": priority };
    });
    var areWeThereYet = false;
    while (!areWeThereYet) {
        areWeThereYet = true;
        $.each(executeTimes, function (key, value) {
            if (value.executeTime > 0) {
                th += '<th style="height: 60px; width: ' + (value.executeTime > quantum ? quantum : value.executeTime) * 20 + 'px;">P' + value.P + '</th>';
                td += '<td>' + (value.executeTime > quantum ? quantum : value.executeTime) + '</td>';
                value.executeTime -= quantum;
                areWeThereYet = false;
            }

            displayCurrProcess("P" + value.P)
        });
    }
    $('fresh').html('<table id="resultTable" style="width: 90%;"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );

    animate();
}

$('freshL').prepend('<div id="curtain2" style="position: absolute; right: 0; width:100%; height:100px;"></div>');
// MULTILEVEL QUEUE STUFF
function animate_L() {
    $('freshL').prepend('<div id="curtain2" style="position: absolute; right: 0; width:100%; height:100px;"></div>');

    $('#curtain2').width($('#resultTable2').width());
    $('#curtain2').css({ left: $('#resultTable2').position().left });

    var sum = 0;
    mqProcesses.forEach(el => sum += el.burst)
    console.log("sum =" + sum)
    console.log($('#resultTable2').width());
    var distance = $("#curtain2").css("width");

    animationStep_L(sum, 0);
    jQuery('#curtain2').animate({ width: '0', marginLeft: distance }, sum * 500, 'linear');
}

function animationStep_L(steps, cur) {
    $('#timer2').html(cur);
    if (cur < steps) {
        setTimeout(function () {
            animationStep_L(steps, cur + 1);
        }, 500);
    }
    else {
    }
}
function MLQdraw() {
    $('freshL').html('');
    var th = '';
    var td = '';


    var quantumMLQ1 = parseInt($('#quantumMLQ1').val());
    var quantumMLQ2 = parseInt($('#quantumMLQ2').val());

    // Runs gantt chart until false 

    var executeTimes = mqAlgo(mqProcesses, quantumMLQ1, quantumMLQ2);

    $.each(executeTimes, function (key, value) {

        th += '<th style="height: 60px; width: ' + (value.burst > quantumMLQ2 ? quantumMLQ2 : value.burst) * 20 + 'px;">' + value.id + '</th>';
        td += '<td>' + value.burst + '</td>';

    });

    $('freshL').html('<table id="resultTable2" style="width: 90%;"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );

    animate_L();
}


// main() - Driver code

// Note - In the calculator portion - Use conditional statements to replace the elements in these four functions below

displayCurrProcess('P1');
displayQuantum('1ms');
displayWtProcess('P1 P2');
displayFinProcess('P1 P2 P3');


displayFinProcess('P1 P2 P3');

displayFinProcess('P1 P2 P3');


// Mutlielvel Queue
displayCurrProcess_MLQ(' ');
displayQuantum_MLQ(' ');
displayQ1Waiting(' ');
displayQ2Waiting(' ');
displayFinProcess_MLQ('P1 P2 P3 P4 P5');



