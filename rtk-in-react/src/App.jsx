import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter1, decreaseCounter1 } from "./store/slices/counter1Slice";
import { increaseCounter2, decreaseCounter2 } from "./store/slices/counter2Slice";
import { fetchUser } from "./store/slices/userSlice";


function App() {
  const dispatch = useDispatch();
  const { count: count1 } = useSelector((store) => store.counter1);
  const { count: count2 } = useSelector((store) => store.counter2);
  const { data, error } = useSelector((store) => store.user);

  return (
    <>
      <div>
        <h2>{count1}</h2>
        <button onClick={() => dispatch(increaseCounter1())}>Increase</button>
        <button onClick={() => dispatch(decreaseCounter1())}>Decrease</button>
      </div>
      <div>
        <h2>{count2}</h2>
        <button onClick={() => dispatch(increaseCounter2())}>Increase</button>
        <button onClick={() => dispatch(decreaseCounter2())}>Decrease</button>
      </div>
      <div className='userDiv'>
        <button onClick={() => dispatch(fetchUser())}>Get Users</button>
        <div >
          {!error ? data.map((val) => {
            return <p key={val.id}>{val.name}</p>
          }) : <p>{error}</p>}
        </div>
      </div>
    </>

  )
}

export default App
