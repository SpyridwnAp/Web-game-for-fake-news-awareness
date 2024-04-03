<?php

$mytoken = "AAAAAAAAAAAAAAAAAAAAAHBLoAEAAAAACoWJJj5JLlLEI67D7IqVoMvmR%2FM%3D2TaSghojG7Rz3q9w9tzLeKD9o14XBOeiTNTaQOOGfaPXVnxoBi";


$tweetId =$_POST["tweetLink"];
echo $tweetId;

$url="https://api.twitter.com/2/tweets?ids=$tweetId&tweet.fields=public_metrics";

$ch = curl_init();

curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);



curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' .$mytoken));

$server_output = curl_exec($ch);
echo $server_output;
curl_close ($ch);

?>