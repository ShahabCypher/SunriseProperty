import { useParams, Navigate, Link } from "react-router-dom";

import SigninForm from "components/templates/SigninForm";
import SignupForm from "components/templates/SignupForm";
import { useAppSelector } from "store/hooks";
import { selectIsAuthenticated } from "store/slices/authSlice";

const AuthPage = () => {
  const { type } = useParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (type !== "signin" && type !== "signup") {
    return <Navigate to="/" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-6 py-10 h-[calc(100vh-6.25rem)]">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md bg-pure-white p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary-dark">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </h2>

          <div className="space-y-6">
            {type === "signin" ? <SigninForm /> : <SignupForm />}
          </div>

          {/* Toggle between signin and signup */}
          <div className="mt-6 text-center">
            <p className="text-medium-gray">
              {type === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                to={`/auth/${type === "signin" ? "signup" : "signin"}`}
                className="text-main-gold hover:text-dark-gold font-medium transition-colors duration-200"
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
