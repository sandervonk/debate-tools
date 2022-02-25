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
            timerData.start()
        } catch {
            console.log("no more rounds!")
        }
    } else {
        timerData.start($(".nav-page.active")[0], parseInt($(".nav-page.active .round.active .round-time").text()) * 60000);

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