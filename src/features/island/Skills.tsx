export default function skills() {
  const images = {
    SkillsHtml: require("../../img/SkillsHtml.png"),
    SkillsCss: require("../../img/SkillsCss.png"),
    SkillsJs: require("../../img/SkillsJs.png"),
    SkillsReact: require("../../img/SkillsReact.png"),
    SkillsDotNet: require("../../img/SkillsDotNet.png"),
    SkillsCSharp: require("../../img/SkillsCSharp.png"),
    SkillsSql: require("../../img/SkillsSql.png"),
    SkillsOther: require("../../img/SkillsOther.png"),
  };

  return (
    <div id="skills-container">
      <img id="skills-html" alt="skills - html" src={images.SkillsHtml}></img>
      <img id="skills-css" alt="skills - css" src={images.SkillsCss}></img>
      <img id="skills-js" alt="skills - javascript" src={images.SkillsJs}></img>
      <img id="skills-react" alt="skills - react" src={images.SkillsReact}></img>
      <img id="skills-dot-net" alt="skills - dot net" src={images.SkillsDotNet}></img>
      <img id="skills-c-sharp" alt="skills - c#" src={images.SkillsCSharp}></img>
      <img id="skills-sql" alt="skills - sql" src={images.SkillsSql}></img>
      <img id="skills-other" alt="skills - other" src={images.SkillsOther}></img>
    </div>
  );
}
