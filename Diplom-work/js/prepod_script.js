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
        info = [i, answer, correct, question_id];
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
        $('#solo_questionMenu').append('<div id="answer_block' + i + '" style="display: flex; flex-direction: row;"><input class="m-2 " type="text" id="edit_answer' + answer_array[i][0] + '" value="' + answer_array[i][1] + '">');
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
        info = [i, answer, correct, question_id];
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
        data: {
            action: 'test_save',
            'prepod_id': prepod_id,
            'test_array': test_array,
            'test_name': test_name
        },
        success: function (data) {
            location.reload();
            localStorage.clear();
        },
        error: function () {
            alert("ERROR");
        }
    })
})

$('#back_toMain').on('click', function () {
    window.location.href = "/index.php";
})
//Список тестов
$('#test_list').on('click', function () {
    $('.right_prepodMidder').empty()
    $.ajax({
        url: "../script_php/prepod_script.php",
        method: "POST",
        dataType: "json",
        data: {
            action: 'test_list',
        },
        success: function (data) {
            $('.right_prepodMidder').append('<div id="test_menu" class="d-flex flex-column justify-content-center align-item-center"></div>')
            for (let i = 0; i < data.length; i++) {
                $('#test_menu').append(
                    '<button type="button" class="btn bg-opacity-0 text-light border-info m-2" data-id="' + data[i][0] + '" id="edit_test">Предмет: ' + data[i][2] + '. Кол-во вопросов: ' + data[i][3] + '.</button>'
                )
            }
        },
        error: function () {
            alert("danger");
        }
    })
})


$('body').on('click', "#edit_test", function () {
    let work_id = $(this).attr("data-id");
    $.ajax({
        url: "../../script_php/prepod_script.php",
        method: "POST",
        dataType: "json",
        data: {
            action: 'test_array',
            'id_work': work_id,
        },
        success: function (data) {
            let massive = data;
            let question = [];
            let answer_temp = [];
            for (let i = 0; i < massive.length; i++) {
                let array = [massive[i][0], massive[i][1]]
                question.push(array);
                answer_temp[i] = massive[i][2];
            }
            let count = answer_temp.length;
            let answer_array = [];
            for (let j = 0; j < count; j++) {
                let answer = [];
                answer = answer_temp[j]
                answer.splice(0, 3);
                answer_array.push(answer);
            }
            let question_answer = [];
            for (let g = 0; g < question.length; g++) {
                let answer_res = [];
                answer_res = [question[g], answer_array[g]];
                question_answer.push(answer_res);
            }
            localStorage.setItem('answer_fromDB', JSON.stringify(question_answer));
            window.location.href = 'pages/prepod/test_info.php?test_id=' + work_id;
        },
        error: function () {
            console.log('error');
        }
    })
})

