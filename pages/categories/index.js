import React from "react";
import CategoriesPage from "../../components/templates/CategoriesPage";

function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;

  const res = await fetch(`${process.env.BASE_URL}/data}`);
  // const res = await fetch("http://localhost:3001/data");
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty
    );
    // cm :timeResult is an array it can be empty at the end based on search result
    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      // const timeDetail = cookingTime.split(" ")[0]
      // cm: we can use array destructuring
      const [timeDetail] = cookingTime.split(" ");

      if (time === "less" && timeDetail && +timeDetail <= 30) {
        return detail;
      } else if (time === "more" && timeDetail && +timeDetail > 30) {
        return detail;
      }
    });

    if (time && difficulty && timeResult.length && difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty && timeResult.length) {
      return item;
    }
  });

  return {
    props: {
      data: filteredData,
    },
  };
}
