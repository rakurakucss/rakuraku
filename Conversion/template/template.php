<?php
$tab = "    ";//'&nbsp;&nbsp;&nbsp;&nbsp;';      //TABキー変わり
$chechary = array_fill(0, 39, 0);
class template {


    public function header($title)
    {
        $tmp = '<!DOCTYPE html>'. "\n";
        $tmp .= '<html lang="ja">'. "\n";
        $tmp .= '<head>'. "\n";
        $tmp .= '<meta charset="UTF-8">'. "\n";
        $tmp .= '<title>'. $title. '</title>'. "\n";
        $tmp .= '</head>'. "\n";
        return $tmp;
    }

    public function body($contents)
    {
        $tmp = "<body>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</body>". "\n";
        return $tmp;
    }
    
    public function div($class, $id, $contents)
    {
        global $chechary;
        $tmp = '<div';
        
        if (!empty($class)) {
            $tmp .= " class=". $class;
        } elseif (!empty($id)) {
            $tmp .= " id=". $id;
        }
        
        $tmp .= '>'. "\n";
        if ($chechary[2] == 0) {
            $tmp .= '<!-- <div>で囲った部分をブロックレベル要素としてグループ化することができるタグです。 -->'. "\n";
            $chechary[2] = 1;
        }
        $tmp .= $contents. "\n";
        $tmp .= '</div>'. "\n";
        return $tmp;
    }
    
    public function span($class, $id, $contents)
    {
        $tmp = '<span';
        
        if (!empty($class)) {
            $tmp .= " class=". $class;
        } elseif (!empty($id)) {
            $tmp .= " id=". $id;
        }
        
        $tmp .= '>'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= '</span>'. "\n";
        return $tmp;
    }

    public function h1_6($size, $contents)
    {
        global $chechary;

        $tmp = '<h'. $size. '>'. "\n";
        if ( $chechary[4] == 0) {
            $tmp .= "<!-- 見出しを意味するタグです。 -->". "\n";
            $chechary[4] = 1;
        }
        $tmp .= $contents. "\n";
        $tmp .= '</h'. $size. '>'. "\n";
        return $tmp;
    }

    public function address($contents)
    {
        $tmp = "<address>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</address>". "\n";
        return $tmp;
    }

    
    public function p($contents)
    {
        $tmp = '<p>'. $contents. '</p>'. "\n";
        return $tmp;
    }
    
    public function br()
    {
        $tmp = '<br>'. "\n";
        return $tmp;
    }

    public function a($link, $contents)
    {
        global $chechary;
        $tmp = '<a href="'. $link. '">'. "\n";
        if ( $chechary[8] == 0) {
            $tmp .= "<!-- リンクの出発点や到達点を指定するタグです。 -->". "\n";
            $chechary[8] = 1;
        }
        $tmp .= $contents. '</a>'. "\n";
        return $tmp;
    }

    public function link($link, $contents)
    {
        $tmp = '<link rel="'. $contents. '" href="'. $link. '">'. "\n";
        return $tmp;
    }

    public function ul($contents)
    {
        $tmp = "<ul>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</ul>";
        return $tmp;
    }

    public function ol($contents)
    {
        $tmp = "<ol>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</ol>";
        return $tmp;
    }

    public function li($contents)
    {
        global $chechary;
        $tmp = "<li>". "\n";
        if ($chechary[12] == 0) {
            $tmp .= "<!-- リストの項目を表示するために使用するタグです。 -->". "\n";
            $chechary[12] = 1;
        }
        $tmp .= $contents. "\n";
        $tmp .= "</li>". "\n";
        return $tmp;
    }

    public function dt($contents)
    {
        $tmp = "<dt>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</dt>";
        return $tmp;
    }

    public function dd($contents)
    {
        $tmp = "<dd>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</dd>";
        return $tmp;
    }

    public function dir($contents)
    {
        $tmp = "<dir>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</dir>";
        return $tmp;
    }

    public function menu($contents)
    {
        $tmp = "<menu>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</menu>";
        return $tmp;
    }


    public function img($link, $contents)
    {
        $tmp = '<img src="'. $link. '" alt="'. $contents. '">'. "\n";
        return $tmp;
    }

    public function map($title, $contents)
    {
        $tmp = '<map name="'. $title. '">'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= '</map>'. "\n";
        return $tmp;
    }

