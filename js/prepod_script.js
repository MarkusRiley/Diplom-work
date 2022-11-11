
$('#prepod_kab').on('click', function () {
    window.location = "prepod_kab.php";
})
$('#create_test').on('click', function () {
    localStorage.clear();
    localStorage.setItem('question_id', 0);//фикс для айди вопроса
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append(
        '<h2 class="text-light w-50 m-2"> Введите название работы </h2>' +
        '<input class ="w-50 m-3" type="text" id="test_name">' +
        '<button class ="w-25 btn btn-primary m-2" id="add_testName">Добавить вопрос</button>'
    );
})
$('body').on('click', '#add_testName', function () {
    var name_test = $('#test_name').val();
    localStorage.setItem('test_name', name_test);
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append(
        '<h1 class="text-light w-50 m-2">Название работы:' + name_test + '</h1>' +
        '<h2 class="text-light w-50 m-2"> Введите вопрос </h2>' +
        '<input class ="w-50 m-3" type="text" id="question">' +
        '<button class ="w-25 btn btn-primary m-2" id="add_question">Добавить ответ</button>'
    )
});
$('body').on('click', "#add_question", function () {
    question_answerId = +localStorage.getItem('question_id');
    question_answerId += 1;
    var question = $('#question').val();
    localStorage.setItem('question_name', question);
    localStorage.setItem('question_id', question_answerId);
    $('.right_prepodMidder').empty();
    $('.right_prepodMidder').append(
        '<div class=" w-100 d-flex flex-column justify-content-center align-items-center" id="question_block">' +
        '<h1 class="text-light w-50 m-2 id="' + question_answerId + '">' + question + '</h1>' +
        '<button class =" w-25 btn btn-primary m-2" id="add_answer">Добавить ответ</button>' +
        '<button class =" w-25 btn btn-primary m-2" id="save_question">Сохранить вопрос</button>' +
        '<h3 class="text-light w-50 m-2">Ответ №1</h3>' +
        '<input class ="w-50 m-3" type="text" id="answer ' + question_answerId + '">' +
        '</div>'
    );
    localStorage.setItem('answer_id', question_answerId);
})

$('body').on('click', "#add_answer", function () {
    var answer_id = +localStorage.getItem('answer_id') + 1;
    var question_blockId = localStorage.getItem('question_id');
    $('#question_block').append(
        '<h3 class="text-light w-50 m-2">Ответ №'+answer_id+'</h3>'+
        '<input class ="w-50 m-3" type="text" id="answer ' + answer_id+ '">'
    )
    localStorage.setItem('answer_id', answer_id);
})
$('body').on('click',"#save_question", function(){
    var answer_id=+localStorage.getItem('answer_id');
    var question_id=+localStorage.getItem('question_id');
    var question=localStorage.getItem('question_name');
    console.log(answer_id, question, question_id);
})