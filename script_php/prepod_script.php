<?php
include($_SERVER[DOCUMENT_ROOT] . '/script_php/db.php');
$action = $_POST['action'];
$_SESSION['action'] = $action;
if ($action == "test_save") {
    save_test($db);
} else if ($action == "test_list") {
    test_list($db);
} else if ($action == "edit_test") {
    edit_test($db);
} else if ($action == "show_test") {
    show_test($db);
} else if ($action == "experiment") {
    experiment($db);
}else if($action=="test_array"){
    test_array($db);
}else if($action == "edit_massive"){
    edit_massive($db);
}



function test_array($db){

    $work_id=$_POST['id_work'];
    $query = $db->prepare("SELECT * FROM `question` INNER JOIN `answer` ON question.id_work = answer.work_id AND question.id_inTest = answer.question_id WHERE `id_work`= ?  ");
    $query->execute([$work_id]);
    $info = $query->errorInfo();
    $question_dbArray = $query->fetchAll();
    $question_quantity = count($question_dbArray);
    $question_massive = [];
    $massive = [];
    $array_massive = [];
    $f = 0;
    $c = 0;
    $array_massive[$c] = [$question_dbArray[0][5], $question_dbArray[0][1], $question_dbArray[0][6], [$question_dbArray[0][8], $question_dbArray[0][9]]];// создается массив с первым ответом на первчй вопрос

    for ($j = 1; $j < $question_quantity; $j++) {
        if ($question_dbArray[$j][1] == $array_massive[$c][1] && $question_dbArray[$j][6] == $array_massive[$c][1]) {
            array_push($array_massive[$c], [$question_dbArray[$j][8], $question_dbArray[$j][9]]);//если id-вопроса  седующего ответа совпадает с наынешним, то первый элемент общего массива с ответами дополняется ответами
        } else {// иначе, к счетчику добавляется 1 и начинает заполняется следующий элемент общего массива
            $c++;
            $array_massive[$c] = [$question_dbArray[$j][5], $question_dbArray[$j][1], $question_dbArray[$j][6], [$question_dbArray[$j][8], $question_dbArray[$j][9]]];
        }
    }

    $question_massive[$f] = [$question_dbArray[0][1], $question_dbArray[0][3]];//Создается массив с первым вопросом из теста
    $count = 1;// счетчик вопросов
    for ($i = 0; $i < $question_quantity; $i++) {
        if ($question_dbArray[$i][1] != $question_massive[$f][0]) {
            $question_massive[$f + 1] = [$question_dbArray[$i][1], $question_dbArray[$i][3]];
            $f++;
            $count++;
        }
    }
    for ($g = 0; $g < $count; $g++) {
        array_push($question_massive[$g], $array_massive[$g]);
    }
    echo json_encode($question_massive,JSON_UNESCAPED_UNICODE);
}

function show_test($db)
{
    $question_id = $_POST['question_id'];
    $work_id = $_POST['id_work'];
    $query = $db->prepare("SELECT `id_inTest`,`question`,`type` FROM `question` WHERE `id_work`= ? AND `id_inTest` = ?");
    $query->execute([$work_id, $question_id]);
    $question_array = $query->fetchAll();
    $query = $db->prepare("SELECT `id_answer`,`answer`, `correct` FROM `answer` WHERE `work_id` = ? AND `question_id` = ?");
    $query->execute([$work_id, $question_id]);
    $answer_array = $query->fetchAll();
    $info = $query->errorInfo();
    array_push($question_array, $answer_array);
    echo json_encode($question_array);

}

function question_view($work_id, $db)
{//функция для отрисовки вопроса по id
    $query = $db->prepare("SELECT * FROM `question` INNER JOIN `answer` ON question.id_work = answer.work_id AND question.id_inTest = answer.question_id WHERE `id_work`= ?  ");
    $query->execute([$work_id]);
    $info = $query->errorInfo();
    $question_dbArray = $query->fetchAll();
    $question_quantity = count($question_dbArray);
    $question_massive = [];
    $massive = [];
    $array_massive = [];
    $f = 0;
    $c = 0;
    $array_massive[$c] = [$question_dbArray[0][5], $question_dbArray[0][1], $question_dbArray[0][6], [$question_dbArray[0][8], $question_dbArray[0][9]]];// создается массив с первым ответом на первчй вопрос

    for ($j = 1; $j < $question_quantity; $j++) {
        if ($question_dbArray[$j][1] == $array_massive[$c][1] && $question_dbArray[$j][6] == $array_massive[$c][1]) {
            array_push($array_massive[$c], [$question_dbArray[$j][8], $question_dbArray[$j][9]]);//если id-вопроса  седующего ответа совпадает с наынешним, то первый элемент общего массива с ответами дополняется ответами
        } else {// иначе, к счетчику добавляется 1 и начинает заполняется следующий элемент общего массива
            $c++;
            $array_massive[$c] = [$question_dbArray[$j][5], $question_dbArray[$j][1], $question_dbArray[$j][6], [$question_dbArray[$j][8], $question_dbArray[$j][9]]];
        }
    }

    $question_massive[$f] = [$question_dbArray[0][1], $question_dbArray[0][3]];//Создается массив с первым вопросом из теста
    $count = 1;// счетчик вопросов
    for ($i = 0; $i < $question_quantity; $i++) {
        if ($question_dbArray[$i][1] != $question_massive[$f][0]) {
            $question_massive[$f + 1] = [$question_dbArray[$i][1], $question_dbArray[$i][3]];
            $f++;
            $count++;
        }
    }
    for ($g = 0; $g < $count; $g++) {
        array_push($question_massive[$g], $array_massive[$g]);
    }

    for ($i = 0; $i < $count; $i++) {
        echo '<div><button style="background: none; border: none; font-size:large; font-weight:bold;" type="button" class="text-light question_edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="' . $question_massive[$i][0] . '" data-question="' . $question_massive[$i][1] . '">Вопрос №' . $question_massive[$i][0] . ' ' . $question_massive[$i][1] . '</button>
        <input type="hidden" id="work_id" value="' . $work_id . '">
            </div>
<br>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content" style="background-color:rgb(4,146,171);">
            <div class="modal-header"  style="background-color:rgb(4,146,171,0.8);">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Редактор Вопроса</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column" id="question_modal"  style="background-color:rgb(4,146,171,0.8); border-color: rgb(19, 19, 60, 0.8);">
            </div>
            <div class="modal-footer"  style="background-color:rgb(4,146,171,0.8);" id="question_modalFooter">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-light">Understood</button>
                <button type="button" class="btn btn-warning" id="add_newAnswer">Добавить ответ</button>
            </div>
        </div>
    </div>
</div>';
    }
    echo '<div class=" d-flex align-items-center justify-content-center" id="question_menuButton"><button class="btn btn-secondary m-2" id="add_newQuestion">Добавить вопрос</button>
    <button class="btn btn-warning mx-2">Сохранить тест</button>
    </div>';
}

