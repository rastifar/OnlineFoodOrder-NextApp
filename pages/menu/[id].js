import { useRouter } from "next/router";
import DetailsPage from "../../components/templates/DetailsPage";

function MenuDetails({ data }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading ::</h1>;
  }
  return <DetailsPage {...data} />;
}

export default MenuDetails;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data}`);
  // const res = await fetch("http://localhost:3001/data");
  const json45 = await res.json();
  const data = json45.slice(0, 10);

  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;

  //   const res = await fetch(`http://localhost:3001/data/${params.id}`);
  const res = await fetch(`${process.env.BASE_URL}/data/${id}}`);

  // const res = await fetch(`http://localhost:3001/data/${id}`);
  const data = await res.json();
  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
      revalidate: +process.env.REVALIDATE,
    },
  };
}
