import debug from "debug";
const log = debug("axios:");

import axios from "axios";
import { useEffect, useState } from "react";

type Recipe = {
  recipeId: number;
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  makingAmount: string;
  imageUrl: string;
  ingredients: string[];
};

const axiosService = () => {
  const controller = new AbortController();
  const promise = axios({
    method: "GET",
    url: "https://jellybellywikiapi.onrender.com/api/Recipes/",
    // data: {
    //   username: "admin",
    //   password: "1234",
    // },
    signal: controller.signal, // to attach AbortSignal
    timeout: 5000,
    // headers: {'Content-Type': 'application/json'},
    // params: {       // these actually are queries
    //   q: 'books',
    //   page: 2
    // }
  });

  return { promise, controller };
};

const AxiosPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [pageStatus, setPageStatus] = useState("-");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const { promise, controller } = axiosService();
    setPageStatus("Loading");
    promise
      .then((res) => {
        log(res);
        setRecipes(res.data.items);
        setPageStatus("Success");
        setErrorMessage(null);
      })
      .catch((err) => {
        log(err);
        if (err.code === "ECONNABORTED") {
          setErrorMessage("⏱ Request timed out. Try again.");
        } else if (axios.isCancel(err)) {
          // cancel manually
        } else {
          setErrorMessage("Unexepected error message here");
        }
        setPageStatus("Error");
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1>AxiosPage</h1>
      <p>Page Status: {pageStatus}</p>
      {errorMessage && <p>Error: {errorMessage}</p>}

      <article>
        {recipes &&
          recipes.map((recipe: Recipe) => (
            <div key={recipe.recipeId}>
              <h1>{recipe.name}</h1>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>{recipe.description}</p>

              <ul>
                <li>
                  <strong>Prep Time:</strong> {recipe.prepTime}
                </li>
                <li>
                  <strong>Cook Time:</strong> {recipe.cookTime}
                </li>
                <li>
                  <strong>Total Time:</strong> {recipe.totalTime}
                </li>
                <li>
                  <strong>Makes:</strong> {recipe.makingAmount}
                </li>
              </ul>

              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
      </article>
    </>
  );
};

export default AxiosPage;
