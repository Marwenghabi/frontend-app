import {
  Button,
   Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
    direction="column"
    w="100%"
    px="0px"
    overflowX={{ sm: "scroll", lg: "hidden" }}
  >
    <Flex px="25px" justify="space-between" align="center">
      <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
      La liste des numéros de Ooredoo
      </Text>
      {/* <Menu /> */}
    </Flex>
    <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
      <Thead>
        {headerGroups.map((headerGroup, index) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                pe="10px"
                key={index}
                borderColor={borderColor}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  {column.render("Header")}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                let data = "";
                if (cell.column.Header === "NAME") {
                  data = (
                    <Flex align="center">
                      <Checkbox
                        defaultChecked={cell.value[1]}
                        colorScheme="brandScheme"
                        me="10px"
                      />
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value[0]}
                      </Text>
                    </Flex>
                  );
                } else if (cell.column.Header === "MESSAGE") {
                  data = (
                    <Flex align="center">
                      <Text
                        me="10px"
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    </Flex>
                  );
                } else if (cell.column.Header === "NUMBER") {
                  data = (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                  );
                } else if (cell.column.Header === "DATE") {
                  data = (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                  );
                }
                return (
                  <Td
                    {...cell.getCellProps()}
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    {data}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
    {/*
      Pagination Controls
    */}
    <Flex justify="space-between" px="25px" mt="24px">
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous
      </Button>
      <Flex align="center" fontSize="12px" color="gray.400">
        <Text mr="1">Page</Text>
        <Text fontWeight="bold">{pageIndex + 1}</Text>
        <Text mx="1">of</Text>
        <Text fontWeight="bold">{tableInstance.pageCount}</Text>
      </Flex>
      <Button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </Button>
    </Flex>
    {/* Rows per page */}
    <Flex align="center" mt="16px">
      <Text fontSize="12px" fontWeight="bold" me="4px">
        Rows per page:
      </Text>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </Flex>
  </Card>
);
}
