<?php
$email = $_POST['email'];
$name = $_POST['name'];
$phone = $_POST['phone'];

if(mail($email, 'Test email, for ', $name .' '.$phone)){
    echo 'Thanks!'
}
?>
