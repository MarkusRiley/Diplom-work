<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>
</head>

<body>
    <?php
    ?>
    <div class="container">
        <div class="main_container">
            <div class="main_leftContainer">
                <?php
                include('layout/logo.php'); ?>

                <div class="main_leftMenu">
                </div>

            </div>

            <div class="main_rightContainer">

                <?php
                include('layout/header.php');
                ?>

                <div class="main_midder">
                    <div class="content w-100 h-100 pt-5 d-flex flex-column justify-content-center align-items-center">
                        <?php
                        include('script_php/content_handler.php');
                        ?>
                    </div>
                </div>

            </div>

            <div class="main_footer">

            </div>

        </div>
    </div>

</body>


</html>