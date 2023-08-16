import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Detail from "./pages/Detail";
import List from "./pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  { path: "/:movieId", element: <Detail /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
