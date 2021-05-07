const checkAttrValue = ()=>{
    let string = "";
    const att = [];
    let parameters = new URLSearchParams(window.location.search);

    for(i = 1; i<6; i++){
        if(parameters.get('f'+i)!=null){
            console.log(parameters.get('f'+i));
            att.push(parameters.get('f'+i));
        }
    }
    return att;
}

const attributes = checkAttrValue();


document.getElementById("raza").onclick = ()=>{
    const value = document.getElementById("raza").value;
    const raceForm  = document.getElementById("race-form");
    console.log(value)
    if(value==="Otro"){
        raceForm.innerHTML = `<input type="text" name="raza" id="raza" placeholder="Raza">`
    }
}

const createAttrFlight = (arr)=>{
    let attr = "", i = 0;
    arr.forEach(el =>{
        attr +=`${el},`;
    });
    return attr.slice(0, -1);
}

const createAttr = (flights)=>{
    let attr = "", i = 0;
    flights.forEach(flight =>{
        attr +=`b${++i}=${flight.id}&`;
    });
    return attr.slice(0, -1);
}


/* 
    Peticiónes asíncronas
*/

const dataform = {flights:[],clientes:[]};


axios.get(`http://localhost:8080/api/reservacion/collection/?values=${ createAttrFlight(attributes) }`)
.then(function (response) {
    console.log(response);
    let html = "";
    let cost = 0;
    const json = response.data;
    dataform.flights = [...json];
    json.forEach( e=>{
        cost += e.costo;
        html+=createPriceTemplate(e);
    })
    console.log(html);
    document.getElementById("result-prices").innerHTML = html;
    document.getElementById("price-result").innerHTML = `$${cost}`;
})
.catch(function (error) {
  console.log(error);
});



document.getElementById("confirm").onclick = ()=>{

    dataform.clientes = [];

    const nombre = document.getElementById('nombre').value;
    const paterno = document.getElementById('apellidos').value;
    const raza = document.getElementById('raza').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    dataform.clientes.push({
        nombre,
        paterno,
        raza,
        email,
        telefono
    });

    dataform.clientes.forEach(el=>{
        console.log(el)
    })

    /*axios({
        method: 'post',
        url: 'http://localhost:8080/api/cliente/',
        data: {
          nombre: 'Juan',
          paterno: 'Perez',
        }
      });*/

     
    axios({
        method: 'post',
        url: 'http://localhost:8080//api/reservacion/create',
        data: {
            viajes: dataform.flights,
            clientes: dataform.clientes
        }
    }).then(e=>{
          console.log(e);
          window.location.href = `http://127.0.0.1:5500/confirm.html?${createAttr(e.data)}`;
    });




      
}


const createPriceTemplate = (flight) =>{
    return `<li><div>Vuelo #AI ${flight.id}</div><div class="price">$${flight.costo}</div></li>`
}