import React, { useState, useEffect, useRef } from "react";
import { useFilter } from "../context/ContextProvider";

const Filtering = () => {
  const { setBrand, setCategory } = useFilter();

  const selectedBrand = useRef<HTMLSelectElement>(null);
  const selectedCategory = useRef<HTMLSelectElement>(null);

  const [brandList, setBrandList] = useState<string[]>([
    "All",
    "Apple",
    "Samsung",
    "OPPO",
    "Huawei",
    "APPle",
    "Microsoft Surface",
    "Infinix",
    "HP Pavilion",
    "Impression of Acqua Di Gio",
    "Royal_Mirage",
    "Fog Scent Xpressio",
    "Al Munakh",
    "Lord - Al-Rehab",
    "L'Oreal Paris",
    "Hemani Tea",
    "Dermive",
    "ROREC White Rice",
    "Fair & Clear",
    "Saaf & Khaas",
    "Bake Parlor Big",
    "Baking Food Items",
    "fauji",
    "Dry Rose",
    "Boho Decor",
    "Flying Wooden",
    "LED Lights",
    "luxury palace",
    "Golden",
  ]); // List schould be fetched
  const [categoryList, setCategoryList] = useState<string[]>([
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ]); // List schould be fetched

  const brandChangeHandler = () => {
    setBrand(selectedBrand.current!.value)
  }

    const categoryChangeHandler = () => {
    setCategory(selectedCategory.current!.value)
  }

  
  return (
    <div>
      <div>
        <label>
          Filter by brand
          <select name="brand" ref={selectedBrand} onChange={brandChangeHandler}>
            {brandList.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Filter by category
          <select name="category" ref={selectedCategory} onChange={categoryChangeHandler}>
            {categoryList.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filtering;
