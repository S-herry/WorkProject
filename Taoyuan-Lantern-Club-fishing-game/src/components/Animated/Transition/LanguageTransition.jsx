import { useTransition } from "@react-spring/web";

const LanguageTransition = (showLanguage, onRest) =>
  useTransition(showLanguage, {
    from: { x: 500 },
    enter: { x: 0 },
    leave: { x: 500 },
    onRest: () => {
      onRest && onRest();
    },
  });

export default LanguageTransition;
