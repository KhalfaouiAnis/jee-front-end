import "./loading.styles.css";
import LoaderImage from "../../assets/images/loader.gif";
export default function Spinner({ classes }) {
  return (
    <div>
      <img className={classes} src={LoaderImage} alt="loader" />
    </div>
  );
}
