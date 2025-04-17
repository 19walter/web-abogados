<?php
// Start session for login functionality
session_start();

include_once('conection/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Evitar inyección SQL
    $username = $conexion->real_escape_string($username);
    
    // Consulta a la base de datos
    $sql = "SELECT * FROM usuarios WHERE usuario = '$username'";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        
        // Comparar contraseña (sin encriptar, pero lo ideal es usar `password_verify()`)
        if ($password === $fila["contrasena"]) {
            $_SESSION["logged_in"] = true;
            $_SESSION["username"] = $fila["usuario"];
            header("Location: dashboard.php");
            exit();
        } else {
            $error_message = "Contraseña incorrecta.";
        }
    } else {
        $error_message = "El usuario no existe.";
    }
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JYANG - Sistema de Registros</title>
    <link rel="stylesheet" href="assets/css/login.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="logo-container">
                <div class="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="rabbit-logo">
                        <path d="M330.6 217.4c-16.8-12.4-36.6-20.4-57.7-22.4c0.4-1.1 0.8-2.3 1.1-3.5c2.2-8.2 2.5-16.7 1-24.9l-2.1-10.2c-2.2-10.9-9.4-20.2-19.5-25.3c-6.9-3.5-14.6-4.4-22-2.8l-60.1 12.5c-7.4 1.5-14.1 5.7-19 11.8l-6.9 8.7c-4.9 6.1-7.7 13.7-8 21.6c-0.2 5.2 0.7 10.3 2.4 15.3c-24.3 3.8-45.6 17.6-59.4 38.2C70.5 250.2 64 267.8 64 285.9V304c0 24.1 13.7 46.3 35.4 57.3l35.7 17.8c6.9 3.5 10.7 5.5 16.2 5.9l140.7 14.1c8 0.8 13.9-0.9 22.6-4.5l13.1-5.2c26.5-10.6 44.5-35.8 45.5-64.3l1.5-43.8c0.6-15.1-5-29.8-15.7-40.7c-7.9-8-17.8-13.8-28.4-16.9zm-37.1 44.5c13.3 0 24 10.7 24 24s-10.7 24-24 24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" fill="#1D3557"/>
                    </svg>
                </div>
                <h1>JYANG</h1>
                <p class="subtitle"></p>
                <p class="company">.</p>
            </div>
            
            <h2 class="welcome-text">¡Bienvenido al sistema de registros!</h2>
            <p class="instruction-text">Por favor, inicia sesión en tu cuenta y comienza a usar nuestro sistema</p>
            
            <?php if (isset($error_message)): ?>
                <div class="error-message"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    <div class="form-group">
        <label for="username">EMAIL O USUARIO</label>
        <input type="text" id="username" name="username" placeholder="Ingresa tu email o usuario" required>
    </div>
    
    <div class="form-group">
        <label for="password">CONTRASEÑA</label>
        <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required>
    </div>
    
    <button type="submit" class="login-btn">Iniciar sesión</button>
    <button type="button" class="login-btn btn-spacing" onclick="window.location.href='../index.html';">Volver a la página de inicio</button>
</form>

<style>
    .login-btn {
    display: block;
    width: 100%; /* Ajusta al diseño deseado */
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    text-align: center;
    margin: 5px 0; /* Espaciado general entre botones */
}

.btn-spacing {
    margin-top: 15px; /* Espaciado específico para el segundo botón */
}

</style>

        </div>
    </div>
    
    <script src="assets/js/login.js"></script>
</body>
</html>
