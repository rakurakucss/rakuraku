<?php
class template {

    public function header($title)
    {
        echo htmlspecialchars('<!DOCTYPE html>'). "<br>";
        echo htmlspecialchars('<html lang="ja">'). "<br>";
        echo htmlspecialchars('<head>'). "<br>";
        echo htmlspecialchars('<meta charset="UTF-8">'). "<br>";
        echo htmlspecialchars('<title>'. $title. '</title>'). "<br>";
        echo htmlspecialchars('</head>'). "<br>";
    }
    
    public function div($contents, $class, $id)
    {
        echo htmlspecialchars('<div');
        
        if (!empty($class)) {
            echo " class=". $class;
        } elseif (!empty($id)) {
            echo " id=". $id;
        }
        
        echo htmlspecialchars('>'). "<br>";
        echo htmlspecialchars($contents). "<br>";
        echo htmlspecialchars('</div>'). "<br>";
    }
    
    public function span($contents, $class, $id)
    {
        echo htmlspecialchars('<span');
        
        if (!empty($class)) {
            echo " class=". $class;
        } elseif (!empty($id)) {
            echo " id=". $id;
        }
        
        echo htmlspecialchars('>'). "<br>";
        echo htmlspecialchars($contents). "<br>";
        echo htmlspecialchars('</span>'). "<br>";
    }

    public function h1_6($contents, $size)
    {
        echo htmlspecialchars('<h'. $size. '>'). "<br>";
        echo htmlspecialchars($contents). "<br>";
        echo htmlspecialchars('</h'. $size. '>'). "<br>";
    }
    
    public function p($contents)
    {
        echo htmlspecialchars('<p>'. $contents. '</p>'). "<br>";
    }
    
    public function br()
    {
        echo htmlspecialchars('<br>'). "<br>";
    }

    public function a($link, $contents)
    {
        echo htmlspecialchars('<a href="'. $link. '">'. $contents. '</a>'). "<br>";
    }
}
?>