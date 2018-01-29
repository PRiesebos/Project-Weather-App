<!DOCTYPE html>

<?php
session_start();
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.min.js"></script>
    <script src="project.js"></script>
    <link rel="stylesheet" href="project.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,700|Roboto:300,400,500,700" rel="stylesheet">
    <title>Weather Graphs</title>
</head>

<body>
    <script type="text/javascript">
        window.onload = function() {document.getElementById("usernamejs").innerHTML = sessionStorage.getItem("usernamemenu")};
    </script>
    <div class="wrapper-home">
        <div class="homepage">
            <div id="header">
                <div id="head">
                </div>
                <div id="nav">
                    <div id="cssmenu">
                        <ul id="menu">
                            <li><a href='index.php'>Home</a></li>
                            <li class="active"><a href="graphs.php">Graphs</a></li>
                            <form class="logoutbutton" method='post'>
                                <input type='submit' name='logout' value='logout'>
                            </form>
                            <li class="toggle-switch"><a href="#">Toggle</a></li>
                            <li id="usernamejs">.<a href="#"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="body">
                <div id="chartCanvas">
                    <canvas id="myChart" width="400" height="400"></canvas>
                    <script>
                    var ctx = document.getElementById("myChart").getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                    </script>
                </div>
                <div class="footer">
                    <div class="container-footer">
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
    </div>
</body>

</html>