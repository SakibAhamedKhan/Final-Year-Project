import { useQuery } from "react-query";
import UserAuthLoadingPage from "./userAuthLoadingPage";


const AuthorShow = (props) => {
    const {id} = props;

    const {data: user, isLoading: userAuthLoaading, refetch} = useQuery(`${id}`, () => {
        return  fetch(`http://localhost:8000/api/v1/user/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    console.log(user);
    
    const handleGoToProfile = () => {

    }
    return (
        <div className="inline mr-2 text-blue-600 font-bold cursor-pointer">
              <a target="_blank" href={`http://localhost:3000/userprofile/${id}`} className="flex items-center border-2 border-zinc-400	 w-fit px-2 py-1 rounded-md drop-shadow-md inline">
                <div className="avatar inline mr-1">
                    <div className="w-6 rounded-full">
                        <img src={user?.data?.profileImage}/>
                    </div>
                </div>
                <p>{user?.data?.firstName+" "+user?.data?.lastName}</p>
              </a>
        </div>
    )
}

export default AuthorShow;