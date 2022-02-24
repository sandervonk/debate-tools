$(".nav-bar-item").click((e) => {
    $("#nav-bar, #nav-page-carousel").attr("class", "active-" + e.target.id)
})
$(".footer-segment").click((e) => {
    $("footer, #page-container").attr("class", "active-" + e.target.id)
})