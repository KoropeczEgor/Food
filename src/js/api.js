function getTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .catch(() => {
      console.log(111);
    })
    .then((json) => console.log(json));
}

getTodos();
