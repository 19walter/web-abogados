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

// Validar ID y datos requeridos
if (!isset($input['id']) || !isset($input['client_name']) || !isset($input['case_type']) || 
    !isset($input['status']) || !isset($input['start_date']) || !isset($input['assigned_to'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit();
}

// Convertir ID a entero
$id = intval($input['id']);
$client_name = $input['client_name'];
$case_type = $input['case_type'];
$status = $input['status'];
$start_date = $input['start_date'];
$assigned_to = $input['assigned_to'];
$case_notes = isset($input['case_notes']) ? $input['case_notes'] : '';

// Consulta SQL SEGURA con consultas preparadas
$sql = "UPDATE records SET 
            client_name = ?, 
            case_type = ?, 
            status = ?, 
            start_date = ?, 
            assigned_to = ?, 
            case_notes = ?
        WHERE id = ?";

// Preparar la consulta
$stmt = $conexion->prepare($sql);
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta']);
    exit();
}

// Asociar parámetros
$stmt->bind_param("ssssssi", $client_name, $case_type, $status, $start_date, $assigned_to, $case_notes, $id);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Caso actualizado exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el caso']);
}

// Cerrar la consulta y conexión
$stmt->close();
$conexion->close();
?>
