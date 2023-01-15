<?php
include('db.php');
$action = $_POST['action'];
$_SESSION['action'] = $action;
if ($action == "test_save") {
    save_test($db);
}

function save_db($db, $sql,$massive)
{
    $sql = mb_substr($sql, 0, -1);
    $query = $db->prepare($sql);
    $query->execute($massive);
    $info = $query->errorInfo();
}

function save_test($db)
{
    $test_name = $_POST['test_name'];
    $test_array = $_POST['test_array'];
    $prepod_id = $_POST['prepod_id'];
    $number = count($test_array);
    $query = $db->prepare(" SELECT * FROM `work` WHERE `id_prepod`= ? AND `name_work`=?");
    $query->execute([$prepod_id, $test_name]);
    $array = $query->fetch();
    $work_id = $array[0];
    $question_arr = [];
    $answer_arr = [];
    $count = 0;
//    echo json_encode($test_array);

    for ($i = 0; $i < $number; $i++) {//массив Только вопросов
        $quant = $test_array[$i][2];
        $answer_quantity = count($quant);
        $question_arr[$i][0] = $work_id;
        $question_arr[$i][1] = $test_array[$i][1];
        if ($answer_quantity <= 1)
            $question_arr[$i][2] = "Тест";
        else
            $question_arr[$i][2] = "Самостоятельный ответ";
    }
    echo json_encode($question_arr, JSON_UNESCAPED_UNICODE);
    //
    $sql = "INSERT INTO `question`( `id_work`, `question`, `type`) VALUES ";//Запрос в строку для оформления цикла
    $massive = [];// однтсрончый массив
    for ($i = 0; $i < $number; $i++) {
        array_push($massive, $question_arr[$i][0], $question_arr[$i][1], $question_arr[$i][2]);
    }
//    echo json_encode($massive,JSON_UNESCAPED_UNICODE);
    for ($i = 0; $i < $number; $i++) {
        $sql_question_dop = "(?,?,?),";//стррока для добавления в базу через pdo
        $sql = $sql . $sql_question_dop;// полная строка запроса pdo
    }
    save_db($db,$sql,$massive);


    //обрезаем последний символ



//    $sql_answer = "INSERT INTO `answer`(`id_answer`, `id_question`, `answer`, `correct`) VALUES";
//    $sql_question="INSERT INTO `question`(`id`, `id_work`, `question`, `type`) VALUES";
//    $sql = $sql.()
}