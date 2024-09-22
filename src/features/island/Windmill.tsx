export default function Windmill({ themeIsDarkMode }: { themeIsDarkMode: boolean }) {
  const images = {
    WindmillBlades: require("../../img/WindmillBlades.png"),
    WindmillBladesDark: require("../../img/WindmillBladesDark.png"),
  };

  return (
    <div id="windmill-blades">
      <img alt="windmill blades" src={themeIsDarkMode ? images.WindmillBladesDark : images.WindmillBlades}></img>
    </div>
  );
}
