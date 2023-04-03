<template>
  <div class="first-step">
    <StepCounter step="1" />

    <h2>Seja Bem-vindo(a)</h2>

    <form>
      <div class="text-input">
        <label for="email">Endereço de e-mail</label>
        <input
          required
          name="email"
          type="text"
          v-model="firstStep.email"
          @keyup="validate()"
        />
        <p v-if="this.msg['email']" class="error-hint">
          {{ this.msg["email"] }}
        </p>
      </div>
      <div class="radio-buttons">
        <div class="radio-input">
          <input
            class="radio"
            type="radio"
            name="type"
            v-model="firstStep.type"
            value="pf"
          />
          <label for="type">Pessoa física</label>
        </div>

        <div class="radio-input">
          <input
            class="radio"
            type="radio"
            name="type"
            v-model="firstStep.type"
            value="pj"
          />
          <label for="type">Pessoa jurídica</label>
        </div>
      </div>
    </form>
    <button :disabled="valid" class="btn-continue" @click="nextStep()">
      Continuar
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import StepCounter from "../components/StepCounter.vue";
import { validateEmail } from "@/utils/validators";

export default {
  name: "FirstStep",
  components: {
    StepCounter,
  },
  data() {
    return {
      firstStep: {
        email: "",
        type: "",
      },
      msg: [],
    };
  },
  computed: {
    valid() {
      return (
        this.firstStep.email == "" ||
        (this.msg != [] && this.firstStep.type == "")
      );
    },
  },
  methods: {
    ...mapActions(["saveFirstStep"]),
    nextStep() {
      this.saveFirstStep(this.firstStep);
      this.$router.push({
        name: "second-step",
        params: { type: this.firstStep.type },
      });
    },
    validate() {
      if (validateEmail(this.firstStep.email)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Por favor, digite o e-mail corretamente.";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.first-step
  width: 275px
  text-align: left

.text-input
  display: flex
  flex-direction: column

.radio-input
  display: flex
  align-items: flex-start
  white-space: nowrap
  &:first-child
    margin-right: 8px
  > .radio
    margin-right: 6px

.radio-buttons
  display: flex
  margin-top: 8px

.btn-continue
  width: 100%
</style>
