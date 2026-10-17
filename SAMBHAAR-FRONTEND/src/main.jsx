import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "693408918249-1gt66e1hl3uh75c4tab4p1o4utvnsu5s.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  
        <GoogleOAuthProvider clientId={clientId}>

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
</GoogleOAuthProvider>
)
