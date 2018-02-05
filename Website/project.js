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
        location.reload();
    } else if ((sessionStorage.getItem("mapType") === null) || (sessionStorage.getItem("mapType") == "Wind")) {
        sessionStorage.setItem("mapType", "Temp");
        var myVar = "";
        location.reload();
    }
}

//google maps
var infowindow;

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function initMap() {
    
    if ((sessionStorage.getItem("mapType") == "Temp") || (sessionStorage.getItem("mapType") === null)) {
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

        var test = document.getElementById("hiddenDataStations").innerHTML;
        var arrText = test.split('\n');
        var StationArray = [];
        kek = test.substring(2, 20);
        for (i = 2; i < arrText.length; i++) {
            var EndString = "";
            var Line = arrText[i];
            var Stationnum = Line.substring(2, 7);
            EndString = EndString.concat(Stationnum);
            EndString = EndString.concat(",");
            var Stationname = Line.substring(Line.lastIndexOf("[") + 1, Line.lastIndexOf("]"));
            EndString = EndString.concat(Stationname);

            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");
            EndString = EndString.replace("\"", "");

            var WordArray = EndString.split(",");
            StationArray.push(WordArray);

            var marker, i;
            
            for (i = 0; i < StationArray.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(StationArray[i][3]), parseFloat(StationArray[i][4])),
                    icon: 'stat.png',
                    map: map
                    
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        var StatInfo = "";

                        StatInfo = StatInfo.concat("Stationnummer: ", StationArray[i][0], " Place", StationArray[i][1]);
                        infowindow.setContent(StatInfo);
                        infowindow.open(map, marker);

                        post('http://localhost/ProjectWeather/query.php',{stn: "" + StationArray[i][0]}, 'get');
                        

                    };
                })(marker, i));
            }
        }

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
            infowindow2.open(map2, marker2);
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
    if ((document.getElementById('mapinfo').childElementCount <= 0) && ($("#siteNotice").length !== 0)) {
        var para = document.createElement("P");
        var t = document.createTextNode(document.getElementById("hiddenData").innerHTML);
        para.appendChild(t);
        document.getElementById('mapinfo').appendChild(para);
    } else if (($("#siteNotice").length > 0) || (document.getElementById('mapinfo').childElementCount >= 0)) {
        $("#mapinfo").empty();
        /*        if (infowindow) {
                    infowindow.close();
                }*/
    }
}

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