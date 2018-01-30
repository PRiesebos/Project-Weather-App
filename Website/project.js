//nog niet in gebruik kan vervangen worden door htmlspecialchars
function validate() {
    var email = $("#email").val();
    var pass = $("#password").val();

    var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var password_regex1 = /([a-z].*[A-Z])|([A-Z].*[a-z])([0-9])+([!,%,&,@,#,$,^,*,?,_,~])/;
    var password_regex2 = /([0-9])/;
    var password_regex3 = /([!,%,&,@,#,$,^,*,?,_,~])/;

    if (email_regex.test(email) === false) {
        window.alert("Please Enter Correct Email");
        return false;
    } else if (pass.length < 8 || password_regex1.test(pass) === false || password_regex2.test(pass) === false || password_regex3.test(pass) === false) {
        window.alert("Please Enter Strong Password");
        return false;
    } else {
        return true;
    }
}

function rememberUsername() {
    if ((sessionStorage.getItem("username") !== "") && (sessionStorage.getItem("username") !== null)) {
        document.getElementById("myCheckbox").checked = true;
        if (sessionStorage.getItem("checkbox") == "checked") {
            document.forms.myForm.email.value = sessionStorage.getItem("username");
        } else {
            document.forms.myForm.email.value = sessionStorage.getItem("usernamemenu");
        }
    } else {
        document.getElementById("myCheckbox").checked = false;
        document.getElementById("email").focus();
    }
    if ((document.getElementById("myCheckbox").checked === true) && (document.forms.myForm.email.value !== "")) {
        document.getElementById("password").focus();
    }
}

function checkboxChanged() {
    if (document.getElementById("myCheckbox").checked === false) {
        sessionStorage.setItem("username", "");
        if (document.forms.myForm.email.value !== "") {
            document.getElementById("email").focus();
        }
    } else if (document.forms.myForm.email.value !== "") {
        var y = document.forms.myForm.email.value;
        sessionStorage.setItem("username", y);
    }
}

function setUsername() {
    var x = document.forms.myForm.email.value;
    sessionStorage.setItem("usernamemenu", x);
    if (sessionStorage.getItem("username") == sessionStorage.getItem("usernamemenu")) {
        sessionStorage.setItem("checkbox", "checked");
    } else {
        sessionStorage.setItem("username", sessionStorage.getItem("usernamemenu"));
        sessionStorage.setItem("checkbox", "unchecked");
    }
}

//werkt random niet meet met apache
function retrieveUsername() {
    document.getElementById("usernamejs").innerHTML = sessionStorage.getItem("username");
}

//Could be replaced by css (@media)
function mobileOptimizer() {
    if ($(window).width() <= 1000) {
        document.getElementById("mapdiv").style.width = "100%";
        document.getElementById("mapdiv").style.height = "80vh";
        document.getElementById("body-container").style.margin = "0px 4px 0px 0px";
        document.getElementById("mapinfo").style.display = "none";
        document.getElementById("usernamejs").style.display = "inline-block";
        if (($(window).width() <= 700)) {
            document.getElementById("usernamejs").style.display = "none";
            document.getElementById("switchjs").style.witdh = "72px";
        }
    } else if ($(window).width() <= 1200) {
        document.getElementById("usernamejs").style.display = "inline-block";
    } else {
        document.getElementById("mapdiv").style.width = "78vw";
        document.getElementById("mapdiv").style.height = "82vh";
        document.getElementById("body-container").style.margin = "0px 0px 0px 0px";
        document.getElementById("mapinfo").style.display = "inline-block";
        document.getElementById("usernamejs").style.display = "inline-block";
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

//function for toggle switch Temperature/wind
function mapChange() {
    if ((sessionStorage.getItem("mapType") == "Temp") && (document.getElementById("myCheck").value == "unchecked")) {
        sessionStorage.setItem("mapType", "Wind");
        sessionStorage.setItem("myCheckState", "checked");
        var myVar = "checked";

        $.ajax({
            url: "index.php",
            type: "POST",
            data: { "myData": myVar }
        });
        location.reload();
    } else if ((sessionStorage.getItem("mapType") === null) || (sessionStorage.getItem("mapType") == "Wind")) {
        sessionStorage.setItem("mapType", "Temp");
        sessionStorage.setItem("myCheckState", "unchecked");
        location.reload();
    }
}

//google maps

function initMap() {
    if (sessionStorage.getItem("mapType") == "Temp") {
        var uni = { lat: -6.3627638, lng: 106.8248595 };
        var centerindi = { lat: 1.75292, lng: 107.358398 };
        var map = new google.maps.Map(document.getElementById('mapdiv'), {
            zoom: 5,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'greedy',
            zoomControl: false,
            draggable: true,
            keyboardShortcuts: false,
            center: centerindi,
            mapTypeId: 'hybrid'
        });
        map.setOptions({ minZoom: 5, maxZoom: 5 });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Universitas Indonesia</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Universitas Indonesia</b>, Temp map <b>Ayers Rock</b></p>' +
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

        google.maps.event.addDomListener(document.getElementById('mapdiv'), 'click', function() {
            //infowindow.close();
            //var mapinfo = document.getElementById('mapinfo');
            //mapinfo.removeChild(mapinfo.childNodes[0]);
        });
    } else if (sessionStorage.getItem("mapType") == "Wind") {
        var uni2 = { lat: -6.3627638, lng: 106.8248595 };
        var centerindi2 = { lat: 1.75292, lng: 107.358398 };
        var map2 = new google.maps.Map(document.getElementById('mapdiv'), {
            zoom: 5,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'greedy',
            zoomControl: false,
            draggable: true,
            keyboardShortcuts: false,
            center: centerindi2,
            mapTypeId: 'hybrid'
        });
        map2.setOptions({ minZoom: 5, maxZoom: 5 });
        var contentString2 = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Universitas Indonesia</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Universitas Indonesia</b>, Wind map</p>' +
            '</div>' +
            '</div>';
        var infowindow2 = new google.maps.InfoWindow({
            content: contentString2
        });
        var marker2 = new google.maps.Marker({
            position: uni2,
            map: map2,
            title: 'Universitas Indonesia'
        });
        marker2.addListener('click', function() {
            infowindow.open(map2, marker2);
            //openExtraInfo2();
        });

        google.maps.event.addDomListener(document.getElementById('mapdiv'), 'click', function() {
            //infowindow.close();
            //var mapinfo = document.getElementById('mapinfo');
            //mapinfo.removeChild(mapinfo.childNodes[0]);
        });
    }
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

//login function with php

function do_login() {
    var email = $("#email").val();
    var pass = $("#password").val();
    if (email !== "" && pass !== "") {
        $.ajax({
            type: 'post',
            url: 'do_login.php',
            data: {
                do_login: "do_login",
                email: email,
                password: pass
            },
            success: function(response) {
                if (response == "success") {
                    window.location.href = "index.php";
                } else {
                    window.alert("Username or password is incorrect!");
                }
            }
        });
    } else {
        window.alert("Username or password is missing!");
    }

    return false;
}