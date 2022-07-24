import { useEffect, useState } from "react";

const useLocalStorage = (key, action = "get", data) => {
  const [getData, setGetData] = useState(null);
  if (action === "get") {
    const somData = JSON.parse(localStorage.getItem(key));
    setGetData(somData);
  }
  localStorage.setItem(key, JSON.stringify(data));

  return [getData];
};

export default useLocalStorage();
