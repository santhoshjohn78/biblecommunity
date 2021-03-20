# Bible reading community

This is a bible reading web application that gives you audio, video, txt, image commentary as you read passages in the bible.

## Getting Started

Clone or download this project from github and use your fav IDE to import as a maven project.

```
git clone <url>
mvn clean install
```

### Prerequisites

This project uses spring boot's embedded tomcat and starts on the default port. To change the default port update the applications.property file with
the host and port. This project uses elasticsearch, mongodb and reactjs 

```
server.port=8088
```

### Installing

#### Building project
This is built on maven

```
mvn clean install
```
#### Install Elasticsearch
Getting elasticsearch set up. Use docker image from docker hub

// pulls elasticsearch from docker hub
```
docker pull elasticsearch
```

// creates a bridge network
```
docker network create nazreen
```

// run a container from a docker image using the network that was created before. Mapping internal port to external host's port
```
docker run -d --name elasticsearch --net nazreen -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.10.1
```
#### Kibana install
// pulls kibana
```
docker pull kibana
```

//how to connect filebeat to elasticsearch and kibana using network
```
docker run --net nazreen docker.elastic.co/beats/filebeat:7.10.1 setup -E setup.kibana.host=kibana:5601 -E output.elasticsearch.hosts=["elasticsearch:9200"]
```


#### MongoDB Setup
Pull mongo db
```
docker pull mongo
```
//how to start mongodb
```
docker run --network nazreen --name mongodb -p 27017:27017 -d mongo:latest
```
Pull mongo-express web CLI for mongodb

```
docker pull mongo-express
```
//how to start mongo-express 
```
docker run --network nazreen -e ME_CONFIG_MONGODB_SERVER=mongodb -p 8081:8081 mongo-express
```

## Running the tests

Check health: http://localhost:8080/actuator/health

Ingest the bible epub: http://localhost:8080/ingestion/version/asv

GET a page: http://localhost:8080/api/toc/epub/page/43.JOH.11.xhtml

Mongo-express:  http://localhost:8081/
Kibana: http://localhost:5601/
Elasticsearch: http://localhost:9200/




## Built With

* [Maven](https://maven.apache.org/) - Dependency Management


## Authors

* **Santhosh John** - *Initial work* 




