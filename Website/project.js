"use strict";

function validateForm() {
    var x = document.forms.myForm.username.value;
    var x2 = document.forms.myForm.password.value;
    if (x !== "" & x2 !== "") {
        sessionStorage.setItem("usernamemenu", x);
        //window.alert("Welcome, " + x + "!")
        return true;
    } else {
        window.alert("Username or password is incorrect.");
        return false;
    }
}

function rememberUsername() {
    if ((sessionStorage.getItem("username") !== "") && (sessionStorage.getItem("username") !== null)) {
        document.forms.myForm.username.value = sessionStorage.getItem("username");
        document.getElementById("myCheckbox").checked = true;
    } else {
        document.getElementById("myCheckbox").checked = false;
        document.getElementById("name").focus();
    }
    if ((document.getElementById("myCheckbox").checked === true) && (document.forms.myForm.username.value !== "")) {
        document.getElementById("password").focus();
    }
}

function checkboxChanged() {
    if (document.getElementById("myCheckbox").checked === false) {
        sessionStorage.setItem("username", "");
        if (document.forms.myForm.username.value !== "") {
            document.getElementById("name").focus();
        }
    } else if (document.forms.myForm.username.value !== "") {
        var y = document.forms.myForm.username.value;
        sessionStorage.setItem("username", y);
    }
}

function loggedOut() {
    sessionStorage.setItem("usernamemenu", "");
    //window.alert("You have been logged out.")
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

//google maps

function initMap() {
    var uni = { lat: -6.3627638, lng: 106.8248595 };
    var centerindi = { lat: 1.75292, lng: 107.358398 };
    var map = new google.maps.Map(document.getElementById('mapdiv'), {
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        draggable: false,
        keyboardShortcuts: false,
        center: centerindi,
        mapTypeId: 'hybrid'
    });
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Universitas Indonesia</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Universitas Indonesia</b>, test text <b>Ayers Rock</b></p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: uni,
        map: map,
        title: 'Universitas Indonesia'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
        openExtraInfo();
    });

    //google.maps.event.addDomListener(document.getElementById('mapdiv'), 'click', function() {
    //infowindow.close();
    //var mapinfo = document.getElementById('mapinfo');
    //mapinfo.removeChild(mapinfo.childNodes[0]);
    //});
}

function openExtraInfo() {
    if (document.getElementById('mapinfo').childElementCount <= 0) {
        var para = document.createElement("P");
        var t = document.createTextNode("On this location additional info for the weather stations at the current marker will be displayed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        para.appendChild(t);
        document.getElementById('mapinfo').appendChild(para);
    }
}

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