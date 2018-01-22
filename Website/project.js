"use strict";
function validateForm() {
    var x = document.forms.myForm.username.value;
    var x2 = document.forms.myForm.password.value;
    if (x !== "" & x2 !== "") {
        sessionStorage.setItem("usernamemenu", x);
        //alert("Welcome, " + x + "!")
        return true;
    } else {
        window.alert("Username or password is incorrect.");
        return false;
    }
}

function rememberUsername() {
    if (sessionStorage.getItem("username") !== "") {
        document.forms.myForm.username.value = sessionStorage.getItem("username");
        document.getElementById("myCheckbox").checked = true;
    } else {
        document.getElementById("myCheckbox").checked = false;
    }
}

function checkboxChanged() {
    if (document.getElementById("myCheckbox").checked === false) {
        sessionStorage.setItem("username", "");
    } else if (document.forms.myForm.username.value !== "") {
        var y = document.forms.myForm.username.value;
        sessionStorage.setItem("username", y);
    }
}

function loggedOut() {
    sessionStorage.setItem("usernamemenu", "");
    //alert("You have been logged out.")
}

function retrieveUsername() {
    document.getElementById("usernamejs").innerHTML = sessionStorage.getItem("usernamemenu");
}

function mobileOptimizer() {
    if ($(window).width() <= 1024) {
        document.getElementById("map").style.width = "96vw";
        document.getElementById("map").style.height = "80vh";
        document.getElementById("mapinfo").style.display = "none";
    } else {
        document.getElementById("map").style.width = "75vw";
        document.getElementById("map").style.height = "82vh";
        document.getElementById("mapinfo").style.display = "inline-block";
    }
}

$(window).resize(function() {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});

$(window).bind('resizeEnd', function() {
    mobileOptimizer();
});

// obsolute code (work in progress)

/*var $el = $("#login");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $("#wrapper-login");

$wrapper.resizable({
    resize: doResize
});

function doResize(event, ui) {

    var scale, origin;

    scale = Math.min(
        ui.size.width / elWidth,
        ui.size.height / elHeight
    );

    $el.css({
        transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
    });

}

var starterData = {
    size: {
        width: $wrapper.width(),
        height: $wrapper.height()
    }
}
doResize(null, starterData);*/