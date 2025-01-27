<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Cliente Gateway
El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.


## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Tener levantados los microservicios que se van a consumir (no olvidar el Nats)
5. Levantar proyecto con `npm run start:dev`


## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

## Prod
```
docker build -f Dockerfile.prod -t [image-name]:[version] . 
```