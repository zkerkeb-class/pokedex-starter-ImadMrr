import '../../../App.css';

function ChangePokemon({prevId, setCurrentId}) {

    const incrementId = () => {
    setCurrentId((prevId) => {
        console.log("Avant incrémentation:", prevId); 
        const newId = (prevId === 150 ? 0 : prevId + 1); // Si ID == 150 et incrémente => 0
        console.log("Après incrémentation:", newId); 
        return newId;
    });};

    const decrementId = () => {
    setCurrentId((prevId) => {
        console.log("Avant décrémentation:", prevId); 
        const newId = (prevId === 0 ? 150 : prevId - 1); // Si ID == 0 et décrémente => 150
        console.log("Après décrémentation:", newId);
        return newId;
    });};

    return (
    <>
        {/*Boutons passer de pokemon */}
        <div style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
            
            <button onClick={decrementId}>-</button>

        </div>

        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            
            <button onClick={incrementId}>+</button>

        </div>
    </>
    )};
export default ChangePokemon;
