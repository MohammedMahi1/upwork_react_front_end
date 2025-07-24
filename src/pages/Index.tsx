import withAuth from "@/middleware/isAuth"


const Index = () => {
  return (
    <div>Index</div>
  )
}

export default withAuth(Index)