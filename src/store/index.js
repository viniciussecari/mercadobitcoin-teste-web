import { createStore } from "vuex";
import { saveRegister } from "@/services/services";

export default createStore({
  state: {
    register: {
      email: "",
      type: "",
      name: "",
      doc: "",
      date: "",
      phone: "",
      password: "",
    },
  },
  getters: {
    getFirstStep(state) {
      return { email: state.register.email, type: state.register.type };
    },
    getSecondStep(state) {
      return {
        name: state.register.name,
        date: state.register.date,
        doc: state.register.doc,
        phone: state.register.phone,
      };
    },
    getThirdStep(state) {
      return { password: state.register.password };
    },
    getRegister(state) {
      return state.register;
    },
    getType(state) {
      return state.register.type;
    },
  },
  actions: {
    saveFirstStep({ commit }, data) {
      commit("setFirstStep", data);
    },
    saveSecondStep({ commit }, data) {
      commit("setSecondStep", data);
    },
    saveThirdStep({ commit }, data) {
      commit("setThirdStep", data);
    },
    async saveRegister({ commit }, payload) {
      const data = await saveRegister(payload);

      commit("setRegister", data);
    },
  },
  mutations: {
    setFirstStep(state, data) {
      state.register.email = data.email;
      state.register.type = data.type;
    },
    setSecondStep(state, data) {
      state.register.name = data.name;
      state.register.doc = data.doc;
      state.register.date = data.date;
      state.register.phone = data.phone;
    },
    setThirdStep(state, data) {
      state.register.password = data;
    },
    setRegister(state, data) {
      state.register = data;
    },
  },
});
