import Echo from "laravel-echo";

export const initializeEcho = () => {
  if (window.Echo !== undefined) {
    return;
  }
  window.Pusher = require("pusher-js");

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "anykey",
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,

    authEndpoint: "localhost:8000/sanctum/csrf-cookie",
    // auth: {
    //     headers: {
    //       Authorization: `Bearer ${getToken()}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   },
  });
  console.log("====================================");
  console.log("initialized Echo in windows object");
  console.log("====================================");
};

export const bindAction = (
  channel = "reactChannel",
  event,
  action = (f) => f
) => {
  if (window.Echo === undefined) {
    initializeEcho();
  }
  window.Echo.channel(channel).listen(event, (e) => {
    action(e);
  }); // MessageSentEvent
};
