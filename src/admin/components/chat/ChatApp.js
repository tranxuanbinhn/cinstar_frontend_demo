import React, { useEffect, useRef, useState } from 'react';
import './ChatApp.css';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getMessageBySenderAndReceiver, showMessage } from '~/features/message/MessageSlice';
import { toast } from 'react-toastify';
var stompClient;
const MessageApp = () => {
  const [usermessage, setUserMessage] = useState([]);
  const message = useSelector((state)=> state.message.showmessage)
  const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
  const [messagelist, setMesssagelist] = useState();
  const userInfor = useSelector((state)=>state.user.userInfor);
  const [privateChats, setPrivateChats] = useState(new Map());     
  const [publicChats, setPublicChats] = useState([]); 
  const [tab,setTab] =useState("CHATROOM");
  const [receiver, setReiver] = useState();
  const userEndRef = useRef(null);
  const [alertsender, setAlertsender] = useState();
  const conversation = useSelector((state)=> state.message.message);
  const [userData, setUserData] = useState({
      username: '',
      receivername: '',
      connected: false,
      message: ''
    });
    
     
const newusermessage = [...new Set(usermessage)] || []
const onPrivateMessage = (payload)=>{
   
  var payloadData = JSON.parse(payload.body);
  
 setAlertsender(payloadData);
  if(!usermessage.includes(payloadData?.senderName))
  {
  
    setUserMessage((preState)=> [...preState, payloadData.senderName])
  }

  if(privateChats.get(payloadData.senderName)){
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
  }else{
      let list =[];
      list.push(payloadData);
      privateChats.set(payloadData.senderName,list);
      setPrivateChats(new Map(privateChats));
  }
   
}
useEffect(()=> {
setMesssagelist(privateChats);
userEndRef.current?.scrollIntoView({ behavior: "smooth" });

},[privateChats])
useEffect(()=> {
  if(alertsender)
    {
        toast.info('Có 1 tin nhắn từ '+ alertsender?.senderName);
    }
},[alertsender])
const handleShowMessage = () => {
  dispatch(showMessage());
}
const handleSetUserMessage = (e) => {
setReiver(e.target.innerText);
}
useEffect(()=> {
if(receiver)
{
  dispatch(getMessageBySenderAndReceiver({ sender:userInfor?.username, receiver:receiver})).then((response)=> {
  })
}
}, [receiver])
useEffect(()=> {
if(conversation)
{   
  privateChats.get(receiver).push(...conversation);
  setPrivateChats(new Map(privateChats));



   
}
}, [conversation])
 

const sendPrivateValue=()=>{
  if (stompClient) {
    var chatMessage = {
      senderName: userData.username,
      receiverName:receiver,
      message: userData.message
    };
    
  
    stompClient.send("/app/user/private-message", {}, JSON.stringify(chatMessage));
    setUserData({...userData,"message": ""});
  
    if(privateChats.get(chatMessage.receiverName)){
      privateChats.get(chatMessage.receiverName).push(chatMessage);

      setPrivateChats(new Map(privateChats));
 
  }else{
      let list =[];
      list.push(chatMessage);
      privateChats.set(chatMessage.receiverName,list);
      setPrivateChats(new Map(privateChats));
  }
 
  }
}
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
      setChatVisible(!isChatVisible);
      
  };
   
  const connect =()=>{
          let Sock = new SockJS('http://localhost:8081/ws');
          stompClient = Stomp.over(Sock);
          stompClient.connect({},onConnected, onError);
      }
  const onConnected = () => {
      setUserData(preState=>({...preState,connected: true}));
      const username = userInfor?.username;
      stompClient.subscribe('/user/'+username+'/private', onPrivateMessage);
   
     
  }
  const onError = (err) => {
       
      
  }
  const handleMessage =(event)=>{
      const {value}=event.target;
      setUserData({...userData,"message": value});
  }
  useEffect(()=> {
      if(userInfor)
      {
          setUserData(prevState => ({ ...prevState, username: userInfor.username }));
           
          connect();
      }

      }, [userInfor])
   


  const handleExitChat = () => {
     
  };

  return (
    <div className={message?"msg-container":"displaynone"}>
      <aside className="msg-sidebar">
        <h2 className="msg-title">Người Nhắn</h2>
        <ul className="msg-user-list">
          {newusermessage?.map(message => (
            <li onClick={handleSetUserMessage} key={message} className={receiver===message?"msg-user-item hv-at":"msg-user-item"}>{message}</li>
          ))}
        </ul>
      </aside>

      <div className="msg-content">
        <div className="msg-header">
          <h2 className="msg-header-title">Nội Dung Tin Nhắn</h2>
          <button className="msg-exit-button" onClick={handleShowMessage}>✖</button>
        </div>
        <div className="msg-display">
        {messagelist?.get(receiver) ? (
    [...messagelist?.get(receiver)].map((chat, index) => (
      <li className={`message ${chat.senderName === userData.username ? "self" : ""}`} key={index}>
      {/*{chat.senderName !== userData.username && (
          <div className="avatar">{chat.senderName}</div>
      )}*/}
      <div className="message-data">
          <strong>{chat.senderName}:</strong> {chat.message}
      </div>
      <div ref={userEndRef} ></div>
      {/*{chat.senderName === userData.username && (
          <div className="avatar self">{chat.senderName}</div>
      )}*/}
  </li>
    ))
) : (
    <li>No messages</li> // Hiển thị thông báo nếu không có tin nhắn
)}
        </div>
        <div className="msg-input-area">
          <input
            type="text"
            value={userData.message} onChange={handleMessage}
            onKeyDown={(event)=> {
              if(event.key==='Enter'){
                  sendPrivateValue()
              }
            }}
            placeholder="Nhập tin nhắn..."
            className="msg-input"
          />
          <button className="msg-send-button" onClick={sendPrivateValue}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default MessageApp;