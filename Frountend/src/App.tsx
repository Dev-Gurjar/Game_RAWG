import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import apiclint from "./Services/apiclint";
import GamesBody from "./components/GamesBody";
import genres from "./data/genres";
import Login from "./components/Login";
import Register from "./components/Register";
import { FormData } from "./components/Register";

export interface Genre {
  id: number;
  name: string;
  slug: string;
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
  genres: Genre [];
  metacritic: number;
  rating_top: number;
}



export function App() {
  // State variables to hold data and loading/error states
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Define searchQuery state
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Game[]>([]);
  const [isLoggedIn, setLoginInfo] = useState(false);

  const [userData, setUserData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const location = useLocation();
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiclint.get("/games");
        // console.log(response)
        setData(response.data.results);
        setError(null);
      } catch (error) {
        setError(error);
        setData([]); // Clear data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount
  useEffect(() => {
    const applyFilters = () => {
      let updatedData = [...data];

      // Filter by search query
      updatedData = updatedData.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter by genre
      if (selectedGenre) {
        updatedData = updatedData.filter((game) =>
          Object.values(game.genres).some(
            (genreObj) => genreObj.slug === selectedGenre
          )
        );
      }
      // Filter by platform
      if (selectedPlatform) {
        updatedData = updatedData.filter((game) =>
          Object.values(game.parent_platforms).some(
            (platformObj) => platformObj.platform.slug === selectedPlatform
          )
        );
      }
      setFilteredData(updatedData);
    };

    applyFilters();
  }, [data, searchQuery, selectedGenre, selectedPlatform]);



  return (
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar
            setSearchQuery={setSearchQuery}
            filterByGenre={setSelectedGenre}
            filterByPlatform={setSelectedPlatform}
            userData={userData} isLoggedIn={isLoggedIn} 
            handleLogout={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <GenreList genres={genres} filterByGenre={setSelectedGenre} />
              )}
          </GridItem>
        </Show>
        <GridItem area="main">
          {/* Define routes */}
          <Routes>
            <Route
              path="/"
              element={
                <GamesBody
                  games={filteredData}
                  isLoading={isLoading}
                  error={error}
                />
              }
            />
            <Route path="/login" element={<Login setUserData={setUserData} setLoginInfo={setLoginInfo}/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </GridItem>
      </Grid>
  );
}
