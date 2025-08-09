// just like a gatekeeper jo bol rha tha ki app.tsx mein kya render hoga.

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
// document.getElementById("root") --> index.html se root id lega
// (!) --> non-null assertion operator, yeh batata hai ki root element hamesha milega, agar nahi mila toh error throw karega
// createRoot --> React 18 se aaya hai, yeh React ka entry point hai
// App --> yeh hamara main component hai jo render hoga
// index.css --> yeh hamara global CSS file hai jo styles define karta hai
// createRoot ke andar App component ko render karte hain, jo ki hamara main application
