if (VueCurrencyFilter) {
    Vue.use(VueCurrencyFilter, {
      symbol: "",
      thousandsSeparator: ",",
      fractionCount: 2,
      fractionSeparator: ".",
      symbolPosition: "front",
      symbolSpacing: false,
      avoidEmptyDecimals: '',
    })
  }
  