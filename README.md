# Run Local
- $ docker 

## Refer document to build 
- $ https://github.com/marketplace/actions/build-and-push-docker-images

# RUN CLI
- $ docker build -f ./Dockerfile.local -t 190715/node_aws_app .
- $ docker run -p 5050:5050 190715/node_aws_app
- With ENV $ docker run --env JWT_SECRET=EnvFromDocker -d -p 5050:5050 190715/node_aws_app

# node-docker-aws
- $ Run AWS EC2 instance