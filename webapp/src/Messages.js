import React, { useState ,useEffect} from 'react';
function Messages() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8080/messages")
        .then(res => res.json())
        .then(
          (result) => {
            console.log('called get items')
            console.log(result)
            setItems(result);
          }
        )
    }, [])
    return (
      <div className="Messages">
        <h1>Here's Your messages</h1>
         <ul>
          {items && items.map(item => (
            <div key={item.name}>
             <h3>Hi {item.name},  {item.content}</h3>  
         
            </div>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Messages;