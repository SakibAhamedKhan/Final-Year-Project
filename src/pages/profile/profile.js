import { useEffect, useState } from "react";
import User from '../../data/user.json';
import image1 from '../../assets/img/Sakib.jpeg';

function Profile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(User);
    })
    return (
        <div className="p-8 flex flex-col overflow-y-scroll h-screen">
            <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                <h2 className="mb-4 font-semibold text-xl">Welcome, {user.name}</h2>
                <div className="mb-4">
                    <div class="avatar online">
                        <div class="w-24 rounded-full">
                            <img src={image1} />
                        </div>
                    </div>
                </div>
                <div className="font-bold flex mb-2">Name: <p className="pl-2 font-medium">{user.name}</p></div>
                <div className="font-bold flex mb-2">Last Institute: <p className="pl-2 font-medium">{user.institute}</p></div>
                <div className="font-bold flex mb-2">City: <p className="pl-2 font-medium">{user.city}</p></div>
                <div className="font-bold flex mb-2">Country: <p className="pl-2 font-medium">{user.country}</p></div>

            </div>
        </div>
    );
}

export default Profile;