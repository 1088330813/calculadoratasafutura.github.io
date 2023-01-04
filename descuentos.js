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
this.fechaFinalMostrar = "";
this.fechaInicialMostrar = "";

},
eliminar: function(index){
  this.informacion.splice(index,1);
  localStorage.setItem('calculos-data',JSON.stringify(this.informacion));
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

      this.diaInicial = new Date(this.dateInicial).getUTCDate();
      this.mesInicial = new Date(this.dateInicial).getUTCMonth();
      this.anyoInicial = new Date(this.dateInicial).getUTCFullYear();
        this.diaFinal = new Date(this.dateFinal).getUTCDate();
        this.mesFinal = new Date(this.dateFinal).getUTCMonth();
        this.anyoFinal = new Date(this.dateFinal).getUTCFullYear();

          this.fechaInicialMostrar = new Date(this.anyoInicial,this.mesInicial,this.diaInicial).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',});
            this.fechaFinalMostrar = new Date(this.anyoFinal,this.mesFinal,this.diaFinal).toLocaleDateString('es-CO', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',});
       
        this.numDiasPositivo = this.totalRestasFechas / (1000 * 3600 * 24);
        this.calculationRateStrike(this.rateSpot, this.devaluation, this.numDiasPositivo );
        this.agregarNuevaInfo(this.fechaInicialMostrar,this.fechaFinalMostrar,this.numDiasPositivo, this.devaluation+"%", this.rateSpot, this.resultSDecimal)
      } else {
        this.numDiasNegativo = (this.totalRestasFechas * -1) / (1000 * 3600 * 24);
        this.calculationRateStrike(this.rateSpot, this.devaluation, this.numDiasNegativo );
        this.agregarNuevaInfo(this.fechaInicialMostrar,this.fechaFinalMostrar,this.numDiasNegativo, this.devaluation+"%", this.rateSpot, this.resultSDecimal)

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
    console.log(this.informacion)
    localStorage.setItem('calculos-data',JSON.stringify(this.informacion));
    },
    created(){
      let datosDB = JSON.parse(localStorage.getItem('calculos-data'));
      if(datosDB === null){
          this.informacion = [];
      }else{
          this.informacion = datosDB;
      }
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
