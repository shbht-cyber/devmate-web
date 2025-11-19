export default function HomePage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url('/devmate-home.png')`,
      }}
    >
      <div className="w-full h-full bg-black/30 flex items-center">
        <div className="max-w-3xl ml-10 text-white">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            Connect, Build & Grow With Developers
          </h1>

          <p className="mt-4 text-xl opacity-90 max-w-xl">
            Join DevMate — a community where developers connect, collaborate,
            build projects, and make new friends.
          </p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
