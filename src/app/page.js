import { connectTestMongodb, createDB, deleteAllDB, deleteDB, insertAllDB, readDB, readoneDB, theFirstCreate, updateDB, updateoneDB } from "@/lib/db/dbservice_mongodb"
import Game from "./game/page"
import Globalboard from "./(components)/globalboard"
import GetUserIP from "@/lib/GetUserIP"
import { getCookieIP, setCookieIP } from "@/lib/cookie"

export default async function Home() {
  /***********************************
   * DB테스트
   ***********************************/
  await connectTestMongodb()
  // await theFirstCreate()
  // await createDB()
  // await readDB()
  // await updateDB()
  // await deleteDB()
  // await readoneDB()
  // await updateoneDB()
  // await deleteAllDB()
  // await createAllDB()
  // await insertAllDB()


  /**********************************
   * IP
   **********************************/
  const userIP = GetUserIP()
  const cookieip = getCookieIP()
  if( !cookieip ) await setCookieIP(userIP)


  return (
    <main className="home">
      <Game />
      <Globalboard />
    </main>
  )
}