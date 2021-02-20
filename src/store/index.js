import { createStore } from 'vuex'
import xml2js from 'xml2js'
import _ from 'lodash'

export default createStore({
  state() {
    return {
      rates: [],
      currentCurrency: ''
    }
  },
  mutations: {
    initializeRates(state, payload) {
      state.rates = payload.value
    },
    initializeCurrentCurrency(state, payload) {
      state.currentCurrency = payload.val
    }
  },
  actions: {
    async getData(context) {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')}`)
        const data = await response.json()
        xml2js.parseString(data.contents, function (err, result) {
          let json = result['gesmes:Envelope']['Cube']['0']['Cube']['0']['Cube']
          let arr = json.map((item) => {
            return {
              currency: item['$']['currency'],
              rate: parseFloat(item['$']['rate']),
              key: item['$']['currency']
            }
          })
          context.commit('initializeRates', {
            value: arr
          })
          context.commit('initializeCurrentCurrency', {
            val: 'EUR'
          })
        })
      } catch {
        (err) => {
          console.error(err)
        }
      }
    }
  },
  modules: {},
  getters: {
    dropdownListData(state) {
      const arr = state.rates.map((item) => {
        return {
          value: item.currency,
          label: item.currency,
          key: item.currency
        }
      })
      arr.push(
        {
          value: 'EUR',
          label: 'EUR',
          key: 'EUR'
        }
      )
      return arr.sort((a,b)=>{ return a.value < b.value ?1 :-1})
    },
    soughtRate(state) {
      if (state.currentCurrency === ""){
        return []
      }
      else if (state.currentCurrency === "EUR") {
        return state.rates.sort((a,b)=>{ return a.currency > b.currency ?1 :-1})
      } else {
        const soughtCurrency = state.rates.find(item => item['currency'] === state.currentCurrency)
        const soughtRates = state.rates.map((item) => {
          return {
            currency: item['currency'] !== soughtCurrency['currency'] ? item['currency'] : 'EUR',
            rate: item['rate'] !== soughtCurrency['rate'] ?_.round(item['rate'] / soughtCurrency['rate'], 4) :_.round(1 / soughtCurrency['rate'], 4),
            key: item['key'] !== soughtCurrency['key'] ? item['currency'] : 'EUR',
          }
        })
        return soughtRates.sort((a,b)=>{ return a.currency > b.currency ?1 :-1})
      }
    }
  }
})
