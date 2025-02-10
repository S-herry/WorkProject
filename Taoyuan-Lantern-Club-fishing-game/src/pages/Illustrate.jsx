import { useContext, lazy } from "react";
import phone from "../assets/main/phone.png";
import rotate from "../assets/main/rotate.png";
import HitTitle from "../components/HitTitle";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { UnityContext } from "../content/GetFishUnity";
import ImageLoading from "../components/Loading/ImageLoading";
const Illustrate = ({ onChangePage }) => {
  const ImageBlockComponent = lazy(() => import("../components/ImageBlock"));

  const { UnityCallMessage } = useContext(UnityContext);
  const { 操作說明, 甩動手機拋出魚竿, 旋轉收線器拉起金魚, 開始 } = useSelector(
    (state) => state.connState.language
  );

  return (
    <>
      <HitTitle title={操作說明} />
      <h5 className="text-center p-1 m-0 dark_text darkText ">
        {甩動手機拋出魚竿}
      </h5>
      <ImageLoading alt="phone image" width="100%" height="150px">
        <ImageBlockComponent src={phone} alt="phone image" />
      </ImageLoading>
      <h5 className="text-center p-1 m-0 dark_text darkText">
        {旋轉收線器拉起金魚}
      </h5>
      <ImageLoading alt="rotate image" width="100%" height="150px">
        <ImageBlockComponent src={rotate} alt="rotate image" />
      </ImageLoading>

      <div className="d-flex justify-content-center">
        <Button
          size="65"
          onClick={() => {
            onChangePage();
            UnityCallMessage("OpenPage2");
          }}
        >
          {開始}
        </Button>
      </div>
    </>
  );
};

export default Illustrate;
