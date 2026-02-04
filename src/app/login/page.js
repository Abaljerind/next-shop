export default function page() {
  return (
    <main className="mx-auto mt-8 h-max rounded-lg border-4 border-white/15 bg-[#1a1a1a] px-4 py-6 md:max-w-xl lg:max-w-3xl lg:space-y-6">
      <div className="space-y-4 py-6 lg:space-y-6">
        {/* login title */}
        <h1 className="text-center text-4xl font-bold tracking-wider text-purple-500 lg:text-5xl">
          Login
        </h1>
        {/* ./ login title */}

        <form className="">
          {/* input email & password */}
          <div className="mb-8 space-y-4 md:space-y-6">
            {/* input email */}
            <div className="mx-auto flex flex-col gap-2 md:w-3/5 md:gap-3">
              <label
                htmlFor="email"
                className="font-semibold tracking-wide lg:text-lg"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-lg bg-[#0a0a0a] px-4 py-2"
              />
            </div>
            {/* ./ input email */}

            {/* input password */}
            <div className="mx-auto flex flex-col gap-2 md:w-3/5 md:gap-3">
              <label
                htmlFor="password"
                className="font-semibold tracking-wide lg:text-lg"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-lg bg-[#0a0a0a] px-4 py-2"
              />
            </div>
            {/* ./ input password */}
          </div>
          {/* ./ input email & password */}

          {/* button login */}
          <div className="mx-auto md:w-3/5">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-purple-500 py-3 font-semibold text-white lg:text-lg"
            >
              Login
            </button>
          </div>
          {/* button login */}
        </form>
      </div>
    </main>
  );
}
