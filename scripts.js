const proxyurl = "https://cors-anywhere.herokuapp.com/";

fetch(proxyurl + "https://fetch-hiring.s3.amazonaws.com/hiring.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      console.log(key);
      console.log(value);
      console.log(value.name);
      if (value.name) {
        const h1 = document.createElement("h1");
        const titleText = value.listId;

        h1.textContent = titleText;
        const h5 = document.createElement("h5");
        h5.textContent = value.name;

        h1.appendChild(h5);
        var container = document.getElementById("parent");
        container.appendChild(h1);
      }
    }
  })
  .catch((err) => {
    console.log("Something went wrong");
  });
