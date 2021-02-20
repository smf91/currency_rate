<template>
  <a-cascader
    :options="this.$store.getters.dropdownListData"
    :show-search="{ filter }"
    placeholder="Please select"
    @change="onChange"
  />
</template>
<script>

export default {
  data() {
    return {}
  },
  methods: {
    onChange(value, selectedOptions) {
      this.$store.commit('initializeCurrentCurrency', {
        val: selectedOptions[0].value
      })
    },
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
  }
}
</script>
