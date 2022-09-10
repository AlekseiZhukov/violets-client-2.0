const urlLocalServer = "http://localhost:3000/api";
//const urlRemoteServer = "'http://фиалки-жуковой-елены.рф/api'";

export const authLogin = async (data) => {
  return await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
