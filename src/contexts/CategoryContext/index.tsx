import arrayToTree, { Tree } from "array-to-tree";
import React, { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { getCategoriesRequest } from "../../api/queries/categories";
import { Category } from "../../core/interfaces/categories";
import { CategoriesContext } from "./context";
import { CategoriesProviderProps } from "./interfaces";

const CategoriesProvider = (props: CategoriesProviderProps): ReactElement => {
  const [categories, setCategories] = useState<Tree<Category>[]>([]);

  useQuery(["/categories", true], getCategoriesRequest, {
    onSuccess: (data: Category[]) => {
      setCategories(arrayToTree(data, { parentProperty: "parent" }) || []);
    },
  });

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
