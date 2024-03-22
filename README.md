# Mandat 2 equipe 8



## Getting started
1. Install Docker
2. In your cmd running as administrator run the following commands to pull and run the mssql container
`docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Projet2DBbackend" -p 1433:1433 --name sql1 --hostname sql1 -d mcr.  microsoft.com/mssql/server:2022-latest`
3. Connect to the docker database in Azure data studio
4. Insert Run the creation sql script
Pour l'utiliser

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
