<?php

if (isset($_POST["submit"])){
    $name = $_POST["name"];
    $subject = $_POST["subject"];
    $emailFrom = $_POST["email"];
    $message = $_POST["message"];
    
    $mailTo = "math11078@upnet.gr";
    
    $headers = "From: ".$emailFrom;
    $txt = "You have received an email from ".$name.".\n\n".$message;
    
    mail($mailTo, $subject, $txt, $headers);
    header("Location: contact.php?mailsend");
    
}

?>
