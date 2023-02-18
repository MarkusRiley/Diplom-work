<?php
include('db.php');
$action = $_POST['action'];
if ($action == "auth_check") {
    auth_check($db);
} else if ($action == "exit_auth") {
    exit_auth($db);
}

function auth_check($db)
{
    $login = $_POST['login'];
    $password = $_POST['password'];
    $qwer = $db->prepare(" SELECT * FROM `mains` WHERE `login`= ?");
    $qwer->execute([$login]);
    $array = $qwer->fetch();
    $num_rows = $qwer->rowCount();
    $id = $array[0];
    $unic_id =$array[1];
    if ($num_rows == 0) {
        echo "Ошибка, проверьте правильность введенных данных";
    } else {
        if ($array[4] == "admin") {
            setcookie('admin', $unic_id, time() + (60 * 60 * 24 * 30), '/');
            echo 1;
        } else if ($array[4] == "prepod") {
            setcookie('prepod', $unic_id, time() + (60 * 60 * 24 * 30), '/');
            echo 1;
        } else if ($array[4] == "student") {
            setcookie('student', $unic_id, time() + (60 * 60 * 24 * 30), '/');
            echo 1;
        }
    }
}
function exit_auth($db)
{
    include('db.php');
    if (isset($_COOKIE['admin'])) {
        setcookie('admin', $id, time() - (60 * 60 * 24 * 30), '/');
        header("Location:../index.php");
    } else if (isset($_COOKIE['prepod'])) {
        setcookie('prepod', $id, time() - (60 * 60 * 24 * 30), '/');
        header("Location:../index.php");
    } else if (isset($_COOKIE['student'])) {
        setcookie('student', $id, time() - (60 * 60 * 24 * 30), '/');
        header("Location:../index.php");
    }
}
