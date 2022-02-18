const Notification = ({ message }) => {
  const notiStyle = {
    backgroundColor: "lightgray",
    color: "green",
    fontSize: 23,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "green",
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    backgroundColor: "lightgray",
    color: "red",
    fontSize: 23,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "red",
    padding: 10,
    marginBottom: 10,
  };

  if (message.style === "") {
    return null
  }
  return (
    <div
      style={
        message.style === "notification" ? notiStyle : errorStyle
      }
    >
      {message.content}
    </div>
  );
};

export default Notification;
