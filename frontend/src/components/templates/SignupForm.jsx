import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/authService";

const SignupForm = () => {
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        // Basic client-side validation
        if (!name || !email || !password) {
          return {
            success: false,
            message: null,
            error: "Please fill in all fields.",
          };
        }

        if (name.length < 2) {
          return {
            success: false,
            message: null,
            error: "Name must be at least 2 characters long.",
          };
        }

        if (password.length < 6) {
          return {
            success: false,
            message: null,
            error: "Password must be at least 6 characters long.",
          };
        }

        const result = await authService.register(name, email, password);

        // Small delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 1500);

        return {
          success: true,
          message: "Registration successful! Welcome aboard! Redirecting...",
          error: null,
        };
      } catch (error) {
        // Handle different types of errors
        let errorMessage = "Registration failed. Please try again.";

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
            <p>Creating your account...</p>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-secondary-dark"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={50}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold transition-colors"
            placeholder="Enter your full name"
            disabled={isPending}
          />
        </div>

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
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold transition-colors"
            placeholder="Enter your password"
            disabled={isPending}
          />
          <p className="text-xs text-light-gray mt-1">
            Password must be at least 6 characters with uppercase, lowercase,
            and number.
          </p>
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
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default SignupForm;
