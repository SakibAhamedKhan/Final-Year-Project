import { RiLightbulbFlashFill, RiLightbulbFlashLine } from 'react-icons/ri';
import { MdOutlineModeComment } from "react-icons/md";
import image1 from '../../assets/img/Sakib.jpeg'

function NewsFeedPost() {
    
    const data =
        [
            { _id: 1, userName: "Sakib Ahamed Khan", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] , liked:[{id: 1001},{id:1002}]},
            { _id: 1, userName: "Yasin", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }], liked:[{id: 1003},{id:1002}] },
            { _id: 1, userName: "Tanbir", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Faisal Rahman", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Efti Hasan", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Monir", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Lotif", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Wasim", img: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
        ];

    const LikeForMy = (index) => {
        const arr = data[index];

        return <></>;

    }
    return (
        <div className="self-center w-[600px]">
            {
                data.map((d, index) => <div className="card max-w-xl bg-base-100 drop-shadow-md my-10 rounded-[5px]">
                    {/* Img and UserName */}
                    <div className="flex items-center px-4 pb-4 pt-4">
                        <div className="avatar">
                            <div className="w-6 rounded-full">
                                <img src={`${image1}`} />
                            </div>
                        </div>
                        <div className="ml-2">
                            <h2 className="text-sm font-semibold">{d.userName}</h2>
                        </div>
                    </div>
                    {/* Post Text */}
                    <hr className="pt-4" />
                    <div className="px-4 pb-4">
                        <h3>{d.postText}</h3>
                    </div>

                    {/* Like Count */}
                    <div className='px-4 pb-1 flex items-center text-sm'>
                        <RiLightbulbFlashFill  className='text-gray-600 mr-1'/>
                        <h2 className='text-gray-400'>{d.likeCount}</h2>
                    </div>
                    <hr className="" />

                    {/* Like and Comment Section */}
                    {
                       LikeForMy(index) 
                    }
                    <div className='flex  justify-center justify-around items-center py-4'>
                        <RiLightbulbFlashFill />
                        <div className='text-gray-300'>|</div>
                        <MdOutlineModeComment />
                    </div>

                </div>
                )
            }
        </div>
    );
}

export default NewsFeedPost;