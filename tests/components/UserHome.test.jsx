import React from "react";
import { render, renderHook, act } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import { BrowserRouter } from 'react-router-dom'
import UserHome from "../../src/components/UserHome";
import usePets from "../../src/hooks/usePets";
import { useAuth } from '../../src/hooks/store'

const mockPetData = [
  {
    petName: "Pet 1",
    petBreed: "Breed 1",
    petSex: "Male",
    petBirthDate: "2022-01-01",
    lastCheckUp: "2022-02-01",
    nextCheckUp: "2022-03-01",
    specialCondition: "None",
  },
  {
    petName: "Pet 2",
    petBreed: "Breed 2",
    petSex: "Female",
    petBirthDate: "2022-02-01",
    lastCheckUp: "2022-03-01",
    nextCheckUp: "2022-04-01",
    specialCondition: "Diabetes",
  },
];

// vi.mock(usePets, () => ({
//   usePetData: () => ({
//     setPets: mockPetData,
//   }),
// }));

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

describe("UserHome component test", () => {
  it("renders without crashing", () => {
    renderWithRouter(<UserHome />)
  })

  it("renders all fields correctly", () => {
    // Mock usePets hook to return pet data
    // const { result } = renderHook(() => usePetData());
    
    // Mock implementation of useAuth hook
    const renderedAuthHook = renderHook(() => useAuth())
    
    
    act(() => {
      renderedAuthHook.result.current.setUser('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoidGVzdFVzZXIiLCJpZCI6IjIiLCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJzdWIiOiJ0ZXN0QHVzZXIuY29tIiwiaWF0IjoxNzI1OTE3NTE1LCJleHAiOjE3MjU5MTkzMTV9.GK8y9yFzuNhUzDU9t9csJKCwdrPab-BzP6yyoMfanLI')
    })    
    
    const { getByTestId, getAllByTestId } = renderWithRouter(<UserHome />);
    
      // Check welcome message
      const welcomeElement = getByTestId("welcomeId");
      expect(welcomeElement).toBeInTheDocument();
      expect(welcomeElement).toHaveTextContent("Welcome testUser!");
    
      // expect(result.current.pets).toEqual(mockPetData);
  
      // Check pet table
      // const petTable = getByTestId("pet-table");
      // const petRows = getByTestId("pet-row");
      // expect(petTable).toBeInTheDocument();
      // expect(petRows).toBeInTheDocument();
      // expect(petRows.length).toBe(mockPetData.length)
      
      // Check each pet row
      // mockPetData.forEach((pet, index) => {
      //   const petRow = petRows[index];
      //   expect(petRow).toBeInTheDocument();
      //   expect(petRow).toHaveTextContent(pet.petName);
      //   expect(petRow).toHaveTextContent(pet.petBreed);
      //   expect(petRow).toHaveTextContent(pet.petSex);
      //   expect(petRow).toHaveTextContent(pet.petBirthDate);
      //   expect(petRow).toHaveTextContent(pet.lastCheckUp);
      //   expect(petRow).toHaveTextContent(pet.nextCheckUp);
      //   expect(petRow).toHaveTextContent(pet.specialCondition);
      // });
  })
});
