import { createContext, useContext, useReducer } from "react";

// Define Type for UserContextProvider
type UserProps = {
  children: React.ReactNode;
};

//Define Car
interface UICar {
  id: number,
  brand: string, 
  color: string
}

// Define Ui Person Interface
interface UIPerson {
  name: string;
  lastName: string;
  isLoggedIn: boolean;
  cars: {id: number, brand: string, color: string}[];
  toggleLogin?: () => void;
  addUserCar?: (data: UICar) => void;
  deleteUserCar?: (data: UICar) => void;
  updateUserCar?: (data: UICar) => void;
}

// Define Basic Actions Type "Generic"
enum ActionKind{
  logged = 'logged',
  add = 'add',
  update = 'update',
  delete = 'delete'
}

type Action = {
  type: ActionKind,
  payload: { id: number, brand: string, color: string}
}


const carReducer = ( state: UIPerson, action: Action ) =>{
  switch (action.type) {
    case ActionKind.add:
      return {
        ...state,
        cars: [ ...state.cars , { ...action.payload } ]
      }
    case ActionKind.delete:
      // Require id in the Action.Payload
      return {
        ...state,
        cars: state.cars.filter( car => car.id!== action.payload.id)
      }
    case ActionKind.update:
      // Require id in the Action.Payload
      const carsFilter = state.cars.filter( car => car.id!== action.payload.id)
      return{
        ...state,
        cars: [ ...carsFilter, action.payload ]
      }
    case ActionKind.logged:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn
      };
  }
}

const initialState: UIPerson = {
  name: "Gerardo",
  lastName: "Estrada",
  isLoggedIn: false,
  cars: [ {id: 1, brand: "Toyota", color: "Blue"}, {id: 2, brand: "Nissan", color: "Red"}]
};

const UserContext = createContext<UIPerson | null>(null);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

const UserContextProvider = ({children}: UserProps) => {
  const [userInfo, dispatch] = useReducer( carReducer, initialState );

  const toggleLogin = () => {

  };

  const addUserCar = ( data: UICar ): void => {
    dispatch({
      type: ActionKind.add,
      payload: data,
    });
  }

  const updateUserCar = ( data:{ id: number, brand: string, color: string} ) => {
    dispatch({
      type: ActionKind.update,
      payload: data,
    });
  }

  const deleteUserCar = ( data:{ id: number, brand: string, color: string} ) => {
    dispatch({
      type: ActionKind.delete,
      payload: data,
    });
  }

  return (
    <UserContext.Provider value={{ ...userInfo, toggleLogin, addUserCar, updateUserCar, deleteUserCar }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext , useUserContext }
export default UserContextProvider;
