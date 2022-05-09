import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  user: null,
  error: null,
  socket: null,
  loading: false,
  authRedirectPath: null,
  label: {
    customization: false,
    users: false,
    permissions: false,
    chart: false,
    name: "",
    _id: "",
  },
  checked: false,
  holdingAccess: [],
  state: 0,
  parentsCharts: [],
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const setUserData = (state, action) => {
  return updateObject(state, {
    user: action.user,
  });
};
const setSocket = (state, action) => {
  return updateObject(state, { socket: action.socket });
};
const setUserLabel = (state, action) => {
  return updateObject(state, {
    label: action.label,
  });
};
const setHoldingAccess = (state, action) => {
  const { holdingAccess, editedState } = action.payload;
  return updateObject(state, {
    holdingAccess,
    state: editedState,
  });
};
const setParentsCharts = (state, action) => {
  return updateObject(state, {
    parentsCharts: action.parentsCharts,
  });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
    authRedirectPath: "/",
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const setChecked = (state, action) => {
  return updateObject(state, { checked: action.checked });
};

const changeStructure = (state, action) => {
  const { parents, value, mode } = action.payload;
  let updatedHoldingAccess = [...state.holdingAccess];
  let updatedParentsCharts = [...state.parentsCharts];
  if (state.state === 1) {
    if (parents.length === 0) {
      if (mode === "add") {
        updatedHoldingAccess.push(value);
        updatedParentsCharts.push(value);
      } else {
        updatedHoldingAccess = updatedHoldingAccess.filter(
          (item) => item._id !== value
        );
        updatedParentsCharts = updatedParentsCharts.filter(
          (item) => item._id !== value
        );
      }
    } else if (parents.length === 1) {
      if (mode === "add") {
        let calValue = { ...value.data };
        calValue.active_backups = calValue.active_backups.map((item) => {
          return {
            ...value.acb,
          };
        });
        const update = (data, id, needed = false) => {
          let updatedCompanyIndex = data.findIndex((item) => item._id === id);
          if (updatedCompanyIndex < 0) return;
          if (
            data[updatedCompanyIndex].softwares.findIndex(
              (sft) => sft._id === calValue._id
            ) < 0
          )
            data[updatedCompanyIndex].softwares.push(calValue);
          if (needed) {
            data.forEach((_, itemIndex) => {
              if (itemIndex === updatedCompanyIndex)
                data[itemIndex].opened = true;
              else data[itemIndex].opened = false;
            });
          }
          return data;
        };
        updatedHoldingAccess = update(updatedHoldingAccess, parents[0], true);
        updatedParentsCharts = update(updatedParentsCharts, parents[0]);
      } else {
        const remove = (data, id, needed) => {
          let updatedCompanyIndex = data.findIndex((item) => item._id === id);
          if (updatedCompanyIndex < 0) return;
          data[updatedCompanyIndex].softwares = data[
            updatedCompanyIndex
          ].softwares.filter((item) => item._id !== value);
          if (needed) {
            data.forEach((_, itemIndex) => {
              if (itemIndex === updatedCompanyIndex)
                data[itemIndex].opened = true;
              else data[itemIndex].opened = false;
            });
          }
          return data;
        };
        updatedHoldingAccess = remove(updatedHoldingAccess, parents[0], true);
        updatedParentsCharts = remove(updatedParentsCharts, parents[0]);
      }
    } else if (parents.length === 2) {
      if (mode === "add") {
        const update = (data, parents, needed = false) => {
          let updatedCompanyIndex = data.findIndex(
            (item) => item._id === parents[0]
          );
          if (updatedCompanyIndex < 0) return;
          let updatedSoftwareIndex = data[
            updatedCompanyIndex
          ].softwares.findIndex((item) => item._id === parents[1]);
          if (updatedSoftwareIndex < 0) return;
          if (
            data[updatedCompanyIndex].softwares[
              updatedSoftwareIndex
            ].active_backups.findIndex((acb) => acb._id === value._id) < 0
          )
            data[updatedCompanyIndex].softwares[
              updatedSoftwareIndex
            ].active_backups.push(value);

          if (needed) {
            data.forEach((_, itemIndex) => {
              if (itemIndex === updatedCompanyIndex) {
                data[itemIndex].opened = true;
                data[itemIndex].softwares.forEach((_, sftIndex) => {
                  if (sftIndex === updatedSoftwareIndex)
                    data[itemIndex].softwares[sftIndex].opened = true;
                  else data[itemIndex].softwares[sftIndex].opened = false;
                });
              } else data[itemIndex].opened = false;
            });
          }
          return data;
        };
        updatedHoldingAccess = update(updatedHoldingAccess, parents, true);
        updatedParentsCharts = update(updatedParentsCharts, parents);
      } else {
        const remove = (data, parents, needed) => {
          let updatedCompanyIndex = data.findIndex(
            (item) => item._id === parents[0]
          );
          if (updatedCompanyIndex < 0) return;
          let updatedSoftwareIndex = data[
            updatedCompanyIndex
          ].softwares.findIndex((item) => item._id === parents[1]);
          if (updatedSoftwareIndex < 0) return;

          data[updatedCompanyIndex].softwares[
            updatedSoftwareIndex
          ].active_backups = data[updatedCompanyIndex].softwares[
            updatedSoftwareIndex
          ].active_backups.filter((item) => item._id !== value);
          if (needed) {
            data.forEach((_, itemIndex) => {
              if (itemIndex === updatedCompanyIndex) {
                data[itemIndex].opened = true;
                data[itemIndex].softwares.forEach((_, sftIndex) => {
                  if (sftIndex === updatedSoftwareIndex)
                    data[itemIndex].softwares[sftIndex].opened = true;
                  else data[itemIndex].softwares[sftIndex].opened = false;
                });
              } else data[itemIndex].opened = false;
            });
          }
          return data;
        };
        updatedHoldingAccess = remove(updatedHoldingAccess, parents, true);
        updatedParentsCharts = remove(updatedParentsCharts, parents);
      }
    } else if (parents.length === 3) {
      if (mode === "remove") {
        const remove = (data, parents, needed) => {
          let updatedCompanyIndex = data.findIndex(
            (item) => item._id === parents[0]
          );
          if (updatedCompanyIndex < 0) return;
          let updatedSoftwareIndex = data[
            updatedCompanyIndex
          ].softwares.findIndex((item) => item._id === parents[1]);
          if (updatedSoftwareIndex < 0) return;
          let updatedActiveBackupIndex = data[updatedCompanyIndex].softwares[
            updatedSoftwareIndex
          ].active_backups.findIndex((item) => item._id === parents[2]);
          if (updatedActiveBackupIndex < 0) return;
          data[updatedCompanyIndex].softwares[
            updatedSoftwareIndex
          ].active_backups[updatedActiveBackupIndex].banks = data[
            updatedCompanyIndex
          ].softwares[updatedSoftwareIndex].active_backups[
            updatedActiveBackupIndex
          ].banks.filter((item) => item._id !== value);
          if (needed) {
            data.forEach((_, itemIndex) => {
              if (itemIndex === updatedCompanyIndex) {
                data[itemIndex].opened = true;
                data[itemIndex].softwares.forEach((_, sftIndex) => {
                  if (sftIndex === updatedSoftwareIndex) {
                    data[itemIndex].softwares[sftIndex].opened = true;
                    data[itemIndex].softwares[sftIndex].active_backups.forEach(
                      (_, acbIndex) => {
                        if (acbIndex === updatedActiveBackupIndex)
                          data[itemIndex].softwares[sftIndex].active_backups[
                            acbIndex
                          ].opened = true;
                        else
                          data[itemIndex].softwares[sftIndex].active_backups[
                            acbIndex
                          ].opened = false;
                      }
                    );
                  } else data[itemIndex].softwares[sftIndex].opened = false;
                });
              } else data[itemIndex].opened = false;
            });
          }
          return data;
        };
        updatedHoldingAccess = remove(updatedHoldingAccess, parents, true);
        updatedParentsCharts = remove(updatedParentsCharts, parents);
      }
    }
  }
  return {
    ...state,
    holdingAccess: updatedHoldingAccess,
    parentsCharts: updatedParentsCharts,
  };
};
const changeItemTitle = (state, action) => {
  const { path, name } = action.payload;
  let updatedHoldingAccess = [...state.holdingAccess];
  let updatedParentsCharts = [...state.parentsCharts];
  if (path.length < 1) return { ...state };
  const update = (data) => {
    if (path.length === 1) {
      let fCmp = data.findIndex((item) => item._id === path[0]);
      if (fCmp < 0) return;
      data[fCmp].name = name;
    } else if (path.length === 2) {
      let fCmp = data.findIndex((item) => item._id === path[0]);
      if (fCmp < 0) return;
      data[fCmp].opened = true;
      let fSft = data[fCmp].softwares.findIndex((item) => item._id === path[1]);
      if (fSft < 0) return;
      data[fCmp].softwares[fSft].name = name;
    } else if (path.length === 3) {
      let fCmp = data.findIndex((item) => item._id === path[0]);
      if (fCmp < 0) return;
      data[fCmp].opened = true;
      let fSft = data[fCmp].softwares.findIndex((item) => item._id === path[1]);
      if (fSft < 0) return;
      data[fCmp].softwares[fSft].opened = true;
      let fAcb = data[fCmp].softwares[fSft].active_backups.findIndex(
        (item) => item._id === path[2]
      );
      if (fAcb < 0) return;
      data[fCmp].softwares[fSft].active_backups[fAcb].name = name;
    } else if (path.length === 4) {
      let fCmp = data.findIndex((item) => item._id === path[0]);
      if (fCmp < 0) return;
      data[fCmp].opened = true;
      let fSft = data[fCmp].softwares.findIndex((item) => item._id === path[1]);
      if (fSft < 0) return;
      data[fCmp].softwares[fSft].opened = true;
      let fAcb = data[fCmp].softwares[fSft].active_backups.findIndex(
        (item) => item._id === path[2]
      );
      if (fAcb < 0) return;
      data[fCmp].softwares[fSft].active_backups[fAcb].opened = true;
      let fBnk = data[fCmp].softwares[fSft].active_backups[
        fAcb
      ].banks.findIndex((item) => item._id === path[3]);
      if (fBnk < 0) return;
      data[fCmp].softwares[fSft].active_backups[fAcb].banks[fBnk].name = name;
    }
    return data;
  };
  updatedHoldingAccess = update(updatedHoldingAccess);
  updatedParentsCharts = update(updatedParentsCharts);

  return {
    ...state,
    holdingAccess: updatedHoldingAccess,
    parentsCharts: updatedParentsCharts,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_USER_DATA:
      return setUserData(state, action);
    case actionTypes.SET_USER_LABEL:
      return setUserLabel(state, action);
    case actionTypes.SET_CHECKED:
      return setChecked(state, action);
    case actionTypes.SET_HOLDING_ACCESS:
      return setHoldingAccess(state, action);
    case actionTypes.SET_PARENTS_CHARTS:
      return setParentsCharts(state, action);
    case actionTypes.SET_SOCKET:
      return setSocket(state, action);
    case actionTypes.CHANGE_STRUCTURE:
      return changeStructure(state, action);
    case actionTypes.CHANGE_ITEM_TITLE:
      return changeItemTitle(state, action);
    default:
      return state;
  }
};

export default reducer;
