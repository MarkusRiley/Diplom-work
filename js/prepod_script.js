$('#prepod_kab').on('click', function () {
    window.location = "prepod_kab.php";
});

$('#create_test').on('click', function () {// Создать тест и ввести имя
    localStorage.clear();
    localStorage.setItem('id', 0);//фикс для айди вопроса
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append('<h2 class="text-light w-50 m-2"> Введите название работы </h2>' + '<input class="w-50 m-3" type="text" id="test_name">' + '<button type="button" class="w-25 btn btn-primary m-2" id="add_testName">Добавить работу</button>' + '<button type="button" class="w-25 btn btn-secondary m-2" id="test_back">Вернуться</button>');
    var question_id = 0;
    localStorage.setItem('question_id', question_id);
});


$('body').on('click', '#add_testName', function () {// дсохранить имя теста
    var answer_id = 0;
    question_id = +localStorage.getItem('question_id') + 1;
    localStorage.setItem('question_id', question_id);
    var name_test = $('#test_name').val();
    localStorage.setItem('test_name', name_test);
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append('<h2 class="text-light w-50 m-2">Название теста:' + name_test + '</h2>' + '<form id="question_answer" class="d-flex flex-column w-50">' + '<h2 class="text-light w-50 m-2">Введите вопрос:</h2>' + '<input class="w-75 m-3" type="text" id="question' + question_id + '">' + '<button class =" w-25 btn btn-primary m-2" id="add_answer">Добавить ответ</button>' + '<button class=" w-25 btn btn-secondary m-2" id="question_back">Вернуться</button>' + ' </form>');
    localStorage.setItem('answer_id', answer_id);
});

$('body').on('click', "#add_answer", function () {// добавить ответ к вопросу
    let question_id = +localStorage.getItem('question_id');
    let answer_id = +localStorage.getItem('answer_id') + 1;
    var manek;
    var question;

    for (let i = 1; i <= question_id; i++) {
        manek = "#question" + i;
        question = $(manek).val();
    }
    localStorage.setItem('question', question);
    $('#add_answer').remove()
    $('#question_back').remove();
    $('#save_question').remove();
    $('#question_answer').append('<h2 class="text-light w-50 m-2">Введите ответ:</h2>' + '<div class="d-flex flex-row">' + '<input class="w-75 m-3" type="text" id="answer' + answer_id + '">' + '<input  type="checkbox" id="correct' + answer_id + '"></div>' + '<button class =" w-25 btn btn-primary m-2" id="add_answer" type="button">Добавить ответ</button>' + '<button class=" w-25 btn btn-secondary m-2" id="question_back" type="button">Вернуться</button> ' + '<button class=" w-25 btn btn-secondary m-2" id="save_question" type="button">Сохранить вопрос</button> ');
    localStorage.setItem('answer_id', answer_id);
})

$('body').on('click', "#save_question", function () {// Сохранить вопрос
    console.log(+localStorage.getItem('answer_id'))
    let answer_id = +localStorage.getItem('answer_id');
    let question_id = +localStorage.getItem('question_id');
    let question = localStorage.getItem('question');
    let answer;
    var manek;
    var array = [];
    let ques = localStorage.getItem('answer_array');
    var question_array = JSON.parse(ques);
    if (question_array == null) {
        var last_array = [];
    } else {
        var last_array = question_array;
    }
    var get = [];
    for (let i = 1; i <= answer_id; i++) {
        manek = "#answer" + i;
        manek2 = "#correct" + i;
        answer = $(manek).val();
        if ($(manek2).is(':checked')) correct = "on"; else correct = "off";
        info = [i, answer, correct,question_id];
        array.push(info);
        console.log(array);
        get = [question_id, question, array];
    }
    last_array.push(get);
    localStorage.setItem('answer_array', JSON.stringify(last_array));
    console.log(last_array);
    let question_answerArray = last_array;
    $('#question_answer').remove();
    $('.right_prepodMidder').append('<div id="question_menu" style="display: flex; flex-direction: column;"></div>')
    for (let i = 0; i < question_answerArray.length; i++) {
        var question_block = question_answerArray[i];
        $('#question_menu').append('<button id="question" data-id="' + question_block[0] + '"> Question #' + question_block[0] + ':' + question_block[1] + '</button>');
    }
    $('.right_prepodMidder').append(
        '<button class="w-25 btn btn-warning m-2" id="save_test">Сохранить тест</button>' +
        '<button class="w-25 btn btn-primary m-2" id="new_question">Новый вопрос</button>');
})