$('.question_edit').on('click', function () {
    let question_id = $(this).attr("data-id");
    let work_id = $('#work_id').val();
    localStorage.setItem('work_id',work_id);
    $.ajax({
        url: "../../script_php/prepod_script.php",
        method: "POST",
        dataType: "json",
        data: {
            action: 'show_test',
            'id_work': work_id,
            'question_id': question_id
        },
        success: function (data) {
            let question = data[0];
            let answer_array = data[1];
            let count = answer_array.length;
            let manek;
            let manek2;
            count += 1;
            localStorage.setItem('answer_massive', JSON.stringify(answer_array));
            localStorage.setItem('question', JSON.stringify(question));
            $('#question_modal').empty();
            $('#question_modal').append(
                '<div class="d-flex flex-row" id="question_editing"><p style="font-weight: bold;" id="question">' + question[1] + '</p><button type="button"  id="edit_question" data-id="' + question[0] + '" style="background: none; border: none;"><img src="../../img/edit_button.png"></button></div>'
            );
            for (let i = 0; i < answer_array.length; i++) {
                if (answer_array[i][2] == "on") {
                    $('#question_modal').append(
                        '<div class="answer_block' + answer_array[i][0] + ' d-flex flex-row m-2"><p id="answer' + answer_array[i][0] + '" style="font-weight: bold;">' + answer_array[i][1] + '</p>&nbsp;&nbsp; <input type="checkbox" class="correct me-2" id="correct' + answer_array[i][0] + '" checked> <button data-id="' + answer_array[i][0] + '" type="button" id="edit_answer" style="background: none; border-color: white; border-radius: 10%" class="edit_button' + answer_array[i][0] + '"><img src="../../img/edit_button.png" class="w-50"></button>' +
                        '<button  data-id="' + answer_array[i][0] + '" type="button" id="delete_answerButt" style="background: none;border-color: white;border-radius: 10%" class="delete_answerButt' + answer_array[i][0] + '"><img src="../../img/delete_button.png" class="w-50"></button></div>'
                    );
                } else {
                    $('#question_modal').append(
                        '<div class="answer_block' + answer_array[i][0] + ' d-flex flex-row m-2"><p style="font-weight: bold;" id="answer' + answer_array[i][0] + '">' + answer_array[i][1] + '</p>&nbsp;&nbsp; <input id="correct' + answer_array[i][0] + '" type="checkbox" class="correct me-2" > <button type="button" id="edit_answer" style="background: none; border-color: white;border-radius: 10%" data-id="' + answer_array[i][0] + '" class="edit_button' + answer_array[i][0] + '"><img src="../../img/edit_button.png" class="w-50" id="img' + answer_array[i][0] + '"></button> ' +
                        '<button  data-id="' + answer_array[i][0] + '" type="button" id="delete_answerButt" style="background: none;border-color: white;border-radius: 10%" class="delete_answerButt' + answer_array[i][0] + '"><img src="../../img/delete_button.png" class="w-50"></button></div>'
                    );
                }
                $('#question_modalFooter').empty();
                $('#question_modalFooter').append(
                    '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>' +
                    '<button type="button" class="btn btn-light" id="save_edit" data-id="' + question_id + '">Сохранить</button>' +
                    '<button class="btn btn-warning" id="add_anotherAnswer" data-id="' + work_id + '">Добавить ответ</button>');
            }
        },
        error: function () {
            console.log('error');
        }
    })
});
$('body').on('click', "#save_edit", function () {
    let question_answer=JSON.parse(localStorage.getItem('answer_fromDB'));
    let question = JSON.parse(localStorage.getItem('question'));
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let count_answer = answer_array.length;
    let general_massive=[question,answer_array];
    console.log(question_answer);
});

$('body').on('click', "#edit_question", function () {
    let question = JSON.parse(localStorage.getItem('question'));
    $('#question').replaceWith('<input type="text" value="' + question[1] + '" id="question_input">');
    $('#edit_question').css('display', 'none');
    $('#question_editing').append(
        '<div class="d-flex flex-row" id="question_buttonMenu"><button style="background: none; border-color: white;border-radius: 10%" type="button" class="save_question"><img class="w-50" src="../../img/save_button.png"></button>' +
        '<button style="background: none; border-color: white;border-radius: 10% " type="button" type="button" class="question_cancel"><img class="w-50" src="../../img/cancel_button.png"></button>' +
        '</div>');

})

function question_exit(question) {
    $('#question_input').replaceWith('<p style="font-weight: bold;" id="question">' + question + '</p>');
    $('#question_buttonMenu').remove();
    $('#edit_question').css('display', 'block');
}

$('body').on('click', ".question_cancel", function () {
    let question_array = JSON.parse(localStorage.getItem('question'));
    let question = question_array[1];
    question_exit(question);
})

$('body').on('click', ".save_question", function () {
    let question_array = JSON.parse(localStorage.getItem('question'));
    let question = $('#question_input').val();
    question_array[1] = question;
    $('#question_input').replaceWith('<p style="font-weight: bold;" id="question">' + question + '</p>');
    $('#question_buttonMenu').remove();
    $('#edit_question').css('display', 'block');
    question_exit(question);
    localStorage.setItem('question', JSON.stringify(question_array));
})

$('body').on('click', "#delete_answerButt", function () {
    let answer_id = $(this).attr("data-id");
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let new_answerArr = JSON.parse(localStorage.getItem('answer_massive'));
    let delete_answerSample = ".answer_block" + answer_id;
    $(delete_answerSample).remove();
    for (let i = 0; i < new_answerArr.length; i++) {
        if (new_answerArr[i][0] == answer_id) {
            new_answerArr.splice(i, 1);
        }
    }
    // for(let j=0;j<new_answerArr.length;j++){
    //     new_answerArr[j][0]=answer_array[j][0];
    // }
    let answer_count = new_answerArr.length;
    localStorage.setItem('answer_count', answer_count);
    localStorage.setItem('answer_massive', JSON.stringify(new_answerArr));
    localStorage.setItem('first_answerArr', JSON.stringify(answer_array));// первоначальный массив с ответами на конкретный вопросс
})

