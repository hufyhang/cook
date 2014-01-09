<?php
$bootstrap = $_GET['bootstrap'];
$ribs = $_GET['ribs'];
$requirejs = $_GET['requirejs'];
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Web page title</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

<?php
if ($requirejs != 'Y' && $requirejs != 'y') {
    echo "\n\t\t<link rel=\"stylesheet\" href=\"css/normalize.css\">\n";
}
if ($bootstrap == 'Y' || $bootstrap == 'y') {
    echo "\n\t\t<link rel=\"stylesheet\" href=\"css/bootstrap.min.css\">\n";
    echo "\n\t\t<link rel=\"stylesheet\" href=\"css/bootstrap-theme.min.css\">\n";
}
if ($requirejs == 'Y' || $requirejs == 'y') {
    echo "\n\t\t<link rel=\"stylesheet\" href=\"dist/css/style.min.css\">\n";
}
else {
    echo "\n\t\t<link rel=\"stylesheet\" href=\"css/main.css\">\n";
}
?>
        <script src="js/vendor/modernizr.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>Hello world!</p>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js"><\/script>')</script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js"><\/script>')</script>
        <script src=\"js/plugins.js\"></script>

<?php
if ($bootstrap == 'Y' || $bootstrap == 'y') {
    echo "\n\t\t<script src=\"js/vendor/bootstrap.min.js\"></script>\n";
}

if ($ribs == 'Y' || $ribs == 'y') {
    echo "\n\t\t<script src=\"js/vendor/ribs.min.js\"></script>\n";
}

if ($requirejs == 'Y' || $requirejs == 'y') {
    echo "\n\t\t<!-- change data-main into \"dist/js/..\" before release -->\n";
    echo "\n\t\t<script data-main=\"js/built/main.js\" src=\"js/vendor/require.min.js\"></script>\n";
}

if ($requirejs != 'Y' && $requirejs != 'y') {
    echo "\n\t\t<script src=\"js/main.min.js\"></script>\n";
}
?>
    </body>
</html>

