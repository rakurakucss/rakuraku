<?php
require_once __DIR__. '/template.php';
$template = new template();

// test--

    $convary = $_POST['ary'];
//   if(isset($_POST['ary'])){
//     // POSTで送られてきた場合
//     $convary = $_POST['ary'];
//   }else{
//     // GETで送られてきた場合
//     echo "not get ary";
//   }

Conversion($template, $convary);
// --test

function Conversion($template, $convary)
{
    foreach ($convary as $array) {

        switch ($array[1]) {
            case "3":
                echo nl2br(htmlspecialchars($template->div($array[2], $array[3], $array[5])));
            break;
                
            case "5":
                echo nl2br(htmlspecialchars($template->h1_6($array[2], $array[5])));
            break;

            case "9":
                echo nl2br(htmlspecialchars($template->a($array[2], $array[5])));
            break;

            case "13":
                echo nl2br(htmlspecialchars($template->li($array[5])));
            break;

            default:
                echo "test";
                break;
        }
    }
}
?>