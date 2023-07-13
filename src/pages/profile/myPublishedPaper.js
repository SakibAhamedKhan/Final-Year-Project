import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import PaperPublishDraftCard from "../paperPublishDraft/paperPublishDraftCard";
import MyPublishedPaperCard from "./myPublishedPaperCard";
import { useState } from "react";


const MyPublishedPaper =  (props) => {
    const { id } = props;
    const [filter, setFilter] = useState("all");
    const {data:publishedPaperData, isLoading, refetch} = useQuery('draftData', () => {
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
    const handleSelect = (e) =>{
        setFilter(e.target.value);
    }
    
    return (
        <div>
            <p className="text-blue-500 text-center font-semibold text-xl">Published Contents</p>
                <div className="flex justify-between w-full items-center">
                    <div className="font-semibold">
                        <p className="inline mr-6">Authored: {publishedPaperData?.data?.authors.length}</p>
                        <p className="inline">Co-Authored: {publishedPaperData?.data?.coAuthors.length}</p> 
                    </div>
                    <div>
                        <p className="mr-4 font-semibold inline">Filter</p>
                        <select onChange={handleSelect} className="select select-sm select-bordered text-sm">
                            <option value="all" selected>All</option>
                            <option value="authored">Authored</option>
                            <option value="coauthored">Co-Authored</option>
                        </select>
                    </div>
                </div>
            {
                publishedPaperData.data?
                <>
                    {
                        filter==="all" && publishedPaperData.data.all.map((d, index) => <MyPublishedPaperCard data={d} index={index} refetch={refetch} />)
                    }
                    {
                        filter==="authored" && publishedPaperData.data.authors.map((d, index) => <MyPublishedPaperCard data={d} index={index} refetch={refetch} />)
                    }
                    {
                        filter==="coauthored" && publishedPaperData.data.coAuthors.map((d, index) => <MyPublishedPaperCard data={d} index={index} refetch={refetch} />)
                    }
                </>
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