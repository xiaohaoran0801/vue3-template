import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    name: "超级管理员",
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
    // async insertPost(data:string){
    // 可以做异步
    // await doAjaxRequest(data)
    // }
  },
});
