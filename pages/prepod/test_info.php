<!doctype html>
<html lang="en">
<?php
include('../../script_php/prepod_script.php');

?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<link rel="stylesheet" href="../../style/style.css">
<!-- Bootstrap 5 CDN Link -->
<link rel="stylesheet" href="style/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"-->
<!--      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">-->
<body>

<div class="container">
    <div class="main_container d-flex flex-column">
        <div class="prepod_header">
            <div class="prepod_name fs-3 text-light">
                <?
                include('../../script_php/db.php');
                $id = $_COOKIE['prepod'];
                $qwer = $db->prepare(" SELECT * FROM `mains` WHERE `id_cookie`= ?");
                $qwer->execute([$id]);
                $array = $qwer->fetch();
                echo $array[5], " ", $array[6], " ", $array[7], " ", ":", " ", $array[8];
                echo '<input type="hidden" id="prepod_id" value="' . $array[1] . '">'
                ?>
            </div>
        </div>
        <div class="prepod_midder d-flex flex-row">
            <!-- left-midder -->
            <div class="left_prepodMidder w-25 h-auto" style="background-color: rgb(19, 19, 60, 0.8);height:auto;">
                <div class="prepod_menuButton d-flex flex-column justify-content">
                    <button type="button" class="btn bg-opacity-0 text-light border-info" id="back_toMain">Главная
                        страница
                    </button>
                    <button type="button" class="btn bg-opacity-0 text-light border-info" id="create_test">Создать
                        тест
                    </button>
                    <button type="button" class="btn bg-opacity-0 text-light border-info" id="test_list">Список тестов
                    </button>
                </div>
            </div>
            <!-- right-midder -->
            <div class="right_prepodMidder border border-info d-flex flex-column justify-content-center align-items-center " style="width:100%; height:auto;">
                <!-- Button trigger modal -->

                <div class="test_menu w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                    <?php
                    $work_id = $_GET['test_id'];
                    test_nameView($work_id, $db);
                    ?>
                    <div class="d-flex flex-column">
                        <?php question_view($work_id, $db);
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</div>

</body>
<script src="../../js/prepod_script.js"></script>
</html>
