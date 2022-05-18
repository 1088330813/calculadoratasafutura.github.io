const app = new Vue({
  el: "#app",
  data: {
    informacion: [
      {
        iFechaInicial:"",
        iFechaFinal:"",
        iDias: "",
        iDevaluacion: "",
        iSpot: "",
        iStrike: "",
        iMonto: 0,
        iBanco:"",
      },
    ],
    dateInicial: "",
    dateFinal: "",
    diasDados: "",
    rateSpot: "",
    devaluation: "",
    OperNumDias: "",
    numDiasPositivo: "",
    numDiasNegativo: "",
    totalSumaTasa: "",
    totalRestasFechas: "",
    devPorcentual:"",
    resultS:"",
    resultSDecimal:"",
    calcularPorFechas:true,
    calcularPorDias:false,
    total:0,
  },

  methods: {
cambiarTipoDias(){
this.calcularPorFechas = false;
this.dateFinal = "";
this.dateInicial = "";

},
cambiarTipoFechas(){
  this.calcularPorDias = false;
  this.diasDados = "";
  },
    ponerDatos() {
        
      if (this.informacion.length>10){
        alert("No puedes agregar más de 10 registros, Sorry")
      }else if
        (this.dateInicial !="" && this.dateFinal !="" && this.rateSpot !="" && this.devaluation !="")
       {
        this.restarDias(new Date(this.dateFinal), new Date(this.dateInicial));
      } else if(this.diasDados !="" && this.rateSpot !="" && this.devaluation !="" ){
        this.calculationRateStrike(this.rateSpot, this.devaluation, this.diasDados );

        this.agregarNuevaInfo("","",this.diasDados, this.devaluation+"%", this.rateSpot, this.resultSDecimal)
    }else{
      alert("Digita los datos completos, para continuar con los calculos")
    }},
    calculationRateStrike(spot, dev, dias) {
        this.devPorcentual = dev / 100;
        this.resultS = spot * (1 + this.devPorcentual) ** (dias / 365);
        this.resultSDecimal = this.resultS.toFixed(2);
        return this.resultSDecimal; 
        },
    restarDias(a, b) {
    this.totalRestasFechas = Math.abs(a - b);
    if (a > b) {
        console.log(this.totalRestasFechas);
        this.numDiasPositivo = this.totalRestasFechas / (1000 * 3600 * 24);
        this.calculationRateStrike(this.rateSpot, this.devaluation, this.numDiasPositivo );
        this.agregarNuevaInfo(new Date(this.dateInicial).toLocaleDateString(),new Date(this.dateFinal).toLocaleDateString(),this.numDiasPositivo, this.devaluation+"%", this.rateSpot, this.resultSDecimal)
    } else {
        this.numDiasNegativo = (this.totalRestasFechas * -1) / (1000 * 3600 * 24);
        this.calculationRateStrike(this.rateSpot, this.devaluation, this.numDiasNegativo );
        this.agregarNuevaInfo(new Date(this.dateInicial).toLocaleDateString(),new Date(this.dateFinal).toLocaleDateString(),this.numDiasNegativo, this.devaluation+"%", this.rateSpot, this.resultSDecimal)
    }
    },
agregarNuevaInfo(fechai,fechaf,dias, deva, tasaSp, tasaSt) {
    this.informacion.push({
    iFechaInicial:fechai,
    iFechaFinal:fechaf,
    iDias: dias,
    iDevaluacion: deva,
    iSpot: tasaSp,
    iStrike: tasaSt,
    iMonto: 0,
    iBanco:"",
    });
    },
    },
    computed:{
      sumarFrutas(){
        this.total = 0;
        for(info of this.informacion){
          this.total = this.total+info.iMonto;
        }
        return this.total
      }
    },
    });

    // computed:{
    //   sumarFrutas(){
    //     this.total = 0;
    //     for(info of this.informacion){
    //       this.total = info.iMonto++;
    //     }
    //     return this.total
    //   }
    // }
    // });

