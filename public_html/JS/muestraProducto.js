$(document).ready(function(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    
    var freq=1000;
    
    function startAjaxCalls(){
        setTimeout(function(){
                loadProduct();
                startAjaxCalls();
            },
            freq
        );
    }
    
    loadProduct();
    startAjaxCalls();
    

    
    function loadProduct(){
        var idURL =getUrlParameter('productid');
        $.getJSON("./JS/datosMenu.json",function (menu){

            $.each(menu,function(key,value){       //bucle que itera por el json
                if(menu[key].length===0) //como comprobar que esta vacio
                return;
                
                $.each(this, function(foodType, values){    //bucle que itera por los arrays
                    if(parseInt(this['id'],10) === parseInt(idURL,10)){
                        var element=document.getElementById("tituloPage");
                        element.innerHTML=this['nombre']+" - Informacion de producto";
                        element =document.getElementById("tituloProducto");
                        element.innerHTML=this['nombre'];
                        
                        element =document.getElementById("descripcionProducto");
                        element.innerHTML=this['descripcion'];
                        return false;
                    }
                });
            });
        });
    }
    
});
