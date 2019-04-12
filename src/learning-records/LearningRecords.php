<?php

/******************************************************************************
 Data Structures E-Learning Power
 Ciprian-Bogdan Chirila
 chirila@cs.upt.ro
 http://www.cs.upt.ro/~chirila
 date: 01.03.2019
 ******************************************************************************/

include "../../database.php";

if(isset($_GET["create"]))
{
    session_start();
    
    if(isset($_SESSION["name"]))
    {
        $name=$_SESSION["name"];
    }
    else
    {
        $name="anonymous";
    }
    
    if(isset($_SESSION["firstName"]))
    {
        $firstName=$_SESSION["firstName"];
    }
    else
    {
        $firstName="anonymous";
    }
    
    if(isset($_SESSION["lastName"]))
    {
        $lastName=$_SESSION["lastName"];
    }
    else
    {
        $lastName="anonymous";
    }
    
    if(isset($_SESSION["nickName"]))
    {
        $nickName=$_SESSION["nickName"];
    }
    else
    {
        $nickName="anonymous";
    }
    
    if(isset($_SESSION["email"]))
    {
        $email=$_SESSION["email"];
    }
    else
    {
        $email="anonymous@anonymous.com";
    }
    
    if(isset($_SESSION["loginMethod"]))
    {
        $loginMethod=$_SESSION["loginMethod"];
    }
    else
    {
        $loginMethod="noLoginMethod";
    }
    
    if(isset($_GET["tableOfSymbols"]))
    {
        $tableOfSymbols=$_GET["tableOfSymbols"];
    }
    else
    {
        $tableOfSymbols="";
    }

    if(isset($_GET["question"]))
    {
        $question=$_GET["question"];
    }
    else
    {
        $question="";
    }

    if(isset($_GET["answer"]))
    {
        $answer=$_GET["answer"];
    }
    else
    {
        $answer="";
    }
    
    if(isset($_GET["feedback"]))
    {
        $feedback=$_GET["feedback"];
    }
    else
    {
        $feedback="";
    }
        
    if(isset($_GET["result"]))
    {
        $result=$_GET["result"];
    }
    else
    {
        $result="";
    }
        
    $connection=new mysqli($host,$user,$password,$database);
    if(!$connection->connect_error)
    {
        $query="INSERT INTO learning_records(name,firstName,lastName,nickName,email,loginMethod,tableOfSymbols,question,answer,feedback,result)
            VALUES ('".$name."','".$firstName."','".$lastName."','".$nickName."','".$email."','".$loginMethod."','".
            $tableOfSymbols."','".$question."','".$answer."','".$feedback."','".$result."')";
        echo $query;
        $result=$connection->query($query);
        echo $result;
        $connection->close();
    }
}
?>
