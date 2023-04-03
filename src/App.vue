<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  display: flex
  justify-content: center
  color: #2c3e50

label
  font-weight: bold


input[type="text"], input[type="password"]
  padding-left: 4px
  margin-top: 4px
  border: 2px solid #000
  height: 24px
  border-radius: 5px


.btn-continue
  height: 24px

  background: orange
  color: #fff

  border: none
  border-radius: 5px

  margin-top: 8px

  transition: .8s all
  &:hover
    cursor: pointer
    opacity: 0.7
  &:disabled
    background: white
    cursor: not-allowed
    color: orange
    border: 1px orange solid

.btn-back
  height: 24px

  color: orange
  background: white

  border-radius: 5px
  border: 1px orange solid

  margin-top: 8px

  transition: .8s all
  &:hover
    cursor: pointer
    opacity: 0.4

.error-hint
  font-size: 10px
  color: red
</style>
