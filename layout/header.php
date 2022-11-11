<?php
include('script_php/db.php');
?>

<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link rel="stylesheet" href="style/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">



<nav class="navbar navbar-light  px-5 pt-3" style="background-color: rgb(19, 19, 60, 0.6);">
    <a href="index.php" class="btn btn-secondary">Главная</a>
    <button type="button" class="btn btn-secondary">Наука</button>
    <button type="button" class="btn btn-secondary">Информация</button>
    <button type="button" class="btn btn-secondary">Дистанционное обучение</button>
    <input type="hidden">
    <?php
    if (isset($_COOKIE['admin'])) {
        echo '
        <button type="button" class="btn btn-secondary" id="admin_kab">Личный кабинет</button>
        <button type="button"class="btn btn-primary auth_button" id="auth_exit">Выход</button>';
    } else if (isset($_COOKIE['prepod'])) {
        echo'<button type="button" class="btn btn-secondary" id="prepod_kab">Личный кабинет</button>
        <button type="button"class="btn btn-primary auth_button" id="auth_exit">Выход</button>';
    } else {
        echo ' <button type="button" class="btn btn-primary auth_button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="auth_btn"style="block">
            Авторизация
        </button>';
    } ?>

    <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Авторизация</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column justify-content-center w-50 p-0">
                        <h6>Логин</h6>
                        <input type="text" id="auth_login" placeholder="Введите свой логин:">
                    </div>

                    <div class="d-flex flex-column justify-content-center w-50 pb-0">
                        <h6>Пароль</h6>
                        <input type="password" id="auth_pass" placeholder="Введите свой пароль:">
                    </div>

                    <div class="d-flex flex-column justify-content-start w-50 p-0">
                        <h6>Раскрыть свой пароль</h6>
                        <input style="width:1em;" type="checkbox" id="check_password" placeholder="Раскрыть свой пароль">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" id="auth_button">Авторизоваться</button>
                </div>
            </div>
        </div>
    </div>

</nav>
<script src="js/auth_script.js"></script>
<script src="js/prepod_script.js"></script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js""></script>
<script src=" https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
