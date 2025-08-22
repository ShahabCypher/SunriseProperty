const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="text-medium-gray">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
