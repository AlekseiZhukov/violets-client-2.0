export const authLogin = async (data) => {
  return await fetch("http://фиалки-жуковой-елены.рф/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
