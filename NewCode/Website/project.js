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

//Function for toggle switch Temperature/wind.

function mapChange() {
    if ((sessionStorage.getItem("mapType") == "Wind") && (document.getElementById("myCheck").value == "unchecked")) {
        sessionStorage.setItem("mapType", "Temp");
        post('index.php', { isChecked: 'false' }, 'get');
    } else if ((sessionStorage.getItem("mapType") === null) || (sessionStorage.getItem("mapType") == "Temp")) {
        sessionStorage.setItem("mapType", "Wind");
        post('index.php', { isChecked: 'true' }, 'get');
    }
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
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

//google maps
var infowindow;

function initMap() {
    if ((sessionStorage.getItem("mapType") == "Temp") || (sessionStorage.getItem("mapType") === null)) {
        var centerindi = { lat: 6.107784, lng: 119.003906 };
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
        map.setOptions({ minZoom: 4, maxZoom: 9 });
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
		
		/** TODO: MOVE DATA FROM HIDDEN DIV TO EXTERNAL FILE. */
        var test = document.getElementById("hiddenDataStations").innerHTML;
        var arrText = test.split('\n');
        var StationArray = [];
        kek = test.substring(2, 20);
        for (i = 2; i < arrText.length; i++) {
            var EndString = "";
            var Line = arrText[i];
            var Stationnum = Line.substring(2, 8);
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
                        StatInfo = StatInfo.concat("Station ID: ", StationArray[i][0]," Place: ",StationArray[i][1]);
                        infowindow.setContent(StatInfo);
                        infowindow.open(map, marker);
						openExtraInfo(StationArray[i][0]);
                };
                })(marker, i));
            }
        }

    } else if (sessionStorage.getItem("mapType") == "Wind") {
        var centerindi2 = { lat: 6.107784, lng: 119.003906 };
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
map2.setOptions({ minZoom: 4, maxZoom: 9 });
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
        var test2 = document.getElementById("hiddenDataStations").innerHTML;
        var arrText2 = test2.split('\n');
        var StationArray2 = [];
        kek2 = test2.substring(2, 20);
        for (i = 2; i < arrText2.length; i++) {
            var EndString2 = "";
            var Line2 = arrText2[i];
            var Stationnum2 = Line2.substring(2, 8);
            EndString2 = EndString2.concat(Stationnum2);
            EndString2 = EndString2.concat(",");
            var Stationname2 = Line2.substring(Line2.lastIndexOf("[") + 1, Line2.lastIndexOf("]"));
            EndString2 = EndString2.concat(Stationname2);

            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");
            EndString2 = EndString2.replace("\"", "");

            var WordArray2 = EndString2.split(",");
            StationArray2.push(WordArray2);

            var marker2, i;

            for (i = 0; i < StationArray2.length; i++) {
                marker2 = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(StationArray2[i][3]), parseFloat(StationArray2[i][4])),
                    icon: 'stat.png',
                    map: map2

                });

                google.maps.event.addListener(marker2, 'click', (function(marker2, i) {
                    return function() {
                        var StatInfo2 = "";

                        StatInfo2 = StatInfo2.concat("Stationnummer: ", StationArray2[i][0], " Place", StationArray2[i][1]);
                        infowindow2.setContent(StatInfo2);
                        infowindow2.open(map, marker2);
                    };
                })(marker2, i));
            }
        }
    }
}

function openExtraInfo(id) {
	var url = "http://127.0.0.1/study/2.2/legacywebsite/getdata.php?stationID=" + id;
	//url.concat(id);
	//alert(id);
	//alert(url);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;
	document.getElementById('mapinfo').innerHTML = fileContent;
	$("mapinfo").load(url);
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