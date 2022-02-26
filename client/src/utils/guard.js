const authCheckGuard = function (to, from, next) {
  const authorized = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth) && !authorized) {
    return next({ name: "auth", params: { from: JSON.stringify(to) } });
  }

  if (to.matched.some((record) => record.meta.requiresAnon) && authorized) {
    return next({ name: "me" });
  }

  next();
};

export { authCheckGuard };
