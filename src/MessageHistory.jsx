import * as React from "react";
import "./styles.css";
import axios from "axios";
import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Table, TBody, THead, Tr, Th, Td } from "@twilio-paste/table";
import { Spinner } from "@twilio-paste/spinner";

// Paste Design System Component Library Docs: https://paste.twilio.design/
// Example Usage CodeSandbox: https://codesandbox.io/s/dxx6q

// Part 1 Fetching data and rendering a message history table
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=2%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1

// Part 2 Client-side filtering based on message body
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=3%3A4&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=3%3A4&show-proto-sidebar=1

// Part 3 Fetching message row details in modal
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=2%3A3&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A3&show-proto-sidebar=1

// Part 4 Deleting a message from the history
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=3%3A5&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=3%3A5&show-proto-sidebar=1

// IMPORTANT:
// SEE src/mocks/handlers.js for the mock API endpoints to hit to fetch/modify the messages data

export class MessageHistory extends React.Component {
  // useEffect React Docs may be useful here: https://reactjs.org/docs/hooks-effect.html
  // Fetch API Docs may be useful here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  constructor() {
    super();
    this.state = {
      loader: true,
      result: [],
      searchInput: ""
    };
  }
  componentDidMount() {
    let url = "https://mockapi.twilio.com/messages";

    const apiCall = async () => {
      const res = await axios.get(url);
      console.log("res", res);
      this.setState({
        result: res.data.messages,
        loader: false
      });
      console.log("res", this.state.result);
    };
    apiCall();
  }
  handleChange = (e) => {
    //  e.preventDefault();
    this.setState({
      searchInput: e.target.value
    });

    if (e.target.value.length > 0) {
      var res = this.state.result.filter((rows) => {
        console.log(this.state.searchInput);
        return rows.body === e.target.value;
      });
    }
    this.setState({
      result: res
    });
  };
  render() {
    let dataTable;
    if (!this.state.loader) {
      dataTable = (
        <div>
          <div className="search-box">
            <label>Search: </label>
            <input type="text" name="search" onChange={this.handleChange} />
          </div>
          <Table>
            <THead>
              <Tr>
                <Th>SID</Th>
                <Th>To/From</Th>
                <Th>Body</Th>
                <Th>Status</Th>
              </Tr>
            </THead>
            <TBody>
              {this.state.result.map((row) => {
                return (
                  <Tr key={row.sid}>
                    <Td>
                      <Text as="p">{row.sid}</Text>
                    </Td>
                    <Td>
                      <Text as="p">{row.from}</Text>
                      <Text as="p">{row.to}</Text>
                    </Td>
                    <Td>
                      <Text as="p">{row.body}</Text>
                    </Td>
                    <Td>
                      <Text as="p">{row.status}</Text>
                    </Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        </div>
      );
    } else {
      dataTable = (
        <div className="load-spinner">
          <span className="loader">
            <Spinner title="" />
          </span>
        </div>
      );
    }

    return dataTable;
  }
}
