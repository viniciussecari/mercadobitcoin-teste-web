<template>
  <div>
    <h2>
      Etapa
      <span class="step">
        {{ step }}
      </span>
      de 4
    </h2>
  </div>
</template>

<script>
export default {
  name: "StepCounter",
  props: {
    step: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.step
    color: orange
</style>
