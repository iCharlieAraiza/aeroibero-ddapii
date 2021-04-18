entity TarjetaCredito {
    id Long
    numeroTarjeta String
    caducidad Date
    nip String
}

entity Cliente{
    id Long
    nombre String
    apellidoPaterno String
    apellidoMaterno String
    fechaNacimiento Date
}

entity Boleto{
	id Long
    asiento String
    estatus Estatus
}

enum Estatus {
    ACTIVO, PENDIENTE, CANCELADO
}


entity Viaje{
    id Long
    tipoViaje String
    distancia Double
    tiempoTotal Time
    costo Double
}

entity Pais {
    id Long
    nombre String
}

entity Ciudad {
    id Long
    nombre String
}

entity Aeropuerto {
    id Long
    nombre String
}


relationship OneToOne {
    TarjetaCredito{cliente} to Cliente
}

relationship OneToMany {
    Boleto{cliente} to Cliente
}

relationship OneToMany {
    Boleto{viaje} to Viaje
}

relationship OneToMany{
    Ciudad{pais} to Pais
}

relationship OneToMany{
    Aeropuerto{ciudad} to Ciudad
}


relationship OneToMany{
    Viaje{origen} to Aeropuerto
}

relationship OneToMany{
    Viaje{destino} to Aeropuerto
}
