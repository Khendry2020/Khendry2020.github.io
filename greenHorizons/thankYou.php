<!DOCTYPE html>
<!--
Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHPWebPage.php to edit this template
-->
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap, CSS, and Font-awesome -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="./main.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <title>Green Horizon's</title>
    </head>

    <body id="backgroundImg">
        <nav>
            <ul id="nav" class="nav justify-content-center navbar-fixed-top sticky">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Gallery</a>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Reviews</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Contact</a>
                </li>
            </ul>
        </nav>
        <!--End of Nav-->
        <h1>Thank You</h1>
        <?php //Read Input's
          $firstName = filter_input(INPUT_POST, 'firstName');
          $lastName = filter_input(INPUT_POST, 'lastName');
          $phoneNumber = filter_input(INPUT_POST, 'phoneNumber');
          $subject = filter_input(INPUT_POST, 'subject');
          $email = filter_input(INPUT_POST, 'email');
          $message = filter_input(INPUT_POST, 'message');
          
          //Vallidate Input\\
          if ($firstName == NULL || $lastName == NULL ||
                   $subject == NULL || $email ==NULL || 
                   $message == NULL || $phoneNumber == NULL) {
              $error = "Invailid data. Please try again.";
              echo "Form error" . $error;
              exit();
          } else {
              //define pdo & insert data\\
              try {
                  $dsn = 'mysql:localhost;dbname=green_horizon';
                  $username = 'root';
                  $password = 'Simon2012!';
                  $db = new PDO($dsn, $username, $password);
              } catch (PDOException $ex) {
                  $error_message = $e->getMessage();
                  echo 'DB ERROR: ' .$error_message;
              }
              
              //add to database
              $query = 'INSERT INTO visit ($firstName, $lastName, $email, $phoneNumber,$subject, $message) VALUES (:firstName, :lastName, :email, :phoneNumber :subject, :message) NOW(), 1';
              $statement = $db->prepare($query);
              $statement -> bindValue(':firstName', $firstName);
              $statement -> bindValue(':lastName', $lastName);
              $statement -> bindValue(':phoneNumber', $phoneNumber);
              $statement -> bindValue(':email', $email);
              $statement -> bindValue(':subject', $subject);
              $statement -> bindValue(':message', $message);
              $statement->execute();
              $statement->closeCursor();
          }
        ?> 
    </body>
</html>
