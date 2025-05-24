<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    // Obtener los datos del formulario
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        $data = $_POST;
    }

    // Validar los datos requeridos
    $required_fields = ['first-name', 'last-name', 'email', 'phone', 'message'];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("El campo {$field} es requerido");
        }
    }

    // Configuración de la base de datos
    $db_host = 'localhost';
    $db_name = 'jyang_db';
    $db_user = 'root';
    $db_pass = '';

    // Conectar a la base de datos
    $conn = new PDO("mysql:host={$db_host};dbname={$db_name}", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparar la consulta SQL
    $sql = "INSERT INTO clientes (nombre_apellido, correo, telefono, mensaje) VALUES (:nombre_apellido, :correo, :telefono, :mensaje)";
    $stmt = $conn->prepare($sql);

    // Combinar nombre y apellido
    $nombre_apellido = $data['first-name'] . ' ' . $data['last-name'];

    // Ejecutar la consulta
    $stmt->execute([
        ':nombre_apellido' => $nombre_apellido,
        ':correo' => $data['email'],
        ':telefono' => $data['phone'],
        ':mensaje' => $data['message']
    ]);

    // Enviar respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Datos guardados correctamente'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}