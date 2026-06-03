export const getProfileInitials = (
  firstName?: string,
  lastName?: string,
  fallbackName?: string,
) => {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  if (fullName) {
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  if (fallbackName) {
    return fallbackName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return "CU";
};
