export const header = (method, token = null, body = null) => {
  const config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("locale") || "en",
    },
  };

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body != null) {
    config.body = JSON.stringify(body);
  }

  return config;
};
