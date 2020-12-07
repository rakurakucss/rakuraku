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

echo nl2br(htmlspecialchars($template->header($title)));
echo nl2br(htmlspecialchars($template->div($template->h1_6($contents, $size), $class, $id)));
echo nl2br(htmlspecialchars($template->span($contents, $class, $id)));
echo nl2br(htmlspecialchars($template->h1_6($contents, $size)));
echo nl2br(htmlspecialchars($template->p($contents)));
echo nl2br(htmlspecialchars($template->br()));
echo nl2br(htmlspecialchars($template->a($link, $contents)));
echo nl2br(htmlspecialchars($template->link($link, $contents)));
echo nl2br(htmlspecialchars($template->img($link, $contents)));
echo nl2br(htmlspecialchars($template->table($contents)));
echo nl2br(htmlspecialchars($template->td($template->tr($contents))));

?>