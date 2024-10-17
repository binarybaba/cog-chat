import { ContactList } from "@/features/contacts/ContactList.tsx";
import { Desk } from "@/features/desk/Desk.tsx";
import { StoreProvider } from "@/context/Store.tsx";

function App() {
  return (
    <StoreProvider>
      <div className="h-screen flex">
        <div className="w-[300px] bg-white overflow-y-auto border-r border-gray-100">
          <ContactList />
        </div>
        <Desk>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex">
              <p>Yo</p>
            </div>
            <div className="flex">
              <p>Wanna hang out?</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>Not tonight. doing cognite assignment</p>
            </div>
            <div className="flex">
              <p>Cool lemme know if you get free</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>yeah ok</p>
            </div>
            <div className="flex">
              <p>how long is it gonna take?</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>I don tknow.. maybe like a couple of hours</p>
            </div>
            <div className="flex">
              <p>me and isabel are going to himkok</p>
            </div>
            <div className="flex">
              <p>
                we will be there until 11. see if you can wrap it up and come
                over?
              </p>
            </div>
            <div className="flex flex-row-reverse">
              <p>I cant stand her sorry. too loud</p>
            </div>
            <div className="flex">
              <p>Elisabeth is also coming</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>The plot thickens</p>
            </div>
            <div className="flex">
              <p>And I think jakub might also join.</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>{`
            Jesus christ its like a carnival. why the fuck would you guys
            choose a thursday?!
            Don't you guys have to get to work tomorrow?
            `}</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>Oh wait, you work as a PM. That's not a real job..</p>
            </div>
            <div className="flex">
              <p>When wil you be done?</p>
            </div>
            <div className="flex flex-row-reverse">
              <p>Couple of hours. Will take an hour to come so maybe 11ish</p>
            </div>
            <div className="flex">
              <p>Yea ok. we move to brewgata then</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <textarea name="" id="" className="w-full p-2 border rounded" />
          </div>
        </Desk>
      </div>
    </StoreProvider>
  );
}

export default App;
