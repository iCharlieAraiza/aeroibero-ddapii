document.getElementById("reservation-btn").style.display = "none";
document.getElementById("search-btn").onclick = ()=>{
    const resultList = document.querySelector('.result-list-section');
    //document.getElementById('reservation-btn').style.display = "none";


    const val = document.getElementById("select_option").value;
    
    if(isValid()){
        
        let flightList = headerResults();
        
        /*
        flights.forEach(flight=>{
            flightList += createCard(flight);
        })
        */

        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const passagers = document.getElementById('number').value;
        //alert(origin)
        
        const originIndex = getIndex(airportsTest, origin);
        const toIndex = getIndex(airportsTest, destination);
        //console.log(originIndex, toIndex);

        fetch(`http://localhost:8080/api/vuelos/prueba/id/${originIndex}/${toIndex}`, {
            method: 'GET',
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {


            const resultList = document.querySelector('.result-list-section');
            let response= headerResults();
            let cont = 0;
            data.forEach(e=>{
                response+=createCard(e);
            })
    
            resultList.innerHTML = response;
            console.log("contador " + cont)
            document.getElementById("reservation-btn").style.display = "block";
            document.getElementById("reservation").href = `http://127.0.0.1:5500/book-test.html?p=${passagers}&${createAttr(data)}`;
        })
        .catch(function(err) {
            console.error("Ups, somethin happended");
        });

        //window.location.href = "http://127.0.0.1:5500/index-test.html"+createAttr(flights);

        

    }else{
        alert("Valor inválido");
    }
}


const airportsTest = [
    {id: 1, value: "La Comarca – Aeropuerto Bilbo Bolsón" },
    {id: 2, value: "Rivendel - Aeropuerto Altos Elfos" },
    {id: 3, value: "Rohan - Aeropuerto Caballo Verde" },
    {id: 4, value: "Reino del Bosque - Aeropuerto Elfos Silvanos" },
    {id: 5, value: "Erebor - Aeropuerto Durin" },
    {id: 6, value: "Gondor - Aeropuerto Isildur" },
    {id: 7, value: "Moria - Aeropuerto Khazad Dum" },
    {id: 8, value: "Isengard - Aeropuerto Mago Blanco" },
    {id: 9, value: "Mordor - Aeropuerto Ojo de Sauron" },
    {id: 10, value: "Narnia - Aeropuerto León Real" },
    {id: 11, value: "Telmar - Aeropuerto Príncipe Caspian" },
    {id: 12, value: "Charn - Aeropuerto Bruja Blanca" },
    {id: 13, value: "Ciudad Aeropuerto Mago de Oz - Bruja Blanca" },
    {id: 14, value: "Winkie - Aeropuerto Bruja del Oeste" },
    {id: 14, value: "Munchkin - Aeropuerto Dorita" },
]


$(function(){
    $("#origin").autocomplete({
        source: airportsTest,
        minLenght: 3
    });

    $("#destination").autocomplete({
        source: airportsTest,
        minLenght: 3
    })

});



const createCard = (flight)=>{
    const card = `<div class="flight-card">

<div class="row-description top-section">

    <div class="section-cont horizontal fligth-number">
        <div class="label">
            Vuelo
        </div>
        <div class="result">AI #${flight.id}</div>
    </div>

    <div class="section-cont horizontal aircraft">
        <div class="label">
            Avión
        </div>
        <div class="result">Airbus A320</div>
    </div>

    <div class="section-cont horizontal">
        <div class="label">
            HORA
        </div>
        <div class="result">10:20</div>
        <div class="flight-state"><span></span></div>
    </div>

</div>

<div class="row-description bottom-section">

    <div class="section-cont ">
        <div class="label">
            Origen
        </div>
        <div class="result">
            ${flight.origen.nombre} <span>(LRA)</span>
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Destino
        </div>
        <div class="result">
            ${flight.destino.nombre} <span>(LRA)</span>
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Duración
        </div>
        <div class="result duration-section">
            <div class="flight-icon">
                <img src="img/flight.png" alt="">
            </div>
            02:30
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Distancia
        </div>
        <div class="result">
        ${flight.distancia} <span>(KM)</span>
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Precio
        </div>
        <div class="result">
            $${flight.costo}
        </div>
    </div>


    <div class="section-cont ">
        <button class="show-flight-btn">Ver</button>
    </div>

</div>
</div>
`;

    return card;
}

const headerResults = ()=>{
    const header = `<div class="tabel-result">
                        Opción más rápida
                    </div>`;
    return header;
}

const createAttr = (flights)=>{
    let attr = "", i = 0;
    flights.forEach(flight =>{
        attr +=`f${++i}=${flight.id}&`;
    });
    return attr.slice(0, -1);
}

const checkAttrValue = ()=>{
    let string = "";
    const flights = [];
    let parameters = new URLSearchParams(window.location.search);

    for(i = 1; i<6; i++){
        if(parameters.get('f'+i)!=null){
            //console.log(parameters.get('f'+i));
            flights.push(parameters.get('f'+i));
        }
    }

}

checkAttrValue();


const getIndex = (airports, value)=>{
    let index = 0;

    airports.forEach(airport => {
        if(airport.value == value){
            index = airport.id;
        }
    });
    return index;
}


const isValid = ()=>{
    const from = document.getElementById('origin').value; 
    const to = document.getElementById('destination').value; 
    const number = document.getElementById('number').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if(from===""|| to==="" || number=== "" || (origin === destination)) 
        return false
    else
        return true;
}