$('body').on('click', "#new_question", function () {//Новый вопрос
    var answer_id = 0;
    var question_id = +localStorage.getItem('question_id') + 1;
    var name_test = localStorage.getItem('test_name');
    localStorage.setItem('question_id', question_id);
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append('<h2 class="text-light w-50 m-2">Название теста:' + name_test + '</h2>' + '<form id="question_answer" class="d-flex flex-column w-50">' + '<h2 class="text-light w-50 m-2">Введите вопрос:</h2>' + '<input class="w-75 m-3" type="text" id="question' + question_id + '">' + '<button class =" w-25 btn btn-primary m-2" id="add_answer">Добавить ответ</button>' + '<button class=" w-25 btn btn-secondary m-2" id="question_back">Вернуться</button>' + ' </form>');
    localStorage.setItem('answer_id', answer_id);
});

$('body').on('click', "#question", function () {// открывает редактор вопроса
    let question_id = $(this).attr("data-id");
    console.log(question_id);
    last_array = JSON.parse(localStorage.getItem('answer_array'));
    let question_array = last_array[question_id - 1];
    console.log(question_array);
    let answer_array = question_array[2];
    console.log(answer_array.length);
    localStorage.setItem('temp_questionId', question_array[0]);
    $('#question_menu').css('display', 'none');
    $('#new_question').css('display', 'none');
    $('#save_test').css('display', 'none');
    $('.right_prepodMidder').append('<div id="solo_questionMenu" style="display: flex;flex-direction: column;"><h2 class="text-light w-50 m-2">Вопрос:</h2>' + '<input type="text"id="edit_question" value="' + question_array[1] + '">' + '<h2 class="text-light w-50 m-2">Варианты ответов</h2>')
    for (let i = 0; i < answer_array.length; i++) {
        $('#solo_questionMenu').append('<div id="answer_block' + i + '" style="display: flex; flex-direction: row;"><input class="m-2 " type="text"id="edit_answer' + answer_array[i][0] + '" value="' + answer_array[i][1] + '">');
        let temp = "#answer_block" + i;
        console.log(temp);
        if (answer_array[i][2] == "on") {
            $(temp).append('<input type="checkbox" id="edit_correct' + answer_array[i][0] + '" checked><button style="width: 20px; padding:none;height: 20px; border-radius: 50%;background: none; border: none;" id="delete_answer" data-id="' + answer_array[i][0] + '"><img src="img/cancel.png" alt="" style="width: 20px;height: 20px;"></button> </div></div>')
        } else {
            $(temp).append('<input type="checkbox" id="edit_correct' + answer_array[i][0] + '"><button style="width: 20px; padding:none;height: 20px; border-radius: 50%;background: none; border: none;" id="delete_answer" data-id="' + answer_array[i][0] + '"><img src="img/cancel.png" alt="" style="width: 20px;height: 20px;"></button></div></div>')
        }
        localStorage.setItem('quantity_answer', answer_array[i][0])
    }
    $('.right_prepodMidder').append('<div id="solo_questionButton"><button class="w-25 btn btn-secondary m-2" type="button" id="add_newAnswer">Добавить ответ</button>' + '<button class="w-25 btn btn-warning m-2" type="button" id="save_change">Сохранить изменения</button>' + '<button class="w-25 btn btn-secondary m-2"type="button"id="back_toBack">Вернуться</button></div>')
})
$('body').on('click', "#delete_answer", function () {
    let temp_questionId = localStorage.getItem('temp_questionId');
    let last_array = JSON.parse(localStorage.getItem('answer_array'));
    let answer_id = $(this).attr("data-id");
    let question_array = [];
    let answer_array = [];
    for (let i = 0; i < last_array.length; i++) {
        if (last_array[i][0] = temp_questionId) {
            question_array = last_array[i];
            answer_array = question_array[2];
        }
        for (let i = 0; i < answer_array.length; i++) {
            if (answer_array[i][0] == answer_id) {
                let gar = answer_id - 1;
                answer_array.splice(gar, 1);
            }
        }
        for (let i = 1; i <= answer_array.length; i++) {
            answer_array[i - 1][0] = i;
        }
        question_array[2] = answer_array;
        last_array[i] = question_array;
    }
    $('#solo_questionMenu').empty();
    $('#solo_questionMenu').append(
        '<h2 class="text-light w-50 m-2">Вопрос:</h2>' + '<input type="text"id="edit_question" value="' + question_array[1] + '">' + '<h2 class="text-light w-50 m-2">Варианты ответов</h2>'
    );
    for (let i = 0; i < answer_array.length; i++) {
        $('#solo_questionMenu').append('<div id="answer_block' + i + '" style="display: flex; flex-direction: row;"><input class="m-2 " type="text"id="edit_answer' + answer_array[i][0] + '" value="' + answer_array[i][1] + '">');
        let temp = "#answer_block" + i;
        console.log(temp);
        if (answer_array[i][2] == "on") {
            $(temp).append('<input type="checkbox" id="edit_correct' + answer_array[i][0] + '" checked><button style="width: 20px; padding:none;height: 20px; border-radius: 50%;background: none; border: none;" id="delete_answer" data-id="' + answer_array[i][0] + '"><img src="img/cancel.png" alt="" style="width: 20px;height: 20px;"></button> </div></div>')
        } else {
            $(temp).append('<input type="checkbox" id="edit_correct' + answer_array[i][0] + '"><button style="width: 20px; padding:none;height: 20px; border-radius: 50%;background: none; border: none;" id="delete_answer" data-id="' + answer_array[i][0] + '"><img src="img/cancel.png" alt="" style="width: 20px;height: 20px;"></button></div></div>')
        }
        localStorage.setItem('quantity_answer', answer_array[i][0])
    }
    localStorage.setItem('answer_array', JSON.stringify(last_array));
    console.log(last_array);
})

