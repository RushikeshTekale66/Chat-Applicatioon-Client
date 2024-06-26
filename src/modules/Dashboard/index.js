import React, { useEffect, useRef, useState } from 'react';
import {useNavigate } from "react-router-dom";
import Avatar from '../../Assets/Profile2.png'
import CallImg from '../../Assets/call.jpg';
import Input from '../../Components/Inputs/index';
import { io } from 'socket.io-client';


const Dashboard = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const messageRef = useRef(null);

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/users/sign_in");
    }

    useEffect(()=>{
        messageRef?.current?.scrollIntoView({behavior:'smooth'});
    }, [messages?.messages])

    // console.log("User : ", user);
    // console.log("Conversations : ", conversations);
    // console.log("Messages: ", messages);
    // console.log("Message: ", message);
    // console.log("Users: " , users);

    useEffect(() => {
        setSocket(io('http://localhost:8080'))
    }, []);

    useEffect(() => {
        socket?.emit('addUser', user?.id);
        socket?.on('getUsers', users => {
            console.log("Active user => ", users);
        });
        socket?.on('getMessage', data => {
            console.log("Data => ", data);
            setMessages(prev => ({
                ...prev,
                messages: [...prev.messages, { user: data.user, message: data.message }]
            }))
        })
    }, [socket]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
        const fetchConversations = async () => {
            const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const resData = await res.json();
            console.log("Hi", resData);
            setConversations(resData);
        }
        fetchConversations();
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resData = await res.json();
            setUsers(resData);
        }
        fetchUsers();
    }, [])

    const fetchMessages = async (conversationId, receiver) => {
        const res = await fetch(`http://localhost:8000/api/messages/${conversationId}?senderId= ${user?.id}&&receiverId=${receiver?.receiverId}`, {
            method: 'GET',
            // ...(conversationId === 'new' && {
            //     body: JSON.stringify({senderId: user?.id, receiverId: messages?.receiver?.receiverId})
            // }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const resData = await res.json();
        console.log(resData);
        setMessages({ messages: resData, receiver, conversationId });
    }

    const sendMessage = async (e) => {
        // console.log("Send Message = > ", message, messages?.conversationId, user?.id, messages?.receiver?.receiverId);

        socket?.emit('sendMessage', {
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message,
            receiverId: messages?.receiver?.receiverId
        })

        const res = await fetch(`http://localhost:8000/api/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationId: messages?.conversationId,
                senderId: user?.id,
                message,
                receiverId: messages?.receiver?.receiverId
            })
        })
        setMessage('');
    }

    

    return (
        <div className=' w-screen bg-[#cce2e6] h-screen flex justify-center items-center '>

            {/* First Section */}
            <div className=' w-[25%] h-screen bg-secondary overflow-scroll'>

                {/* Profile */}
                <div className=' flex items-center bg-gray-200 rounded-xl p-3'>
                    <div className=' border border-primary bg-secondary p-[8px] rounded-lg' ><img src={Avatar} width={70} height={70} alt='profile image' /></div>
                    <div className=' ml-8'>
                        <h3 className=' text-2xl font-semibold'>{user.fullName}</h3>
                        <p className=' text-lg font-light'>My Account</p>
                        <button className=' font-bold text-red-600' onClick={logout}>Log Out</button>
                    </div>
                </div>
                <hr />

                {/* All contact messages */}
                <div className=' mx-14 mt-10' >
                    <div className=' font-bold text-2xl'>Messages</div>
                    {
                        conversations.length > 0 ?
                            conversations.map(({ conversationId, user }) => {
                                return (
                                    <div className=' flex items-center py-8 border-b border-b-gray-300 cursor-pointer'>
                                        <div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversationId, user)}>
                                            <div className=''><img src={Avatar} width={60} height={60} alt='profile image' /></div>
                                            <div className=' ml-6'>
                                                <h3 className=' text-lg font-semibold'>{user.fullName}</h3>
                                                <p className=' text-sm text-gray-600 font-light'>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <div className=' text-center text-lg font-semibold my-auto mt-24'>No conversations till</div>
                    }
                </div>
            </div>

            {/* Second Section */}
            <div className=' w-[50%] h-screen bg-white flex flex-col items-center '>

                {/* Title */}
                {
                    messages?.receiver?.fullName &&
                    <div className='w-[80%]  h-[80px] bg-secondary my-10 rounded-full flex  items-center px-14'>
                        <div className=' cursor-pointer' ><img src={Avatar} width={50} height={50} alt='profile image' /></div>
                        <div className=' ml-6 mr-auto'>
                            <h3 className=' text-lg'>{messages?.receiver?.fullName}</h3>
                            <p className=' text-sm text-gray-600 font-light'>{messages?.receiver?.email}</p>
                        </div>
                        <div className=' pb-2 cursor-pointer
                    '><img src={CallImg} width={25} height={25} alt='call icon' />
                        </div>
                    </div>
                }

                {/* Chatting */}
                <div className={`${(messages?.receiver?.fullName)?'h-[75%]':'h-[100%]'} w-full overflow-scroll shadow-lg`}>
                    <div className=' p-14'>
                        {
                        messages?.messages?.length > 0 ?
                            messages.messages.map(({ message, user: { id } = {} }) => {

                                return (
                                    <>
                                        <div className={`max-w-[40%] rounded-b-xl  p-4 mb-6 ${id===user?.id ? ' bg-primary text-white rounded-tl-xl ml-auto' :'bg-secondary rounded-tr-xl '}`}>{message}</div>
                                        <div ref={messageRef}></div>
                                    </>
                                )
                            })
                            : <div className='text-center text-3xl font-semibold m-auto'>Start conversations</div>
                        }

                    </div>

                </div>

                {/* Text box */}
                {
                    messages?.receiver?.fullName &&
                    <div className=' w-full p-5 flex items-center'>

                        {/* Type Text */}
                        <Input placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)} className=' w-full' inputClassName='p-4 px-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />

                        {/* Send message icon */}
                        <div className={` ml-3 p-2 cursor-pointer bg-light rounded-full ${!message && ' pointer-events-none'}`} onClick={() => sendMessage()}>
                            <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 14l11 -11" />
                                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                        </div>

                        {/* File select icon */}
                        <div className={` ml-3 p-2 cursor-pointer bg-light rounded-full ${!message && ' pointer-events-none'}`}>
                            <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                <path d="M9 12h6" />
                                <path d="M12 9v6" />
                            </svg>
                        </div>

                    </div>

                }
            </div>


            {/* Third Section */}

            <div className=' w-[25%] border bg-secondary h-screen overflow-scroll'>
                <div className=' text-primary font-extrabold px-20 text-3xl pt-10'>Contact List</div>
                <div className=' text-primary text-lg mx-14 mt-1'>
                    {
                        users.length > 0 ?
                            users.map(({ userId, user }) => {
                                return (
                                    <div className=' flex items-center py-8 border-b border-b-gray-300 cursor-pointer'>
                                        <div className='cursor-pointer flex items-center' onClick={() => fetchMessages('new', user)}>
                                            <div className=''><img src={Avatar} width={60} height={60} alt='profile image' /></div>
                                            <div className=' ml-6'>
                                                <h3 className=' text-lg font-semibold'>{user.fullName}</h3>
                                                <p className=' text-sm text-gray-600 font-light'>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <div className=' text-center text-lg font-semibold my-auto mt-24'>No People till</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;