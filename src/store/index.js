import { createStore } from 'vuex'

export default createStore({
  state: {
    paises: [],
    paisesFiltrados: []
  },
  mutations: {
    SET_PAISES(state, payload){
      state.paises = payload
    },
    SET_PAISES_FILTRADOS(state, payload){
      state.paisesFiltrados = payload
    }
  },
  actions: {
    async getPaises({commit}){
      try {
        const response = await fetch('https://restcountries.eu/rest/v2/all')

        const data = await response.json()
        // console.log(data)
        commit('SET_PAISES', data)
      } catch (error) {
        console.log(error)      
      }
    },
    filtrarRegion({commit, state}, region){
      const filtro = state.paises.filter(pais => 
        pais.region.includes(region)
      )
      commit('SET_PAISES_FILTRADOS', filtro)
    },
    filtroNombre({commit, state}, texto){
      // logica para la funcion del buscador
      const textoCliente = texto.toLowerCase()
      const filtro = state.paises.filter(pais => {
        const textoApi = pais.name.toLowerCase()
        if (textoApi.includes(textoCliente)) {
          return pais
        }
      })

      commit('SET_PAISES_FILTRADOS', filtro)
    }
  },

  getters: {
    topPaisesPoblacion(state){
      return state.paisesFiltrados.sort((a, b) => {
        return a.population < b.population ? 1 : -1
      })
    }
  },
  modules: {
  }
})
