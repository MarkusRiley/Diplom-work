<?php
include('db.php');

$action=$_POST['action'];

if($action=="save_prepod"){
    save_prepod();
}else if ($action=="save_content"){
$content=$_POST['content'];

echo $content;
$query="UPDATE `content` SET `content`= (?) WHERE `id_content`=1";
$stmt=$db->prepare($query);
$stmt->execute([$content]);
}



function save_prepod($db){
    $login=$_POST['login'];
    $pass=$_POST['pass'];
    $name=$_POST['name'];
    $surname=$_POST['surname'];
    $patronymic=$_POST['patronymic'];
    $lesson=$_POST['lesson'];
    $role="prepod";
    $password_hash = password_hash($pass, PASSWORD_DEFAULT);
    $unic_id=$unic_id = time() + (60 * 60 * 24 * 30 / 60 * 20);

    $query="INSERT INTO `mains`( `id_cookie`,`login`, `password`, `role`, `prepod_name`, `prepod_surname`, `prepod_patron`, `lesson`) VALUES (?,?,?,?,?,?,?,?)";
    $stmt=$db->prepare($query);
    $stmt->execute([$unic_id,$login,$password_hash,$role,$name,$surname,$patronymic,$lesson]);
}
?>
