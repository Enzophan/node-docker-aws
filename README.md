# Run Local
- $ docker 

# RUN CLI
- $ docker build -t node_aws_app:1.0 .
- $ docker run -p 8001:8000 node_aws_app:1.0
- With ENV $ docker run --env JWT_SECRET=EnvFromDocker -d -p 8001:8000 node_aws_app:1.0

# node-docker-aws
- $ Run AWS EC2 instance