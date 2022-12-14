import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/system/Box";
import React, { useState, useEffect } from "react";
import { DateTime as dt } from "luxon";
import CustomerTableRow from "./components/CustomerTableRow";
import FilterModal from "./components/FilterModal";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { deleteCustomer } from "../../utils/fetchHelpers";
import { formatForDisplay } from "../../utils/formatPhoneNumber";
import useStyles from "../../hooks/useStyles";
import constants from "../../constants/constants";

const ROWS_PER_PAGE = 8;
const INITIAL_FILTER = { text: "", type: "name" };

const toDateTimeFormat = (ms) => dt.fromMillis(ms).toFormat("D T");

const buildRows = (customers, page) => {
  const pageCustomers = customers.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );
  const formattedCustomers = pageCustomers.map(
    ({ name, phone, address, id }) => {
      const fullName = name.first + " " + name.last;
      const fullAddress = address.street + ", " + address.secondary;
      const orderedLast = "n/a";
      const phoneNumber = formatForDisplay(phone);

      return { fullName, phoneNumber, fullAddress, id, orderedLast };
    }
  );
  return formattedCustomers;
};

export default function Customers(props) {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [isDescending, setIsDescending] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  const styles = useStyles().customers;

  const isLastPage = page >= Math.ceil(customerList.length / ROWS_PER_PAGE - 1);

  const handleNextPage = () => setPage(() => page + 1);
  const handlePrevPage = () => setPage(() => page - 1);

  const handleFilter = () => {
    setPage(0);
    setIsOpen(false);
  };

  const resetFilter = () => setFilter(INITIAL_FILTER);

  const handleDeleteCustomer = (id) => {
    deleteCustomer(id);
    const newCustomerList = customerList.filter(
      (customer) => id !== customer.id
    );
    setCustomerList(newCustomerList);
    setIsOpen(false);
  };

  const getCustomersToDisplay = () => {
    const filterCallback = (customer) => {
      let data;
      const { firstName, lastName } = customer.name;
      switch (filter.type) {
        case "name":
          data = firstName + " " + lastName;
          break;
        case "tel":
          data = customer.phoneNumber;
          break;
        case "address":
          data =
            customer.address.streetAddress +
            ", " +
            customer.address.secondaryAddress;
          break;
        default:
          data = firstName + " " + lastName;
          break;
      }
      return data.toLowerCase().includes(filter.text.toLowerCase());
    };
    return customerList.filter(filterCallback);
  };
  const sortedCustomersByName = getCustomersToDisplay().sort((a, b) => {
    if (a.name.lastName > b.name.lastName === isDescending) return -1;
    else if (a.name.lastName < b.name.lastName === isDescending) return 1;
    return 0;
  });
  const rows = buildRows(sortedCustomersByName, page);

  useEffect(() => {
    const ssData = sessionStorage.getItem("customers");
    if (ssData !== null) return setCustomerList(JSON.parse(ssData));
    fetch(constants.APP_DATA_URL + "/customers")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("customers", JSON.stringify(data));
        setCustomerList(data);
      })
      .catch(console.error);
  }, []);

  console.log("customerList", customerList);

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.wrapper}>
          <TableContainer sx={styles.table}>
            <Table>
              <TableHead>
                <TableRow sx={styles.row}>
                  <TableCell
                    sx={styles.cell}
                    onClick={() => setIsDescending(() => !isDescending)}
                  >
                    {"Name"}
                    {isDescending ? (
                      <ArrowDownwardIcon sx={styles.arrowDown} />
                    ) : (
                      <ArrowUpwardIcon sx={styles.arrowUp} />
                    )}
                  </TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Ordered Last</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={styles.body}>
                {rows &&
                  rows.map((row) => (
                    <CustomerTableRow
                      customer={row}
                      key={row.id}
                      onDeleteCustomer={handleDeleteCustomer}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={styles.buttons}>
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              FILTER
            </Button>
            {filter.text && (
              <Button variant="contained" onClick={resetFilter}>
                CLEAR FILTER
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ ml: "auto" }}
              disabled={page === 0}
              onClick={handlePrevPage}
            >
              PREV
            </Button>
            <Button
              variant="contained"
              disabled={isLastPage}
              onClick={handleNextPage}
            >
              NEXT
            </Button>
          </Box>
        </Box>
      </Box>
      <FilterModal
        filter={filter}
        setFilter={setFilter}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleFilter={handleFilter}
      />
    </>
  );
}
