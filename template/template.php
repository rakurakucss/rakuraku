<?php
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
    
    public function div($contents, $class, $id)
    {
        $tmp = '<div';
        
        if (!empty($class)) {
            $tmp .= " class=". $class;
        } elseif (!empty($id)) {
            $tmp .= " id=". $id;
        }
        
        $tmp .= '>'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= '</div>'. "\n";
        return $tmp;
    }
    
    public function span($contents, $class, $id)
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

    public function h1_6($contents, $size)
    {
        $tmp = '<h'. $size. '>'. "\n";
        $tmp .= $contents. "\n";
        $tmp .= '</h'. $size. '>'. "\n";
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
        $tmp = '<a href="'. $link. '">'. $contents. '</a>'. "\n";
        return $tmp;
    }

    public function link($link, $contents)
    {
        $tmp = '<link rel="'. $contents. '" href="'. $link. '">'. "\n";
        return $tmp;
    }

    public function img($link, $contents)
    {
        $tmp = '<img src="'. $link. '" alt="'. $contents. '">'. "\n";
        return $tmp;
    }

    public function table($contents)
    {
        $tmp = "<table>\n";
        $tmp .= $contents. "\n";
        $tmp .= "</table>\n";
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
}
?>