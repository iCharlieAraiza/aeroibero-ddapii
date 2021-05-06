document.getElementById("search-btn").onclick = ()=>{
    const resultList = document.querySelector('.result-list-section');


    const val = document.getElementById("select_option").value;
    
    if(val==1){
        
        let flightList = headerResults();

        flights.forEach(flight=>{
            flightList += createCard(flight);
        })

        //window.location.href = "http://127.0.0.1:5500/index-test.html"+createAttr(flights);
        document.getElementById("reservation").href = `http://127.0.0.1:5500/index-test.html${createAttr(flights)}`;

        resultList.innerHTML = flightList;

    }else if(val==3){
        faster.style.display = "block";
        cheaper.style.display = "none"
        cheaper.innerHTML = flightList = createCard({to:'hola',from:'mundo'});

    }
}

const airports = ["Narnia - Aeropuerto Leon Real", 
                "La comarca - Aeropuerto Bilbo Bolsón", 
                "Mordor - Aeropuerto Ojo de Sauron",
                "Rivendel - Altos Elfos",
                "Rohan - Aeropuerto Caballo Verde",
                "Reino del Bosque - Aeropuerto Elfos Silvanos",
                "Erebor - Aeropuerto Durin",
                "Gondor - Aeropuerto Isildur"
            ];

$(function(){
    $("#origin").autocomplete({
        source: airports,
        minLenght: 3
    });

    $("#destination").autocomplete({
        source: airports,
        minLenght: 3
    })

});



const flights = [
    {id: 1, to: 'hola', from: 'mundo'},
    {id: 2, to: 'Cómo', from: 'estas'},
    {id: 3, to: 'espero no', from: 'del todo mal'},
    {id: 5, to: 'espero no', from: 'del todo mal'},
    {id: 9, to: 'espero no', from: 'del todo mal'},
]


const createCard = (flight)=>{
    const card = `<div class="flight-card">

<div class="row-description top-section">

    <div class="section-cont horizontal fligth-number">
        <div class="label">
            Vuelo
        </div>
        <div class="result">1234</div>
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
            ${flight.from} <span>(LRA)</span>
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Destino
        </div>
        <div class="result">
            ${flight.to} a <span>(LRA)</span>
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
            230 <span>(KM)</span>
        </div>
    </div>

    <div class="section-cont ">
        <div class="label">
            Precio
        </div>
        <div class="result">
            $100
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
    let attr = "?", i = 0;
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

    flights.forEach(flight =>{
        console.log(flight);
    });

}

checkAttrValue();