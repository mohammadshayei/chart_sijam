import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { lightTheme } from "../../../styles/theme";
import './EditTitle.scss'
const EditTitle = (props) => {
  return (
    <div className="EditTitleContainer">
      <p>{props.title ? props.title : stringFa.title}</p>
      <EditRoundedIcon
        style={{
          fontSize: "1rem",
          color: lightTheme.text_color,
          marginLeft: ".4rem",
        }}
      />
    </div>
  );
};
export default EditTitle;
