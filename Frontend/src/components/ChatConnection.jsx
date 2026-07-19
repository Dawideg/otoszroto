const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chatHub", {
    withCredentials: true,
  })
  .withAutomaticReconnect()
  .build();

export default connection;
