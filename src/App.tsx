// notification components like success, error, warning
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
//🧷 Tooltip provider — jab tu kisi button pe hover kare aur chhota bubble text aaye, usko handle karta hai.
import { TooltipProvider } from "@/components/ui/tooltip";
// React Query for data fetching and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
// jab koi galat route pe jaata hai, toh yeh page dikhata hai
import NotFound from "./pages/NotFound";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { StartBusinessPage } from "./components/StartBusinessPage";
import { SellOnlinePage } from "./components/SellOnlinePage";
import { ProductFormPage } from "./components/ProductFormPage";
import { PlatformRecommenderPage } from "./components/PlatformRecommenderPage";
import { ListingGuidePage } from "./components/ListingGuidePage";
import { AIProductListingPage } from "./components/AIProductListingPage";
import { AIPricingPage } from "./components/AIPricingPage";
import { AIMarketingPage } from "./components/AIMarketingPage";

// React Query client for managing server state
// yeh client data ko fetch, cache aur sync karta hai
const queryClient = new QueryClient();

// App component that defines the main structure of the application
// yeh component sab kuch render karega, jaise ki routes, providers, etc.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* routing breakdown */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/start-business" element={<StartBusinessPage />} />
          <Route path="/sell-online" element={<SellOnlinePage />} />
          <Route path="/product-form" element={<ProductFormPage />} />
          <Route path="/platform-recommender" element={<PlatformRecommenderPage />} />
          <Route path="/listing-guide" element={<ListingGuidePage />} />
          <Route path="/ai-product-listing" element={<AIProductListingPage />} />
          <Route path="/ai-pricing" element={<AIPricingPage />} />
          <Route path="/ai-marketing" element={<AIMarketingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


//React ko bata rahe ho: yehi App component hai jo export ho raha (aur main.tsx mein use ho raha)
export default App;
