const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
      <span className="text-4xl ml-2 font-medium text-gray-500">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
