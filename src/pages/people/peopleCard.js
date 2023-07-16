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
                <div className="flex justify-center px-10 pt-6">
                    <div className="avatar">
                        <div className="w-24 mask mask-hexagon">
                            <img src={`${data.profileImage}`} alt="Shoes" className="rounded-xl" />
                        </div>
                    </div>
                </div>
                {/* <figure className="px-10 pt-6 mb-[-10px]">
                    <img src={`${data.profileImage}`} alt="Shoes" className="rounded-xl" />
                </figure> */}
                <div className="card-body mt-[-15px]">
                    <a   className="text-lg font-semibold text-center mt-[-10px] cursor-pointer hover:text-blue-500 hover:underline">
                    {data.firstName} {data.lastName}
                    </a>
                    <div className="flex justify-center mt-1"><h3 className="text-sm font-semibold text-center text-error mt-[-5px] badge badge-outline">{data.role}</h3></div>
                    <p className="text-xs font-semibold">Followers: {followers}</p>
                    
                    <p className="text-xs font-semibold">{data.department}</p>
                    <p className="text-xs font-semibold">{data.university}</p>
                    <div className="bg-[#3D4451] text-white rounded-md text-center py-[5px] font-bold mt-1">
                        <p className="inline text-xs mr-4">Authored: {publishedPaperData?.data?.authorsSize}</p>
                        <p className="inline text-xs">Co-Authored: {publishedPaperData?.data?.coAuthorsSize}</p> 
                    </div>
                </div>
                </a>
        </div>
    )
}

export default PeopleCard;