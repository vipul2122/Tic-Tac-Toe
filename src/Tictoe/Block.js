import React, { useState, useRef, useEffect } from 'react';

const Block = () => {
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const [state, setState] = useState(true);
  const [winner, setWinner] = useState(false);
  const [store, setStore] = useState(Array(9).fill(null));
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');
  const [winnerName, setWinnerName] = useState('');
  const [draw, setDraw] = useState(false);
  const [replay, setReplay] = useState(false);
  const [namesEntered, setNamesEntered] = useState(false);

  const clickHandler = (ref, index) => {
    if (!namesEntered) {
      alert("Please enter both player names before starting the game.");
      return;
    }
    if (ref.current.textContent === playerA || ref.current.textContent === playerB) {
      return; // Do nothing if the content is already set
    }
    state ? (ref.current.textContent = playerA) : (ref.current.textContent = playerB);
    const updatedStore = [...store];
    updatedStore[index] = ref.current.textContent;
    setStore(updatedStore);
    setState(!state);
  };

  useEffect(() => {
    // Winner-checking logic
    if (
      (store[0] === store[1] && store[1] === store[2] && store[0] !== null) ||
      (store[3] === store[4] && store[4] === store[5] && store[3] !== null) ||
      (store[6] === store[7] && store[7] === store[8] && store[6] !== null) ||
      (store[0] === store[3] && store[3] === store[6] && store[0] !== null) ||
      (store[1] === store[4] && store[4] === store[7] && store[1] !== null) ||
      (store[2] === store[5] && store[5] === store[8] && store[2] !== null) ||
      (store[0] === store[4] && store[4] === store[8] && store[0] !== null) ||
      (store[2] === store[4] && store[4] === store[6] && store[2] !== null)
    ) {
      setWinner(true);
      setWinnerName(state ? playerB : playerA);
    } else if (store.every((item) => item !== null)) {
      setDraw(true);
    }
    if (replay) {
      setReplay(false); // Reset replay state
      setWinner(false); // Reset winner state
      setDraw(false); // Reset draw state
      setStore(Array(9).fill(null)); // Reset the board
      setState(true); // Reset the state
    }
  }, [store, playerA, playerB, state, replay]);

  useEffect(() => {
    if (playerA && playerB) {
      setNamesEntered(true);
    } else {
      setNamesEntered(false);
    }
  }, [playerA, playerB]);

  return (
    draw ? (
      <div>
        <div>Match Is Draw</div>
        <div><button onClick={() => { setReplay(true) }}>Play Again</button></div>
      </div>
    ) : (winner ? (
      <div>
        <div>{winnerName}: Won the game</div>
        <div><button onClick={() => { setReplay(true) }}>Play Again</button></div>
      </div>
    ) : (
      <div className='r' style={{ width: '50%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className='r1' style={{ display: 'flex', flexDirection: 'row' }}>
          <div ref={ref0} onClick={() => clickHandler(ref0, 0)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref1} onClick={() => clickHandler(ref1, 1)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref2} onClick={() => clickHandler(ref2, 2)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
        </div>
        <div className='r2' style={{ display: 'flex', flexDirection: 'row' }}>
          <div ref={ref3} onClick={() => clickHandler(ref3, 3)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref4} onClick={() => clickHandler(ref4, 4)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref5} onClick={() => clickHandler(ref5, 5)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
        </div>
        <div className='r3' style={{ display: 'flex', flexDirection: 'row' }}>
          <div ref={ref6} onClick={() => clickHandler(ref6, 6)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref7} onClick={() => clickHandler(ref7, 7)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
          <div ref={ref8} onClick={() => clickHandler(ref8, 8)} style={{ border: '2px solid blue', width: '100%', height: '50px' }}></div>
        </div>
        <div>
          <div>
            <label>Player 1</label>
            <input onChange={(e) => { setPlayerA(e.target.value) }}></input>
          </div>
          <div>
            <label>Player 2</label>
            <input onChange={(e) => { setPlayerB(e.target.value) }}></input>
          </div>
        </div>
      </div>
    ))
  );
};

export default Block;
