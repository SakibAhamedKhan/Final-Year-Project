import AuthorShow from "../shared/authorShow";
import ConvertTime from "./converttime";
import { MdOutlineTravelExplore } from 'react-icons/md'

const PaperCard = (props) => {
    const {d} = props;

    const authorShow = () => {
        return(
            <div className="inline flex my-4">
                {d?.authors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }
    console.log(d)
    const coAuthorShow = () => {
        return(
            <div className="inline flex my-4">
                {d?.coAuthors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }
    return (
        <div className="card bg-base-100 drop-shadow-md my-10 rounded-[5px]">
                                    <div className="p-4">
                                        <h2 className="font-bold">{d.title}</h2>
                                        <ConvertTime key={d._id} date={d.date} />
                                        <p className="mb-2">{d.abstract}</p>

                                        <div className="flex items-center pt-3 justify-between">
                                            {/* Profile Information */}
                                           <div className="flex flex-col w-5/6">
                                                
                                                <div className="">
                                                    <h2 className="bg-blue-200  w-fit rounded-md px-2 py-[3px] text-black inline">Authors: </h2> 
                                                    <div className="">
                                                        {authorShow()}
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h2 className="bg-orange-200  w-fit rounded-md px-2 py-[3px]  text-black inline">Co - Authors: </h2> 
                                                    <div className="">
                                                        {coAuthorShow()}
                                                    </div>
                                                </div>
                                           </div>
                                            {/* Explore Button */}
                                            <div className="w-1/6 self-end justify-self-end mr-[-30px] mb-[18px]"> 
                                                <button class="btn btn-sm gap-2 btn-outline capitalize rounded-[5px]">
                                                    <MdOutlineTravelExplore />
                                                    Explore
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    )
}

export default PaperCard;