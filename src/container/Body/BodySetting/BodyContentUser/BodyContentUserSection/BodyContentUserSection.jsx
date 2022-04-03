import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomSelect from "../../../../../component/UI/CustomSelect/CustomSelect";
import { baseUrl } from "../../../../../constants/Config";
import { useTheme } from "../../../../../styles/ThemeProvider";
import "./BodyContentUserSection.scss";
import Search from "../../../../../component/UI/Search/Search";
import DynamicItem from "./DynamicItem/DynamicItem";
import StyledButton from "../../../../../component/UI/Button/StyledButton";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../../../component/UI/Modal/Modal";
import AddUserModalContent from "./AddUserModalContent/AddUserModalContent";
import { IoMdCloseCircle } from "react-icons/io";
import ErrorDialog from "../../../../../component/UI/Error/ErrorDialog";
import doubleRingLoading from "../../../../../assets/images/DoubleRing.svg"
import SkeletonUserRow from "../../../../../component/Skeletons/SkeletonUserRow";
import * as holdingActions from "../../../../../store/actions/holdingDetail";

const BodyContentUserSection = () => {
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [selectedLabel, setSelectedLabel] = useState({
    name: "",
    id: "",
  });
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [labels, setLabels] = useState(null);

  const order = [
    {
      title: "نام کاربری",
      path: ["user", "username"],
      componentNumber: 2,
    },
    {
      title: "شماره همراه",
      path: ["user", "phone"],
      componentNumber: 4,
    },
    {
      title: "برچسب",
      path: ["label", "name"],
      componentNumber: 3,
    },
  ];

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const { token, userId } = useSelector((state) => state.auth);

  const { selectedHolding, employees } = useSelector((state) => state.holdingDetail);

  const dispatch = useDispatch();

  const setEmployees = (employees) => {
    dispatch(holdingActions.setEmployees(employees));
  };
  const removeEmployee = (userId) => {
    dispatch(holdingActions.removeEmployee(userId));
  };
  const onSelectLabelChangeHandler = (e) => {
    if (e.target.value === '') {
      setSelectedLabel({
        name: '',
        id: '',
      });
      return;
    }
    const labelFinded = labels.find(
      (item) => item.label.name === e.target.value
    );
    setSelectedLabel({
      name: labelFinded.label.name,
      id: labelFinded.label._id,
    });
  };

  const onChangeSearchInput = (e) => {
    setUserSearch(e.target.value);
  };
  const onChangeLabelItem = async (e, userId) => {
    let selected = e.target.value;
    let findedLabel = labels.find((item) => item.label.name === selected);
    const paylaod = {
      holdingId: selectedHolding.holdingId,
      userId: userId,
      labelId: findedLabel.label._id,
    };
    setError(null)
    try {
      const resultEditedLabel = await axios.post(
        `${baseUrl}api/change_label_employee`,
        paylaod,
        { headers: { "auth-token": token } }
      );
      if (resultEditedLabel.data.success) {
        let updatedEmployees = employees.map((employee) => {
          if (employee.user._id === userId)
            return {
              ...employee,
              label: {
                _id: findedLabel.label._id,
                name: selected,
              },
            };
          else return employee;
        });
        setEmployees({ employees: updatedEmployees });
        setError(<ErrorDialog success={true} onClose={setError}>{resultEditedLabel.data.result.message}</ErrorDialog>)
      } else {
        setError(<ErrorDialog onClose={setError}>{resultEditedLabel.data.result.message}</ErrorDialog>)
      }
    } catch (error) {
      setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
    }
  };
  const removeUserHandler = async (userId) => {
    setRemoveLoading(true)
    const paylaod = {
      holdingId: selectedHolding.holdingId,
      userId: userId,
    };
    setError(null)
    try {
      const resultRemoveUser = await axios.post(
        `${baseUrl}api/remove_employee`,
        paylaod,
        { headers: { "auth-token": token } }
      );
      if (resultRemoveUser.data.success) {
        removeEmployee({ userId })
        setError(<ErrorDialog success={true} onClose={setError}>{resultRemoveUser.data.result.message}</ErrorDialog>)
      }
      else {
        setError(<ErrorDialog onClose={setError}>{resultRemoveUser.data.result.message}</ErrorDialog>)
      }
    } catch (error) {
      setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
    }
    setRemoveLoading(false)
  };
  const onClickAddUserHandler = (e) => {
    setAddUserOpen(true);
  };
  const closeModal = () => {
    setAddUserOpen(false);
  };

  useEffect(() => {
    if (!selectedHolding) return;
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true)
        const resultFetchingLabels = await axios.post(
          `${baseUrl}api/get_holding_labels`,
          { holdingId: selectedHolding.holdingId },
          { headers: { "auth-token": token } }
        );
        setLabels([...resultFetchingLabels.data.labels]);
        const resultFetchingUsers = await axios.post(
          `${baseUrl}api/get_employees`,
          { id: selectedHolding.holdingId },
          { headers: { "auth-token": token } }
        );
        if (resultFetchingUsers.data.success)
          setEmployees({ employees: resultFetchingUsers.data.result.employees })
        else
          setError(<ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>)
        setLoading(false)
        controller = null
      } catch (e) {
        setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
      }
    })();
    return () => controller?.abort();
  }, [selectedHolding]);


  useEffect(() => {
    if (!employees) return;
    let updatedEmployees = [...employees.filter(item => item.user._id !== userId && !item.user.is_fekrafzar)]
    if (selectedLabel.id !== '') {
      updatedEmployees = updatedEmployees.filter(item => item.label._id === selectedLabel.id)
    }
    if (userSearch) {
      updatedEmployees = updatedEmployees.filter(item => new RegExp("^" + userSearch, 'i').test(item.user.username))
    }
    setFilteredEmployees(updatedEmployees)
  }, [employees, userSearch, selectedLabel])

  return (
    <div className="body-content-user-section-container">
      {error}
      <Modal show={addUserOpen} modalClosed={closeModal}
        style={{ width: "fit-content" }}>
        <AddUserModalContent close={closeModal} />
      </Modal>
      <div className="body-content-user-filter-section">
        <div className="body-content-user-filter-section-search">
          <p>{stringFa.username}</p>
          <Search
            value={userSearch}
            onChange={onChangeSearchInput}
            config={{ placeholder: stringFa.search, type: "text" }}
            iconStyle={{
              fontSize: "1rem",
            }}
            containerStyle={{
              width: "20rem",
              padding: "0",
              marginTop: "1rem",
            }}
            inputStyle={{
              width: "100%",
              margin: "0",
              fontSize: "1rem",
              padding: ".2rem .4rem ",
            }}
          />
        </div>
        <CustomSelect
          title={stringFa.label}
          selectedItem={selectedLabel.name}
          items={labels && labels}
          onSelectChangeHandler={onSelectLabelChangeHandler}
          style={{ marginBottom: "1rem", width: "15rem" }}
          keyField="_id"
          valueField="name"
          path="label"
          needDefaultOption={true}
        />
        <div className="button-add-container">
          <StyledButton
            onClick={onClickAddUserHandler}
            ButtonStyle={{
              padding: "0",
            }}
            hover={theme.primary_variant}
            backgroundColor={theme.primary}
          >
            <div className="button-text" style={{ color: theme.on_primary }}>
              {stringFa.add_user}
              <AiOutlinePlus style={{ marginLeft: ".4rem" }} />
            </div>
          </StyledButton>
        </div>
      </div>
      <p style={{ fontSize: "14px" }}>
        تعداد نتایج : {employees ? employees.length : 0}
      </p>
      <div className="table-container">
        <table
          className="table-permissions"
          style={
            {
              // boxShadow: `0 0 20px ${theme.hover}`
            }
          }
        >
          <thead>
            <tr
              className="tabe-permissions-thead-tr"
              style={{
                backgroundColor: "transparent",
                color: theme.on_background,
              }}
            >
              {order.map((item) => (
                <th style={{ fontWeight: "100" }} key={item.title}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ?
              [...new Array(2)].map((v, index) => (
                <tr key={index}>
                  {[...new Array(3)].map((item, i) => (
                    <td key={i}>
                      <SkeletonUserRow index={i} />
                    </td>
                  ))}
                </tr>))
              :
              (
                filteredEmployees.length > 0 ?
                  filteredEmployees.map((v) => (
                    <tr key={v.user._id}>
                      {order.map((item) => (
                        <td key={item.title}>
                          <DynamicItem
                            config={item}
                            data={v}
                            labels={labels}
                            onChange={onChangeLabelItem}
                          />
                        </td>
                      ))}
                      <div className="remove-user-container">
                        {removeLoading ?
                          <img src={doubleRingLoading} alt="double-ring-loading-gif" />
                          :
                          <IoMdCloseCircle
                            className="remove-icon"
                            color={theme.error}
                            onClick={() => removeUserHandler(v.user._id)} />
                        }
                      </div>
                    </tr>
                  )) :
                  <div style={{ color: theme.on_primary, marginTop: "1rem" }}>
                    <p>{stringFa.no_user_exist}</p>
                  </div>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BodyContentUserSection;