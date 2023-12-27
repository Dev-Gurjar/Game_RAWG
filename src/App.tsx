import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import apiclint from "./Services/apiclint";
import GamesBody from "./components/GamesBody";
import genres from "./data/genres";

// interface FetchResponse {
//   count: number;
//   results: Game[];
// }
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
  // const [count, setCount] = useState(0)
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState();
  const [isloding, setLoding] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoding(true);
    apiclint
      .get("/games", { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
        setLoding(false);
      })
      .catch((err) => {
        setError(err);
        setLoding(false);
      });

    return () => {};
  }, []);

  return (
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
          <GenreList genres={genres} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GamesBody games={data} isloding={isloding} error={error} />
      </GridItem>
    </Grid>
  );
}
