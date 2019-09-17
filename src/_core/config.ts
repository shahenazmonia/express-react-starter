const config: { [key: string]: () => string } = {};
let baseUrl;
config.getBasePublicUrl = () => {
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:8080/";
  } else if (process.env.NODE_ENV === "production") {
    baseUrl = "/";
  } else {
    baseUrl = "http://localhost:8080/";
  }
  // todo: delete the line below
  return baseUrl;
};

export default config;
