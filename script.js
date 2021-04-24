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
        var priority = parseInt($(value.children[3]).html())
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


// Mutlielvel Queue
displayCurrProcess_MLQ(' ');
displayQuantum_MLQ(' ');
displayQ1Waiting(' ');
displayQ2Waiting(' ');
displayFinProcess_MLQ('P1 P2 P3 P4 P5');


