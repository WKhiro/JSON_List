// Wesley Kok

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const jsonurl = "https://fetch-hiring.s3.amazonaws.com/hiring.json";

fetch(proxyurl + jsonurl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var listId = 0;
    var childContainer = document.getElementById("root");

    // Sort by listId first, and then by "name", not "id"
    data.sort(function (a, b) {
      return a.listId - b.listId || ("" + a.name).localeCompare(b.name);
    });

    for (const [key, value] of Object.entries(data)) {
      // Omit empty and null name values
      if (value.name) {
        // Detect change in listId and make a new container
        if (!listId || value.listId !== listId) {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          const listIdTitle = document.createElement("h1");
          listIdTitle.setAttribute("class", "h1");
          listIdTitle.textContent = "ListId " + value.listId;

          const newContainer = document.createElement("div");
          newContainer.setAttribute("class", "container");
          newContainer.setAttribute("id", value.listId);

          card.appendChild(listIdTitle);
          card.appendChild(newContainer);

          const mainContainer = document.getElementById("root");
          mainContainer.appendChild(card);

          // Assign current listId to new listId
          listId = value.listId;

          childContainer = document.getElementById(value.listId);
        }

        // Add items to corresponding container
        const itemName = document.createElement("h3");
        itemName.textContent = value.name;
        childContainer.appendChild(itemName);
      }
    }
  })
  .catch((err) => {
    console.log("Something went wrong");
  });
