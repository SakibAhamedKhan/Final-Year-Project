import { useEffect, useState } from "react"
import { useQuery } from "react-query";

const userAuth = () => {
    
    let id = localStorage.getItem('userId');
    console.log(`User id is: ${id}`);
    
    
    const {data: user, isLoading: userAuthLoaading, refetch} = useQuery('userAuth', () => {
        if(id==null){ 
            return {status: "fail"}
        } 
        return  fetch(`http://localhost:8000/api/v1/user/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    
    
    return [user,userAuthLoaading, refetch];


    
}

export default userAuth