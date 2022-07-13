import * as React from "react";
import {
  render,
  within,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageHistory } from "./MessageHistory";
import { messagesDB } from "./mocks/handlers";

const { messages } = messagesDB;

describe("MessageHistory", () => {
  it("should fetch data and render table", async () => {
    const { findByText, getByText } = render(<MessageHistory />);

    // Validate table header row columns
    const sidColumn = await findByText("SID");
    const tableHeaderRow = within(sidColumn.closest("tr"));
    expect(tableHeaderRow.getByText("To/From")).toBeVisible();
    expect(tableHeaderRow.getByText("Body")).toBeVisible();
    expect(tableHeaderRow.getByText("Status")).toBeVisible();
    expect(tableHeaderRow.getByText("Actions")).toBeVisible();

    // Validate table body rows
    messages.forEach((message) => {
      const tableBodyRow = within(getByText(message.sid).closest("tr"));
      expect(tableBodyRow.getByText(message.sid)).toBeVisible();
      expect(
        tableBodyRow.getByText(message.to, { exact: false })
      ).toBeVisible();
      expect(
        tableBodyRow.getByText(message.from, { exact: false })
      ).toBeVisible();
      expect(tableBodyRow.getByText(message.body)).toBeVisible();
      expect(tableBodyRow.getByText(message.status)).toBeVisible();
    });
  });

  it("should be able to filter by message body", async () => {
    const { findByText, getByText, getByLabelText, queryByText } = render(
      <MessageHistory />
    );

    // Validate table shows up with initial data on first load
    const sidColumn = await findByText("SID");
    const tableHeaderRow = within(sidColumn.closest("tr"));
    expect(tableHeaderRow.getByText("To/From")).toBeVisible();
    expect(tableHeaderRow.getByText("Body")).toBeVisible();
    expect(tableHeaderRow.getByText("Status")).toBeVisible();
    expect(tableHeaderRow.getByText("Actions")).toBeVisible();

    messages.forEach((message) => {
      const tableBodyRow = within(getByText(message.sid).closest("tr"));
      expect(tableBodyRow.getByText(message.sid)).toBeVisible();
      expect(
        tableBodyRow.getByText(message.to, { exact: false })
      ).toBeVisible();
      expect(
        tableBodyRow.getByText(message.from, { exact: false })
      ).toBeVisible();
      expect(tableBodyRow.getByText(message.body)).toBeVisible();
      expect(tableBodyRow.getByText(message.status)).toBeVisible();
    });

    // Filter by message body
    expect(getByLabelText("Filter by Body")).toBeVisible();
    const [filteredMessage, ...restOfMessages] = messages;

    // Type in Respond to filter by and match only the first row
    userEvent.type(filteredMessage.body.substr(0, 7));

    // Validate the rest of the messages are no longer showing
    restOfMessages.forEach(async (message) => {
      await waitForElementToBeRemoved(queryByText(message.sid));
    });

    // Validate only filtered message row is showing
    const filteredMessageContent = await findByText(filteredMessage.sid);
    const filteredMessageRow = within(filteredMessageContent.closest("tr"));
    expect(filteredMessageRow.getByText(filteredMessage.sid)).toBeVisible();
    expect(
      filteredMessageRow.getByText(filteredMessage.to, { exact: false })
    ).toBeVisible();
    expect(
      filteredMessageRow.getByText(filteredMessage.from, { exact: false })
    ).toBeVisible();
    expect(filteredMessageRow.getByText(filteredMessage.body)).toBeVisible();
    expect(filteredMessageRow.getByText(filteredMessage.status)).toBeVisible();
  });
});
