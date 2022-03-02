var themeJSON = {};

function setupThemes(themes) {
    console.log(themes);
    $("select#themes").html("")
    for (themeName of Object.keys(themes)) {
        console.log(themeName)

        let themeCSS = "";
        for (themeColor of Object.keys(themes[themeName])) {
            themeCSS += `--m3--${themeColor}: ${themes[themeName][themeColor]};\n`
        }
        themeJSON[themeName] = themeCSS;
        $("select#themes").append(`<option class="theme-option">${themeName}</option>`)
    }
    if (window.matchMedia("(prefers-color-scheme: light)")) {
        $("select#themes").val("Classic Light");
    } else {
        $("select#themes").val("Classic Dark")
    }
    if (Object.keys(themeJSON).includes(localStorage["theme-option"])) {
        $("#theme-auto").addClass("disabled")
        $("select#themes").val(localStorage["theme-option"])
        $(document.body).attr("style", themeJSON[$("select#themes").val()])
    }
}

$.ajax({
    url: "./js/src/themes.json",
    dataType: "json",
    success: (r) => {
        themeJSON = r;
        setupThemes(r)
    },
    error: function (err) {
        console.error("error: could not load themes.json :(");
        console.log(err);
    },
});
$("select#themes").on('change', function (e) {
    console.log("change")
    $("#theme-auto").addClass("disabled")
    localStorage["theme-option"] = $("select#themes").val()
    $(document.body).attr("style", themeJSON[$("select#themes").val()])
})
$("#theme-auto").click(function () {
    $("#theme-auto").removeClass("disabled")
    if (window.matchMedia("(prefers-color-scheme: light)")) {
        $("select#themes").val("Classic Light");
    } else {
        $("select#themes").val("Classic Dark")
    }
    if (Object.keys(themeJSON).includes(localStorage["theme-option"])) {
        let altTheme = "";
        $("select#themes").val(localStorage["theme-option"])
        $(document.body).attr("style", themeJSON[$("select#themes").val()])
    }
})