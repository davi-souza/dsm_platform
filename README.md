# DSM Platform

## 1. Description

Front end of the DSM project. It uses react and material-ui

## 2. Development

### 0. Before all

If needed, create the network

```bash
docker network create dsm_network
```

Install packages

```bash
docker-compose run platform yarn
```

### 1. Start development server

```bash
docker-compose up platform
```

### 2. Run tests

You need to be inside the container

```bash
yarn test
```

To get in the container:

```bash
docker exec -it platform /bin/sh
```

### 3. Shut down the container

```bash
docker rm platform
```

## 2. Deployment

WIP
