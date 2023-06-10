# RTK in React
 - RTK is a state management library.
 - React is a UI library
To establish communication between RTK and React we need an another library named "**react-redux**"
### provider
It is used to provide the store to the application. It uses context api under the hood. Hence, we need to write it at the top level of the component so that every child component has access to the store.
### useSelector
It is used to read values from the store.

    const storeData = useSelector((store) => store);
### useDispatch
It is used to dispatch actions

    const dispatch = useDispatch();
    dispatch(action());
