// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const addRecordBtn = document.getElementById('add-record-btn');
    const recordModal = document.getElementById('record-modal');
    const viewModal = document.getElementById('view-modal');
    const deleteModal = document.getElementById('delete-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const closeViewBtn = document.getElementById('close-view-btn');
    const recordForm = document.getElementById('record-form');
    const editViewBtn = document.querySelector('.edit-view-btn');
    const recordsBody = document.getElementById('records-body');
    const statusFilter = document.getElementById('status-filter');
    const caseTypeFilter = document.getElementById('case-type-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Variables para gestión de registros
    let currentRecords = [];
    let currentId = null;
    
    // Cargar registros iniciales
    fetchRecords();
    
    // Event Listeners
    addRecordBtn.addEventListener('click', openAddModal);
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    cancelBtn.addEventListener('click', closeAllModals);
    cancelDeleteBtn.addEventListener('click', closeAllModals);
    closeViewBtn.addEventListener('click', closeAllModals);
    
    recordForm.addEventListener('submit', saveRecord);
    confirmDeleteBtn.addEventListener('click', deleteRecord);
    
    if (editViewBtn) {
        editViewBtn.addEventListener('click', function() {
            closeModal(viewModal);
            openEditModal(currentId);
        });
    }
    
    // Event listeners para filtros
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (caseTypeFilter) {
        caseTypeFilter.addEventListener('change', applyFilters);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    // Delegación de eventos para botones de acción en la tabla
    recordsBody.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;
        
        const id = parseInt(target.getAttribute('data-id'));
        
        if (target.classList.contains('view-btn')) {
            viewRecord(id);
        } else if (target.classList.contains('edit-btn')) {
            openEditModal(id);
        } else if (target.classList.contains('delete-btn')) {
            openDeleteModal(id);
        }
    });
    
    // Funciones
    function fetchRecords() {
        // En un caso real, esto sería una llamada AJAX a read.php
        fetch('crud/read.php')
            .then(response => response.json())
            .then(data => {
                currentRecords = data;
                renderRecords(currentRecords);
            })
            .catch(error => {
                console.error('Error fetching records:', error);
                // Para desarrollo, usar datos de demostración si la API falla
                currentRecords = getDemoRecords();
                renderRecords(currentRecords);
            });
    }
    
    function getDemoRecords() {
        // Datos de ejemplo para desarrollo
        return [
            {"id": 1, "client_name": "Juan Pérez", "case_type": "Divorcio", "status": "En proceso", "start_date": "2025-01-15", "assigned_to": "Dr. García", "case_notes": "Caso de divorcio por mutuo acuerdo."},
            {"id": 2, "client_name": "María Rodríguez", "case_type": "Demanda laboral", "status": "Activo", "start_date": "2025-02-10", "assigned_to": "Dra. Sánchez", "case_notes": "Despido injustificado, pendiente de audiencia."},
            {"id": 3, "client_name": "Carlos Gómez", "case_type": "Contrato comercial", "status": "Completado", "start_date": "2024-11-05", "assigned_to": "Dr. García", "case_notes": "Redacción y revisión de contrato de servicios."},
            {"id": 4, "client_name": "Ana López", "case_type": "Propiedad intelectual", "status": "En espera", "start_date": "2025-03-01", "assigned_to": "Dr. Martínez", "case_notes": "Registro de marca comercial."}
        ];
    }
    
    function renderRecords(records) {
        
        
        recordsBody.innerHTML = '';
        
        if (records.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="7" class="empty-table">No se encontraron registros</td>';
            recordsBody.appendChild(emptyRow);
            return;
        }
        
        records.forEach(record => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', record.id);
            
            const statusClass = record.status.toLowerCase().replace(/\s+/g, '-');
            
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${escapeHtml(record.client_name)}</td>
                <td>${escapeHtml(record.case_type)}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${record.status}
                    </span>
                </td>
                <td>${record.start_date}</td>
                <td>${escapeHtml(record.assigned_to)}</td>
                <td class="actions">
                    <button class="view-btn" data-id="${record.id}"><i class="fas fa-eye"></i></button>
                    <button class="edit-btn" data-id="${record.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${record.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            recordsBody.appendChild(row);
        });
    }
    
    function openAddModal() {
        // Limpiar el formulario
        recordForm.reset();
        document.getElementById('record-id').value = '';
        document.getElementById('modal-title').textContent = 'Agregar Nuevo Caso';
        
        // Establecer la fecha actual como valor predeterminado
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('start_date').value = today;
        
        openModal(recordModal);
    }
    
    function openEditModal(id) {
const record = currentRecords.find(r => String(r.id) === String(id));

       
        if (!record) return;
        
        currentId = id;
        // Llenar el formulario con los datos del registro
        document.getElementById('record-id').value = record.id;
        document.getElementById('client_name').value = record.client_name;
        document.getElementById('case_type').value = record.case_type;
        document.getElementById('status').value = record.status;
        document.getElementById('start_date').value = record.start_date;
        document.getElementById('assigned_to').value = record.assigned_to;
        document.getElementById('case_notes').value = record.case_notes || '';
        
        document.getElementById('modal-title').textContent = 'Editar Caso';
        
        
        openModal(recordModal);
    }
    
    function openDeleteModal(id) {
        currentId = id;
        openModal(deleteModal);
    }
    
    function viewRecord(id) {
        const record = currentRecords.find(r => String(r.id) === String(id));

        if (!record) return;
        
        currentId = id;
        
        // Llenar el modal de vista con los datos del registro
        document.getElementById('view-id').textContent = record.id;
        document.getElementById('view-client-name').textContent = record.client_name;
        document.getElementById('view-case-type').textContent = record.case_type;
        document.getElementById('view-status').textContent = record.status;
        document.getElementById('view-status').className = 'status-badge ' + record.status.toLowerCase().replace(/\s+/g, '-');
        document.getElementById('view-start-date').textContent = record.start_date;
        document.getElementById('view-assigned-to').textContent = record.assigned_to;
        document.getElementById('view-updated').textContent = new Date().toISOString().split('T')[0]; // Simulado
        document.getElementById('view-notes').textContent = record.case_notes || 'No hay notas disponibles para este caso.';
        
        openModal(viewModal);
    }
    
    function saveRecord(e) {
        e.preventDefault();
        
        const id = document.getElementById('record-id').value;
        const isEdit = id !== '';
        
        const formData = new FormData(recordForm);
        const record = {
            client_name: formData.get('client_name'),
            case_type: formData.get('case_type'),
            status: formData.get('status'),
            start_date: formData.get('start_date'),
            assigned_to: formData.get('assigned_to'),
            case_notes: formData.get('case_notes')
        };
        
        if (isEdit) {
            // Actualizar registro existente
            record.id = parseInt(id);
            updateRecord(record);
        } else {
            // Crear nuevo registro
            createRecord(record);
        }
    }
    
    function createRecord(record) {
        // En un caso real, esto sería una llamada AJAX a create.php
        fetch('crud/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Caso creado exitosamente', 'success');
                fetchRecords();
                closeAllModals();
            } else {
                showNotification(data.message || 'Error al crear el caso', 'error');
            }
        })
        .catch(error => {
            console.error('Error creating record:', error);
            // Para desarrollo, simular éxito si la API falla
            simulateCreateSuccess(record);
        });
    }
    
    function updateRecord(record) {
        // En un caso real, esto sería una llamada AJAX a update.php
        fetch('crud/update.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Caso actualizado exitosamente', 'success');
                fetchRecords();
                closeAllModals();
            } else {
                showNotification(data.message || 'Error al actualizar el caso', 'error');
            }
        })
        .catch(error => {
            console.error('Error updating record:', error);
            // Para desarrollo, simular éxito si la API falla
            simulateUpdateSuccess(record);
        });
    }
    
    function deleteRecord() {
        if (!currentId) return;
        // En un caso real, esto sería una llamada AJAX a delete.php
        fetch(`crud/delete.php?id=${currentId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Caso eliminado exitosamente', 'success');
                fetchRecords();
                closeAllModals();
            } else {
                showNotification(data.message || 'Error al eliminar el caso', 'error');
            }
        })
        .catch(error => {
            console.error('Error deleting record:', error);
            // Para desarrollo, simular éxito si la API falla
            simulateDeleteSuccess();
        });
    }
    
    // Funciones auxiliares para simulación durante desarrollo
    function simulateCreateSuccess(record) {
        const maxId = Math.max(...currentRecords.map(r => r.id), 0);
        record.id = maxId + 1;
        currentRecords.push(record);
        showNotification('Caso creado exitosamente (simulado)', 'success');
        renderRecords(currentRecords);
        closeAllModals();
    }
    
    function simulateUpdateSuccess(updatedRecord) {
        const index = currentRecords.findIndex(r =>  String(r.id) === String(updatedRecord.id));

        if (index !== -1) {
            currentRecords[index] = { ...currentRecords[index], ...updatedRecord };
            showNotification('Caso actualizado exitosamente (simulado)', 'success');
            renderRecords(currentRecords);
            closeAllModals();
        }
    }
    
    function simulateDeleteSuccess() {
        currentRecords = currentRecords.filter(r => r.id !== currentId);
        showNotification('Caso eliminado exitosamente (simulado)', 'success');
        renderRecords(currentRecords);
        closeAllModals();
        currentId = null;
    }
    
    function applyFilters() {
        const statusValue = statusFilter ? statusFilter.value : '';
        const caseTypeValue = caseTypeFilter ? caseTypeFilter.value : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        let filteredRecords = currentRecords;
        
        if (statusValue) {
            filteredRecords = filteredRecords.filter(record => record.status === statusValue);
        }
        
        if (caseTypeValue) {
            filteredRecords = filteredRecords.filter(record => record.case_type === caseTypeValue);
        }
        
        if (searchValue) {
            filteredRecords = filteredRecords.filter(record => 
                record.client_name.toLowerCase().includes(searchValue) ||
                record.assigned_to.toLowerCase().includes(searchValue)
            );
        }
        
        renderRecords(filteredRecords);
    }
    
    // Funciones de utilidad
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'flex';
    }
    
    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
    }
    
    function closeAllModals() {
        closeModal(recordModal);
        closeModal(viewModal);
        closeModal(deleteModal);
    }
    
    function showNotification(message, type = 'info') {
        // Verificar si ya existe una notificación
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            // Crear el elemento de notificación si no existe
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Añadir clase de tipo y mensaje
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Mostrar la notificación
        notification.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});