
  import { createRoot } from "react-dom/client";
  import { AuthProvider, useAuth } from "./auth/AuthContext";
  import App from "./app/App.tsx";
  import LoginPage from "./auth/LoginPage";
  import "./styles/index.css";

  function Root() {
    const { session, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      );
    }

    if (!session) return <LoginPage />;

    return <App />;
  }

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
