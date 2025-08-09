// react ka build in hook hai jo side effects handle karta hai
import { useEffect } from "react";
// react-router-dom ka hook hai, react ke andar page change karne (navigate karne) ke liye use hota hai
import { useNavigate } from "react-router-dom";


const Index = () => {
  // useNavigate hook se navigate function milta hai, jisse hum page change kar sakte hain
  // yahan hum useNavigate ko import karte hain taaki hum user ko kisi aur page par redirect kar sakein
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;


// this page is used in  app.tsx