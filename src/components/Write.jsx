import React, { useState, useEffect } from 'react';
import app from "../FirebaseConfig";
import { getDatabase, ref, set, push, get, remove, update } from "firebase/database";

function Write() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [isDialogOpen3, setIsDialogOpen3] = useState(false);
  const [isDialogOpen4, setIsDialogOpen4] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [FoodArray, setFoodArray] = useState([]);
  const [DrinkArray, setDrinkArray] = useState([]);

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const saveData = async () => {
    const db = getDatabase(app);
    if (selectedItem) {
      const dbRef = ref(db, `Menu/Food/${selectedItem.FoodId}`);
      await update(dbRef, {
        FoodName: inputValue1,
        FoodDefinition: inputValue2
      }).then(() => {
        alert("Data updated successfully");
        setIsDialogOpen(false);
        setSelectedItem(null);
        fetchData();
      }).catch((error) => {
        alert("error: " + error.message);
      });
    } else {
      const newDocRef = push(ref(db, "Menu/Food"));
      set(newDocRef, {
        FoodName: inputValue1,
        FoodDefinition: inputValue2
      }).then(() => {
        alert("Order saved successfully");
        setIsDialogOpen(false);
        fetchData();
      }).catch((error) => {
        alert("error: " + error.message);
      });
    }
  };

  const saveData2 = async () => {
    const db = getDatabase(app);
    if (selectedItem) {
      const dbRef = ref(db, `Menu/Drinks/${selectedItem.DrinkId}`);
      await update(dbRef, {
        DrinkName: inputValue3,
        DrinkDefinition: inputValue4
      }).then(() => {
        alert("Data updated successfully");
        setIsDialogOpen2(false);
        setSelectedItem(null);
        fetchData2();
      }).catch((error) => {
        alert("error: " + error.message);
      });
    } else {
      const newDocRef = push(ref(db, "Menu/Drinks"));
      set(newDocRef, {
        DrinkName: inputValue3,
        DrinkDefinition: inputValue4,
      }).then(() => {
        alert("Data saved successfully");
        setIsDialogOpen2(false);
        fetchData2();
      }).catch((error) => {
        alert("error: " + error.message);
      });
    }
  };

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Food");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          FoodId: myFireId
        }
      });
      setFoodArray(temporaryArray);
    } else {
      alert("error");
    }
  };

  const fetchData2 = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Drinks");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          DrinkId: myFireId
        }
      });
      setDrinkArray(temporaryArray);
    } else {
      alert("error");
    }
  };

  const deleteFood = async (FoodIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Food/" + FoodIdParam);
    await remove(dbRef);
    fetchData();
  };

  const deleteDrink = async (DrinkIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/Drinks/" + DrinkIdParam);
    await remove(dbRef);
    fetchData2();
  };

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    if (type === 'food') {
      setInputValue1(item.FoodName || '');
      setInputValue2(item.FoodDefinition || '');
      setIsDialogOpen(true);
    } else {
      setInputValue3(item.DrinkName || '');
      setInputValue4(item.DrinkDefinition || '');
      setIsDialogOpen2(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div style={{background: 'rgb(34,193,195)', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(246,168,0,1) 72%)'}} className="min-h-screen max-w-[1640px] mx-auto p-4 py-12 flex flex-col items-center">
        <div className='text-center text-xl font-bold mb-12'>
          <h1>Fries and Drink Merchant</h1>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* Dialog Box 1 */}
          <div className="relative">
            <div className="rounded-xl transform">
              <div className='relative group'>
                <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                  <button
                    className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Place Order
                  </button>
                </div>
                <img className='w-full h-48 rounded-xl' src='https://cdn.abcotvs.com/dip/images/4823247_120318-fries.jpg?w=1600' alt='/' />
              </div>
            </div>
          </div>
          {/* Dialog Box 2 */}
          <div className="relative">
            <div className="rounded-xl transform">
              <div className='relative group'>
                <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                  <button
                    className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    onClick={() => setIsDialogOpen2(true)}
                  >
                    Place Order
                  </button>
                </div>
                <img className='w-full h-48 rounded-xl' src='https://d2td6mzj4f4e1e.cloudfront.net/wp-content/uploads/sites/9/2019/04/soft-drinks.jpg' alt='/' />
              </div>
            </div>
          </div>
          {/* Dialog Box 3 */}
          <div className="relative">
            <div className="pt-6 rounded-xl transform">
              <div className='relative group'>
                <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                  <button
                    className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    onClick={() => setIsDialogOpen3(true)}
                  >
                    Read Orders
                  </button>
                </div>
                <img className='w-full h-48 rounded-xl' src='https://tse1.mm.bing.net/th?id=OIP.wViUyQatZpVjupB1dqDFywHaFj&pid=Api&P=0&h=180' alt='/' />
              </div>
            </div>
          </div>
          {/* Dialog Box 4 */}
          <div className="relative">
            <div className="pt-6 rounded-xl transform">
              <div className='relative group'>
                <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                  <button
                    className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    onClick={() => setIsDialogOpen4(true)}
                  >
                    Update Orders
                  </button>
                </div>
                <img className='w-full h-48 rounded-xl' src='http://2.bp.blogspot.com/-9l4nL_xgl9c/U0db7Xt6v2I/AAAAAAAAPs8/Y6Q5X77aAAQ/s1600/1.png' alt='/' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen4 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="mr-4">
                <h2 className="text-xl font-bold">Display Food Orders</h2>
                <button onClick={fetchData}>Display Food Data</button>
                <ul>
                  {FoodArray.map((item, index) => (
                    <li key={index}>
                      {item.FoodName}: {item.FoodDefinition} : {item.FoodId}
                      <button className='button1' onClick={() => handleEdit(item, 'food')}>UPDATE</button>
                      <button className='button1 ml-2' onClick={() => deleteFood(item.FoodId)}>DELETE</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold">Display Drink Orders</h2>
                <button onClick={fetchData2}>Display Drink Data</button>
                <ul>
                  {DrinkArray.map((item, index) => (
                    <li key={index}>
                      {item.DrinkName}: {item.DrinkDefinition} : {item.DrinkId}
                      <button className='button1' onClick={() => handleEdit(item, 'drink')}>UPDATE</button>
                      <button className='button1 ml-2' onClick={() => deleteDrink(item.DrinkId)}>DELETE</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDialogOpen4(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isDialogOpen3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Orders</h2>
            <div className="flex justify-center mb-4">
              <div className="flex">
                <div className="rounded-xl mx-4 transform">
                  <div className='relative group'>
                    <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                      <button
                        className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        onClick={fetchData}
                      >
                        Display Food Orders
                      </button>
                    </div>
                    <img className='w-full object-cover rounded-xl' style={{ height: '150px' }} src='https://cdn.abcotvs.com/dip/images/4823247_120318-fries.jpg?w=1600' alt='/' />
                  </div>
                </div>
                <div className="rounded-xl mx-4 transform">
                  <div className='relative group'>
                    <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex items-center justify-center'>
                      <button
                        className='font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        onClick={fetchData2}
                      >
                        Display Drink Orders
                      </button>
                    </div>
                    <img className='w-full object-cover rounded-xl' style={{ height: '150px' }} src='https://d2td6mzj4f4e1e.cloudfront.net/wp-content/uploads/sites/9/2019/04/soft-drinks.jpg' alt='/' />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <ul className="text-sm mr-4">
                {FoodArray.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item.FoodName}: {item.FoodDefinition}
                  </li>
                ))}
              </ul>
              <ul className="text-sm">
                {DrinkArray.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item.DrinkName}: {item.DrinkDefinition}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsDialogOpen3(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Place Your Fries Order</h2>
            <input
              type='text'
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
              className='border p-2 mb-4 w-full'
              placeholder='Fries'
            />
            <p>Small 25₱, Medium 50₱, Large 50₱</p>
            <input
              type='text'
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
              className='border p-2 mb-4 w-full'
              placeholder='Description(Small 25₱, Medium 50₱, Large 50₱)'
            />
            <div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => { saveData(); setIsDialogOpen(false); }}
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
              >
                {selectedItem ? "Update Order" : "Place Order"}
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDialogOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Place Your Drink Order</h2>
            <input
              type='text'
              value={inputValue3}
              onChange={(e) => setInputValue3(e.target.value)}
              className='border p-2 mb-4 w-full'
              placeholder='Drinks'
            />
            <p>Small 25₱, Medium 50₱, Large 50₱</p>
            <input
              type='text'
              value={inputValue4}
              onChange={(e) => setInputValue4(e.target.value)}
              className='border p-2 mb-4 w-full'
              placeholder='Description(Small 25₱, Medium 50₱, Large 50₱)'
            />
            <div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => { saveData2(); setIsDialogOpen2(false); }}
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
              >
                {selectedItem ? "Update Order" : "Save Data"}
              </button>
              <button
                onClick={() => setIsDialogOpen2(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Write;