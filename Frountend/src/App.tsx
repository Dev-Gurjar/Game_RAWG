import { Grid, GridItem, Show } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import apiclint from "./Services/apiclint";
import GamesBody from "./components/GamesBody";
import genres from "./data/genres";
import Login from "./components/Login";
import Register from "./components/Register";

// Define interfaces for data structures
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

export function App() {
  // State variables to hold data and loading/error states
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  // const location = useLocation();

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        // Fetch data from the API
        const response = await apiclint.get("/games");
        setData(response.data.results); // Update data state with the fetched data
      } catch (error) {
        setError(error); // Set error state if there's an error during data fetching
      } finally {
        setLoading(false); // Set loading state to false after data fetching completes
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function (not implemented for now)
    return () => {
      // This function can be used for cleanup tasks when the component unmounts
    };
  }, []);

  return (
    <Router>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <GenreList genres={genres} />
              )}
          </GridItem>
        </Show>
        <GridItem area="main">
          {/* Define routes */}
          <Routes>
            <Route
              path="/"
              element={
                <GamesBody games={data} isLoading={isLoading} error={error} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </GridItem>
      </Grid>
    </Router>
  );
}
