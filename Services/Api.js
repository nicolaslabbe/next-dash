import fetch from "fetch-everywhere";
import Utils from "../Utils";

const create = () => {
  return {
    get: url =>
      Utils.url.get(
        `${typeof window !== "undefined"
          ? window.top.location.origin
          : Utils.config.url}${url}`
      ),
    post: (url, data) =>
      Utils.url.post(
        `${typeof window !== "undefined"
          ? window.top.location.origin
          : Utils.config.url}${url}`,
        {
          "Content-Type": "application/json"
        },
        data
      ),
    delete: url =>
      Utils.url.delete(
        `${typeof window !== "undefined"
          ? window.top.location.origin
          : Utils.config.url}${url}`,
        {
          "Content-Type": "application/json"
        }
      ),
    test: url =>
      Utils.url.delete(
        `${typeof window !== "undefined"
          ? window.top.location.origin
          : Utils.config.url}${url}`,
        {
          "Content-Type": "application/json"
        }
      )
  };
};

export default {
  create
};
