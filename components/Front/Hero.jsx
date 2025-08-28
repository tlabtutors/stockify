import Button from "../custom/Button";

const Hero = () => {
  return (
    <section className="relative flex min-h-[500px] justify-center items-center overflow-hidden ">
      {/* Background with SVG Animation */}
      <div className="bg-[#f3fcfb] absolute inset-0 -z-10">
        <svg
          className="absolute w-[200%] h-[200%] animate-[spin_40s_linear_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
        >
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#80ebe0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#1fe7d3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#009688" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="400" fill="url(#grad)" />
        </svg>

        {/* Floating Waves */}
        <svg
          className="absolute bottom-0 w-full h-40 animate-[pulse_6s_ease-in-out_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.6"
            d="M0,192L60,197.3C120,203,240,213,360,197.3C480,181,600,139,720,117.3C840,96,960,96,1080,112C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto text-center text-gray-800 px-6 md:px-16">
        <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-snug p-auto md:px-64">
          Smart Inventory Management, Simplified for Business Growth.
        </h1>

        <p className="mb-6 p-auto md:px-64">
          Track your stock, sales, and supply chain effortlessly—while keeping
          costs low.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button variant="primary" className="ml-4">
            Get Started for Free
          </Button>

          {/* Button as a link */}
          <Button href="/demo" variant="secondary" className="ml-4">
            Try Demo Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
