
import App from './_components/App';
import Header from './_components/Header';
import { TimedMessageProvider } from './_contexts/TimedMessageContext';


export default function Home() {
  return (
    <TimedMessageProvider>
      <div className="flex flex-col min-h-screen text-gray-50 bg-[rgb(17,_19,_31)]">
        <Header />
        <div className="flex flex-1">
          {/* <Sidebar /> */}
          <App />
        </div>
      </div>
    </TimedMessageProvider>

  )
}