const SigninForm = () => {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <p className="text-red-500 text-sm"></p>
        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-light-gold to-dark-gold text-white px-4 py-2 rounded-md transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out select-none"
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default SigninForm;
