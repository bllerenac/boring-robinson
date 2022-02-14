import ThemeContextProvider, { useThemeContext } from "./Context/ThemeToogle";
import UserContextProvider, { useUserContext } from "./Context/UserInfo";
import SimpleCard from "./Components/SimpleCard";
import "./styles.css";

const ThemeSwitcher = () => {
  const { toggleTheme } = useThemeContext();

  return <button onClick={toggleTheme}>Change theme</button>;
};

const MainLayout = () => {
  const { isLightMode, light, dark } = useThemeContext();
  const { name } = useUserContext();

  const theme = isLightMode ? light : dark;

  return (
    <div className="main" style={{ background: theme.bg }}>
      <div style={{ color: theme.text }}>{`Hello ${name}`}</div>
    </div>
  );
};

const CarRegisterForm = () => {
  const { cars, addUserCar } = useUserContext();

  const AddCar = (event: React.FormEvent) => {
    event.preventDefault()
    let newId = 0
    cars.forEach( car => {
      if( newId <= car.id ){
          newId = car.id + 1
        }
    })
    // I try Get the Form Values 12 (add 1 for 1 try)
    const target = event.target as typeof event.target & {
      brand: { value: string };
      color: { value: string };
    };
    addUserCar?.({id: newId, brand: target.brand.value, color: target.color.value})
  }

  return (
    <div>
      <form id="car_form" onSubmit={AddCar} >
        <h2>Car Register</h2>
        <label>
          Brand:
          <input name="brand" placeholder="Username" />
        </label>
        <label>
          Color:
          <input name="color" placeholder="Username"/>
        </label>
        <button type="submit">
          Save
        </button>
      </form>
      <div className="car_register">
        {cars.map(car => (
          <SimpleCard
            carData={car}
            key={car.id}/>
        ))}
      </div>
    </div>
  )
}

const DemoOne = () => {
  return (
    <div>
      <ThemeContextProvider>
        <ThemeSwitcher />
        <UserContextProvider>
          <MainLayout />
          <CarRegisterForm />
        </UserContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default DemoOne;