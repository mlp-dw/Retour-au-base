<?php
    require "./database.php";
    
    if($_POST["position"] == -1){
        $hackPosition=$db->prepare("DELETE FROM users WHERE name = ?");
        $hackPosition->execute([$_POST["username"]]);
    }else{
        $exist=$db->prepare("SELECT name FROM users WHERE name = ?");
        $exist->execute([$_POST["username"]]);
        $isTrue = $exist->fetch();
    
        if($isTrue){
            $updateName=$db->prepare("UPDATE users SET position = ? WHERE name = ?");
            $updateName->execute([$_POST["position"], $_POST["username"]]);
        }else{
            $statement=$db->prepare("INSERT INTO users (name, position, color) VALUES (?,?,?)");
            $statement->execute([$_POST["username"], $_POST["position"], $_POST["color"]]);
        }
    }
    


    //echo json_encode();

