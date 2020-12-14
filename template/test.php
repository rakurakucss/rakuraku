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
$span = 2;
$align = "center";
$width = 100;
$method = "post";
$name = "test";
$value = "value";
$type = "text";
$cols = 50;
$rows = 10;
$for = "IDname";
// --test

// echo nl2br(htmlspecialchars($template->header($title)));
// echo nl2br(htmlspecialchars($template->div($template->h1_6($contents, $size), $class, $id)));
// echo nl2br(htmlspecialchars($template->span($contents, $class, $id)));
// echo nl2br(htmlspecialchars($template->h1_6($contents, $size)));
// echo nl2br(htmlspecialchars($template->p($contents)));
// echo nl2br(htmlspecialchars($template->br()));
// echo nl2br(htmlspecialchars($template->a($link, $contents)));
// echo nl2br(htmlspecialchars($template->link($link, $contents)));
// echo nl2br(htmlspecialchars($template->img($link, $contents)));
// echo nl2br(htmlspecialchars($template->table($contents)));
// echo nl2br(htmlspecialchars($template->td($template->tr($contents))));
// echo nl2br(htmlspecialchars($template->body($contents)));
// echo nl2br(htmlspecialchars($template->address($contents)));
// echo nl2br(htmlspecialchars($template->map($title, $contents)));
// echo nl2br(htmlspecialchars($template->area($title)));
// echo nl2br(htmlspecialchars($template->param($title, $contents)));
// echo nl2br(htmlspecialchars($template->table($template->caption($title))));
// echo nl2br(htmlspecialchars($template->thead($contents)));
// echo nl2br(htmlspecialchars($template->col($span, $width, $align)));
echo nl2br(htmlspecialchars($template->form($link, $method, $name)));
echo nl2br(htmlspecialchars($template->input($type, $name, $value)));
echo nl2br(htmlspecialchars($template->textarea($cols, $rows, $name, $contents)));
echo nl2br(htmlspecialchars($template->select($name, $contents)));
echo nl2br(htmlspecialchars($template->option($value, $contents)));
echo nl2br(htmlspecialchars($template->button($contents, $name, $type, $value)));
echo nl2br(htmlspecialchars($template->label($contents, $for)));

?>