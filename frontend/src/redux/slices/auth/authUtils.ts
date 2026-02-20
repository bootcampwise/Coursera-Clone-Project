export const clearAllAuthTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  localStorage.removeItem("instructorToken");
  localStorage.removeItem("instructorUser");
  localStorage.removeItem("portalToken");
  localStorage.removeItem("portalUser");
};
