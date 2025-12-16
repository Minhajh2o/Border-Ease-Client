import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import { ThemeProvider } from "./context-provider/ThemeProvider";
import { AuthProvider } from "./context-provider/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--fallback-b1,oklch(var(--b1)/1))",
              color: "var(--fallback-bc,oklch(var(--bc)/1))",
              border: "1px solid var(--fallback-b3,oklch(var(--b3)/1))",
            },
            success: {
              iconTheme: {
                primary: "oklch(var(--su))",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "oklch(var(--er))",
                secondary: "white",
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
