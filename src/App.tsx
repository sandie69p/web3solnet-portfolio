import NFT from './components/NFT'
import './style/App.css'

function App() {
  

  return (
    <>
      <main>
        <div>
          <NFT 
            nome="#"
            indirizzo="0xabcd"
            sigla="#"
            prezzo="1"
            owner="0x1111"
          />
        </div>
      </main>
    </>
  );
}

export default App
