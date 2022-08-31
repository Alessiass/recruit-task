import React, { useEffect, useState, useCallback } from "react";
import { useFilter } from "../context/ContextProvider";
import ProductFrame from "./ProductFrame";
import axios from "axios";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
[];

interface ProductDataQuery {
  products: ProductData[];
  total: number[];
  skip: number[];
  limit: number[];
}

const Listing = () => {
  const { brand, category } = useFilter();
  const [fetchedData, setFetchedData] = useState<ProductDataQuery>(
    {} as ProductDataQuery
  );
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(
    {} as ProductData[]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<ProductDataQuery>("http://localhost:3004/data")
      .then((response) => {
        setFetchedData(response.data);
        setFilteredProducts(response.data.products);
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      setFilteredProducts(
        fetchedData.products.filter((el) => {
          if (brand !== `All` && brand !== el.brand) {
            return false;
          } else if (category !== `All` && category !== el.category) {
            return false;
          } else {
            return true;
          }
        })
      );
    }
  }, [brand, category, fetchedData, isLoading]);

  // Since there is only 30 items in database and filtering is limited there is no point of adding load more button to reduce amount of api calls but since the tasks requires it here is the code for the pagination
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const loadMoreButtonHandler = () => {
  //   setIsLoading(true);
  //   axios
  //     .get<ProductDataQuery>("http://localhost:3004/data", {
  //       params: { page: { currentPage }, limit: 5 },
  //     })
  //     .then((response) => {
  //       setFetchedData(response.data);
  //       setFilteredProducts((prev) => prev.concat(response.data.products));
  //     })
  //     .then(() => {
  //       setIsLoading(false);
  //       setCurrentPage((prev) => prev + 1);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      {isLoading === false
        ? filteredProducts.map((el) => (
            <ProductFrame frameData={el} key={el.id} />
          ))
        : "Page is currently being loaded"}
      {filteredProducts.length === 0
        ? "There is are no items that matches selected criteria"
        : ""}
    </div>
  );
};

export default Listing;
