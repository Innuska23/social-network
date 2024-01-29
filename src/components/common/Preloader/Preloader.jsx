import preloader from "../../../assets/images/preloader.svg";

let Preloader = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -25%)",
      }}
    >
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
