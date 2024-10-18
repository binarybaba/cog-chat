import { ContactList } from "@/features/contacts/ContactList.tsx";
import { Desk } from "@/features/desk/Desk.tsx";
import { StoreProvider } from "@/context/Store.tsx";
import { TextArea } from "@/features/desk/components/TextArea.tsx";
import { Chat } from "@/features/desk/components/Chat.tsx";

function App() {
  return (
    <StoreProvider>
      <div className="h-screen flex">
        <div className="w-[300px] bg-white overflow-y-auto border-r border-gray-100">
          <ContactList />
        </div>
        <Desk>
          <Chat />
          <TextArea />
        </Desk>
      </div>
    </StoreProvider>
  );
}

export default App;
