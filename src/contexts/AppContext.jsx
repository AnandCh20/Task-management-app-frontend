import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState([{
    
  }]);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');


  return (
    <AppContext.Provider value={{ state, setState, deleteId, setDeleteId, DeleteModal, setDeleteModal}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