$('body').on('click', "#add_newAnswer", function () {
    answer_id = +localStorage.getItem("quantity_answer");
    answer_id += 1;
    $('#solo_questionMenu').append('<div id="answer_block"  style="display: flex; flex-direction: row;"><input class="m-2 " type="text"id="edit_answer' + answer_id + '">' + '<input type="checkbox"id="edit_correct' + answer_id + '" style="margin: 0;"><button style="width: 20px; padding:none;height: 20px; border-radius: 50%;background: none; border: none;" id="delete_answer" data-id="' + answer_id + '"><img src="img/cancel.png" alt="" style="width: 20px;height: 20px;"></button></div>');
    localStorage.setItem('quantity_answer', answer_id);
})
$('body').on('click', "#save_change", function () {
    var question_id = +localStorage.getItem('temp_questionId');
    var question = $('#edit_question').val();
    var quantity_answer = +localStorage.getItem('quantity_answer');
    let manek;
    let manek2;
    var correct;
    var answer;
    var array = [], info = [];
    var get = [];
    var last_array = JSON.parse(localStorage.getItem('answer_array'));
    console.log(last_array[0][1])
    let drive = last_array.length;
    let test_name = localStorage.getItem('test_name');
    for (let i = 1; i <= quantity_answer; i++) {
        manek = "#edit_answer" + i;
        manek2 = "#edit_correct" + i;
        answer = $(manek).val();
        if ($(manek2).is(':checked')) correct = "on"; else correct = "off";
        info = [i, answer, correct,question_id];
        array.push(info);
        get = [question_id, question, array];
    }
    // let massive=last_array.find(last_array=>last_array[0]==question_id);
    // console.log(massive);
    for (let i = 0; i < drive; i++) {
        if (last_array[i][0] == question_id) {
            last_array[i] = get;
        }
        localStorage.setItem('answer_array', JSON.stringify(last_array));
    }
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append(
        '<h2 class="text-light w-50 m-2">Название теста:' + test_name + '</h2>' +
        '<div id="question_menu" style="display: flex; flex-direction: column;"></div>')
    for (let i = 0; i < last_array.length; i++) {
        var question_block = [];
        question_block = last_array[i];
        $('#question_menu').append('<button id="question" data-id="' + question_block[0] + '"> Question #' + question_block[0] + ':' + question_block[1] + '</button>');
    }
    $('.right_prepodMidder').append(
        '<button class="w-25 btn btn-warning m-2" id="save_test">Сохранить тест</button>' +
        '<button class="w-25 btn btn-primary m-2" id="new_question">Новый вопрос</button>');
});
$('body').on('click', "#back_toBack", function () {
    $('#solo_questionMenu').remove();
    $('#question_menu').css('display', 'flex');
    $('#new_question').css('display', 'block');
    $('#save_test').css('display', 'block');
    $('#solo_questionButton').remove();
});
$('body').on('click', "#save_test", function () {
    let test_array = JSON.parse(localStorage.getItem('answer_array'));
    let test_name = localStorage.getItem('test_name');
    let prepod_id = $('#prepod_id').val();
    $.ajax({
        url: "../script_php/prepod_script.php",
        method: "POST",
        type: "json",
        data: {
            action: 'test_save',
            'prepod_id': prepod_id,
            'test_array': test_array,
            'test_name': test_name
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            alert("ERROR");
        }
    })
})
$('#back_toMain').on('click', function () {
    window.location.href = "index.php";
})

