<?php
$num=0;
$qwer = $db->prepare(" SELECT * FROM `content` WHERE `id_content`!= ?");
$qwer->execute([$num]);
$array = $qwer->fetch();
echo $array[1];
?>