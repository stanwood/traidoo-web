import arrayToTree from "array-to-tree";
import React, { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategoriesRequest } from "../../api/queries/categories";
import { Category, CategoryTree } from "../../core/interfaces/categories";
import { CategoriesContext } from "./context";
import { CategoriesProviderProps } from "./interfaces";

const CategoriesProvider = (props: CategoriesProviderProps): ReactElement => {
  const [categories, setCategories] = useState<CategoryTree[]>([]);

  const { refetch } = useQuery(["/categories", false], getCategoriesRequest, {
    enabled: false,
    onSuccess: (data: Category[]) => {
      setCategories(arrayToTree(data, { parentProperty: "parent" }));
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const value = {
    categories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
