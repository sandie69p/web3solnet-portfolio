type NFTProps = {
    nome: string;
    indirizzo: string;
    sigla: string;
    prezzo: string;
    owner: string;
}

function NFT({
    nome,
    indirizzo,
    sigla,
    prezzo,
    owner}: NFTProps
) {
    return (
        <div className="nft">
            <p>Nome: {nome}</p>
            <address>Indirizzo: {indirizzo}</address>
            <p>Sigla: {sigla}</p>
            <p>Prezzo: {prezzo}</p>
            <p>Owner: <span>{owner}</span></p>
        </div>
    );
}

export default NFT;