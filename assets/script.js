var now = moment(); 

//Testing logs
//date.text(now);
console.log(now);

function makeBlock(hourInput, hourOutput) {
    
    var classTime = "";
    var classEvent = "";
    var AMPM = "AM";
    var currentHour = now.format("HH");

    if (hourInput < 10) {
        hourInput = "0" + hourInput;
    }
    else if (hourInput > 12) {
        AMPM = "PM";
    }

    if (hourInput == currentHour) {
        classTime = "time time-present";
        classEvent = "present";
    }
    else if (hourInput < currentHour) {
        classTime = "time";
        classEvent = "past";
    }
    else {
        classTime = "time";
        classEvent = "future";
    }

    console.log($("#time-box"));

    $("#time-box").append($(`
        <div class="time-blocks" id="hour-${hourInput}">
            <div class="${classTime}">
                <span>${hourOutput}:00 ${AMPM}</span>    
            </div>
            <div class="event ${classEvent}" id="hourEvent-${hourInput}">
                <span>Click here to schedule</span>
            </div>
            <button class="button" id="hourButton-${hourInput}">
                <i class="far fa-save"></i>
            </div>
        </div>
    `));
}

function loopBlocks() {

    var hourOutput = 0;

    for (var hour = 6; hour <= 24; hour++) {

        if (hour > 12) {
            hourOutput = hour - 12;
            makeBlock(hour, hourOutput);
        }
        else if (hour == 0) {
            hourOutput = 12;
            makeBlock(hour, hourOutput);
        } 
        else {
            hourOutput = hour;
            makeBlock(hour, hourOutput);
        }

    }
}

//Script execution
$("#current-date").text(now.format("dddd, MMM Do YYYY"));

loopBlocks();

//makeBlock(12, 24);

//loopBlocks();