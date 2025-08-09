// Bhai yeh NotFound.tsx 👻 ek error page hai — jab koi galat URL maar deta hai (jo exist hi nahi karta), tab yeh page dikhaya jaata hai.
// Yeh hook current URL ka path deta hai
import { useLocation } from "react-router-dom";
// React ka hook — jab component load hota hai (first time), tab koi side-effect karne ke liye use hota hai
import { useEffect } from "react";

//Functional component NotFound start ho raha
const NotFound = () => {
  //current path url mil rha hai
  const location = useLocation();

  useEffect(() => {   // => is arrow function to write functions
    // dev tools like console mei developer ko error dikhega!for debugging.
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    // ui part 
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
