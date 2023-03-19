import NewsFeedPost from "./newsfeedpost";
import image1 from '../../assets/img/Sakib.jpeg'

function Newsfeed() {



    return (
        <div className="p-8 flex flex-col overflow-y-scroll h-screen">
            {/* ############################### Modal of Post ##################################### */}
            <div className="self-center w-[600px]">
                <label htmlFor="my-modal-3" className="btn btn-block btn-sm bg-white text-black hover:text-gray-400 hover:bg-white border-0 drop-shadow-md capitalize rounded-[5px] max-w-xl">Post Your Idea</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative p-0 rounded-[5px]">
                        <div className="flex  justify-center ">
                            <label htmlFor="my-modal-3" className="btn btn-xs btn-circle absolute right-3 top-3 text-white">x</label>
                            <h2 className="mt-[12px] font-semibold">Create a Post</h2>
                        </div>
                        <hr className="mt-4 mb-4" />
                        <div className="flex items-center px-4 pb-4">
                            <div className="avatar">
                                <div className="w-6 rounded-full">
                                    <img src={`${image1}`} />
                                </div>
                            </div>
                            <div className="ml-2">
                                <h2 className="text-sm font-semibold">Sakib Ahamed Khan</h2>
                            </div>
                        </div>

                        <div className="px-4 pb-4">
                            <textarea placeholder={`What's is your new Idea, Sakib Ahamed Khan?`} className="textarea textarea-bordered rounded-md w-full" ></textarea>
                        </div>
                        <div className="px-4 pb-4">
                            <button className="btn btn-block btn-sm capitalize rounded-[5px] text-white">Post</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* #################################### Card ######################################## */}
            <NewsFeedPost />


        </div>
    );
}

export default Newsfeed;