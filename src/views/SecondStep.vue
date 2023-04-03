<template>
  <div class="second-step">
    <StepCounter step="2" />

    <h2>{{ labels.title }}</h2>

    <form>
      <div class="text-input">
        <label for="name">{{ labels.name }}</label>
        <input
          required
          name="name"
          type="text"
          v-model="obj.name"
          @keyup="validate('name')"
        />
        <p v-if="this.msg['name']" class="error-hint">{{ this.msg["name"] }}</p>
      </div>
      <div class="text-input">
        <label for="name">{{ labels.doc }}</label>
        <input
          required
          name="name"
          type="text"
          v-mask="mask"
          v-model="obj.doc"
          @keyup="validate('doc')"
        />
        <p v-if="this.msg['doc']" class="error-hint">{{ this.msg["doc"] }}</p>
      </div>
      <div class="text-input">
        <label for="name">{{ labels.date }}</label>
        <input
          required
          name="name"
          type="text"
          v-mask="'##/##/####'"
          v-model="obj.date"
          @keyup="validate('date')"
        />
        <p v-if="this.msg['date']" class="error-hint">{{ this.msg["date"] }}</p>
      </div>
      <div class="text-input">
        <label for="name">{{ labels.phone }}</label>
        <input
          required
          name="name"
          type="text"
          v-mask="'(##) #####-####'"
          v-model="obj.phone"
          @keyup="validate('phone')"
        />
        <p v-if="this.msg['phone']" class="error-hint">
          {{ this.msg["phone"] }}
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
import { mapActions } from "vuex";
import StepCounter from "../components/StepCounter.vue";
import { validateCPF, validateCNPJ } from "../utils/validators";

export default {
  name: "SecondStep",
  components: {
    StepCounter,
  },
  data() {
    return {
      type: this.$route.params.type,
      obj: {
        name: "",
        doc: "",
        date: "",
        phone: "",
      },
      msg: [],
    };
  },
  computed: {
    valid() {
      return (
        (this.obj.date == "" ||
          this.obj.doc == "" ||
          this.obj.name == "" ||
          this.obj.phone == "") &&
        this.msg != []
      );
    },
    mask() {
      return this.type == "pf" ? "###.###.###-##" : "##.###.###/####-##";
    },
    labels() {
      let labelsPF = {
        title: "Pessoa Física",
        name: "Nome",
        doc: "CPF",
        date: "Data de nascimento",
        phone: "Telefone",
      };
      let labelsPJ = {
        title: "Pessoa Jurídica",
        name: "Razão Social",
        doc: "CNPJ",
        date: "Data de abertura",
        phone: "Telefone",
      };

      return this.type == "pf" ? labelsPF : labelsPJ;
    },
  },
  methods: {
    ...mapActions(["saveSecondStep"]),
    validate(field) {
      const doc = this.obj.doc.replaceAll(/\W/gm, "");

      switch (field) {
        case "name":
          if (this.obj.name != "") {
            this.msg["name"] = "";
          } else {
            this.msg["name"] = "Este campo é obrigatório !";
          }
          break;
        case "doc":
          if (doc != "") {
            this.msg["doc"] = "";
            if (this.type == "pf") {
              if (!validateCPF(doc)) this.msg["doc"] = "CPF inválido !";
              else this.msg["doc"] = "";
            } else {
              if (validateCNPJ(doc)) this.msg["doc"] = "";
              else this.msg["doc"] = "CNPJ inválido !";
            }
          } else this.msg["doc"] = "Este campo é obrigatório !";
          break;

        case "date":
          if (this.obj.date != "") {
            this.msg["date"] = "";
          } else {
            this.msg["date"] = "Este campo é obrigatório !";
          }
          break;
        case "phone":
          if (this.obj.phone != "") {
            this.msg["phone"] = "";
          } else {
            this.msg["phone"] = "Este campo é obrigatório !";
          }
          break;
        default:
          break;
      }
    },
    backStep() {
      this.$router.push({ name: "first-step" });
    },
    nextStep() {
      this.saveSecondStep(this.obj);
      this.$router.push({ name: "third-step" });
    },
  },
};
</script>

<style lang="sass" scoped>
.second-step
  width: 275px
  text-align: left

.text-input
  margin: 8px 0px
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
