<template>
  <div class="third-step">
    <StepCounter step="3" />

    <h2>Senha de acesso</h2>

    <form>
      <div class="text-input">
        <label for="password">Sua senha</label>
        <input
          required
          name="password"
          type="password"
          v-model="password"
          @keyup="validate()"
        />
        <p v-if="this.msg['password']" class="error-hint">
          {{ this.msg["password"] }}
        </p>
      </div>
    </form>
    <div class="buttons">
      <button class="btn-back" @click="backStep()">Voltar</button>
      <button :disabled="valid" class="btn-continue" @click="nextStep()">
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
import StepCounter from "@/components/StepCounter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ThirdStep",
  components: {
    StepCounter,
  },
  data() {
    return {
      password: "",
      msg: [],
    };
  },
  computed: {
    ...mapGetters(["getType"]),
    valid() {
      return this.password == "" && this.msg != [];
    },
  },
  methods: {
    ...mapActions(["saveThirdStep"]),
    validate() {
      if (this.password != "") {
        this.msg["password"] = "";
      } else {
        this.msg["password"] = "Este campo é obrigatório !";
      }
    },
    backStep() {
      this.$router.push({
        name: "second-step",
        params: { type: this.getType },
      });
    },
    nextStep() {
      this.saveThirdStep(this.password);

      this.$router.push({
        name: "fourth-step",
      });
    },
  },
};
</script>

<style lang="sass" scoped>

.third-step
  width: 275px
  text-align: left

.text-input
  display: flex
  flex-direction: column

.buttons
  display: flex
  align-items: center
  > .btn-continue
    margin-left: 4px
    width: 55%
  > .btn-back
    width: 45%
    margin-right: 4px
</style>
