import React from "react";
import { render, waitFor } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import { BrowserRouter } from 'react-router-dom'
import { UserHome } from "../../src/components/UserHome";
import axios from 'axios';

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


vi.mock("../../src/hooks/usePets", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    usePets: () => ({
      pets: mockPetData
    })
  }
})

vi.mock("../../src/hooks/store", () => ({
  useAuth: () => ({
    token: "testToken",
    user: {
      displayName: "testUser",
    },
  }),
}));

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

vi.mock('axios')

describe("UserHome component test", () => {

  it("renders all fields correctly", async() => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { pets: mockPetData }});

    const { getByTestId, getAllByTestId } = renderWithRouter(<UserHome />);
    
    await waitFor(() => {
      // Check welcome message
      const welcomeElement = getByTestId("welcomeId");
      expect(welcomeElement).toBeInTheDocument();
      expect(welcomeElement).toHaveTextContent("Welcome testUser!");

      // Check pet table
      const petTable = getByTestId("pet-table");
      const petRows = getAllByTestId("pet-row");
      expect(petTable).toBeInTheDocument();
      expect(petRows).toHaveLength(2); // Assuming there are 2 pets in the mock data

      // Check pet table headers
      const petTableHeaders = getAllByTestId("pet-table-header");
      expect(petTableHeaders).toHaveLength(1); // Assuming there are 1 row

      // Check each pet row
      mockPetData.forEach((pet, index) => {
        const petRow = petRows[index];
        expect(petRow).toBeInTheDocument();
        expect(petRow).toHaveTextContent(pet.petName);
        expect(petRow).toHaveTextContent(pet.petBreed);
        expect(petRow).toHaveTextContent(pet.petBirthDate);
        expect(petRow).toHaveTextContent(pet.lastCheckUp);
        expect(petRow).toHaveTextContent(pet.nextCheckUp);
        expect(petRow).toHaveTextContent(pet.specialCondition);
      })
    })
  })
});
