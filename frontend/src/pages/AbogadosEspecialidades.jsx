import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Edit } from '@mui/icons-material';
import { getAllAbogados, getAllEspecialidades, updateUsuario } from '../services/records.service';

const AbogadosEspecialidades = () => {
  const [abogados, setAbogados] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesLoaded, setEspecialidadesLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAbogado, setSelectedAbogado] = useState(null);
  const [selectedEspecialidadesIds, setSelectedEspecialidadesIds] = useState([]);

  const fetchData = async () => {
    const abogadosRes = await getAllAbogados();
    setAbogados(abogadosRes.data || []);
    const especialidadesRes = await getAllEspecialidades();
    setEspecialidades(especialidadesRes.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (especialidades.length) setEspecialidadesLoaded(true);
  }, [especialidades]);

  const handleOpen = (abogado) => {
    setSelectedAbogado(abogado);
    setSelectedEspecialidadesIds(
      abogado.especialidads ? abogado.especialidads.map(e => e.id) : []
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    await updateUsuario(selectedAbogado.usuario_id, { especialidades: selectedEspecialidadesIds });
    fetchData();
    handleClose();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Gestión de Especialidades de Abogados</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Especialidades</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abogados.map(a => (
              <TableRow key={a.usuario_id}>
                <TableCell>{a.nombre_apellido}</TableCell>
                <TableCell>{a.correo}</TableCell>
                <TableCell>
                  {(a.especialidads || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary">Sin especialidades</Typography>
                  ) : (
                    a.especialidads.map(e => (
                      <Chip key={e.id} label={e.nombre} size="small" sx={{ mr: 0.5 }} />
                    ))
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(a)} disabled={!especialidadesLoaded}><Edit /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Especialidades</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            options={especialidades}
            getOptionLabel={option => option.nombre}
            value={especialidades.filter(e => selectedEspecialidadesIds.includes(e.id))}
            onChange={(event, newValue) => setSelectedEspecialidadesIds(newValue.map(e => e.id))}
            renderInput={params => (
              <TextField {...params} label="Especialidades" margin="normal" fullWidth />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AbogadosEspecialidades; 