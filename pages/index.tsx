import type { NextPage } from "next";
import ListingContext from "../context/ContextProvider";
import Filtering from "../components/Filtering";
import Listing from "../components/Listing";

const Home: NextPage = () => {
  return (
    <ListingContext>
      <Filtering />
      <Listing />
    </ListingContext>
  );
};

export default Home;
