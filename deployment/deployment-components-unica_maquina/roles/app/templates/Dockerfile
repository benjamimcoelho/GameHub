FROM openjdk:18

ENV TIPOSERVER=0

ADD GameHub-0.0.1-SNAPSHOT.jar GameHub.jar

EXPOSE 8080
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS-Djava.security.egd=file:/dev/./urandom -jar /GameHub.jar --deploymentNumber=${TIPOSERVER}" ]
