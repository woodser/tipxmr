import React from "react";
import PropTypes from "prop-types";

const languages = [
  "Dutch",
  "English",
  "Esperanto",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Portuguese",
  "Russian",
  "Spanish",
];

function convertFlag(language) {
  switch (language) {
    case "German":
      return "🇩🇪";
    case "French":
      return "🇲🇫";
    case "Esperanto":
      return "🏴‍☠️";
    case "Spanish":
      return "🇪🇦";
    case "Russian":
      return "🇷🇺";
    case "Italian":
      return "🇮🇹";
    case "Japanese":
      return "🇯🇵";
    case "Portuguese":
      return "🇵🇹";
    case "Dutch":
      return "🇳🇱";
    default:
      return "🇬🇧";
  }
}

function LanguagePicker({ language, setLanguage }) {
  // Build list of language items, alphabetically sorted
  const languageItems = languages.map((language) => {
    return (
      <option className="bg-xmrgray-darker" key={language} value={language}>
        {convertFlag(language) + " " + language}
      </option>
    );
  });

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  return (
    <div className="text-center mt-4">
      <span
        className="uppercase tracking-tight font-bold mb-2"
        htmlFor="languages"
      >
        Seed language:
      </span>
      <select
        id="languages"
        name="languages"
        value={language}
        onChange={handleLanguageChange}
        className="ml-4 p-2 appearance-none bg-xmrgray-darker border border-xmrorange py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
      >
        {languageItems}
      </select>
    </div>
  );
}
// Defining property types
LanguagePicker.propTypes = {
  language: PropTypes.string,
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

export default LanguagePicker;
