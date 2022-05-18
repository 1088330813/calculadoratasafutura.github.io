$(document).ready(()=>{
    $("#exportarExcel").click(function(){
        $("#tabla").table2excel({
            exclude: ".excludeThisClass",
            name: "Worksheet Name",
            filename: "Cotización de FWD.xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
  }); 
});
        });

        // $(document).ready(function() {
        //     $('table#tabla').DataTable( {
        //         dom: 'Bfrtip',
        //         "searching": true,
        //         "paging":true,
        //         "order":[[0,"asc"]],
        //         "ordering":true,
        //         "columnDefs":[{
        //             "targets":[3],
        //             "orderable":false
        //         }],
        //         buttons: [
        //             'copy', 'csv', 'excel', 'pdf', 'print'
        //         ]
        //     } );
        // } );
        // https://www.youtube.com/watch?v=RR7GPsN-3mM