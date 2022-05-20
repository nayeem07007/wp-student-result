import React, {useState, Fragment} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Container from "react-bootstrap/esm/Container";

const productsGenerator = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
  }
  return items;
};

const products = productsGenerator(100);



const ResultTable = () => {

  const [columns, setColumns] = useState([
    {
      dataField: "id",
      text: "Product ID",
      sort: true,
    },
  ]);

  return (
    <Fragment>
      <Container fluid="md">
        <div className="table">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={products}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default ResultTable;