function save_test($db)
{
    $test_name = $_POST['test_name'];
    $test_array = $_POST['test_array'];
    $prepod_id = $_POST['prepod_id'];
    $number = count($test_array);
    $query = $db->prepare("INSERT INTO `work`( `id_prepod`, `name_work`, `question_amount`) VALUES (?,?,?)");
    $query->execute([$prepod_id, $test_name, $number]);
    $query = $db->prepare(" SELECT * FROM `work` WHERE `id_prepod`= ? AND `name_work`=? ORDER BY `id_work` DESC LIMIT 1");
    $query->execute([$prepod_id, $test_name]);
    $array = $query->fetchAll();
    $info = $query->errorInfo();
    $work_id = $array[0][0];
    $question_arr = [];
    $answer_arr = [];
    $count = 0;
    $query = $db->prepare("SELECT * FROM `question` WHERE `id_work`=? ");
    $query->execute([$work_id]);
    $array = $query->fetchAll();


    for ($i = 0; $i < $number; $i++) {//массив Только вопросов
        $quant = $test_array[$i][2];
        $answer_quantity = count($quant);

        $question_arr[$i][0] = $test_array[$i][0];
        $question_arr[$i][1] = $work_id;
        $question_arr[$i][2] = $test_array[$i][1];
        if ($answer_quantity > 1)
            $question_arr[$i][3] = "test";
        else
            $question_arr[$i][3] = "one_answer";
    }
    //
    $sql = "INSERT INTO `question`(`id_inTest`, `id_work`, `question`, `type`) VALUES ";//Запрос в строку для оформления цикла
    $massive = [];// однтсрончый массив
    for ($i = 0; $i < $number; $i++) {
        array_push($massive, $question_arr[$i][0], $question_arr[$i][1], $question_arr[$i][2], $question_arr[$i][3]);
    }

    for ($i = 0; $i < $number; $i++) {
        $sql_question_dop = "(?,?,?,?),";//стррока для добавления в базу через pdo
        $sql = $sql . $sql_question_dop;// полная строка запроса pdo
    }

    save_db($db, $sql, $massive);
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
        $arr[$i][2] = $work_id;
        $arr[$i][3] = $answer_massive[$i][2];
    }
    for ($i = 0; $i < count($arr); $i++) {
        array_push($massive, $arr[$i][0], $arr[$i][2], $arr[$i][1], $arr[$i][3]);
    }


    $sql = "INSERT INTO `answer` (`question_id`,`work_id`, `answer`, `correct`) VALUES ";
    for ($i = 0; $i < count($arr); $i++) {
        $sql_question_dop = "(?,?,?,?),";//стррока для добавления в базу через pdo
        $sql = $sql . $sql_question_dop;
    }
    save_db($db, $sql, $massive);

    //полная строка запроса pdo


}

function test_nameView($work_id, $db)
{
    $query = $db->prepare("SELECT * FROM `work` WHERE `id_work` =?");
    $query->execute([$work_id]);
    $array = $query->fetch();
    $test_name = $array[2];
    echo '<div class="d-flex flex-row m-1 w-25  align-items-center"><h2 class="text-light m-2" name="test_name">' . $test_name . '</h2><button type="button" id="edit_testName" style="background: none; border: none; width: 32px; height: 32px;"><img src="../../img/edit_button.png" alt="" style="width: 32px; height: 32px;"></button></div>';
}

function edit_test($db)
{
    $work_id = $_POST['work_id'];
    $query = $db->prepare("SELECT * FROM `question` INNER JOIN `answer` ON question.id_inTest = answer.id_question AND question.id_work =answer.work_id WHERE `id_work`= ?");
    $query->execute([$work_id]);
    $array = $query->fetchAll();
    $info = $query->errorInfo();
    echo json_encode($array[0], JSON_UNESCAPED_UNICODE);
}

function test_list($db)
{
    $query = $db->prepare("SELECT * FROM `work` ORDER BY `id_work` ");
    $query->execute();
    $array = $query->fetchAll();

    echo json_encode($array);

}

function save_db($db, $sql, $massive)
{
    $sql = mb_substr($sql, 0, -1);
    $query = $db->prepare($sql);
    $query->execute($massive);
    $info = $query->errorInfo();
}


