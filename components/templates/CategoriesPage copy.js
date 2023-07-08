import { useEffect, useState } from "react";
import Card from "../modules/Card";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";

function CategoriesPage({ data }) {
  const router = useRouter();

  const [query, setQuery] = useState({ difficulty: "", time: "" });

  useEffect(() => {
    const { difficulty, time } = router.query;

    if (query.difficulty !== difficulty || query.time !== time) {
      setQuery(difficulty, time);
    }
  }, []);

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const searchHandler = () => {
    router.push({
      pathname: "/categories",
      query,
    });
  };
  // cm:they have the same name
  //   router.push({
  //     pathname: "/categories",
  //     query: query,
  //   });
  // cm:we can write it better
  // router.push({
  //   pathname: "/categories",
  //   query: { difficulty: query.difficulty, time: query.time },
  // });

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            value={query.difficulty}
            name="difficulty"
            onChange={handleChange}
          >
            <option vlaue="">Difficulty</option>
            <option vlaue="Easy">Easy</option>
            <option vlaue="Medium">Medium</option>
            <option vlaue="Hard">Hard</option>
          </select>

          <select value={query.time} name="time" onChange={handleChange}>
            <option value="">Cooking time</option>
            <option value="more">More than 30 min</option>
            <option value="less">less than 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
        <div className={styles.cards}>
          {!data.length ? <img src="/images/search.png" alt="search" /> : null}
          {data.map((food) => (
            <Card key={food.id} {...food} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
