import React, {useState} from 'react';

import {
    Button,
  } from '@material-ui/core';
  
  import '../Dashboard.css';
  
  import ModalIngredients from '../ModalIngredients';
  import TableIngredients from '../TableIngredients';

const UnavailableIngredients = () => {

    const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleOpen = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleAddItem = (newItem) => {
    if (isEditing) {
      const updatedItems = items.map((item) => {
        if (item.id === newItem.id) {
          return { ...item, ...newItem };
        }
        return item;
      });
      setItems(updatedItems);
      setIsEditing(false);
    } else {
      setItems([...items, newItem]);
    }
    handleClose();
  };

  const handleEditItem = (item) => {
      setIsModalOpen(true);
      setIsEditing(true);
      setEditItem(item);
    // }
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleSetUnavailable = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className='app-container'>
      <h1>Lista de ingredientes no disponibles</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar ingrediente
      </Button>

      <TableIngredients
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onEditItem={handleEditItem} 
        onSetUnavailable={handleSetUnavailable}
      />

      <ModalIngredients
        isOpen={isModalOpen}
        isEditing={isEditing}
        editItem={editItem}
        onClose={handleClose}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default UnavailableIngredients;
