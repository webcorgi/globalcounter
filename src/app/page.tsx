import { connectTestMongodb, createDB, deleteAllDB, deleteDB, insertAllDB, readDB, readoneDB, theFirstCreate, updateDB, updateoneDB } from "@/lib/db/dbservice_mongodb"
import Game from "./game/page"
import Globalboard from "./(components)/globalboard"
import SaveISO from "./(components)/SaveISO"
import { ISOCodeCookies } from "@/lib/cookie"

export default async function Home()  {
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
  // await updateoneDB('KR')
  // await deleteAllDB()
  // await createAllDB()
  // await insertAllDB()

  const getCookie = await ISOCodeCookies()
  // console.log("🚀 ~ Home ~ getCookie:", getCookie)

  return (
    <main className="home">
      <SaveISO isocode={getCookie} />


      {/* 글로벌 카운트 */}
      {/* <Game />
      <Globalboard isocode={getCookie} /> */}
    </main>
  )
}