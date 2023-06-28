import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Modal,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log("🚀 ~ file: edit.jsx:8 ~ action ~ updates:", updates)
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

const ModalIngredients = ({
  isOpen,
  isEditing,
  editItem,
  onClose,
  onAddItem,
  editItemQuantity,
  editItemUM,
}) => {
  const classes = useStyles();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUM, setNewItemUM] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [errorUM, setErrorUM] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);

  // Nueva implementación
  const { ingredient } = useLoaderData();
  const navigate = useNavigate();
//
  useEffect(() => {
    if (isEditing) {
      setNewItemName(editItem.name);
      setNewItemQuantity(editItem.quantity);
      setNewItemUM(editItem.um);
      setNewItemCategory(editItem.category);
    }
  }, [isEditing, editItem, editItemQuantity, editItemUM]);

  const handleAddItem = () => {
    if (newItemName === '') {
      setErrorName(true);
      return;
    }
    if (newItemQuantity === '') {
      setErrorQuantity(true);
      return;
    }
    if (newItemUM === '') {
      setErrorUM(true);
      return;
    }
    if (newItemCategory === '') {
      setErrorCategory(true);
      return;
    }

    const newItem = {
      id: isEditing ? editItem.id : new Date().getTime(),
      name: newItemName,
      quantity: newItemQuantity,
      um: newItemUM,
      category: newItemCategory,
    };

    onAddItem(newItem);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUM('');
    setNewItemCategory('');

    setErrorName(false);
    setErrorQuantity(false);
    setErrorUM(false);
    setErrorCategory(false);

    onClose();
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setNewItemQuantity(value);
      setErrorQuantity(false);
    } else {
      setErrorQuantity(true);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={`${classes.modal} modal-container`}>
        <h2>{isEditing ? 'Editar elemento' : 'Agregar nuevo elemento'}</h2>
        {/* <TextField
          label="Nombre"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          error={errorName}
          helperText={errorName ? 'El nombre es requerido' : ''}
          className={classes.formControl}
          disabled={isEditing}
        />
        <TextField
          label="Cantidad"
          value={newItemQuantity}
          onChange={handleQuantityChange}
          error={errorQuantity}
          helperText={errorQuantity ? 'La cantidad es requerida' : ''}
          className={classes.formControl}
        />
        <FormControl error={errorUM} className={classes.formControl}>
          <InputLabel>Unidad de medida</InputLabel>
          <Select value={newItemUM} onChange={(event) => setNewItemUM(event.target.value)}>
            <MenuItem value="">Seleccionar</MenuItem>
            <MenuItem value="onzas">Onzas</MenuItem>
            <MenuItem value="gramos">Gramos</MenuItem>
            <MenuItem value="kilogramos">Kilogramos</MenuItem>
            <MenuItem value="piezas">Piezas</MenuItem>
            <MenuItem value="litros">Litros</MenuItem>
            <MenuItem value="mililitros">Mililitros</MenuItem>
          </Select>
          {errorUM && <FormHelperText>La unidad de medida es requerida</FormHelperText>}
        </FormControl>
        <FormControl error={errorCategory} className={classes.formControl}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={newItemCategory}
            onChange={(event) => setNewItemCategory(event.target.value)}
            disabled={isEditing}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            <MenuItem value="carbohidratos">Carbohidratos</MenuItem>
            <MenuItem value="proteína">Proteína</MenuItem>
            <MenuItem value="lácteos">Lácteos</MenuItem>
            <MenuItem value="dulces">Dulces</MenuItem>
            <MenuItem value="frutas y verduras">Frutas y verduras</MenuItem>
            <MenuItem value="bebidas">Bebidas</MenuItem>
            <MenuItem value="aceites">Aceites</MenuItem>
            <MenuItem value="especias">Especias</MenuItem>
          </Select>
          {errorCategory && <FormHelperText>La categoría es requerida</FormHelperText>}
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            {isEditing ? 'Guardar' : 'Agregar'}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div> */}
      </div>
    </Modal>
  );
};

export default ModalIngredients;
