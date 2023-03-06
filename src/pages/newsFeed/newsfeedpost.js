function NewsFeedPost() {
    const data =
        [
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
            { _id: 1, userName: "Sakib Ahamed Khan", img: '', postText: 'Hello everyone , I have a new plan about AI.', likeCount: 10, comments: [{ userName: "Samira Khanom", commentText: "Wow, It's a great idea." }, { userName: "Md Mahfuz", commentText: "Carry Bro." }, { userName: "Rakib Hasan", commentText: "Great idea." }] },
        ]
    return (
        <div className="self-center w-[600px]">
            {
                data.map((d, index) => <div className="card max-w-xl bg-base-100 border-2 my-10">
                        <figure className="px-10 pt-10">
                            <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default NewsFeedPost;