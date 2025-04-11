import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        {" "}
        Welcome to <span>Costs</span>
      </h1>
      <p>
        Easy, Peasy, Management — Simplifying Project Budgeting with Precision.
      </p>
      <LinkButton to="/newproject" text="Create your own" />
      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
