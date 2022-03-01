try {
    const testData = JSON.parse(localStorage["notes-data"])
} catch {
    localStorage["notes-data"] = JSON.stringify([{
        title: "Example Note",
        content: "Content text goes here. Tap to try adding something!"
    }]);
}
for (let noteData of JSON.parse(localStorage["notes-data"])) {
    noteData.title
    noteData.content
    $("#notes-container").append(` <div class="note-container"> <input type="text" class="note-title" placeholder="Title" value="${noteData.title}"></input> <div contenteditable class="note-content" placeholder="Content Text">${noteData.content}</div> <div class="note-actions"> <button class="note-action-edit"> <div id="edit-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-duplicate"> <div id="duplicate-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-save"> <div id="save-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-hide"> <div id="hide-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-delete"> <div id="delete-mask" class="color-mask note-action-icon"></div> </button> </div> </div>`);
}

function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return mins + ':' + pad(secs);
}
var timerData;
$(".nav-bar-item").click((e) => {
    $("#nav-bar, #nav-page-carousel").attr("class", "active-" + e.target.id)
    $(".nav-page").removeClass("active")
    $("#nav-page-carousel > #" + e.target.id).addClass("active")
})
$(".footer-segment").click((e) => {
    $("footer, #page-container").attr("class", "active-" + e.target.id)
})
class timer {


    start(parent, length) {
        this.status = "running";
        this.clear()
        this.parent = parent;
        this.length = length;
        this.startTime = (new Date).getTime();
        this.update()
        this.id = window.setInterval(function () {
            timerData.update()
        }, 500)
    }
    startCurrent() {
        this.start($(".nav-page.active")[0], parseInt($(".nav-page.active .round.active .round-time").text()) * 60000);
    }
    resume() {
        this.startTime = (new Date).getTime() - this.time;
        this.update()
        this.id = window.setInterval(function () {
            timerData.update()
        }, 500)
    }
    clear() {
        this.stop()
        this.status = "";
        this.time = 0;
        $(this.parent).find(".timer-bar").css({
            "width": "0%"
        })
        $(this.parent).find(".timer-timestamp").text("0:00")
    }
    stop() {
        this.status = "stopped";
        window.clearInterval(this.id)
    }
    update() {
        this.status = "running";
        this.time = (new Date).getTime() - this.startTime;
        let width = 100 * this.time / this.length;
        width += "%"
        $(this.parent).find(".timer-bar").css({
            "width": width
        })
        $(this.parent).find(".timer-timestamp").text(msToTime(this.time));
        if (this.time >= this.length) {
            this.stop()
            //clean up to the right value if something overflowed
            $(this.parent).find(".timer-timestamp").text(msToTime(this.length));
            this.status = "next";
            updateTimerContext()
        }
    }

}

var timerData = new timer();
$(".round").click((e) => {
    if (e.target.offsetTop != $(".nav-page.active .round.active")[0].offsetTop) {
        if (e.target.offsetTop < $(".nav-page.active .round.active")[0].offsetTop) {
            $(e.target.parentElement.parentElement.getElementsByClassName("timer-highlight")).css({
                "top": e.target.offsetTop - e.target.parentElement.parentElement.offsetTop + 15
            })
        } else {
            $(e.target.parentElement.parentElement.getElementsByClassName("timer-highlight")).css({
                "top": e.target.offsetTop - e.target.parentElement.parentElement.offsetTop + 15 - 56
            })
        }
    }
    try {
        timerData.clear()
    } catch {
        console.log("could not clear timer")
    }
    $(".nav-page.active .round.active").removeClass("active")
    $(e.target).addClass("active")
    updateTimerContext()
})

function updateTimerContext() {
    if (timerData.status == "running") {
        $(".nav-page.active #timer-reset").text("Reset")
        $(".nav-page.active #timer-pause, #timers-FAB > .FAB-text").text("Stop")
        $("#timers-FAB-image").attr("version", "stop")
    } else if (timerData.status == "stopped") {
        $(".nav-page.active #timer-reset").text("Reset")
        $(".nav-page.active #timer-pause, #timers-FAB > .FAB-text").text("Resume")
        $("#timers-FAB-image").attr("version", "resume")
    } else if (timerData.status == "next") {
        $(".nav-page.active #timer-reset").text("Reset")
        $(".nav-page.active #timer-pause, #timers-FAB > .FAB-text").text("Next")
        $("#timers-FAB-image").attr("version", "next")
    } else {
        $(".nav-page.active #timer-reset").text(" - ")
        $(".nav-page.active #timer-pause, #timers-FAB > .FAB-text").text("Start")
        $("#timers-FAB-image").attr("version", "start")
    }
}
$("#timers-FAB, #timer-pause").click((e) => {
    //timer functionality here
    if (timerData.status == "running") {
        timerData.stop()
    } else if (timerData.status == "stopped") {
        timerData.resume()
    } else if (timerData.status == "next") {
        try {
            $(".nav-page.active .round.active").next()[0].click()
            timerData.startCurrent()
        } catch {
            console.log("no more rounds!")
        }
    } else {
        timerData.startCurrent()

    }
    updateTimerContext()

})

$("#timer-reset").click(function () {
    try {
        timerData.clear()
    } catch {
        console.log("couldn't clear timer")
    }
    updateTimerContext()
})
/*notes*/
const blankNote = ` <div class="note-container"> <input type="text" class="note-title" placeholder="Title" value=""></input> <div contenteditable class="note-content" placeholder="Content Text">Tap to edit </div> <div class="note-actions"> <button class="note-action-edit"> <div id="edit-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-duplicate"> <div id="duplicate-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-save"> <div id="save-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-hide"> <div id="hide-mask" class="color-mask note-action-icon"></div> </button> <div class="button-separator"></div> <button class="note-action-delete"> <div id="delete-mask" class="color-mask note-action-icon"></div> </button> </div> </div>`
/*workaround so it works on dynamically created elements*/
$(document).on('click', ".note-action-delete", (e) => {
    $(e.target).closest(".note-container").remove();
})
$(document).on('click', ".note-action-duplicate", (e) => {
    $(e.target).closest(".note-container").clone().appendTo("#notes-container");
})
$("#notes-FAB").click(function () {
    $("#notes-container").append(blankNote);
})
$(document).on('click', "#edit-mask, .note-container:not(.editing)", (e) => {
    $(".note-container").removeClass("editing");
    $(e.target).closest(".note-container").addClass("editing");
})
/*now save these changes*/
$('#notes-container').on('DOMSubtreeModified', function () {
    let notesArr = [];
    $(".note-container").each((index, element) => {
        let itemContent = {
            title: $(element).children(".note-title").val(),
            content: $(element).children(".note-content").text()
        }
        if (itemContent.title != "" || itemContent.content != "Tap to edit ") {
            notesArr.push(itemContent);
        }

    })
    localStorage["notes-data"] = JSON.stringify(notesArr)
});
$("button#menu").click(function () {
    $("#menu-section").toggleClass("active");
});