<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <!-- Bootstrap 5 CDN Link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Summernote CSS - CDN Link -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <!-- //Summernote CSS - CDN Link -->
    <title>Document</title>
</head>

<body>
    <div class="container">
        <div class="main_container">
            <div class="main_leftContainer">
                <?php
                include('layout/logo.php'); ?>

                <div class="main_leftMenu">
                </div>

            </div>

            <div class="main_rightContainer">

                <?php
                include('layout/header.php');
                ?>

                <div class="main_midder">

                    <div id="main_midderBtn" class="main_midderBtn">
                        <button type="button" class="header_menuBtn" id="add_newPrepod">Добавить преподователя</button>
                        <button type="button" class="header_menuBtn" id="correct_page">Pедактировать главную страницу</button>
                    </div>

                    <div class="prepod_list " id="prepod_list">
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap">Введите логин преподователя:</h6>
                            <input type="text" id="prepod_login">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap">Введите пароль преподователя:</h6>
                            <input type="text" id="prepod_pass">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap ">Введите имя преподователя:</h6>
                            <input type="text" id="prepod_name">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap">Введите фамилию преподователя:</h6>
                            <input type="text" id="prepod_surname">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap">Введите отчество преподавателя:</h6>
                            <input type="text" id="prepod_patronymic">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <h6 class="badge text-wrap">Введите навзвание предмета, который ведет преподаватель</h6>
                            <input type="text" id="prepod_lesson">
                        </div>
                        <div style="display: flex; flex-direction: row; gap:1em;">
                            <button class="btn btn-primary" id="save_prepod" style="background-color:rgba(7, 87, 126, 0.8);"> Сохранить</button>
                            <button class="btn btn-secondary" id="back_prepod"> Вернуться</button>
                        </div>
                    </div>

                    <div class="div_textArea" id="div_textArea"><textarea name="description" id="your_summernote" class="form-control m-auto" rows="10"></textarea>
                        <button type="button" class="btn btn-primary" id="save_textArea">Сохранить</button>
                        <button type="button" class="btn btn-secondary" id="back_content">Вернуться</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>

</body>
<script src="js/admin_script.js"></script>
<!-- Summernote JS - CDN Link -->
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
<script>
    $(document).ready(function() {
        $("#your_summernote").summernote();
        $('.dropdown-toggle').dropdown();
    });
</script>

</html>