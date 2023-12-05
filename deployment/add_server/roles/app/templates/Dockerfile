FROM openjdk:18

ADD GameHub-0.0.1-SNAPSHOT.jar ServeMe.jar

EXPOSE 8080
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS-Djava.security.egd=file:/dev/./urandom -jar /ServeMe.jar" ]
