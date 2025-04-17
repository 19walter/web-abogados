<?php
include_once('../conection/db.php');
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado']);
    exit();
}

// Verificar si la solicitud es GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// Obtener el ID de la URL
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Validar ID
if (!$id) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
    exit();
}

// Eliminar de la base de datos de manera segura
$sql = "DELETE FROM records WHERE id = ?";
$stmt = $conexion->prepare($sql);

if ($stmt === false) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
    exit();
}

$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Registro eliminado exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registro no encontrado']);
}

// Cerrar conexión
$stmt->close();
$conexion->close();
exit();
?>
