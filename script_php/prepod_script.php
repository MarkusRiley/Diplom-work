<?php
include('db.php');
$action = $_POST['action'];
$_SESSION['action'] = $action;
if ($action == "test_save") {
    save_test($db);
}

function save_db($db, $sql, $massive)
{
    $sql = mb_substr($sql, 0, -1);
    $query = $db->prepare($sql);
    $query->execute($massive);
    $info = $query->errorInfo();
//    echo $sql;
//    echo json_encode($massive);
    echo json_encode($info);
}

function save_test($db)
{
    $test_name = $_POST['test_name'];
    $test_array = $_POST['test_array'];
    $prepod_id = $_POST['prepod_id'];
    $number = count($test_array);
    $query=$db->prepare("INSERT INTO `work`( `id_prepod`, `name_work`, `question_amount`) VALUES (?,?,?)");
    $query->execute([$prepod_id,$test_name,$number]);
    $query = $db->prepare(" SELECT * FROM `work` WHERE `id_prepod`= ? AND `name_work`=?");
    $query->execute([$prepod_id, $test_name]);
    $array = $query->fetch();
    $work_id = $array[0];
    $question_arr = [];
    $answer_arr = [];
    $count = 0;
    $query=$db->prepare("SELECT * FROM `question` WHERE `id_work`=? ");
    $query->execute([$work_id]);
    $array=$query->fetchAll();
//    echo json_encode($array);

    for ($i = 0; $i < $number; $i++) {//массив Только вопросов
        $quant = $test_array[$i][2];
        $answer_quantity = count($quant);
        echo json_encode($quant,JSON_UNESCAPED_UNICODE);
        $question_arr[$i][0] = $test_array[$i][0];
        $question_arr[$i][1] = $work_id;
        $question_arr[$i][2] = $test_array[$i][1];
        if ($answer_quantity > 1)
            $question_arr[$i][3] = "Тест";
        else
            $question_arr[$i][3] = "Самостоятельный ответ";
    }
//    echo json_encode($question_arr, JSON_UNESCAPED_UNICODE);
    //
    $sql = "INSERT INTO `question`(`id_inTest`, `id_work`, `question`, `type`) VALUES ";//Запрос в строку для оформления цикла
    $massive = [];// однтсрончый массив
    for ($i = 0; $i < $number; $i++) {
        array_push($massive, $question_arr[$i][0], $question_arr[$i][1], $question_arr[$i][2], $question_arr[$i][3]);
    }
    echo json_encode($massive,JSON_UNESCAPED_UNICODE);
    for ($i = 0; $i < $number; $i++) {
        $sql_question_dop = "(?,?,?,?),";//стррока для добавления в базу через pdo
        $sql = $sql . $sql_question_dop;// полная строка запроса pdo
    }

    save_db($db,$sql,$massive);
//    обрезаем последний символ












    $answer_massive = [];
    $massive = [];
    for ($i = 0; $i < $number; $i++) {
        $arr[$i] = $test_array[$i][2];
        $number_arr = count($arr[$i]);

        for ($j = 0; $j < $number_arr; $j++) {
            array_push($answer_massive, $arr[$i][$j]);
        }
    }
    for ($i = 0; $i < count($answer_massive); $i++) {
        $arr[$i][0] = $answer_massive[$i][3];
        $arr[$i][1] = $answer_massive[$i][1];
        $arr[$i][2] = $answer_massive[$i][2];
    }
    for($i=0;$i<count($arr);$i++){
        array_push($massive,$arr[$i][0],$arr[$i][1],$arr[$i][2]);
    }

    $sql = "INSERT INTO `answer` (`id_question`, `answer`, `correct`) VALUES ";
    for ($i = 0; $i < count($arr); $i++) {
        $sql_question_dop = "(?,?,?),";//стррока для добавления в базу через pdo
        $sql = $sql . $sql_question_dop;
    }

    save_db($db,$sql,$massive);
    //полная строка запроса pdo

//    echo json_encode($massive);
}
