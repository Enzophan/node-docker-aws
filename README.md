# Run Local
- $ docker 

# RUN CLI
- $ docker build -t 190715/node_aws_app .
- $ docker run -p 5050:5050 190715/node_aws_app
- With ENV $ docker run --env JWT_SECRET=EnvFromDocker -d -p 5050:5050 190715/node_aws_app

# node-docker-aws
- $ Run AWS EC2 instance