<?php
include_once('../conection/db.php');
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado']);
    exit();
}

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// Obtener datos del cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Validar los datos requeridos
if (!isset($input['client_name']) || !isset($input['case_type']) || 
    !isset($input['status']) || !isset($input['start_date']) || 
    !isset($input['assigned_to'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit();
}

// Preparar la consulta SQL para insertar los datos en la base de datos
$sql = "INSERT INTO records (client_name, case_type, status, start_date, assigned_to, case_notes) 
        VALUES (?, ?, ?, ?, ?, ?)";

// Preparar la consulta
$stmt = $conexion->prepare($sql);

// Verificar si la consulta se preparó correctamente
if ($stmt === false) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta']);
    exit();
}

// Bindear los parámetros a la consulta
$client_name = $input['client_name'];
$case_type = $input['case_type'];
$status = $input['status'];
$start_date = $input['start_date'];
$assigned_to = $input['assigned_to'];
$case_notes = isset($input['case_notes']) ? $input['case_notes'] : '';

// Vincular los parámetros y ejecutar la consulta
$stmt->bind_param("ssssss", $client_name, $case_type, $status, $start_date, $assigned_to, $case_notes);

// Ejecutar la consulta
if ($stmt->execute()) {
    $new_record = [
        'client_name' => $client_name,
        'case_type' => $case_type,
        'status' => $status,
        'start_date' => $start_date,
        'assigned_to' => $assigned_to,
        'case_notes' => $case_notes
    ];
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Caso creado exitosamente', 'record' => $new_record]);
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al insertar el registro']);
}

// Cerrar la consulta y la conexión
$stmt->close();
$conexion->close();
exit();
?>
