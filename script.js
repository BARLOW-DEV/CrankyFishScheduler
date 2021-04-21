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




// function CalculateButton() {
//     // Access element from HTML doc
//     let CalcButton = document.getElementById("").onclick;

//     // Variable decleration for computations
//     let total_turnaround_time = 0;
//     let total_waiting_time = 0;
//     let total_response_time = 0;
//     let total_idle_time = 0;
//     let indx;

//     // Round robin scheduler
//     if (document.getElementById("algoritm").checked = true) {
//         let num_proc = 6;
//         // Note - Convert to JS
//         sort(p, p + n, compare1);

//         // Creates a queue for round robin process
//         let queue = new Queue();
//         let current_time = 0;
//         queue.push(0);
//         let completed = 0;
//         let mark = mark[100];

//         // Note- find workaround in JS
//         //memset(mark,0,sizeof(mark));
//         mark[0] = 1;

//         while (completed != n) {

//         }

//     }
// }

function ResetButton() {
    document.getElementById("").reset();
}
//===== Calculator END =======

function addRow() {
    var lastRow = $('#inputTable tr:last');
    var lastRowNumebr = parseInt(lastRow.children()[1].innerText);

    var newRow = '<tr><td>P'
        + (lastRowNumebr + 1)
        + '</td><td>'
        + (lastRowNumebr + 1)
        + '</td><td><input class="exectime" type="text"/></td><td class="servtime"></td>'
        //if ($('input[name=algorithm]:checked', '#algorithm').val() == "priority")
        + '<td class="priority-only"><input type="text"/></td></tr>';

    lastRow.after(newRow);

    var minus = $('#minus');
    minus.show();
    minus.css('top', (parseFloat(minus.css('top')) + 24) + 'px');

    if ($('input[name=algorithm]:checked', '#algorithm').val() != "priority")
        $('.priority-only').hide();


    $('#inputTable tr:last input').change(function () {
        recalculateServiceTime();
    });
}

function deleteRow() {
    var lastRow = $('#inputTable tr:last');
    lastRow.remove();

    var minus = $('#minus');
    minus.css('top', (parseFloat(minus.css('top')) - 24) + 'px');

    if (parseFloat(minus.css('top')) < 150)
        minus.hide();
}

$(".initial").change(function () {
    recalculateServiceTime();
});

function recalculateServiceTime() {
    var inputTable = $('#inputTable tr');
    var totalExectuteTime = 0;

    var algorithm = $('input[name=algorithm]:checked', '#algorithm').val();
    if (algorithm == "fcfs") {
        $.each(inputTable, function (key, value) {
            if (key == 0) return true;
            $(value.children[3]).text(totalExectuteTime);

            var executeTime = parseInt($(value.children[2]).children().first().val());
            totalExectuteTime += executeTime;
        });
    }
    else if (algorithm == "sjf") {
        var exectuteTimes = [];
        $.each(inputTable, function (key, value) {
            if (key == 0) return true;
            exectuteTimes[key - 1] = parseInt($(value.children[2]).children().first().val());
        });

        var currentIndex = -1;
        for (var i = 0; i < exectuteTimes.length; i++) {
            currentIndex = findNextIndex(currentIndex, exectuteTimes);

            if (currentIndex == -1) return;

            $(inputTable[currentIndex + 1].children[3]).text(totalExectuteTime);

            totalExectuteTime += exectuteTimes[currentIndex];
        }
    }
    else if (algorithm == "priority") {
        var exectuteTimes = [];
        var priorities = [];

        $.each(inputTable, function (key, value) {
            if (key == 0) return true;
            exectuteTimes[key - 1] = parseInt($(value.children[2]).children().first().val());
            priorities[key - 1] = parseInt($(value.children[4]).children().first().val());
        });

        var currentIndex = -1;
        for (var i = 0; i < exectuteTimes.length; i++) {
            currentIndex = findNextIndexWithPriority(currentIndex, priorities);

            if (currentIndex == -1) return;

            $(inputTable[currentIndex + 1].children[3]).text(totalExectuteTime);

            totalExectuteTime += exectuteTimes[currentIndex];
        }
    }
    else if (algorithm == "robin") {
        $('#minus').css('left', '335px');
        $.each(inputTable, function (key, value) {
            if (key == 0) return true;
            $(value.children[3]).text("");
        });
    }
}

