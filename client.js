const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: "Do laundry",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }
  }
);

client.createTodo(
  {
    id: -1,
    text: "Do leetcode",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }
  }
);

client.createTodo(
  {
    id: -1,
    text: "Learn something new",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }

    client.readTodos({}, (err, response) => {
      if (err) {
        console.error(err);
      }
      console.log(response);
    });
  }
);

client.createTodo(
  {
    id: -1,
    text: "Stream todos",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }

    const todosStreamCall = client.readTodosStream();
    todosStreamCall.on("data", (item) => {
      console.log("Received: ", item);
    });
    todosStreamCall.on("end", (e) => console.log("Stream closed"));
  }
);
