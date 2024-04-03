<?php

$likes =$_POST["likes"];
$reply =$_POST["reply"];
$retweet =$_POST["retweet"];
$text =$_POST["text"];
$text=str_replace("\n","",$text);
echo shell_exec("python app.py $likes $reply $retweet $text");
?>