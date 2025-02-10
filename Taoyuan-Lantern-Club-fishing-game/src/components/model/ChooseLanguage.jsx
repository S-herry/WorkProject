import AnimatedDiv from "../Animated/AnimatedTransitionDiv";
import LanguageTransition from "../Animated/Transition/LanguageTransition";
import Button from "../Button";
import { memo } from "react";
const ChooseLanguage = memo(({ languageSelectBox, onClick }) => {
  return (
    <AnimatedDiv transitions={LanguageTransition(languageSelectBox)}>
      <h1>Language</h1>
      <Button size="70" className="text-white" onClick={() => onClick("CH")}>
        中文
      </Button>
      <Button size="70" className="text-white" onClick={() => onClick("EN")}>
        English
      </Button>
    </AnimatedDiv>
  );
});

export default ChooseLanguage;