    public function area($title)
    {
        $tmp = '<area alt="'. $title. '">'. "\n";
        return $tmp;
    }

    public function object($contents)
    {
        $tmp = "<object>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</object>". "\n";
        return $tmp;
    }

    public function param($title, $contents)
    {
        $tmp = '<param name="'. $title. '"';

        if (!empty($contents)) {
            $tmp .= ' value="'. $contents. '"';
        }

        $tmp .= '>'. "\n";
        return $tmp;
    }

    public function table($contents)
    {
        $tmp = "<table>\n";
        $tmp .= $contents. "\n";
        $tmp .= "</table>\n";
        return $tmp;
    }

    public function caption($title)
    {
        $tmp = "<caption>";
        $tmp .= $title;
        $tmp .= "</caption>";
        return $tmp;
    }

    public function thead($contents)
    {
        $tmp = "<thead>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</thead>". "\n";
        return $tmp;
    }

    public function tfoot($contents)
    {
        $tmp = "<tfoot>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</tfoot>". "\n";
        return $tmp;
    }

    public function tbody($contents)
    {
        $tmp = "<tbody>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</tbody>". "\n";
        return $tmp;
    }

    public function colgroup($contents)
    {
        $tmp = "<colgroup>". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</colgroup>". "\n";
        return $tmp;
    }

    public function col($span, $width, $align)
    {
        $tmp = "<col";

        if (!empty($span)) {
            $tmp .= ' span="'. $span. '"';
        } 
        if (!empty($width)) {
            $tmp .= ' width="'. $width. '"';
        } 
        if (!empty($align)) {
            $tmp .= ' align="'. $align. '"';
        }
        
        $tmp .= ">". "\n";
        return $tmp;
    }

    public function th($contents)
    {
        $tmp = "<th>\n";
        $tmp .= $contents. "\n";
        $tmp .= "</th>\n";
        return $tmp;
    }

    public function tr($contents)
    {
        $tmp = "<tr>\n";
        $tmp .= $contents. "\n";
        $tmp .= "</tr>\n";
        return $tmp;
    }

    public function td($contents)
    {
        $tmp = "<td>\n";
        $tmp .= $contents. "\n";
        $tmp .= "</td>\n";
        return $tmp;
    }

    public function form($action, $method, $name, $contents)
    {
        $tmp = '<form action="'. $action. '"';

        if (!empty($method)) {
            $tmp .= ' method="'. $method. '"';
        }
        if (!empty($name)) {
            $tmp .= ' name="'. $name. '"';
        }
        $tmp .= ">". "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</form>". "\n";
        return $tmp;
    }

    public function input($type, $name, $value)
    {
        $tmp = "<input";

        if (!empty($type)) {
            $tmp .= ' type="'. $type. '"';
        }
        if (!empty($name)) {
            $tmp .= ' name="'. $name. '"';
        }
        if (!empty($value)) {
            $tmp .= ' value="'. $value. '"';
        }
        $tmp .= ">". "\n";
        return $tmp;
    }

    public function textarea($cols, $rows, $name, $contents)
    {
        $tmp = '<textarea cols="'. $cols. '" rows="'. $rows. '"';
        
        if (!empty($name)) {
            $tmp .= ' name="'. $name. '"';
        }
        $tmp .= '>'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</textarea>". "\n";
        return $tmp;
    }

    public function select($name, $contents)
    {
        $tmp ='<select name="'. $name. '">'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= "</select>". "\n";
        return $tmp;
    }

    public function option($value, $contents)
    {
        $tmp = '<option value="'. $value. '">'. $contents. "</option>". "\n";
        return $tmp;
    }

    public function button($type, $name, $value, $contents)
    {
        $tmp = "<button";

        if (!empty($type)) {
            $tmp .= ' type="'. $type. '"';
        }
        if (!empty($name)) {
            $tmp .= ' name="'. $name. '"';
        }
        if (!empty($value)) {
            $tmp .= ' value='. $value. '"';
        }

        $tmp .= ">". $contents. "</button>". "\n";
        return $tmp;
    }

    public function label($for, $contents)
    {
        $tmp = '<label';

        if (!empty($for)) {
            $tmp .= ' for="'. $for. '"';
        }
        $tmp .= ">". $contents. "</label>". "\n";
        return $tmp;
    }
}
?>
