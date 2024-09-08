import React, { useEffect, useRef, useState } from 'react';
import './ChatUser.css'
import { FaFacebookMessenger } from "react-icons/fa";
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMessageBySenderAndReceiver } from '~/features/message/MessageSlice';
var stompClient
const ChatUser = () => {
    const userInfor = useSelector((state)=>state.user.userInfor);
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [receiver, setReiver] = useState('admin2');
    const [messagelist, setMesssagelist] = useState();
    const [alertsender, setAlertsender] = useState();
    const conversation = useSelector((state)=> state.message.message);
    const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendPrivateValue();
    }
  }
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
      const messagesEndRef = useRef(null);
      
       

      const onPrivateMessage = (payload) => {
         
        var payloadData = JSON.parse(payload.body);
        
        setAlertsender(payloadData)
        if (privateChats.get(payloadData.senderName)) {
             
            privateChats.get(payloadData.senderName).push(payloadData);
        } else {

            privateChats.set(payloadData.senderName, [payloadData]);
        }
         
        setPrivateChats(new Map(privateChats));
         
    };
//const filteredMessages = Object.entries(privateChats).flatMap(([username, msgs]) => 
//    msgs.filter(msg => 
//        (msg.senderName === userInfor?.username && msg.receiverName === receiver) ||
//        (msg.senderName === receiver && msg.receiverName === userInfor?.username)
//    ) 
//);
useEffect(()=> {
setMesssagelist(privateChats);
 
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 

}, [privateChats])
const sendPrivateValue=()=>{
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName:receiver,
        message: userData.message
      };
      
    
      stompClient.send("/app/admin/private-message", {}, JSON.stringify(chatMessage));
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
        if(alertsender)
        {
            toast.info('Có 1 tin nhắn từ '+ alertsender?.senderName);
        }

      },[alertsender])
      useEffect(()=> {
        if(receiver)
        {
          dispatch(getMessageBySenderAndReceiver({ sender:userInfor?.username, receiver:receiver})).then((response)=> {
          })
        }
        }, [receiver])
        useEffect(() => {
            if (conversation) {
              const currentChats = privateChats.get(receiver) || []; // Kiểm tra nếu tồn tại, nếu không khởi tạo là mảng rỗng
              currentChats.push(...conversation);
              setPrivateChats(new Map(privateChats.set(receiver, currentChats))); // Cập nhật mảng mới
            }
          }, [conversation]);
    useEffect(()=> {
 
    },[privateChats])
    useEffect(()=> {
        if(userInfor)
        {
            setUserData(prevState => ({ ...prevState, username: userInfor.username }));
            connect();
        }
  
        }, [userInfor])
         
    return (
        <div className="chat-app">
            <div className="chat-icon" onClick={toggleChat}>
                <FaFacebookMessenger></FaFacebookMessenger>
            </div>
            {isChatVisible && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h5>Chat với Admin</h5>
                        <button className="close-button" onClick={toggleChat}>✖</button>
                    </div>
                    <div className="chat-messages">
                    {privateChats.get(receiver) ? (
    [...privateChats.get(receiver)].map((chat, index) => (
        <li className={`message ${chat.senderName === userData.username ? "self" : ""}`} key={index}>
            {/*{chat.senderName !== userData.username && (
                <div className="avatar">{chat.senderName}</div>
            )}*/}
            <div className="message-data">
                <strong>{chat.senderName}:</strong> {chat.message}
            </div>
            <div ref={messagesEndRef} />
            {/*{chat.senderName === userData.username && (
                <div className="avatar self">{chat.senderName}</div>
            )}*/}
        </li>
    ))
) : (
    <li>No messages</li> // Hiển thị thông báo nếu không có tin nhắn
)}
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type message" value={userData.message} onChange={handleMessage}
                          onKeyDown={(event)=> {
                            if(event.key==='Enter'){
                                sendPrivateValue()
                            }
                          }} />
                        <button className="send-button" onClick={sendPrivateValue}>SEND</button>
                    
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatUser;