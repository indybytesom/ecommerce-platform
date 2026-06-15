export const getSettingsCompletion = (
  enabledSettings: number,
  totalSettings: number,
) => {
  return Math.round((enabledSettings / totalSettings) * 100);
};
