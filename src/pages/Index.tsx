import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect } from "react"


const Index = () => {
  const dispatch = useAppDispatch();
  const { email,id,name } = useAppSelector((state) => state.user);
  useEffect(()=>{
    dispatch(userAsync())
  },[dispatch])
  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome to the Index Page</h1>
      <p className="mt-4">User ID: {id}</p>
      <p className="mt-2">User Name: {name}</p>
      <p className="mt-2">User Email: {email}</p>
    </div>
  )
}

export default Index