import { useQuery } from "react-query";


const CitationList = (props) => {
    const {data, index} = props;
    const {data: paperData, isLoading: paperAuthLoading, refetch} = useQuery(`${data.paperId}`, () => {
        return  fetch(`http://localhost:8000/api/v1/published-paper/get-published-paper/${data.paperId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    console.log(paperData);

    return (
        <a href={`http://localhost:3000/paperpublished/${data.paperId}`} className="border px-4 py-2 bg-blue-100 rounded-md hover:bg-blue-800 hover:text-white cursor-pointer my-2">
        {index+1}. {paperData?.data?.title}
        </a>
    )
}

export default CitationList;