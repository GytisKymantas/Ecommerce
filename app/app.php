<?php

    

    $vardas=trim($_POST['vardas']);
    $email=trim($_POST['email']);
    $message=trim($_POST['message']);

    if(!empty($vardas) && !empty($email) && !empty($message)) {
        if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $from = "$email";
            $to ="gytis.kymantas@yahoo.com";
            $subject = "nauja zinute";
            $autorius = 'nuo: '.$vardas.','.$email;
            $zinute = htmlspecialchars($message);
            mail($to, $subject, $autorius, $zinute, $from);
            // echo "<script>alert('dekojame. jusu zinute gauta');</script>" ;       
        }
    }
    include('db.php');