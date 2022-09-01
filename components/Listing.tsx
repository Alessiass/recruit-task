import React, { useEffect, useState, useCallback } from "react";
import { useFilter } from "../context/ContextProvider";
import ProductFrame from "./ProductFrame";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

const Listing = () => {
  const { brand, category } = useFilter();
  const [loadedItems, setLoadedItems] = useState<ProductData[]>(
    [] as ProductData[]
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(
    [] as ProductData[]
  );

  const loadMoreItems = (): Promise<ProductData[]> =>
    axios
      .get("http://localhost:3004/products", {
        params: { _page: currentPage, _limit: 5 },
      })
      .then((response) => response.data);

  const amountOfProducts = (): Promise<number[]> =>
    axios.get("http://localhost:3004/total").then((response) => response.data);

  const ProductData = useQuery(["Product fetch", currentPage], loadMoreItems, { onSuccess: (data) => { setLoadedItems(prev => prev.concat(data)) }, keepPreviousData: true });

  const ProductAmount = useQuery(["Product amount"], amountOfProducts);

  const checker = () => {
    console.log(filteredProducts);
  };

  const loadMoreHandler = () => {
    setCurrentPage(prev => prev + 1);
  }

  useEffect(() => {
    if (ProductData.isLoading === false) {
      setFilteredProducts(
        loadedItems.filter((el) => {
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
  }, [brand, category, ProductData.data, ProductData.isLoading, loadedItems]);

  if (ProductData.isLoading === true || ProductAmount.isLoading) {
    return <div>Page is currently being loaded</div>;
  }

  return (
    <div>
      {ProductAmount.data![0] === loadedItems.length ? "" : <button onClick={loadMoreHandler}>Load more products</button>}
      {filteredProducts.map((el) => (
        <ProductFrame frameData={el} key={el.id} />
      ))}
      {filteredProducts.length === 0
        ? "There is are no items that matches selected criteria"
        : ""}
    </div>
  );
};

export default Listing;
