import React, { useState } from "react";
let totalValue = [];
let totalproduct = 0;
function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <InputContainer></InputContainer>
    </React.Fragment>
  );
}

function Header() {
  return (
    <React.Fragment>
      <div className="header">
        <h1>⛵My Important Trip Documents 🎒</h1>
      </div>
    </React.Fragment>
  );
}

function InputContainer() {
  // input value store
  const [inputValue, setInputValue] = useState();
  const [count, setCount] = useState(1);
  const [storedata, setstoredata] = useState([]);

  function updateproduct() {
    totalproduct = totalValue.reduce((prev, curt) => {
      return prev + curt;
    });
  }

  function addItems() {
    let completedata = { count, inputValue, status: false, id: Date.now() };
    setstoredata((alldata) => [...alldata, completedata]);
    console.log(storedata);
    totalValue.push(Number(count));
    updateproduct();
    setInputValue("");
  }

  function Removeitems(id, mycount) {
    setstoredata((updatedata) =>
      updatedata.filter((itemFilter) => itemFilter.id !== id)
    );
    console.log(-Number(mycount));
    totalValue.push(-Number(mycount));
    updateproduct();
  }

  function PackedItems(id) {
    setstoredata((olddaat) =>
      olddaat.map((packedFilter) => {
        return packedFilter.id === id
          ? { ...packedFilter, status: !packedFilter.status }
          : packedFilter;
      })
    );
  }

  return (
    <React.Fragment>
      <div className="input-container">
        <p style={{ textAlign: "center" }}>
          What do you need for your 😍 trip ?
        </p>
        <div className="input-section main">
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Items..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button onClick={addItems}>Add</button>
        </div>
      </div>
      <div className="uk-section">
        <ul className="ul-container">
          {storedata.map((e) => (
            <ItemsContainer
              itemsvalue={e}
              key={e.id}
              Removeitems={Removeitems}
              PackedItems={PackedItems}
            ></ItemsContainer>
          ))}
        </ul>
      </div>
      <Footer1 Totalcount={totalproduct}></Footer1>
    </React.Fragment>
  );
}
function ItemsContainer({ itemsvalue, Removeitems, PackedItems }) {
  return (
    <div className="itemslist">
      <input
        type="checkbox"
        value={itemsvalue.status}
        onChange={() => PackedItems(itemsvalue.id)}
      ></input>
      <li
        style={
          itemsvalue.status
            ? { textDecoration: "line-through", color: "yellow" }
            : {}
        }
      >
        {itemsvalue.count} {itemsvalue.inputValue}
      </li>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => Removeitems(itemsvalue.id, itemsvalue.count)}
      >
        ❌
      </span>
    </div>
  );
}
function Footer1({ Totalcount }) {
  return (
    <div className="footer" style={{ textAlign: "center" }}>
      <p>
        Total Product <span>{Totalcount}</span>
      </p>
    </div>
  );
}

export default App;
