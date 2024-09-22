export default function RubberDuck({ themeIsDarkMode }: { themeIsDarkMode: boolean }) {
  const images = {
    RubberDuck: require("../../img/RubberDuck.png"),
    RubberDuckDark: require("../../img/RubberDuckDark.png"),
  };

  return (
    <div id="rubber-duck">
      <img alt="rubber duck" src={themeIsDarkMode ? images.RubberDuckDark : images.RubberDuck}></img>
    </div>
  );
}
