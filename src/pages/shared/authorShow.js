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
        <div className="inline mx-2 text-blue-600 underline cursor-pointer">
              <a target="_blank" href="#">{user?.data?.firstName+" "+user?.data?.lastName}</a>
        </div>
    )
}

export default AuthorShow;