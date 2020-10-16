import Cookie from "js-cookie";

const set = (name, data, expires = null) => {
  const options = {
    expires,
    SameSite: "Lax",
    secure: true,
  };

  Cookie.set(name, data, options);
};

const get = (name) => {
  return Cookie.get(name);
};

const has = (name) => {
  return Cookie.get(name) !== undefined;
};

const remove = (name) => {
  Cookie.remove(name);
};

const clear = () => {
  Object.keys(Cookie.get()).forEach((name) => {
    Cookie.remove(name);
  });
};

export default {
  set,
  get,
  has,
  remove,
  clear,
}
