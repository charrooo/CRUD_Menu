import React, {useState} from 'react';
import app from "../FirebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function UpdateRead() {

  const navigate = useNavigate();

  let [FoodArray, setFoodArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Food");
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {

        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map( myFireId => {
            return {
                ...myData[myFireId],
                FoodId: myFireId
            }
        } )
      setFoodArray(temporaryArray);
    } else {
      alert("error");
    }
  }

  const deleteFruit = async (FoodIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Food/"+FoodIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1>UPDATE READ</h1>
      <button onClick={fetchData}> Display Data </button>
      <ul>
        {FoodArray.map( (item, index) => (
          <>
            <li key={index}> 
              {item.FoodName}: {item.FoodDefinition} : {item.FoodId}
              <button className='button1' onClick={ () => navigate(`/updatewrite/${item.FoodId}`)}>UPDATE</button>
              <button className='button1' onClick={ () => deleteFruit(item.FoodId)}>DELETE</button>
            </li>

          </>

        ) )}
      </ul>
      <button className='button1' onClick={ () => navigate("/")}>GO HOMEPAGE</button> <br />
      <button className='button1' onClick={ () => navigate("/read")}>GO READ PAGE</button>


      

    </div>
  )
}

export default UpdateRead