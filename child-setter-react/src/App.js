import React, { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';

function App(){

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/api/',
      );
      setDatatable({...datatable, rows: result.data})
    };
    fetchData();
  }, []);

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Owner',
        field: 'owner',
        width: 150,
      },
      {
        label: 'Description',
        field: 'desc',
        width: 200,
      },
      {
        label: 'id',
        field: 'id',
        sort: 'id',
        width: 100,
      }
    ],
    rows: [],
  });

  return <MDBDataTableV5 hover entriesOptions={[10]} entries={10} data={datatable} fullPagination />;
}

export default App;
