import _ from "underscore";
import moment from "moment";

const sortOrder = (order) => {
  const sortable = Object.entries(order)
    .sort(([, a], [, b]) => a - b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  return sortable;
};
const universaldateformat = function (value, widget) {
  if (
    value &&
    new Date(value.toString().split(" - ")[0]).toString() === "Invalid Date"
  ) {
    if (value.length > 25) {
      return value.substring(0, 24) + "...";
    }
    return value;
  } else {
    if (
      typeof value.getMonth === "function" ||
      value.split(" - ").length == 1
    ) {
      let dateval =
        typeof value.getMonth === "function" ? value : new Date(moment(value));
      let formatedDate =
        dateval != "Invalid Date" ? moment(dateval).format("DD MMM'YY") : value;
      if (widget == "overview") {
        formatedDate =
          dateval != "Invalid Date"
            ? moment(dateval).format("dddd, MMM Do, YYYY")
            : value;
      }
      return formatedDate;
    } else {
      return (
        moment(new Date(value.split(" - ")[0])).format("DD MMM'YY") +
        " -- " +
        moment(new Date(value.split(" - ")[1])).format("DD MMM'YY")
      );
    }
  }
};

const toParams = (objectRef) => {
  var params = "";
  for (var key in objectRef) {
    if (objectRef[key] && typeof objectRef[key] == "object") {
      params +=
        key.toString() +
        "=" +
        encodeURIComponent(
          decodeURIComponent(encodeURIComponent(JSON.stringify(objectRef[key])))
        ) +
        "&";
    } else {
      params += key.toString() + "=" + encodeURIComponent(objectRef[key]) + "&";
    }
  }
  return params.slice(0, -1);
};

const getUserDetail = () => {
  let userDetail = localStorage.getItem("hire-user-detail");
  if (userDetail) {
    userDetail = JSON.parse(userDetail);
    return userDetail;
  } else {
    return null;
  }
};

const setUserDetail = (data) => {
  localStorage.setItem("hire-user-detail", JSON.stringify(data));
};

const removeUserDetail = () => {
  localStorage.removeItem("hire-user-detail");
};

export default {
  sortOrder,
  universaldateformat,
  toParams,
  getUserDetail,
  setUserDetail,
  removeUserDetail,
};
