$(".nav-bar-item").click((e) => {
    $("#nav-bar, #nav-page-carousel").attr("class", "active-" + e.target.id)
    $(".nav-page").removeClass("active")
    $("#nav-page-carousel > #" + e.target.id).addClass("active")
})
$(".footer-segment").click((e) => {
    $("footer, #page-container").attr("class", "active-" + e.target.id)
})

$(".round").click((e) => {
    if (e.target.offsetTop != $(".nav-page.active .round.active")[0].offsetTop) {
        if (e.target.offsetTop < $(".nav-page.active .round.active")[0].offsetTop) {
            $(e.target.parentElement.parentElement.getElementsByClassName("timer-highlight")).css({
                "top": e.target.offsetTop - e.target.parentElement.parentElement.offsetTop + 15
            })
            console.log("true")
        } else {
            $(e.target.parentElement.parentElement.getElementsByClassName("timer-highlight")).css({
                "top": e.target.offsetTop - e.target.parentElement.parentElement.offsetTop + 15 - 56
            })
        }
    }
    $(".nav-page.active .round.active").removeClass("active")
    $(e.target).addClass("active")
})