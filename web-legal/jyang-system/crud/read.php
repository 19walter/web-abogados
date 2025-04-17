<?php
include_once('../conection/db.php');
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit();
}

// Si se solicita un ID específico
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Convertir a entero para evitar inyección SQL

    // Consulta segura con `mysqli`
    $sql = "SELECT * FROM records WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    
    if ($stmt === false) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error en la consulta']);
        exit();
    }

    // Asociar parámetros y ejecutar
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si hay resultados
    if ($resultado->num_rows > 0) {
        $registro = $resultado->fetch_assoc();
        echo json_encode($registro);
    } else {
        echo json_encode(['error' => 'Registro no encontrado']);
    }

    $stmt->close();
} else {
    // Si no se proporciona un ID, obtener todos los registros
    $sql = "SELECT * FROM records";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        $registros = [];
        while ($fila = $resultado->fetch_assoc()) {
            $registros[] = $fila;
        }
        echo json_encode($registros);
    } else {
        echo json_encode([]);
    }
}

// Cerrar conexión
$conexion->close();
exit();
?>
