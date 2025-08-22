import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const SigninForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        clearError();

        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
          return {
            success: false,
            message: null,
            error: "Please fill in all fields.",
          };
        }

        const result = await login(email, password);

        setTimeout(() => {
          navigate("/");
        }, 1000);

        return {
          success: true,
          message: "Login successful! Redirecting...",
          error: null,
        };
      } catch (error) {
        let errorMessage = "Login failed. Please try again.";

        if (error.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        return {
          success: false,
          message: null,
          error: errorMessage,
        };
      }
    },
    { success: false, message: null, error: null }
  );

  return (
    <>
      {(isPending || loading) && (
        <div className="text-center text-medium-gray mb-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
            <p>Signing you in...</p>
          </div>
        </div>
      )}

      {/* Show Redux auth error if present */}
      {error && !isPending && (
        <div className="text-center text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-gold focus:border-main-gold"
            placeholder="Enter your email"
          />
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-gold focus:border-main-gold"
            placeholder="Enter your password"
          />
        </div>

        {/* Error message from form action */}
        {state.error && (
          <div className="text-center text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Success message */}
        {state.success && (
          <div className="text-center text-green-600 mb-4 p-3 bg-green-50 rounded-lg">
            {state.message}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending || loading}
          className="w-full bg-main-gold text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-main-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending || loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default SigninForm;
