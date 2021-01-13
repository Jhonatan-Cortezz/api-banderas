<template>
  <div class="row">
    <div v-for="pais in paises" :key="pais.name" class="col-12 my-2">
      <Card :pais="pais" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Card from "./Card";
export default {
  components: {
    Card,
  },
  setup() {
    const store = useStore();

    // mapeo el state de paises de la store
    const paises = computed(() => {
      // return store.state.paises
      return store.getters.topPaisesPoblacion;
    });

    onMounted(async () => {
      // console.log(store.state.paises)
      await store.dispatch("getPaises");
      await store.dispatch("filtrarRegion", "Americas");
    });

    return { paises };
  },
};
</script>