$('body').on('click', "#edit_answer", function () {
    let answer_id = $(this).attr("data-id");
    let manek = "#answer" + answer_id;//переменная для подставления в аппенд подходящего под айди блока ответа
    let manek2 = ".edit_button" + answer_id;
    let manek3 = '.answer_block' + answer_id;
    console.log(manek3);
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let answer;
    console.log(answer_array);
    for (let i = 0; i < answer_array.length; i++) {
        if (answer_array[i][0] == answer_id) {
            answer = answer_array[i][1];
        }
    }
    $(manek).replaceWith('<input type="text" value="' + answer + '" id="answer_input' + answer_id + '"> ');
    $(manek2).css('display', 'none');
    $(manek3).append(
        '<div class="d-flex flex-row" id="button_menu' + answer_id + '"><button style="background: none; border-color: white;border-radius: 10%" type="button" class="save_answer" data-id="' + answer_id + '"><img class="w-50" src="../../img/save_button.png"></button>' +
        '<button style="background: none; border-color: white;border-radius: 10% " type="button" type="button" class="cancel" data-id="' + answer_id + '"><img class="w-50" src="../../img/cancel_button.png"></button>' +
        '</div>')
});

function exit(answer_id, answer_array) {
    let manek = "#button_menu" + answer_id;
    let manek2 = "#answer_input" + answer_id;
    let manek3 = ".edit_button" + answer_id;
    $(manek).remove();
    $(manek3).css('display', 'block');
    for (let i = 0; i < answer_array.length; i++) {
        if (answer_array[i][0] == answer_id)
            $(manek2).replaceWith('<p style="font-weight: bold;" id="answer' + answer_array[i][0] + '">' + answer_array[i][1] + '</p>')
    }
}

$('body').on('click', ".cancel", function () {
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let answer_id = $(this).attr("data-id");
    exit(answer_id, answer_array);
});

$('body').on('click', ".save_answer", function () {
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let answer_id = $(this).attr("data-id");
    let answer_sample = "#answer_input" + answer_id;
    let answer = $(answer_sample).val();
    let correct_sample = "#correct" + answer_id;
    let correct;
    console.log(answer_array);
    if ($(correct_sample).is(':checked')) correct = "on"; else correct = "off";
    for (let i = 0; i < answer_array.length; i++) {
        if (answer_array[i][0] == answer_id) {
            answer_array[i][1] = answer;
            answer_array[i][2] = correct;
        }
    }
    let answer_count = answer_array.length;
    console.log(answer_array);
    exit(answer_id, answer_array);
    // for(let j=0;j<new_answerArr.length;j++){
    //     new_answerArr[j][0]=answer_array[j][0];
    // }
    localStorage.setItem('answer_massive', JSON.stringify(answer_array));
});

$('body').on('click', "#add_anotherAnswer", function () {
    let answer_array = JSON.parse(localStorage.getItem('answer_massive'));
    let answer_count = answer_array.length;
    answer_newCount = answer_count += 1;
    let arr = [answer_count, 0, 0, 1];
    answer_array.push(arr);
    $('#question_modal').append(
        '<div class="answer_block' + answer_newCount + ' d-flex flex-row m-2"">' +
        '<input type="text" id="answer_input' + answer_newCount + '">&nbsp;&nbsp; ' +
        '<input type="checkbox" class="correct me-2" id="correct' + answer_newCount + '" checked>' +
        '<button  data-id="' + answer_newCount + '" type="button" id="delete_answerButt" style="background: none;border-color: white;border-radius: 10%" class="delete_answerButt' + answer_newCount + '"><img src="../../img/delete_button.png" class="w-50"></button>' +
        '<button data-id="' + answer_newCount + '" type="button" id="edit_answer" style="background: none; border-color: white; border-radius: 10%; display:none;" class="edit_button' + answer_newCount + '"><img src="../../img/edit_button.png" class="w-50"></button> ' +
        '<div class="d-flex flex-row" id="button_menu' + answer_newCount + '">' +
        '<button style="background: none; border-color: white;border-radius: 10%" type="button" class="save_answer" data-id="' + answer_newCount + '"><img class="w-50" src="../../img/save_button.png"></button>' +
        '<button style="background: none; border-color: white;border-radius: 10% " type="button" type="button" class="cancel" data-id="' + answer_newCount + '"><img class="w-50" src="../../img/cancel_button.png"></button>' +
        '</div></div>'
    );
    console.log(answer_array);
    localStorage.setItem('answer_massive', JSON.stringify(answer_array));
});

$('#add_newQuestion').on('click', function() {
    let question_array = JSON.parse(localStorage.getItem('question'));
    let count = question_array.length;
    console.log(question_array);
    console.log(count);

    // $('#question_menuButton').remove();
    // $('#question_modal').append(
    //     <div></div>
    // );
})