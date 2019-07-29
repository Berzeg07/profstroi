<?php
$to = "test@yandex.ru";
$inp1 = $_POST['inp-1'];
$inp2 = $_POST['inp-2'];


// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers  = "From: info@starlight.space" . "\r\n";
$headers .= "Reply-To: info@starlight.space".  "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body>";
$msg .= "<h2>Новое сообщение</h2>\r\n";
$msg .= "<p><strong>dsdffg:</strong> ".$inp1."</p>\r\n";
$msg .= "<p><strong>dffg:</strong> ".$inp2."</p>\r\n";
$msg .= "</body></html>";


// отправка сообщения
@mail($to, $subject, $msg, $headers);
?>
