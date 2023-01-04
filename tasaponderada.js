const app = new Vue({
    el: '#app',
    data: {
      tasafwd:"",
      tasaspot: "", 
      tasatrm:"",
      valorfwd:"", 
      valorspot: "", 
      valortrm:"",
      valorMultiplicadoFwd:0,
      valorMultiplicadoSpot:0,
      valorMultiplicadoTrm:0,
      valorTotalMultiplicado:0,
      resultadoMultiplicado:0,
      resultadoPorcentualFwd:0,
      resultadoPorcentualSpot:0,
      resultadoPorcentualTrm:0,
      resultadoTasaPonderada:0,
    },
    methods:{
      agregarFamilia(){
        this.familiares.push({
        nombre:this.nuevaFruta, vereda:'Florida', estado:'activado'
        },
        )
      },
    },
    computed:{
        tasaPonderadaCalculo(){
            this.valorMultiplicadoFwd = this.tasafwd * this.valorfwd
            this.valorMultiplicadoSpot = this.tasaspot * this.valorspot
            this.valorMultiplicadoTrm = this.tasatrm * this.valortrm
            this.valorTotalMultiplicado = ((this.valorMultiplicadoFwd + this.valorMultiplicadoSpot + this.valorMultiplicadoTrm))
            this.resultadoPorcentualFwd = ((this.valorMultiplicadoFwd/this.valorTotalMultiplicado) * this.tasafwd)
            this.resultadoPorcentualSpot = ((this.valorMultiplicadoSpot/this.valorTotalMultiplicado) * this.tasaspot)
            this.resultadoPorcentualTrm = ((this.valorMultiplicadoTrm/this.valorTotalMultiplicado) * this.tasatrm)
            this.resultadoTasaPonderada = (this.resultadoPorcentualFwd + this.resultadoPorcentualSpot + this.resultadoPorcentualTrm)
          return this.resultadoTasaPonderada
        }
      },
    })
    