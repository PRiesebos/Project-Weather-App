<!DOCTYPE html>

<?php
session_start();
error_reporting(0);
if(isset($_POST['logout']) || (!isset($_SESSION['email'])))
{
 unset($_SESSION['email']);
    if(!isset($_SESSION['email'])){
    header("Location:loginpage.php");
    }
}
?>

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="project.js"></script>
    <link rel="stylesheet" href="project.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,700|Roboto:300,400,500,700" rel="stylesheet">
    <title>Weather Information</title>
</head>

<body>
    <div class="wrapper-home">
        <div class="homepage">
            <div id="header">
                <div id="head">
                </div>
                <div id="nav">
                    <div id="cssmenu">
                        <ul id="menu">
                            <li class="active"><a href='index.php'>Home</a></li>
                            <li id="graphs"><a href="graphs.php">Graphs</a></li>
                            <script type="text/javascript">
                                window.onload = mobileOptimizer;
                                window.onload = function() {document.getElementById("usernamejs").innerHTML = sessionStorage.getItem("usernamemenu")};
                            </script>
                            <form class="logoutbutton" method='post'>
                                <input type='submit' name='logout' value='Logout'>
                            </form>
                            <label class="switch" id="switchjs">
                                <input type="checkbox" id="myCheck" onclick="setTimeout(mapChange,500)" value="unchecked" 
                                <?php 
                                if($_GET['isChecked'] == 'true'){
                                    echo "checked";
                                    }
                                elseif($_GET['isChecked'] == 'false'){
                                    echo "";
                                    }
                                ?> >
                                    <div class="slider" id="sliderjs">
                                    </div>
                            </label>
                            <li id="usernamejs"><a href="#"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="body">
                <div id="body-container">
                    <div id="mapdiv">
                        <div id="map"></div>
                        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3tabjX0Ngx8qJgK1gq1f2VrYKp-xFZRI&callback=initMap">
                        </script>
                    </div>
                    <div id="mapinfo">
                    </div>
                    <div id="hiddenData">
                        <?php $lines = file('data.csv'); $data = array();
                            foreach($lines as $line) {
                            if (empty($line)) 
                                continue;
                                $lineArr = explode(',', $line);
                                foreach($lineArr as $value){
                                echo $value;}
                            } ?>
                    </div>
                    <div id="hiddenDataStations">
                    <?php
                    function get_string_between($string, $start, $end){
                        $string = '' . $string;
                        $ini = strpos($string, $start);
                        if ($ini == 0) return '';
                        $ini += strlen($start);
                        $len = strpos($string, $end, $ini) - $ini;
                        return substr($string, $ini, $len);
                        }

                        $lines = file("stations.txt");;
                        foreach ($lines as $value) {
                            if(trim(str_replace("\n","",$value)) != ""){
                                echo $value;   
                            }
                        } ?>
                    </div>
                </div>
                <div class="footer">
                    <div id="bar"></div>
                    <div id="inner">
                        <div id="logo">
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Universitas_Indonesia_logo.svg/1280px-Universitas_Indonesia_logo.svg.png" alt="logo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>