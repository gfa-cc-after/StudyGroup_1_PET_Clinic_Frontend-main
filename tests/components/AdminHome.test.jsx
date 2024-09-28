import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { AdminRoot } from "../../src/components/admin/AdminRoot"

describe('admin root test', () => {
    it('should render the admin root', async () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <AdminRoot />
            </BrowserRouter>
        );

        const main = getByTestId('admin-home');
        expect(main).toBeInTheDocument();

        const content = getByTestId('admin-content');
        expect(content).toBeInTheDocument();
    })

});