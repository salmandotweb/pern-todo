import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleTask from "./pages/SingleTask";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path=":taskId" element={<SingleTask />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
