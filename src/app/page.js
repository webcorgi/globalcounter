import { connectTestMongodb, createDB, deleteAllDB, deleteDB, insertAllDB, readDB, readoneDB, theFirstCreate, updateDB, updateoneDB } from "@/lib/db/dbservice_mongodb"
import Game from "./game/page"
import Globalboard from "./(components)/globalboard"
import { ISOCodeCookies } from "./(components)/ISOCodeCookies"
import SaveISO from "./(components)/SaveISO"

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
  // await updateoneDB('KR')
  // await deleteAllDB()
  // await createAllDB()
  // await insertAllDB()

  const getCookie = await ISOCodeCookies()

  return (
    <main className="home">
      <SaveISO isocode={getCookie.value} />
      <Game />
      <Globalboard isocode={getCookie.value} />
    </main>
  )
}
