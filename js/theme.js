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
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        $("select#themes").val("Classic Light");
    } else {
        $("select#themes").val("Classic Dark")
    }
    if (Object.keys(themeJSON).includes(localStorage["theme-option"])) {
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
    localStorage["theme-option"] = $("select#themes").val()
    $(document.body).attr("style", themeJSON[$("select#themes").val()])

    if (Object.keys(themeJSON).includes(localStorage["theme-option"])) {
        let systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "Light" : "Dark";
        if (!localStorage["theme-option"].includes(systemTheme)) {
            $("#theme-auto").addClass("disabled")
        } else {
            $("#theme-auto").removeClass("disabled")
        }
    }
})
$("#theme-auto").click(function () {
    $("#theme-auto").removeClass("disabled")

    if (Object.keys(themeJSON).includes(localStorage["theme-option"])) {
        let systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "Light" : "Dark";
        let altTheme = localStorage["theme-option"].replace("Light", systemTheme).replace("Dark", systemTheme);
        $("select#themes").val(altTheme)
        localStorage["theme-option"] = $("select#themes").val()
        $(document.body).attr("style", themeJSON[$("select#themes").val()])
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        $("select#themes").val("Classic Light");
    } else {
        $("select#themes").val("Classic Dark")
    }
})