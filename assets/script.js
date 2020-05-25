

//sets the current date and time into usable variables with Moment.js
var now = moment(); 
var currentHour = now.format("HH");

//reformats single-digit hour values into double-digits to match Moment's formatting
function formatHour(i) {
    var iD = 0;
    if (i < 10) {
        iD = "0" + i;
    }
    else {
        iD = i;
    }
    return iD;
}

//creates one single hour block with proper formatting
function makeBlock(hourInput, hourOutput) {
    
    //before anything else, fix hourInput's formatting
    hourInput = formatHour(hourInput);

    //checks if a saved value exists in local storage, otherwise sets to default
    var textContent = localStorage.getItem(hourInput) || "Click to schedule";

    //then, init other necessary variables
    var classTime = "";
    var classEvent = "";
    var AMPM = "AM";

    //adjusts if the block represents a PM hour
    if (hourInput >= 12) {
        AMPM = "PM";
    }

    //checks if the hour is past, present, or future and sets class accordingly
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

    //finally, creates and appends the block to the page
    $("#time-box").append($(`
        <div class="time-blocks" id="hour-${hourInput}">
            <div class="${classTime}">
                <span>${hourOutput}:00 ${AMPM}</span>    
            </div>
            <div class="event ${classEvent}" id="hourEvent-${hourInput}" value="${hourInput}">
                <input type="text" class="eventInput" id="eventInput-${hourInput}" name="eventInput-${hourInput}" value="${textContent}"></input>
            </div>
            <button class="button" id="${hourInput}" value="${hourInput}">
                <i class="far fa-save"></i>
            </div>
        </div>
    `));

    if (textContent != "Click to schedule") {
        $(`#eventInput-${hourInput}`).css("color", "#000000");
        $(`#eventInput-${hourInput}`).css("font-style", "normal");
        $(`#eventInput-${hourInput}`).css("font-weight", "bold");
    }
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

$(".event").click(function(target) {
    $(target.target).css("color", "#000000");
    $(target.target).css("font-style", "normal");
    $(target.target).css("font-weight", "bold");
    $(target.target).attr("value", "");        
})

$(".button").click(function() {
    console.log(this.id);
    var idNumber = (this.value);
    var storedEvent = document.querySelector(`#eventInput-${idNumber}`).value;

    console.log(idNumber);
    console.log(storedEvent);

    localStorage.setItem(idNumber, storedEvent);

})

$("#clearButton").click(function() {
    if (confirm("This will delete all entries permanently. Are you sure?")){
        for (var i = 6; i <= 24; i++) {
            $(`#eventInput-${formatHour(i)}`).attr("value", "Click to schedule");
            $(`#eventInput-${formatHour(i)}`).css("color", "#00000069");
            $(`#eventInput-${formatHour(i)}`).css("font-weight", "normal");
            $(`#eventInput-${formatHour(i)}`).css("font-style", "italic");
            localStorage.setItem(formatHour(i), $(`#eventInput-${formatHour(i)}`).attr("value"));
        }
    }
})