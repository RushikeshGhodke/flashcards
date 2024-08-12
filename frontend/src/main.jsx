import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import FlashcardForm from './components/FlashcardForm.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import FlashcardList from './components/FlashcardList.jsx'
import { store } from './store/store.js';
import AdminDashboard from './components/AdminDashboard.jsx';

const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<FlashcardList/>}/>
      <Route path='admin-dashboard' element={<AdminDashboard/>}/>
    </Route>    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
