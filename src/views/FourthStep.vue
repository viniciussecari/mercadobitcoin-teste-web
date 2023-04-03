<template>
  <div class="fourth-step">
    <StepCounter step="4" />

    <h2>Revise suas informações</h2>

    <form>
      <div class="text-input">
        <label for="email">Endereço de e-mail</label>
        <input
          name="email"
          type="text"
          v-model="data.email"
          @keyup="validate('email')"
        />
        <p v-if="this.msg['email']" class="error-hint">
          {{ this.msg["email"] }}
        </p>
      </div>
      <div class="text-input">
        <label for="name">{{ labels.name }}</label>
        <input
          name="name"
          type="text"
          v-model="data.name"
          @keyup="validate('name')"
        />
        <p v-if="this.msg['name']" class="error-hint">
          {{ this.msg["name"] }}
        </p>
      </div>
      <div class="text-input">
        <label for="doc">{{ labels.doc }}</label>
        <input
          name="doc"
          type="text"
          v-model="data.doc"
          v-mask="mask"
          @keyup="validate('doc')"
        />
        <p v-if="this.msg['doc']" class="error-hint">
          {{ this.msg["doc"] }}
        </p>
      </div>
      <div class="text-input">
        <label for="date">{{ labels.date }}</label>
        <input
          name="date"
          type="text"
          v-model="data.date"
          v-mask="'##/##/####'"
          @keyup="validate('date')"
        />
        <p v-if="this.msg['date']" class="error-hint">
          {{ this.msg["date"] }}
        </p>
      </div>
      <div class="text-input">
        <label for="phone">{{ labels.phone }}</label>
        <input
          name="phone"
          type="text"
          v-model="data.phone"
          v-mask="'(##) #####-####'"
          @keyup="validate('phone')"
        />
        <p v-if="this.msg['phone']" class="error-hint">
          {{ this.msg["phone"] }}
        </p>
      </div>
      <div class="text-input">
        <label for="password">Senha</label>
        <input
          name="password"
          type="text"
          v-model="data.password"
          @keyup="validate('password')"
        />
        <p v-if="this.msg['password']" class="error-hint">
          {{ this.msg["password"] }}
        </p>
      </div>
    </form>

    <div class="buttons">
      <button class="btn-back" @click="backStep()">Voltar</button>
      <button class="btn-continue" @click="save()" :disabled="valid">
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script>
import StepCounter from "@/components/StepCounter.vue";
import { mapActions, mapGetters } from "vuex";
import { validateCPF, validateCNPJ, validateEmail } from "../utils/validators";

export default {
  name: "FourthStep",
  components: {
    StepCounter,
  },
  data() {
    return {
      data: {},
      msg: [],
    };
  },
  mounted() {
    this.data = this.getRegister;
  },
  computed: {
    ...mapGetters(["getRegister"]),
    valid() {
      return (
        (this.data.date == "" ||
          this.data.doc == "" ||
          this.data.name == "" ||
          this.data.phone == "" ||
          this.data.email == "" ||
          this.data.password == "") &&
        this.msg != []
      );
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

      return this.data.type == "pf" ? labelsPF : labelsPJ;
    },
    mask() {
      return this.data.type == "pf" ? "###.###.###-##" : "##.###.###/####-##";
    },
  },
  methods: {
    ...mapActions(["saveRegister"]),
    validate(field) {
      const doc = this.data.doc.replaceAll(/\W/gm, "");

      switch (field) {
        case "name":
          if (this.data.name != "") {
            this.msg["name"] = "";
          } else {
            this.msg["name"] = "Este campo é obrigatório !";
          }
          break;
        case "email":
          if (validateEmail(this.data.email)) {
            this.msg["email"] = "";
          } else {
            this.msg["email"] = "Por favor, digite o e-mail corretamente.";
          }
          break;
        case "doc":
          if (doc != "") {
            this.msg["doc"] = "";
            if (this.data.type == "pf") {
              if (!validateCPF(doc)) this.msg["doc"] = "CPF inválido !";
              else this.msg["doc"] = "";
            } else {
              if (validateCNPJ(doc)) this.msg["doc"] = "";
              else this.msg["doc"] = "CNPJ inválido !";
            }
          } else this.msg["doc"] = "Este campo é obrigatório !";
          break;

        case "date":
          if (this.data.date != "") {
            this.msg["date"] = "";
          } else {
            this.msg["date"] = "Este campo é obrigatório !";
          }
          break;
        case "password":
          if (this.password != "") {
            this.msg["password"] = "";
          } else {
            this.msg["password"] = "Este campo é obrigatório !";
          }
          break;
        case "phone":
          if (this.data.phone != "") {
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
      this.$router.push({ name: "third-step" });
    },
    save() {
      this.saveRegister(this.data);
    },
  },
};
</script>

<style lang="sass" scoped>

.fourth-step
  width: 275px
  text-align: left

.text-input
  display: flex
  flex-direction: column
  margin: 8px 0px

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
