$('#add_newPrepod').on('click', function () {
    $('#prepod_list').css('display', 'flex');
    $('#main_midderBtn').css('display', 'none');
})
$('#correct_page').on('click', function () {
    $('#div_textArea').css('display', 'flex');
    $('#main_midderBtn').css('display', 'none');
})
$('#back_prepod').on('click', function () {
    $('#prepod_list').css('display', 'none');
    $('#main_midderBtn').css('display', 'flex');
})
$('#back_content').on('click', function () {
    $('#div_textArea').css('display', 'none');
    $('#main_midderBtn').css('display', 'flex');
})





$('#save_textArea').on('click', function () {
    var text_area = $('#your_summernote').summernote('code');
    $.ajax({
        url: "../script_php/admin_script.php",
        method: "POST",
        data: {
            action: 'save_content',
            'content': text_area
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {

        }
    })

    $('#your_summernote').summernote('empty');
})

$('#save_prepod').on('click', function () {
    let login = $('#prepod_login').val().trim(),
        pass = $('#prepod_pass').val().trim(),
        name = $('#prepod_name').val(),
        surname = $('#prepod_surname').val(),
        patronymic = $('#prepod_patronymic').val(),
        lesson = $('#prepod_lesson').val();
    if (login.length >= 4 && pass.length >= 4) {
        $.ajax({
            url: "../script_php/admin_script.php",
            method: "POST",
            data: {
                action: 'save_prepod',
                'login': login,
                'pass': pass,
                'name': name,
                'surname': surname,
                'patronymic': patronymic,
                'lesson': lesson
            },
            success: function (data) {
                console.log(data);
                alert("Новый преподаватель зарегестрирован. Операция прошла успешно!");
                window.location="admin_kab.php";
            },
            error: function () {
                alert("Ошибка создания нового менджера. Проверьте правильность вводимых данных!")
            }
        })
    }
    else alert("Логин и пароль должны быть не меньше 4-ех символов!!");
})
