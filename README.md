# Mandat 2 equipe 8



## Getting started
1. Install Docker
2. Pull MSSQL latest images
`    docker pull mcr.microsoft.com/mssql/server:2022-latest`
3. Run the docker Image
`    docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Projet2DBbackend" -p 1433:1433 --name sql1 --hostname sql1 -d mcr.  microsoft.com/mssql/server:2022-latest`
4. Insert Run the creation sql script

## Back-end

```
npm install -i
npm index.js
```


## Front-end
```
node install -i
npm run dev
```
