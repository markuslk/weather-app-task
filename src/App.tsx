import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import WeatherPage from "./WeatherPage";
import { InputProvider } from "./context/InputContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="weather" element={<WeatherPage />} />
      </Route>
    </Routes>
  );
}

export default App;

function Layout() {
  return (
    <InputProvider>
      <main className="relative flex min-h-screen flex-col bg-primary-gray text-primary">
        <section className="flex-1 flex-grow">
          <Outlet />
        </section>
      </main>
    </InputProvider>
  );
}
