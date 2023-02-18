$('#auth_button').on('click', function () {
    let login = $('#auth_login').val().trim();
    let password = $('#auth_pass').val().trim();
    $('#auth_pass').val('');
    $('#auth_login').val('');
    $('#check_password').prop('checked', false);
    if (login.length >= 4 && password.length >= 4) {
        $.ajax({
            url: "../script_php/auth_script.php",
            method: "POST",
            data: {
                action: 'auth_check',
                'login': login,
                'password': password
            },
            success: function (data) {
                if (data == 1) {
                    window.location = "index.php";
                    $('#auth_exit').css('display', 'block');
                }
                else {
                    alert(data);
                }
            },
            error: function () {
                alert("Ошибка создания нового менджера. Проверьте правильность вводимых данных!")
            }
        })
    }
    else alert("И логин, и пароль должны состоять не менее, чем из 4-ех символов!");
});

$('#auth_exit').on('click', function () {
    $.ajax({
        url: "../script_php/auth_script.php",
        method: "POST",
        data: {
            action: 'exit_auth',
        },
        success: function (data) {
            window.location = "index.php";
        },
        error: function () {
            alert("Ошибка создания нового менджера. Проверьте правильность вводимых данных!")
        }
    })
});
$('#admin_kab').on('click', function () {
    window.location = "admin_kab.php";
});
$('#check_password').on('change', function () {
    if ($('#check_password').is(':checked')) {
        $('#auth_pass').get(0).type = 'text';
    }
    else { $('#auth_pass').get(0).type = 'password'; }
})
