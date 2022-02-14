import { useState } from "react";
import { useUserContext } from "../../Context/UserInfo";
import './styles.css'

interface UICar {id: number, brand: string,  color: string}
interface CardProps {
  carData: UICar
}

const SimpleCard = ({ carData }: CardProps) => {
  const { deleteUserCar, updateUserCar } = useUserContext();
  const [edit, setEdit] = useState(true)
  const [brandValue, setBrandValue] = useState(carData.brand)
  const [colorValue, setColorValue] = useState(carData.color)

  //Functions to Update and Delete
  const DeleteCar = (data: UICar) => {
    deleteUserCar?.(data)
  }
  // One psible Error The order of Input Change ( Action Click Button Edit 'Search the problem')
  const UpdateCar = () => {
    setEdit(!edit)
    if(edit){
      updateUserCar?.({ id: carData.id, brand: brandValue, color: colorValue})
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.id === `edit_brand-${carData.id}`){
      setBrandValue(event.target.value)
    }else if(event.target.id === `edit_color-${carData.id}`){
      setColorValue(event.target.value)
    }
  }
  return(
    <div>
        <input value={brandValue} placeholder="Car Brand" disabled={edit} name='brand' id={`edit_brand-${carData.id}`} onChange={handleInputChange}/>
        <input value={colorValue} placeholder="Car Color" disabled={edit} name='color' id={`edit_color-${carData.id}`} onChange={handleInputChange}/>
      <button onClick={() => DeleteCar(carData)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
      <button onClick={() => UpdateCar()} >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
    </div>
  )
}

export default SimpleCard