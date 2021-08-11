import React, { useMemo ,useEffect,useState} from "react";
import "./BankSection.scss";
import EditTitle from "../../../component/UI/EditTitle/EditTitle";
import { useTable } from "react-table";
import Table from "./Table/Table";
import axios from 'axios'
const BankSection = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = useMemo(() => [
    {
      Header: "TV Show",
      columns: [
        {
          Header: "Name",
          accessor: "show.name",
        },
        {
          Header: "Type",
          accessor: "show.type",
        },
        {
          Header: "Language",
          accessor: "show.language",
        },
        {
          Header: "Official Site",
          accessor: "show.officialSite",
          Cell: ({ cell: { value } }) =>
            value ? <a href={value}>{value}</a> : "-",
        },
        {
          Header: "Rating",
          accessor: "show.rating.average",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Status",
          accessor: "show.status",
        },
        {
          Header: "Premiered",
          accessor: "show.premiered",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Time",
          accessor: "show.schedule.time",
          Cell: ({ cell: { value } }) => value || "-",
        },
      ],
    },
  ]);
  return (
    <div className="BankSectionContainer">
      {/* <div className="BankHeaderContainer">
        <EditTitle />
      </div> */}
      <div className="BankTableContainer">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};
export default BankSection;
