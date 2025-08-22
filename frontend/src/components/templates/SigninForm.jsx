import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/authService";

const SigninForm = () => {
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const email = formData.get("email");
        const password = formData.get("password");

        // Basic client-side validation
        if (!email || !password) {
          return {
            success: false,
            message: null,
            error: "Please fill in all fields.",
          };
        }

        const result = await authService.login(email, password);

        // Small delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 1000);

        return {
          success: true,
          message: "Login successful! Redirecting...",
          error: null,
        };
      } catch (error) {
        // Handle different types of errors
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
      {isPending && (
        <div className="text-center text-medium-gray mb-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
            <p>Signing you in...</p>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-dark"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold transition-colors"
            placeholder="Enter your email"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-secondary-dark"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold transition-colors"
            placeholder="Enter your password"
            disabled={isPending}
          />
        </div>

        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-light-gold to-dark-gold text-white px-4 py-3 rounded-md font-medium transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out select-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default SigninForm;
