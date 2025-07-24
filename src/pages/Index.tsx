import { useAppDispatch } from "@/hooks/storeHooks";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect } from "react"


const Index = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(userAsync())
  },[dispatch])
  return (
    <div>Index</div>
  )
}

export default Index