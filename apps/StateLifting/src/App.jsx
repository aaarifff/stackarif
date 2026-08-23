import "./App.css";
import Form from "./components/Form";

function App() {
  const getData = (values) => {
    console.log("weare afrom mail data ");
    console.log(values);
  };
  return (
    <>
      <Form getData={getData} />
      arif
    </>
  );
}

export default App;
