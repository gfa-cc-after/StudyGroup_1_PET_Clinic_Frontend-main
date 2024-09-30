import { render, fireEvent, waitFor, renderHook, act } from '@testing-library/react'
import { it, expect, describe, vi } from "vitest";
import axios from "axios";
import { ProfileDeletion } from "../../src/components/ProfileDeletion";
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../../src/hooks/store'

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

// Mock the axios library
vi.mock("axios");

// Mock the scrollIntoView function
const mockScrollIntoView = vi.fn();
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: mockScrollIntoView,
});

describe("ProfileDeletion component test", () => {

  it("Should display the confirmation dialog when the delete button is clicked", async () => {
    const { getByText } = renderWithRouter(<ProfileDeletion />);

    const deleteButton = getByText("Delete Profile");

    fireEvent.click(deleteButton);

    // Wait for the confirmation dialog to appear
    await waitFor(() =>
      getByText(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    );

    // Confirm that the confirmation dialog is displayed
    const confirmDialog = getByText("Are you sure you want to delete your profile? This action cannot be undone.")
    expect(confirmDialog).toBeInTheDocument();

    // Confirm that the scrollIntoView function is called when the confirmation dialog is shown
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  it('should send delete request to backend on delete click with the proper data and delete profile properly', async () => {
    const mockDeletion = vi.spyOn(axios, 'delete').mockResolvedValue({
      data: {
        message: "Your profile has been successfully deleted."
      }
    });

    // Mock implementation of useAuth hook
    const renderedHook = renderHook(() => useAuth())

    act(() => {
      renderedHook.result.current.setUser("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoiZCIsImlkIjoiMTAiLCJlbWFpbCI6InZAZC5jb20iLCJzdWIiOiJ2QGQuY29tIiwiaWF0IjoxNzI2NzgxMzkwLCJleHAiOjE3MjY3ODMxOTB9.a9T_YM0Sc1et1Qx7Uo8SZh2PLGdQwE6Wuhtt752zVU4")
    })

    const { getByText } = renderWithRouter(<ProfileDeletion />)

    const deleteButton = getByText('Delete Profile')
    fireEvent.click(deleteButton);

    const confirmButton = getByText('Yes, delete my profile')
    fireEvent.click(confirmButton)

    await waitFor(() => expect(mockDeletion).toHaveBeenCalledTimes(1))

    expect(mockDeletion).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/user/10"),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoiZCIsImlkIjoiMTAiLCJlbWFpbCI6InZAZC5jb20iLCJzdWIiOiJ2QGQuY29tIiwiaWF0IjoxNzI2NzgxMzkwLCJleHAiOjE3MjY3ODMxOTB9.a9T_YM0Sc1et1Qx7Uo8SZh2PLGdQwE6Wuhtt752zVU4",
        }
      }
    )

    // Confirm that the success message is present in the response body
    expect(mockDeletion.mock.results[0].value.data.message).toBe(
      "Your profile has been successfully deleted."
    );
  })

  it('should rerender ProfilePage on cancel click', async () => {
    const { getByText, queryByText } = renderWithRouter(<ProfileDeletion />)

    const deleteButton = getByText('Delete Profile')
    fireEvent.click(deleteButton);

    // Wait for the confirmation dialog to appear
    await waitFor(() =>
      getByText(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    );

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    // Wait for the confirmation dialog to disappear
    await waitFor(() =>
      expect(queryByText("Are you sure you want to delete your profile? This action cannot be undone.")).toBeNull()
    );

    // Confirm that the cancel button is not present anymore
    const cancelButtonAfterCancel = queryByText("Cancel");
    expect(cancelButtonAfterCancel).toBeNull();
  })
});
