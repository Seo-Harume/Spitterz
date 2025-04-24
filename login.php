<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db   = "user_register";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$email    = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    // Simpan session jika perlu
    $_SESSION['username'] = $user['username'];
    header("Location: dashboard.html"); // arahkan ke halaman setelah login
    exit();
  } else {
    echo "Password salah!";
  }
} else {
  echo "Email tidak ditemukan!";
}

$stmt->close();
$conn->close();
?>
