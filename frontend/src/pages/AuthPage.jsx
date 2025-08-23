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
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-blue-tint flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Auth Card */}
        <div className="bg-pure-white rounded-2xl shadow-2xl border border-white/50 p-6 sm:p-8 lg:p-10 mt-[-100px] md:mt-0">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark font-[Playfair_Display]">
              {type === "signin" ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-medium-gray">
              {type === "signin"
                ? "Sign in to access your account"
                : "Create your account to get started"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {type === "signin" ? <SigninForm /> : <SignupForm />}
          </div>

          {/* Toggle Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-medium-gray">
              {type === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                to={`/auth/${type === "signin" ? "signup" : "signin"}`}
                className="text-main-gold hover:text-dark-gold font-medium transition-colors duration-200 underline underline-offset-2"
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
