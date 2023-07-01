import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import PaperPublishDraftCard from "../paperPublishDraft/paperPublishDraftCard";
import MyPublishedPaperCard from "./myPublishedPaperCard";


const MyPublishedPaper = () => {

    const {data:publishedPaperData, isLoading, refetch} = useQuery('draftData', () => {
        let id = localStorage.getItem('userId');
        return  fetch(`http://localhost:8000/api/v1/published-paper/${id}`,{
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
            <p className="text-blue-500 text-center font-semibold text-xl">My Published Content</p>
            {
                publishedPaperData.data?
                publishedPaperData.data.map((d, index) => <MyPublishedPaperCard data={d} index={index} refetch={refetch} />)
                :
                <div className="flex justify-center items-center">
                    {/* <InfinitySpin
                        width='200'
                        color="#4fa94d"
                    /> */}
                </div>
            }
        </div>
    )
}

export default MyPublishedPaper;