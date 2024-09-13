import React from "react";
import { render, renderHook, act, waitFor } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import { BrowserRouter } from 'react-router-dom'
import UserHome from "../../src/components/UserHome";

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
      pets: [...mockPetData]
    })
  }
})

import * as usePets from "../../src/hooks/usePets";

vi.mock("../../src/hooks/store", () => ({
  useAuth: () => ({
    token: "testToken",
    user: {
      displayname: "testUser",
    },
  }),
}));

import { useAuth } from '../../src/hooks/store'

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
    const { getByTestId, getAllByTestId } = renderWithRouter(<UserHome />);

    waitFor(() => {
      // Check welcome message
      const welcomeElement = getByTestId("welcomeId");
      expect(welcomeElement).toBeInTheDocument();
      expect(welcomeElement).toHaveTextContent("Welcome testUser!");

      expect(result.current.pets).toEqual(mockPetData);

      // Check pet table
      const petTable = getByTestId("pet-table");
      const petRows = getAllByTestId("pet-row");
      expect(petTable).toBeInTheDocument();
      expect(petRows).toBeInTheDocument();
      expect(petRows.length).toHaveLength(2); // Assuming there are 2 pets in the mock data

      // Check pet table headers
      const petTableHeaders = getAllByTestId("pet-table-header");
      expect(petTableHeaders).toHaveLength(8); // Assuming there are 8 headers

      // Check pet table data
      const petTableData = getAllByTestId("pet-table-data");
      expect(petTableData).toHaveLength(16); // Assuming there are 2 pets and 8 headers

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
    })
  })
});
