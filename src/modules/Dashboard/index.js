import React from 'react';
import Avatar from '../../Assets/profile.jpg'

const Dashboard = () => {
    const contacts = [
        {
            name: 'John',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Rushikesh',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Amar',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Vaibhav',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Vaishnav',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Akash',
            status: 'Available',
            img: Avatar
        }
    ]
    return (
        <div className=' w-screen flex'>
            <div className=' w-[25%] h-screen bg-secondary'>
                <div className=' flex items-center my-8 mx-8'>
                    <div className=' border border-primary p-[8px] rounded-full' ><img src={Avatar} width={70} height={70} alt='profile image' /></div>
                    <div className=' ml-8'>
                        <h3 className=' text-2xl'>Chat Application</h3>
                        <p className=' text-lg font-light'>My Account</p>
                    </div>
                </div>
                <hr />
                <div className=' mx-14 mt-10'>
                    <div className=' text-primary text-lg'>Messages</div>
                    {
                        contacts.map(({ name, status, img }) => {
                            return (
                                <div className=' flex items-center py-8 border-b border-b-gray-300 cursor-pointer'>
                                    <div className=''><img src={img} width={60} height={60} alt='profile image' /></div>
                                    <div className=' ml-6'>
                                        <h3 className=' text-lg font-semibold'>{name}</h3>
                                        <p className=' text-sm text-gray-600 font-light'>{status}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className=' w-[50%] h-screen'></div>

            <div className=' w-[25%] border border-black h-screen'></div>
        </div>
    )
}

export default Dashboard;