# Mech4u Platform

## 1. Desenvolvimento

### 0. Antes de tudo (assim que clonar)

Caso não exista, é preciso criar o _docker network_ do projeto

```bash
docker network create mech4u_network
```

Rodar comando para instalar os pacotes

```bash
docker-compose run platform yarn
```

### 1. Subir servidor de desenvolvimento

```bash
docker-compose up platform
```

### 2. Rodar testes

Caso você esteja dentro do container, basta rodar

```bash
yarn test
```

Para entrar no container:

```bash
docker exec -it platform /bin/sh
```

### 3. Para desligar o container

```bash
docker rm platform
```

## 2. Deployment

WIP
