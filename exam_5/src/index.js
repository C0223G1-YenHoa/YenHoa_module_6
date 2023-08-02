import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Song from './component/Song';
import SongCreation from './component/SongCreation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SongUpdate from './component/SongUpdate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/create' element={<SongCreation/>} />
      <Route path='/update/:id' element={<SongUpdate/>} />
      <Route path='/' element={<Song/>} />
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Swal.fire({
//   title: 'Are you sure?',
//   text: 'You will not be able to recover this file!',
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Yes, delete it!',
//   cancelButtonText: 'No, cancel!',
//   reverseButtons: true
// }
// ).then(async (res) => {
//   if (res.isConfirmed) {
//       await deleteCustomer(customer.id).then(() => {
//           getCustomerList(page, limit).then(() => {
//               Swal.fire({
//                   icon: 'success',
//                   title: 'Delete success fully!!!!',
//                   showConfirmButton: false,
//                   timer: 1500
//               })
//           })
//       });
//   } else if (res.dismiss === Swal.DismissReason.cancel) {
//   }
// })
// }} className=" btn btn-outline-info">Delete</button>
// </td>