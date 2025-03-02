const apiMethods = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
};

const apiEndpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  task: {
    add: "/tasks",
    getById: "/tasks/:id",
    list: "/tasks",
    edit: "tasks/:id",
    delete: "tasks/:id",
  },
};

const api = { endpoints: apiEndpoints, methods: apiMethods };

export { api };
