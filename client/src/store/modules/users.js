/* eslint-disable */
import api from "../../services/api"

const endpoint = "user";

const state = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  token: localStorage.getItem("token") || null,
  expiresIn: localStorage.getItem("expiresIn") || null,
};

const actions = {
  async register({ commit }, formData) {
    try {
      const response = await api.post(
        `/${endpoint}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { token, user, expiresIn } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn);
      commit("SET_AUTH", { token, user, expiresIn });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async login({ commit }, credentials) {
    try {
      const response = await api.post(
        `/${endpoint}/login`,
        credentials
      );
      
      if (response.data.success) {
        const { token, user, expiresIn } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("expiresIn", expiresIn);
        localStorage.setItem("currentUser", JSON.stringify(user));
        commit("SET_AUTH", { token, user, expiresIn });
      }
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  logout({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    commit("CLEAR_AUTH");
  },

  async getUsers({ commit, state }) {
    try {
      const response = await api.get(`/${endpoint}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      commit("SET_USERS", response.data.users);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getUserById({ commit, state }, id) {
    try {
      const response = await api.get(`/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      commit("SET_CURRENT_USER", response.data.user);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async updateUser({ commit }, { id, formData }) {
    try {
      const response = await api.put(`/${endpoint}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deleteUser({ state }, id) {
    try {
      const response = await api.delete(`/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async changePassword({ state }, { id, currentPassword, newPassword }) {
    try {
      const response = await api.patch(
        `/${endpoint}/${id}/change-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  async restoreSession({ commit, state }) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get(
          `/${endpoint}/${state.currentUser.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          commit("SET_AUTH", {
            token,
            user: response.data.user,
            expiresIn: localStorage.getItem("expiresIn"),
          });
        }
        return response.data;
      } catch (error) {
        commit("CLEAR_AUTH");
        return error.response;
      }
    }
  },
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_CURRENT_USER(state, user) {
    console.log(user)
    state.currentUser = user;
  },
  SET_AUTH(state, { token, user, expiresIn }) {
    state.token = token;
    state.currentUser = user;
    state.expiresIn = expiresIn;
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
  CLEAR_AUTH(state) {
    state.token = null;
    state.currentUser = null;
    state.expiresIn = null;
    localStorage.removeItem("currentUser");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  isAdmin: (state) => state.currentUser?.role === "admin",
  getAllUsers: (state) => state.users,
  getCurrentUser: (state) => state.currentUser,
  getToken: (state) => state.token,
  getExpiresIn: (state) => state.expiresIn,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
