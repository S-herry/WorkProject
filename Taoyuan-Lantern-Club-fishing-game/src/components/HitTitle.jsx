import HitTitleButton_UI from "../assets/main/HitTitleButton_UI.png";

const HitTitle = ({ title, styles }) => {
  return (
    <div
      className="h2 position-relative top-0 p-4 z-0 d-flex justify-content-center align-items-center w-100 p-0 m-0"
      style={styles}
    >
      <img
        src={HitTitleButton_UI}
        className="z-0 position-absolute w-100 h-75"
      />
      <p className="p-0 m-0 text-center text-white z-1">{title}</p>
    </div>
  );
};

export default HitTitle;
