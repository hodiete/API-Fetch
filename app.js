var express = require("express"),
  app = express(),
  axios = require("axios"),
  worker_orders = [],
  sorter = [],
  WorkerWithOrders = [];

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

fetchWorkOrdersApi()
  .then(data => data.data.orders)
  .then(order => {
    worker_orders = order;
    return order.map(ord => ord.workerId);
  })
  .then(uniqueOrderID => Array.from(new Set(uniqueOrderID)))
  .then(orderID =>
    fetchWorkersApi(orderID).then(
      data => (workers = data.map(order => order.data.worker))
    )
  )
  .then(orders =>
    worker_orders.forEach(workOrder => {
      WorkerWithOrders.push([getWorkerInfo(workOrder, orders), workOrder]);
      sorter.push(workOrder.deadline);
    })
  );

async function fetchWorkOrdersApi() {
  const work = await axios.get(
    "https://www.hatchways.io/api/assessment/work_orders"
  );
  return work;
}
let getWorkerInfo = (order, workers) =>
  workers.find(worker => worker.id === order.workerId);

function fetchWorkersApi(orderID) {
  const p = orderID.map(
    async orders =>
      await axios.get(
        "https://www.hatchways.io/api/assessment/workers/" + orders
      )
  );

  return Promise.all(p);
}

//ROUTES
app.get("/", function(req, res) {
  res.render("home", { worker: WorkerWithOrders, sorter: sorter });
});

app.listen(3001, function(req, res) {
  console.log("The challenge is running!");
});
