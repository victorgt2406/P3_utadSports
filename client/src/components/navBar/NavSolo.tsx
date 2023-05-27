import flag from "../../assets/icons/FlagFilled.svg";

export default function NavSolo({ text ="Test" }) {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
        <br></br>
      <img src={flag} alt="Flag" style={{ height: "30px" }} />
      <p className="my-2">{text}</p>
      <div
        className="w-100 border-bottom border-dark"
        style={{ maxWidth: "93.5%", margin: "0 10%" }}
      ></div>
    </div>
  );
}

