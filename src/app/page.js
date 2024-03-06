// import executeQuery, { getQuery, updateQuery } from "@/lib/dbservice"
// import { connectTestMongodb, runningMongodb, theFirstCreate } from "@/lib/dbservice_mongodb"
import Game from "./game/page"


export default async function Home() {
  // await connectTestMongodb()
  // await theFirstCreate()

  return (
    <main className="home">
      <Game />
      {/* {JSON.stringify(getter)} */}
    </main>
  )
}