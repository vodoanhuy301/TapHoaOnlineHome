import Widget from 'rasa-webchat';

const RasaChatBot = () => {
  return (
    <Widget
      initPayload={"/get-started"}
      socketUrl={"http://localhost:5005"}
      socketPath={"/socket.io/"}
      customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
      title={"Chatbot hỗ trợ khách hàng"}
    />
  )
}
export default RasaChatBot;