function findNextIndexWithPriority(currentIndex, priorities) {
    var currentPriority = 1000000;
    if (currentIndex != -1) currentPriority = priorities[currentIndex];
    var resultPriority = 0;
    var resultIndex = -1;
    var samePriority = false;
    var areWeThereYet = false;

    $.each(priorities, function (key, value) {
        var changeInThisIteration = false;

        if (key == currentIndex) {
            areWeThereYet = true;
            return true;
        }
        if (value <= currentPriority && value >= resultPriority) {
            if (value == resultPriority) {
                if (currentPriority == value && !samePriority) {
                    samePriority = true;
                    changeInThisIteration = true;
                    resultPriority = value;
                    resultIndex = key;
                }
            }
            else if (value == currentPriority) {
                if (areWeThereYet) {
                    samePriority = true;
                    areWeThereYet = false;
                    changeInThisIteration = true;
                    resultPriority = value;
                    resultIndex = key;
                }
            }
            else {
                resultPriority = value;
                resultIndex = key;
            }

            if (value > resultPriority && !changeInThisIteration)
                samePriority = false;
        }
    });
    return resultIndex;
}

function findNextIndex(currentIndex, array) {
    var currentTime = 0;
    if (currentIndex != -1) currentTime = array[currentIndex];
    var resultTime = 1000000;
    var resultIndex = -1;
    var sameTime = false;
    var areWeThereYet = false;

    $.each(array, function (key, value) {
        var changeInThisIteration = false;

        if (key == currentIndex) {
            areWeThereYet = true;
            return true;
        }
        if (value >= currentTime && value <= resultTime) {
            if (value == resultTime) {
                if (currentTime == value && !sameTime) {
                    sameTime = true;
                    changeInThisIteration = true;
                    resultTime = value;
                    resultIndex = key;
                }
            }
            else if (value == currentTime) {
                if (areWeThereYet) {
                    sameTime = true;
                    areWeThereYet = false;
                    changeInThisIteration = true;
                    resultTime = value;
                    resultIndex = key;
                }
            }
            else {
                resultTime = value;
                resultIndex = key;
            }

            if (value < resultTime && !changeInThisIteration)
                sameTime = false;
        }
    });
    return resultIndex;
}

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
    $('fresh').html('<table id="resultTable" style="width: 70%"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );

    animate();
}

// MULTILEVEL QUEUE STUFF
function animate_L() {
    $('freshL').prepend('<div id="curtain" style="position: absolute; right: 0; width:100%; height:100px;"></div>');

    $('#curtain').width($('#resultTable').width());
    $('#curtain').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    console.log($('#resultTable').width());
    var distance = $("#curtain").css("width");

    animationStep_L(sum, 0);
    jQuery('#curtain').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
}
function animateReset(){
 //
}
function animationStep_L(steps, cur) {
    $('#timer').html(cur);
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
    var inputTableL = $('#inputTable tr');
    var th = '';
    var td = '';


    var quantumMLQ = $('#quantumMLQ').val();
    var executeTimes = [];

    $.each(inputTableL, function (key, value) {
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
                th += '<th style="height: 60px; width: ' + (value.executeTime > quantumMLQ ? quantumMLQ : value.executeTime) * 20 + 'px;">P' + value.P + '</th>';
                td += '<td>' + (value.executeTime > quantumMLQ ? quantumMLQ : value.executeTime) + '</td>';
                value.executeTime -= quantumMLQ;
                areWeThereYet = false;
            }

            displayCurrProcess("P" + value.P)
        });
    }
    $('freshL').html('<table id="resultTable" style="width: 70%"><tr>'
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
displayCurrProcess_MLQ('P1');
displayQuantum_MLQ('1ms');
displayQ1Waiting('P1 P2');
displayQ2Waiting('P1 P2');
displayFinProcess_MLQ('P1 P2 P3');


