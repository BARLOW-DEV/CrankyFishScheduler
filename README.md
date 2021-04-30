# CrankyFishScheduler

ROUND ROBIN WITH PREEMPTIVE PRIORITY

-Once the page is loaded, the user is introduced to a table informing the user the tasks (processes) that need to be completed, the priority of each task, the arrival time of each task, and the burst time of each task. <br/>
-Below the table is a field that will accept a quantum time from the user. Once entered the user will press the 'GO' button to run the algorithm and print the gantt chart containing the order in which the CPU is working on the tasks and how long it works on each task. When the CPU has not task to work on, the gantt chart will indicate Pidle and how long it is in the Pidle state.<br/>
-If the user wishes to enter a different quantum time, the page will need to be refreshed (reloaded) in order to do so. Once the time quantum has been changed, again the user will select 'GO' and the gantt chart will display the appropriate ordering of tasks. 


MULTILEVEL QUEUE WITH TWO PRIORITY QUEUES

-Once the page is loaded, the user is introduced to a table informing the user the tasks (processes) that need to be completed: the priority of each task, the arrival time of each task, and the burst time of each task. The table is pre-filled with values in each task, but can be changed to the user's desire.<br/>
-Below the table is a field that will accept two quantum times from the user. Once both are entered, the user will press the 'Calculate' button to run the algorithm and print the gantt chart.<br/>
-Queue 1 has a higher priority than queue 2. So, once it's completed, queue 2 will run as indicated in the gantt chart <br/>
-The user may enter different quantime times, but if the user wishes to reset the gantt chart, then the "Calculate" button will need to be clicked again. 
