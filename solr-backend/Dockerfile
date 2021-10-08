# Get openjdk-alpine image as base image
FROM openjdk:8-alpine

RUN apk add --no-cache curl

EXPOSE 8888

### Download Tomcat server

COPY target/solr-*.jar /solr-poc.jar
COPY devops/setup /setup

ENTRYPOINT ["sh" , "/setup/init.sh"]
