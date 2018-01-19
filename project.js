function validateForm() {
    var x = document.forms["myForm"]["username"].value;
    var x2 = document.forms["myForm"]["password"].value;
    if (x != "" & x2 != "") {
        alert("Welcome, " + x + "!")
        return true;
    } else {
        alert("Username or password is incorrect.");
        return false;
    }
}

function loggedOut() {
    alert("You have been logged out.")
}

var rememberedUserName = "";

function rememberUsername() {
    if (myCheckbox.checked) {
        rememberedUserName = document.forms["myForm"]["username"].value;
    }
}

function checkIfRememberedUsernameExists() {
  if (rememberedUserName != "") {
    document.forms["myForm"]["username"].value = rememberedUserName;
  }
}

var $el = $("#login");
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
doResize(null, starterData);