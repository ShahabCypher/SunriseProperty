import { useParams, Navigate } from "react-router-dom";

import SigninForm from "src/components/templates/SigninForm";

const AuthPage = () => {
  const { type } = useParams();

  if (type !== "signin" && type !== "signup") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-6 py-10 h-[calc(100vh-6.25rem)]">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary-dark">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <form className="space-y-6">
            {type === "signin" && <SigninForm />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
