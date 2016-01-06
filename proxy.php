<?php
$url = $_GET["url"];
$params = $_GET;
$c =0;
if(count($params) > 1){
    foreach($params as $param => $value){
        if($c > 0){
            $url = $url.'&'.$param.'='.$value;
        }
        $c++;
    }
}
print(file_get_contents($url));