import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [count, setCount] = useState(
    Number(localStorage.getItem("count")) || 0
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "r" || event.key === "R") {
        setCount(0);
      } else if (event.key === "+") {
        setCount((prevCount) => prevCount + 1);
      } else if (event.key === "-") {
        setCount((prevCount) => prevCount - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <main className="font-poppins w-full h-screen dark:bg-background bg-background-light dark:text-white text-gray-800 flex justify-center items-center flex-col gap-6 relative transition duration-500">
        <div className=" flex flex-col items-center justify-center gap-8 py-6 px-12 text-center dark:bg-panel bg-panel-light rounded-20 border dark:border-borders border-borders-light shadow-primary shadow-black/15 transition duration-150">
          <p className="text-xl px-12">counter</p>
          <p className="text-8xl">{count}</p>
        </div>
        <div className="flex gap-8 ">
          <button
            onClick={() => setCount((prevCount) => prevCount - 1)}
            className="button text-5xl py-2 px-11"
          >
            -
          </button>
          <button
            onClick={() => setCount((prevCount) => prevCount + 1)}
            className="button text-5xl py-2 px-11"
          >
            +
          </button>
        </div>
        <div
          onClick={toggleTheme}
          className="button p-5 absolute top-12 right-12"
        >
          <img
            src="./moon.svg"
            alt="moon"
            className="dark:icon-light icon-dark"
          />
        </div>
      </main>
    </>
  );
}

export default App;
