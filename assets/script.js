var now = luxon.DateTime.now();
var currentDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        event: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        event: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        event: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        event: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        event: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        event: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        event: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        event: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        event: ""
    },
    
]

// sets today's date in header
function getHeaderDate() {
    var currentHeaderDate = luxon.DateTime.now().toFormat("cccc, LLLL dd");
    $("#currentDay").text(currentHeaderDate);
}

getHeaderDate();

// save events as a string in local storage
function saveEvents() {
    localStorage.setItem("currentDay", JSON.stringify(currentDay));
}

// sets events from the existing local storage
function displayEvents() {
    currentDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.event);
    })
}

// gets events from the existing local storage
function localEvents() {
    var storedDay = JSON.parse(localStorage.getItem("currentDay"));

    if (storedDay) {
        currentDay = storedDay;
    }

    saveEvents();
    displayEvents();
}

currentDay.forEach(function(thisHour) {
    // creates timeblocks
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates hour field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // adds time block formatting
    var hourSpan = $("<div>")
    var spanText = $("<textarea>");
    hourSpan.append(spanText);
    spanText.attr("id", thisHour.id);
    if (thisHour.time < now.toFormat("HH")) {
        hourSpan.attr ({
            "class": "col-md-9 description p-0 past", 
        })
    } else if (thisHour.time === now.toFormat("HH")) {
        hourSpan.attr({
            "class": "col-md-9 description p-0 present"
        })
    } else if (thisHour.time > now.toFormat("HH")) {
        hourSpan.attr({
            "class": "col-md-9 description p-0 future"
        })
    }

    // creates save button
    var saveButton = $("<i class='fas fa-save'></i>")
    var saveSpan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    saveSpan.append(saveButton);
    hourRow.append(hourField, hourSpan, saveSpan);
})

localEvents();

// locally saves user-created event in the row they clicked
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children().attr("id");
    currentDay[saveIndex].event = $(this).siblings(".description").children().val();
    console.log(saveIndex);
    saveEvents();
    displayEvents();
})