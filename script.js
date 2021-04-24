'use strict';

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
const ProcInfo_ML = [
    {
        pro: 1,
        burstTime: 12,
        priorityQ: 1,
        arrival: 0
    },
    {
        pro: 2,
        burstTime: 8,
        priorityQ: 2,
        arrival: 4,
    },
    {
        pro: 3,
        burstTime: 6,
        priorityQ: 1,
        arrival: 5,
    },
    {
        pro: 4,
        burstTime: 5,
        priorityQ: 2,
        arrival: 12,
    },
    {
        pro: 5,
        burstTime: 10,
        priorityQ: 2,
        arrival: 18,
    },

]


// Time qunatum/Time Slice 
//let TQ = 10; 

// Reference: https://codepen.io/faso/pen/zqWGQW?editors=0010

//https://shivammitra.com/operating%20system/roundrobin-scheduling-program/# - Deriving from this program


async function CalculateRRButton() {
    // Access element from HTML doc
    //let CalcButton = document.getElementById("").onclick;

    // Variable decleration for computations

    // Variable decleration for computations
    //let roundRobin = new RoundRobin();
    var numberOfProcesses = 0;
    var timeQuanta = 2;
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
    var processPriority = {   1: 0, 
                              2: 0,
                              3: 0,
                              4: 0,
                              5: 0,
                              6: 0};
    var inputTable = $('#inputTable tr');

    
    

    // Round robin scheduler 
       /* 
    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        var priority = parseInt($(value.children[3]).children().first().val())
        executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1, "priority": priority };
        */

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
            /*
            for(var j = 0; j < queue.length; j++) {
                if() {
                    var temp = queue[i];
                    queue[i] = queue[i + 1];
                    queue[i + 1] = temp;
                }
            }
            */
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
                        //if(arrival[i] == arrivalHighest) {
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


/*

function animate() {
    $('fresh').prepend('<div id="curtain" style="position: absolute; right: 0; width:100%; height:100px;"></div>');

    $('#curtain').width($('#resultTable').width());
    $('#curtain').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    console.log($('#resultTable').width());
    var distance = $("#curtain").css("width");

    animationStep(sum, 0);
    jQuery('#curtain').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
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
    $('fresh').html('<table id="resultTable" style="width: 70%"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );

    animate();
}
*/


// main() - Driver code

// Note - In the calculator portion - Use conditional statements to replace the elements in these four functions below
/*
displayCurrProcess('P1');
displayQuantum('1ms');
displayWtProcess('P1 P2');
displayFinProcess('P1 P2 P3');
*/