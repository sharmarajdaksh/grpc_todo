const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

const todos = [];

const createTodo = (call, callback) => {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);
  callback(null, todoItem);
};

const readTodos = (call, callback) => {
  console.log(todos);
  callback(null, { items: todos });
};

const readTodosStream = (call, callback) => {
  todos.forEach((t) => call.write(t));
  call.end();
};

server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
  readTodosStream,
});

server.start();
