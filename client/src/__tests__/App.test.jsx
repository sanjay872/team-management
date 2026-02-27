import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { within } from "@testing-library/react";

describe("Team Management App", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  }); 

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMember = {
    id: 1,
    fullName: "Sanjay Sakthivel",
    email: "sanjay@test.com",
    function: "Engineering",
    role: "Admin",
  };

  test("displays initial empty state", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<App />);

    expect(
      await screen.findByText(/Add your first team member/i)
    ).toBeInTheDocument();
  });

  test("displays search empty state", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockMember],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByText("Sanjay Sakthivel");

    await user.type(
      screen.getByPlaceholderText(/Search by Name/i),
      "Sanjay"
    );

    expect(
      await screen.findByText(/No team members match your search/i)
    ).toBeInTheDocument();
  });

  test("displays filter empty state", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockMember],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByText("Sanjay Sakthivel");

    await user.click(screen.getByRole("button", { name: /Function/i }));
    await user.click(screen.getByText("Marketing & Sales"));

    expect(
      await screen.findByText(/No team members match the selected filters/i)
    ).toBeInTheDocument();
  });

  test("clicking Add Member opens modal", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Add Member/i }));

    expect(
      screen.getByText(/Add Team Member/i)
    ).toBeInTheDocument();
  });

  test("invalid email shows validation error", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Add Member/i }));

    await user.type(
      screen.getByPlaceholderText(/name@company.com/i),
      "invalid-email"
    );

    expect(
      screen.getByText(/Please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  test("successful add closes modal and shows toast", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMember,
      });

    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Add Member/i }));

   await user.type(
    screen.getByLabelText(/Name/i),
    "Sanjay Sakthivel"
  );
    await user.type(
      screen.getByPlaceholderText(/name@company.com/i),
      "sanjay@test.com"
    );

    await user.click(screen.getByText(/Select Function/i));
    await user.click(screen.getByText("Engineering"));

    await user.click(screen.getByText(/Select Role/i));
    await user.click(screen.getByText("Admin"));

    await user.click(screen.getByRole("button", { name: /Add to Team/i }));

    expect(
      await screen.findByText(/New Member Added/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Sanjay Sakthivel")).toBeInTheDocument();
  });

  test("clicking Edit opens dialog with prefilled values", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockMember],
    });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByText("Sanjay Sakthivel");

    await user.click(screen.getByAltText("trigger"));
    await user.click(screen.getByText("Edit"));

    expect(screen.getByDisplayValue("Sanjay Sakthivel")).toBeInTheDocument();
  });

  test("successful edit shows toast and updates table row", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockMember],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockMember,
          fullName: "Sanjay Updated",
        }),
      });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByText("Sanjay Sakthivel");

    await user.click(screen.getByAltText("trigger"));
    await user.click(screen.getByText("Edit"));

    await user.clear(screen.getByDisplayValue("Sanjay Sakthivel"));
    await user.type(
      screen.getByPlaceholderText(/Full Name/i),
      "Sanjay Updated"
    );

    await user.click(screen.getByRole("button", { name: /Save Changes/i }));

    expect(
      await screen.findByText(/Changes Saved/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Sanjay Updated")).toBeInTheDocument();
  });

  test("delete flow removes member and shows toast", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockMember],
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    render(<App />);
    const user = userEvent.setup();

    await screen.findByText("Sanjay Sakthivel");

    await user.click(screen.getByAltText("trigger"));
    await user.click(screen.getByText("Delete"));

    expect(
      screen.getByText(/Delete Member/i)
    ).toBeInTheDocument();

   const dialog = screen.getByText(/Delete Member/i).closest("div");

    await user.click(
      within(dialog).getByRole("button", { name: /^Delete$/ })
    );

    await waitFor(() =>
      expect(screen.queryByText("Sanjay Sakthivel")).not.toBeInTheDocument()
    );

    expect(
      await screen.findByText(/Member Deleted/i)
    ).toBeInTheDocument();
  });

  test("shows error modal when fetch fails", async () => {
  // Mock failed fetch
  globalThis.fetch.mockResolvedValueOnce({
    ok: false,
  });

  render(<App />);

  // Error modal should appear
  expect(
    await screen.findByText(/Something Went Wrong/i)
  ).toBeInTheDocument();

  // Verify error description is visible
  expect(
    screen.getByText(/unexpected issue/i)
  ).toBeInTheDocument();

  // Verify Back to Home button exists
  expect(
    screen.getByRole("button", { name: /Back to Home/i })
  ).toBeInTheDocument();
});

});