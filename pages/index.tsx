import type { NextPage } from "next";
import ListingContext from "../context/ContextProvider";
import Filtering from "../components/Filtering";
import Listing from "../components/Listing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ListingContext>
        <Filtering />
        <Listing />
      </ListingContext>
    </QueryClientProvider>
  );
};

export default Home;
