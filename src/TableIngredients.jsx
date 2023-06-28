import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@material-ui/core';

const TableIngredients = ({ items, onDeleteItem, onEditItem, onSetUnavailable, title }) => {
  const filteredItems = items.filter((item) => item.quantity > 0);

  if (filteredItems.length === 0) {
    return null; // No hay elementos para mostrar, no se renderiza la tabla
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Unidad de medida</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.um}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeleteItem(item.id)}
                  >
                    Del
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEditItem(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => onSetUnavailable(item.id)}
                  >
                    Zero
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableIngredients;
