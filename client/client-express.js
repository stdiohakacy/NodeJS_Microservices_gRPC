const PROTO_PATH = __dirname + '/hello.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
		});
		
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const express = require('express')
const app = express()
const port = 3000

function main() {
  const client = new hello_proto.Greeter('grpc-server:50051', grpc.credentials.createInsecure());
  let user;
  app.get('/:id', function (req, res) {
    user = req.params.id;
    client.sayHello({name: user}, function(err, response) {
      console.log('Greeting:', response.message);
      res.send(response.message);
    });
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

main();