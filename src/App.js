import React from 'react';
import SideNav from './Components/SideNav/SideNav';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Formik } from 'formik';



const App = () => {
  return (
    <div>
       <Formik>
      <BrowserRouter>
      <Routes>
      {/* <Route path='/' element={<TwoSideGrid/>}/>
      <Route path='/Signup' element={<Signup/>}/> */}
     
      <Route path="/" element={<SideNav />} />
      {/* <Route path="/masters" element={<Masters />} />
      <Route path="/expenseSheet" element={<ExpenseSheet />} /> */}
      </Routes>
      </BrowserRouter>
      </Formik>
 
    </div>
  );
};

export default App;