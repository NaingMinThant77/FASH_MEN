const Hero = () => {
  return (
    <div className="relative mt-10 mb-15 flex w-full flex-col items-center sm:mt-24">
      {/* Promo Banner */}
      <a
        target="_blank"
        rel="noreferrer"
        href="#"
        className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-black px-7 py-2 transition-all hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18M3 12h18M3 21h18"
          />
        </svg>
        <p className="text-sm font-semibold text-white">
          New Autumn Collection Just Dropped 🍂
        </p>
      </a>

      {/* Main Heading */}
      <h1 className="mt-8 max-w-sm bg-gradient-to-br from-black via-gray-700 to-black bg-clip-text text-center text-4xl font-extrabold text-transparent sm:max-w-4xl sm:text-6xl">
        Redefine Your Style with FASH_MEN
      </h1>

      {/* Subtext */}
      <span className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray-700">
        Explore premium men’s fashion — from casual wear to sharp suits.
        Designed for modern men who want confidence in every outfit.
      </span>

      {/* Offer */}
      <p className="mt-3 rounded border border-black px-3 py-1 shadow">
        🎁 <span className="text-blue-400 font-semibold">Flat 20% OFF</span> on
        your first order!
      </p>
    </div>
  );
};

export default Hero;
