export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isValidHexColor = (color) => {
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  return hexColorRegex.test(color);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const getFactionColorClass = (factionName) => {
  const colorMap = {
    MIDA: "faction-mida",
    UESC: "faction-uesc",
    CyAc: "faction-cyac",
    NuCaloric: "faction-nucal",
    SekGen: "faction-sekgen",
    Traxus: "faction-traxus",
    Arachne: "faction-arachne",
  };
  return colorMap[factionName] || "marathon-light";
};
