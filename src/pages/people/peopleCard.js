import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";


const PeopleCard = (props) => {
    const {data} = props;
    const followers = data.followers.length;
    const {data:publishedPaperData, isLoading, refetch} = useQuery(`${data._id}`, () => {
        return  fetch(`http://localhost:8000/api/v1/published-paper/${data._id}`,{
            method: 'GET',
            headers:{
                'content-type':'application/json'
            },
        })
        .then(res => res.json())
        })
    
        if(isLoading){
            return (
                <div className="flex justify-center items-center">
                    <InfinitySpin
                        width='200'
                        color="#4fa94d"
                    />
                </div>
            )
        }
    return (
        <div>
            <a className="card w-86 bg-base-100 drop-shadow-md " href={`http://localhost:3000/userprofile/${data._id}`}>
                <figure className="px-10 pt-6 mb-[-10px]">
                    <img src={`${data.profileImage}`} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body">
                    <a   className="text-lg font-semibold text-center mt-[-10px] cursor-pointer hover:text-blue-500 hover:underline">
                    {data.firstName} {data.lastName}
                    </a>
                    <div className="flex justify-center mt-1"><h3 className="text-sm font-semibold text-center text-error mt-[-5px] badge badge-outline">{data.role}</h3></div>
                    <p className="text-xs">Followers: {followers}</p>
                    
                    <p className="text-xs">{data.department}</p>
                    <p className="text-xs">{data.university}</p>
                    <div className="bg-black text-orange-200 rounded-md text-center py-[5px] font-bold">
                        <p className="inline text-xs mr-4">Authored: {publishedPaperData?.data?.authorsSize}</p>
                        <p className="inline text-xs">Co-Authored: {publishedPaperData?.data?.coAuthorsSize}</p> 
                    </div>
                </div>
                </a>
        </div>
    )
}

export default PeopleCard;