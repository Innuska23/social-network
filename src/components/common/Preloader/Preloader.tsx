import preloader from "../../../assets/images/preloader.svg";

type PropsType = {
}

let Preloader: React.FC<PropsType> = (props) => {
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
