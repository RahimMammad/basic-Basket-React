import React, { useState } from 'react'
import useFetchData from './hooks/useFetch';

const App = () => {
    const [basket, setBasket] = useState([]);
    const { data, isLoading, error } = useFetchData("products");

    const handleAddBasket = (item) => {
        const findingItem = basket.find((x) => x.id === item.id)

        if(findingItem) {
            findingItem.count += 1;
            setBasket([...basket])
        } else {
            setBasket([...basket, { ...item, count: 1 }])
        }
    }

    const handleIncrement = (id) => {
        const updatedBasket = basket.map((item) => 
            item.id === id ? {...item, count: item.count+1} : item
        )
        setBasket(updatedBasket)
    }

    const handleDecrement = (id) => {
        const updatedBasket = basket.map((item) => 
            item.id === id && item.count > 1 ? {...item, count: item.count-1} : item
        )
        setBasket(updatedBasket)
    }

    const handleRemove = (id) => {
        setBasket(basket.filter((item) => item.id !== id))
    }

    const handleRemoveBasket = () => {
        setBasket([])
    }

  return (
    <div>
      <button  onClick={()=>handleRemoveBasket()}>ClearAll</button><br /><br />
      <div style={{ border: "1px solid black" }}>
        <h4>My Basket Cart</h4>
        {basket && basket.map((item) => (
          <ul>
            <li>{item.manufacturer}</li>
            <li>{item.model}</li>
            <li>{item.price}</li>
            <li>{item.count}</li>
            <button onClick={() => handleRemove(item.id)}>Remove from Basket</button>
            <button onClick={()=>handleIncrement(item.id)}>+</button>
            <button onClick={()=>handleDecrement(item.id)}>-</button>
          </ul>
        ))}
        
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        
          {data &&
            data.map((item) => (
              <ul key={item.id}>
                <li>{item.id}</li>
                <li>{item.manufacturer}</li>
                <li>{item.model}</li>
                <li>{item.price}</li>
                <button onClick={()=>handleAddBasket(item)}>Add to Basket</button>
              </ul>
            ))}
        </>
      )}
    </div>
  )
}

export default App