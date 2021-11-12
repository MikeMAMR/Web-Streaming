var listaClientes = [];

function actualizarTabla(){
    document.querySelector("#tblClientes tbody").innerHTML='';
    //Se obtiene la lista de productos (las claves)
    listaClientes=[];
    if(localStorage.getItem("listaClientes")!=null){
        listaClientes=JSON.parse(localStorage.getItem("listaClientes"));
    }
    //Añadir cada producto en la tabla
    listaClientes.forEach(function(elementoActual, indiceElementoActual,arreglo) {
        var cliente=JSON.parse(localStorage.getItem(elementoActual));
        agregarFila(cliente,elementoActual);
    });
}

window.onload = function() {

    actualizarTabla();

    const selectElementPlan = document.querySelector('#selePlan');
    selectElementPlan.addEventListener('change', (event) => {
        const valor = parseInt(event.target.value);
        if(valor==1){
            document.getElementById("imgLogo").src="img/netflix.png";
            document.getElementById("tansolo").textContent = "100";
            document.getElementById("totalNetflix").value = "100";
            document.getElementById("SeleNetflix").value = "1";
            document.getElementById("seleDescuento").value = "1";
        }
        else if(valor==2){
            document.getElementById("imgLogo").src="img/HBO.png";
            document.getElementById("tansolo").textContent = "110";
            document.getElementById("totalNetflix").value = "110";
            document.getElementById("SeleNetflix").value = "1";
            document.getElementById("seleDescuento").value = "1";
        }else if(valor==3){
            document.getElementById("imgLogo").src="img/Disney_Plus.png";
            document.getElementById("tansolo").textContent = "120";
            document.getElementById("totalNetflix").value = "120";
            document.getElementById("SeleNetflix").value = "1";
            document.getElementById("seleDescuento").value = "1";
        }else if(valor==4){
            document.getElementById("imgLogo").src="img/prime-video.png";
            document.getElementById("tansolo").textContent = "100";
            document.getElementById("totalNetflix").value = "100";
            document.getElementById("SeleNetflix").value = "1";
            document.getElementById("seleDescuento").value = "1";
        }
    });

    const selectElementNetflix = document.querySelector('#SeleNetflix');
    selectElementNetflix.addEventListener('change', (event) => {
        const resultado = document.querySelector('#totalNetflix');
        const selectElementPlan = document.querySelector('#selePlan').value;
        var multi = 0;
        if(selectElementPlan=="1" || selectElementPlan=="4") multi = 100;
        if(selectElementPlan=="2") multi = 110;
        if(selectElementPlan=="3") multi = 120;
        const total = parseInt(event.target.value);
        const t = total * multi;
        //const totalAc = selectElementTotal.value;
        //totalAc = totalAc + t;
        resultado.value = `${t}`;
        document.getElementById("seleDescuento").value = "1";
        //selectElementTotal.textContent = `${totalAc}`;
    });

    const selectElementDesc = document.querySelector('#seleDescuento');
    selectElementDesc.addEventListener('change', (event) => {
        //VOLVER A CALCULAR
        var totaltmp = 0;
        var selectElementPlan = document.querySelector('#SeleNetflix').value;
        var selectElementStream = document.querySelector('#selePlan').value;
        if(selectElementStream=="1") totaltmp = 100;
        if(selectElementStream=="2") totaltmp = 110;
        if(selectElementStream=="3") totaltmp = 120;
        if(selectElementStream=="4") totaltmp = 100;
        
        totaltmp = totaltmp * parseInt(selectElementPlan);
        document.getElementById("totalNetflix").value = totaltmp;

        var resultado = document.querySelector('#seleDescuento').value;
        var res = document.getElementById("totalNetflix").value;

        if(resultado == "2"){
            var ans = parseFloat(res) - (parseFloat(res) * 0.05);
            document.getElementById("totalNetflix").value = ans;
        }else if(resultado == "3"){
            var ans = parseFloat(res) - (parseFloat(res) * 0.1);
            document.getElementById("totalNetflix").value = ans;
        }
        
    });



    $('#tblClientes').DataTable(
        {
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            "createdRow": function ( row, data, index ) {
                if (data[2]==0) {
                    //Colorear toda la fila cuando la existencia sea 0
                    $('td',row).eq(2).addClass('table-danger');
                }
            },
            "order": [[ 2, "asc" ],[ 0, "asc" ]],
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Exportar a excel'
                },
                {
                    extend: 'pdfHtml5',
                    text: 'Exportar a pdf'
                }
            ]
        } 
    );
}


function agregar(){
    if(validar()){
        listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
        var clientes = {};
        clientes.nombre = document.querySelector("#txtNombre").value;
        clientes.precio = document.querySelector("#totalNetflix").value;
    
    
        var combo = document.getElementById("selePlan");
        var selec = combo.options[combo.selectedIndex].text;
        clientes.servicios = selec;
    
        var combo1 = document.getElementById("SeleNetflix");
        var selec2 = combo1.options[combo1.selectedIndex].text;
        clientes.tiempo = selec2;
    
        var combo3 = document.getElementById("seleDescuento");
        var selec3 = combo3.options[combo3.selectedIndex].text;
        clientes.descuento = selec3;
    
        
    
        if(!listaClientes){
            listaClientes=[];
        }
        var clave;
        if(listaClientes.length>0){
            //Acceder a la última clave y sumarle 1
            clave=listaClientes[listaClientes.length-1]+1;
        }else{
            //Iniciar la clave en 1
            clave=1;
        }
        listaClientes.push(clave);
    
        localStorage.setItem("listaClientes",JSON.stringify(listaClientes));
        localStorage.setItem(clave,JSON.stringify(clientes));
        
        //Actualizar la tabla
        actualizarTabla();
    }
    

}

function agregarFila(cliente, clave){
    
    let tr = document.createElement("tr");
    let tdNombre = document.createElement("td");
    let tdServicios = document.createElement("td");
    let tdPeriodo = document.createElement("td");
    let tdDescuento = document.createElement("td");
    let tdPrecio = document.createElement("td");
    

    tdNombre.append(cliente.nombre);
    tdServicios.append(cliente.servicios);
    tdPeriodo.append(cliente.tiempo);
    tdDescuento.append(cliente.descuento);
    tdPrecio.append(cliente.precio);

    tr.append(tdNombre);
    tr.append(tdServicios);
    tr.append(tdPeriodo);
    tr.append(tdDescuento);
    tr.append(tdPrecio);

    //Añade la fila a la tabla
    var tbody=document.querySelector("#tblClientes tbody");
    tbody.append(tr);
}
function limpiarValidacionForm(){
    let txtNombre=document.querySelector("#txtNombre");
    txtNombre.classList.remove("is-valid");
    txtNombre.classList.remove("is-invalid");
}
function validar(){
    
    let txtNombre=document.querySelector("#txtNombre");
    /*Antes de validar se asegura que ningún elemento tenga ninguna clase 
    de validación para no generar incongruencias a la hora de validar*/
    limpiarValidacionForm();

    //Se valida cada campo, asignando la clase is-valid los datos correctos
    //e is-invalid para los datos incorrectos
    let nombre=txtNombre.value;

    let datosValidos=true;

    if(nombre.trim().length>=5 && nombre.trim().length<=20){
        txtNombre.classList.add("is-valid");   
    }else{
        txtNombre.classList.add("is-invalid");    
        datosValidos=false;
    }
    
    return datosValidos;
}
