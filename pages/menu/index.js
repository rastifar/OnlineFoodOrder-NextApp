import MenuPage from "../../components/templates/MenuPage";

function Menu({ data }) {
  return <MenuPage data={data} />;
}

export default Menu;

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/data}`);

  // const res = await fetch("http://localhost:3001/data");
  const data = await res.json();
  return {
    props: { data },
    revalidate: +process.env.REVALIDATE,
    // revalidate: 1 * 60 * 60,
    // revalidate: 60 * 60, 60 seconds * 60 minutes = 1 hour
  };
}
