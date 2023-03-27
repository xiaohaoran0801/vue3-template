<template>
  <div class="login">
    <div class="test">store中的name:{{ mainStore.name }}</div>
    <div>name长度:{{ mainStore.nameLength }}</div>
    <hr />
    <n-input
      v-model:value="inputName"
      class="input"
      placeholder="请输入要修改的名字"
      width="300px"
    ></n-input>
    <n-button class="confirm-btn" type="primary" @click="updateName"
      >change</n-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/store/main";
const inputName = ref("");
const mainStore = useMainStore();

const updateName = () => {
  mainStore.updateName(inputName.value);
};
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
  margin: 50px 0;
}
.login {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  .input {
    width: 300px;
  }

  .confirm-btn {
    margin: 20px 0;
  }
}
</style>
