<?php
require_once __DIR__. '/template.php';
// echo htmlspecialchars(''). "<br>";

$template = new template();
// test--
$contents = "hello world";  //
$class = "test";
$id = "test";
$size = "1";
$title = "タイトル";
$link = "index.html";
// --test

$template->header($title);
$template->div($contents, $class, $id);
$template->span($contents, $class, $id);
$template->h1_6($contents, $size);
$template->p($contents);
$template->br();
$template->a($link, $contents);

?>