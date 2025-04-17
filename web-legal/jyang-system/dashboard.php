<?php
// Start session to check if user is logged in
session_start();

// Check if user is logged in, if not redirect to login page
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header("Location: index.php");
    exit();
}

include_once('conection/db.php');
// Dummy data for CRUD operations (since we're not using a database)
// Consulta para obtener los registros de la base de datos
$sql = "SELECT id, client_name, case_type, status, start_date, assigned_to FROM records";
$result = $conexion->query($sql);

// Si hay registros, los guardamos en la sesión
if ($result->num_rows > 0) {
    $_SESSION["records"] = [];
    while ($row = $result->fetch_assoc()) {
        $_SESSION["records"][] = $row;
    }
} else {
    $_SESSION["records"] = []; // Si no hay datos, inicializamos la variable vacía
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JYANG - Panel de Control de Bufete</title>
    <link rel="stylesheet" href="assets/css/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="sidebar">
            <div class="logo-container">
                <div class="logo">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <h1>JYANG</h1>
                <p>Bufete Legal</p>
            </div>
            <nav>
                <ul>
                    <li class="active"><a href="#"><i class="fas fa-tachometer-alt"></i> Gestion de Casos</a></li>
                    <li><a href="#"><i class="fas fa-gavel"></i> Casos</a></li>
                    <li><a href="#"><i class="fas fa-users"></i> Clientes</a></li>
                    <li><a href="#"><i class="fas fa-calendar-alt"></i> Audiencias</a></li>
                    <li><a href="#"><i class="fas fa-file-contract"></i> Documentos</a></li>
                    <li><a href="#"><i class="fas fa-money-bill-wave"></i> Facturación</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Configuración</a></li>
                </ul>
            </nav>
            <div class="logout">
                <a href="index.php?logout=true"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
            </div>
        </aside>
        
        <main class="content">
            <header class="top-bar">
                <div class="welcome">
                    <h2>Bienvenido, <?php echo htmlspecialchars($_SESSION["username"]); ?>!</h2>
                    <p>Panel de Gestión de Casos Legales</p>
                </div>
                <div class="user-info">
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="badge">3</span>
                    </div>
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="username"><?php echo htmlspecialchars($_SESSION["username"]); ?></span>
                </div>
            </header>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="stat-info">
                        <h3>12</h3>
                        <p>Casos Actuales</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-info">
                        <h3>5</h3>
                        <p>Audiencias Próximas</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-hourglass-half"></i>
                    </div>
                    <div class="stat-info">
                        <h3>8</h3>
                        <p>En Proceso</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>24</h3>
                        <p>Casos Completados</p>
                    </div>
                </div>
            </div>
            
            <section class="crud-container">
                <div class="crud-header">
                    <h3>Gestión de Casos</h3>
                    <button id="add-record-btn" class="primary-btn"><i class="fas fa-plus"></i> Nuevo Caso</button>
                </div>
                
                <div class="filters">
                    <div class="filter-group">
                        <label for="status-filter">Estado:</label>
                        <select id="status-filter">
                            <option value="">Todos</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Activo">Activo</option>
                            <option value="Completado">Completado</option>
                            <option value="En espera">En espera</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="case-type-filter">Tipo de Caso:</label>
                        <select id="case-type-filter">
                            <option value="">Todos</option>
                            <option value="Divorcio">Divorcio</option>
                            <option value="Demanda laboral">Demanda laboral</option>
                            <option value="Contrato comercial">Contrato comercial</option>
                            <option value="Propiedad intelectual">Propiedad intelectual</option>
                        </select>
                    </div>
                    <div class="search-group">
                        <input type="text" id="search-input" placeholder="Buscar cliente...">
                        <button id="search-btn"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                
                <div class="crud-content">
                    <table class="records-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Tipo de Caso</th>
                                <th>Estado</th>
                                <th>Fecha Inicio</th>
                                <th>Asignado a</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="records-body">
                            <?php foreach ($_SESSION["records"] as $record): ?>
                            <tr data-id="<?php echo $record['id']; ?>">
                                <td><?php echo $record['id']; ?></td>
                                <td><?php echo htmlspecialchars($record['client_name']); ?></td>
                                <td><?php echo htmlspecialchars($record['case_type']); ?></td>
                                <td>
                                    <span class="status-badge <?php echo strtolower(str_replace(' ', '-', $record['status'])); ?>">
                                        <?php echo $record['status']; ?>
                                    </span>
                                </td>
                                <td><?php echo $record['start_date']; ?></td>
                                <td><?php echo htmlspecialchars($record['assigned_to']); ?></td>
                                <td class="actions">
                                    <button class="view-btn" data-id="<?php echo $record['id']; ?>"><i class="fas fa-eye"></i></button>
                                    <button class="edit-btn" data-id="<?php echo $record['id']; ?>"><i class="fas fa-edit"></i></button>
                                    <button class="delete-btn" data-id="<?php echo $record['id']; ?>"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                
                <div class="pagination">
                    <button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            </section>
            
            <section class="upcoming-section">
                <div class="section-header">
                    <h3>Próximas Audiencias</h3>
                    <a href="#" class="view-all">Ver todas <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="upcoming-events">
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">30</span>
                            <span class="month">Mar</span>
                        </div>
                        <div class="event-details">
                            <h4>Audiencia preliminar</h4>
                            <p>Cliente: Juan Pérez</p>
                            <p>Juzgado Civil #5 - 10:30 AM</p>
                        </div>
                        <div class="event-actions">
                            <button class="action-btn"><i class="fas fa-calendar-alt"></i></button>
                            <button class="action-btn"><i class="fas fa-file-alt"></i></button>
                        </div>
                    </div>
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">02</span>
                            <span class="month">Abr</span>
                        </div>
                        <div class="event-details">
                            <h4>Mediación</h4>
                            <p>Cliente: María Rodríguez</p>
                            <p>Centro de Mediación - 09:00 AM</p>
                        </div>
                        <div class="event-actions">
                            <button class="action-btn"><i class="fas fa-calendar-alt"></i></button>
                            <button class="action-btn"><i class="fas fa-file-alt"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    
    <!-- Modal for adding/editing records -->
    <div id="record-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3 id="modal-title">Agregar Nuevo Caso</h3>
            <form id="record-form">
                <input type="hidden" id="record-id" value="">
                
                <div class="form-group">
                    <label for="client_name">Nombre del Cliente:</label>
                    <input type="text" id="client_name" name="client_name" required>
                </div>
                
                <div class="form-group">
                    <label for="case_type">Tipo de Caso:</label>
                    <select id="case_type" name="case_type" required>
                        <option value="">Seleccione un tipo</option>
                        <option value="Divorcio">Divorcio</option>
                        <option value="Demanda laboral">Demanda laboral</option>
                        <option value="Contrato comercial">Contrato comercial</option>
                        <option value="Propiedad intelectual">Propiedad intelectual</option>
                        <option value="Derecho penal">Derecho penal</option>
                        <option value="Inmobiliario">Inmobiliario</option>
                        <option value="Sucesiones">Sucesiones</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="status">Estado:</label>
                    <select id="status" name="status" required>
                        <option value="En proceso">En proceso</option>
                        <option value="Activo">Activo</option>
                        <option value="Completado">Completado</option>
                        <option value="En espera">En espera</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="start_date">Fecha de Inicio:</label>
                    <input type="date" id="start_date" name="start_date" required>
                </div>
                
                <div class="form-group">
                    <label for="assigned_to">Asignado a:</label>
                    <select id="assigned_to" name="assigned_to" required>
                        <option value="">Seleccione un abogado</option>
                        <option value="Dr. García">Dr. García</option>
                        <option value="Dra. Sánchez">Dra. Sánchez</option>
                        <option value="Dr. Martínez">Dr. Martínez</option>
                        <option value="Dra. López">Dra. López</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="case_notes">Notas del Caso:</label>
                    <textarea id="case_notes" name="case_notes" rows="4"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="cancel-btn" id="cancel-btn">Cancelar</button>
                    <button type="submit" class="save-btn">Guardar</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- View case details modal -->
    <div id="view-modal" class="modal">
        <div class="modal-content view-modal-content">
            <span class="close-modal">&times;</span>
            <h3>Detalles del Caso</h3>
            <div class="case-details">
                <div class="case-header">
                    <div class="case-title">
                        <h4 id="view-client-name">Juan Pérez</h4>
                        <span id="view-case-type" class="case-type">Divorcio</span>
                    </div>
                    <span id="view-status" class="status-badge en-proceso">En proceso</span>
                </div>
                
                <div class="case-info-grid">
                    <div class="info-item">
                        <label>ID del Caso:</label>
                        <p id="view-id">1</p>
                    </div>
                    <div class="info-item">
                        <label>Fecha de Inicio:</label>
                        <p id="view-start-date">2025-01-15</p>
                    </div>
                    <div class="info-item">
                        <label>Asignado a:</label>
                        <p id="view-assigned-to">Dr. García</p>
                    </div>
                    <div class="info-item">
                        <label>Última Actualización:</label>
                        <p id="view-updated">2025-03-28</p>
                    </div>
                </div>
                
                <div class="case-notes">
                    <h5>Notas del Caso</h5>
                    <p id="view-notes">Este es un caso de divorcio por mutuo acuerdo. Se han presentado los documentos iniciales y estamos a la espera de la primera audiencia.</p>
                </div>
                
                <div class="case-timeline">
                    <h5>Cronología</h5>
                    <ul class="timeline">
                        <li class="timeline-item">
                            <div class="timeline-date">15 Ene 2025</div>
                            <div class="timeline-content">
                                <h6>Apertura del caso</h6>
                                <p>Se realizó la consulta inicial y se firmó el contrato de servicios.</p>
                            </div>
                        </li>
                        <li class="timeline-item">
                            <div class="timeline-date">20 Ene 2025</div>
                            <div class="timeline-content">
                                <h6>Presentación de documentos</h6>
                                <p>Se presentó la demanda de divorcio en el juzgado.</p>
                            </div>
                        </li>
                        <li class="timeline-item">
                            <div class="timeline-date">15 Feb 2025</div>
                            <div class="timeline-content">
                                <h6>Notificación a la contraparte</h6>
                                <p>Se notificó al cónyuge sobre la demanda de divorcio.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="cancel-btn" id="close-view-btn">Cerrar</button>
                <button type="button" class="edit-view-btn">Editar Caso</button>
            </div>
        </div>
    </div>
    
    <!-- Delete confirmation modal -->
    <div id="delete-modal" class="modal">
        <div class="modal-content delete-modal-content">
            <h3>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar este caso? Esta acción no se puede deshacer.</p>
            <div class="form-actions">
                <button type="button" class="cancel-btn" id="cancel-delete-btn">Cancelar</button>
                <button type="button" class="delete-confirm-btn" id="confirm-delete-btn">Eliminar</button>
            </div>
        </div>
    </div>
    
    <script src="assets/js/crud.js"></script>
</body>
</html>