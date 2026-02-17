const HomePreHeader = () => {
  return (
    <div className="bg-neutral-900 text-white text-xs md:text-sm hidden md:block font-sans">
      <div className="container mx-auto px-4 md:px-8 h-[50px] flex items-center justify-between">
        <div className="flex items-center gap-6 h-full">
          <a
            href="#"
            className="font-bold h-full flex items-center border-b-2 border-white"
          >
            For Individuals
          </a>
          <a
            href="#"
            className="font-medium h-full flex items-center border-b-2 border-transparent hover:text-gray-300 transition-colors"
          >
            For Businesses
          </a>
          <a
            href="#"
            className="font-medium h-full flex items-center border-b-2 border-transparent hover:text-gray-300 transition-colors"
          >
            For Universities
          </a>
          <a
            href="#"
            className="font-medium h-full flex items-center border-b-2 border-transparent hover:text-gray-300 transition-colors"
          >
            For Governments
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePreHeader;

















































