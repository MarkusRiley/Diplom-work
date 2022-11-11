<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <!-- Bootstrap 5 CDN Link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <link rel="stylesheet" href="style/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- //Summernote CSS - CDN Link -->
    <title>Document</title>
</head>

<body>
    <div class="container">
        <div class="main_container d-flex flex-column">
            <div class="prepod_header">
                <div class="prepod_name fs-3 text-light">
                    <?php
                    include('script_php/db.php');
                    $id = $_COOKIE['prepod'];
                    $qwer = $db->prepare(" SELECT * FROM `mains` WHERE `id_cookie`= ?");
                    $qwer->execute([$id]);
                    $array = $qwer->fetch();
                    echo $array[5], " ", $array[6], " ", $array[7], " ", ":", " ", $array[8];
                    ?>
                </div>
            </div>
            <div class="prepod_midder d-flex flex-row">
                <!-- left-midder -->
                <div class="left_prepodMidder w-25" style="background-color: rgb(19, 19, 60, 0.8);">
                    <div class="prepod_menuButton d-flex flex-column justify-content">
                        <button type=" button" class="btn bg-opacity-0 text-light border-info" id="create_test">Создать тест</button>
                        <button type="button" class="btn bg-opacity-0 text-light border-info">button</button>
                    </div>
                </div>
                <!-- right-midder -->
                <div class="right_prepodMidder border border-info d-flex flex-column justify-content-center align-items-center " style="width:100%;">
                </div>
            </div>
            <div class="footer"></div>
        </div>
    </div>

    </div>
    </div>
    </div>

</body>
<script src="js/prepod_script.js"></script>