import React, { useEffect, useState } from 'react';
import Avatar from '../../Assets/profile.jpg'
import CallImg from '../../Assets/call.jpg';
import Input from '../../Components/Inputs/index'

const Dashboard = () => {
    
    useEffect(()=>{
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchConversations = async()=>{
            const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        const resData = await res.json();
        // console.log(resData);
        setConversations(resData);
    }
    fetchConversations();
},[])

    const [user, setUser]= useState(JSON.parse(localStorage.getItem('user:detail')))
    // console.log(user);

    const [conversations, setConversations] = useState([]);

    return (
        <div className=' w-screen bg-[#cce2e6] h-screen flex justify-center items-center'>

            {/* First Section */}
            <div className=' w-[25%] h-screen bg-secondary'>

                {/* Profile */}
                <div className=' flex items-center my-8 mx-8'>
                    <div className=' border border-primary bg-secondary p-[8px] rounded-full' ><img src={Avatar} width={70} height={70} alt='profile image' /></div>
                    <div className=' ml-8'>
                        <h3 className=' text-2xl'>{user.fullName}</h3>
                        <p className=' text-lg font-light'>My Account</p>
                    </div>
                </div>
                <hr />

                {/* All contact messages */}
                <div className=' mx-14 mt-10'>
                    <div className=' text-primary text-lg'>Messages</div>
                    {
                        conversations.map(({ conversationId, user }) => {
                            return (
                                <div className=' flex items-center py-8 border-b border-b-gray-300 cursor-pointer'>
                                    <div className=''><img src={Avatar} width={60} height={60} alt='profile image' /></div>
                                    <div className=' ml-6'>
                                        <h3 className=' text-lg font-semibold'>{user.fullName}</h3>
                                        <p className=' text-sm text-gray-600 font-light'>{user.email}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* Second Section */}
            <div className=' w-[50%] h-screen bg-white flex flex-col items-center '>

                {/* Title */}
                <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex  items-center px-14'>
                    <div className=' cursor-pointer' ><img src={Avatar} width={50} height={50} alt='profile image' /></div>
                    <div className=' ml-6 mr-auto'>
                        <h3 className=' text-lg'>Rushi</h3>
                        <p className=' text-sm text-gray-600 font-light'>Online</p>
                    </div>
                    <div className=' pb-2 cursor-pointer
                    '><img src={CallImg} width={25} height={25} alt='call icon' />
                    </div>
                </div>

                {/* Chatting */}
                <div className='h-[75%] w-full overflow-scroll shadow-lg'>
                    <div className=' p-14'>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-lg rounded-tr-xl p-4 mb-6'> Hi my name is rushikesh tekale</div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>Hi my name is adinath tekale</div>
                    </div>

                </div>

                {/* Text box */}
                <div className=' w-full p-14 flex items-center'>

                    {/* Type Text */}
                    <Input placeholder="Type message..." className=' w-full' inputClassName='p-4 px-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />

                    {/* Send message icon */}
                    <div className=' ml-3 p-2 cursor-pointer bg-light rounded-full'>
                        <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send"  viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 14l11 -11" />
                            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                    </div>

                    {/* File select icon */}
                    <div  className=' ml-3 p-2 cursor-pointer bg-light rounded-full'>
                        <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus"  viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M9 12h6" />
                            <path d="M12 9v6" />
                        </svg>
                    </div>

                </div>
            </div>

            {/* Third Section */}

            <div className=' w-[25%] border bg-light h-screen'></div>
        </div>
    )
}

export default Dashboard;