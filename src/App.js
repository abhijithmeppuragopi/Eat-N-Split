import { Children, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App(){
  const [addNewFriend, setaddNewFriend]= useState(false);
  const [friends,setfriends]=useState(initialFriends);
  const [selectedFriend, setSelectedFriend]=useState(null);

    function handleNewfriend(){
    setaddNewFriend((show)=> !show)
    }

    function handleAddingNewFriend(friend){
     
      setfriends((Friendslist)=> [...friends,friend])
      setaddNewFriend(false);

    }

    function handleSelectedFriend(friend){
      setSelectedFriend(friend);
      setaddNewFriend(false);

    }
    function handleSplitBill(value){
      console.log(value)
      setfriends((friends)=>
        friends.map((friend)=> friend.id===selectedFriend.id ?
          {...friend,balance:friend.balance +value} : friend
         ))
         setSelectedFriend(null);
    }

  return <div>
    <h1 className="header">Eat N Split 🍴</h1>
  <div className="app">
   
    <div className="sidebar">
      <Friendslist friends={friends} handleSelect={handleSelectedFriend} curFriend={selectedFriend}/>
      {addNewFriend && <Addfriend addNewFriend={handleAddingNewFriend}/>}
      {!addNewFriend && <Button onClick={handleNewfriend}>Add Friend</Button>}
    </div>
    {selectedFriend && <SplitBill friend={selectedFriend} onSplitbill={handleSplitBill}/>}
    

  </div>
  </div>
}
function Friendslist({friends,handleSelect,curFriend}){
  
  return <ul>
    {friends.map((friend)=> <Friend friends={friend} handleSelect={handleSelect} curFriend={curFriend}/>)}

  </ul>

}

function Friend({friends,handleSelect,curFriend}){
  const currentFriend= curFriend?.id ===friends.id;
  return <>
  <li>
    <img src={friends.image} alt={friends.name}/>
     <h2>{friends.name}</h2>
     {friends.balance <0 && <p className="red">you owe {friends.name}{friends.balance}</p>}
     {friends.balance >0 && <p className="green">{friends.name} owes you {friends.balance}</p>}
     {friends.balance ===0 && <p>you are even</p>}
     <Button onClick={()=> handleSelect(friends)} > {currentFriend ? 'close' : 'select'}</Button>
  </li>
 
  </>
}

function Button({children,onClick}){
  //  function newFriend(){
  //    <Addfriend/>
  //  }
  return <button className="button" onClick={onClick}>{children}</button>
}
function Addfriend({addNewFriend}){
  const [name, setname]=useState();
  const [image, setimage]=useState("https://i.pravatar.cc/48?u=118837");
  function handleSubmit(e){
    e.preventDefault();

  if (!name || !image) return
  const id=crypto.randomUUID();
  const Newfriend={
    id,
    name,
    image,
    balance:0
  }
  addNewFriend(Newfriend);
  setname('');
  

}
  return <form className="form-add-friend" onSubmit={(e)=>handleSubmit(e)}>
    <label>name</label>
    <input type="text" value={name} onChange={(e)=>setname(e.target.value)}></input>
    <label>📷image URL</label>
    <input type="text" value={image} onChange={(e)=>setimage(e.target.value)}></input>
    <Button>Add New</Button>

  </form>
}

function SplitBill({friend,onSplitbill}){
  const [billValue,setBillValue]=useState(0);
  const [yourExpense,setYourExpense]=useState(0);
  const [paidBy, setPaidBy]=useState('you')
  const friendExpense= billValue-yourExpense;
  const friendBalance=friend.balance-friendExpense;

  function handleSubmit(e){
    e.preventDefault();
    if(!billValue || !paidBy) return
    console.log(friendBalance);
    
    onSplitbill(paidBy==='you' ? friendExpense : -yourExpense)

   

  }
  return <form className="form-split-bill" onSubmit={(e)=>handleSubmit(e)}>
    <h2>Split a bill with {friend.name}</h2>
    <label>Bill value</label>
    <input value={billValue} onChange={(e)=>setBillValue(Number(e.target.value))} type="text"></input>
    <label>Your Expense</label>
    <input value={yourExpense} type="text" onChange={(e)=>setYourExpense(Number(e.target.value))}></input>
    <label>{friend.name} expense</label>
    <input type="text" value={friendExpense} disabled></input>
    <label>Who paid</label>
    <select value={paidBy} onChange={(e)=>setPaidBy(e.target.value)}>
      <option value='you'>You </option>
      <option value={friend.name}>{friend.name} </option>
    </select>
  <Button >Split Bill</Button>

  </form>
}