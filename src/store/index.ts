import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    drawerVisible: false,
  }),

  actions: {
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    },
  },
});
