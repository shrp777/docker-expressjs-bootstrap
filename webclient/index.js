const ws = new WebSocket("ws://localhost:3080");

//connexion
ws.onopen = (e) => {
  console.log("Connexion au serveur Websocket");

  //inscription de l'utilisateur
  const urlsearch = new URLSearchParams(window.location.search);

  const user_id = parseInt(urlsearch.get("user_id"));

  if (user_id) {
    const message = JSON.stringify({ type: "subscribe", user_id: user_id });
    ws.send(message);
    console.log("Message envoyé : %s", message);
  } else {
    console.log(
      "Saisir dans l'url l'id de l'utilisateur à inscrire aux notifications émises par le serveur ws, ex : http://localhost:8181/index.html?user_id=1"
    );
  }
};

ws.onmessage = (e) => {
  try {
    const msg = JSON.parse(e.data);

    console.log(msg);

    if (msg.type === "notification") {
      const notifications = document.getElementById("notifications");
      console.log("Message reçu : ");
      console.log(msg);
      const item = document.createElement("li");
      item.textContent = msg.message;
      notifications.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
  } catch (error) {
    console.error(error);
  }
};
