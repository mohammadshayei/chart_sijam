import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";
import "./EditTitle.scss";
const EditTitle = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  switch (props.type) {
    case "title":
      return props.options ? (
        <div className="EditTitleContainer" style={props.style}>
          <p>
            {
              // props.data.title.text
              // ? props.data.title.text
              // :
              stringFa.title
            }
          </p>
          <EditRoundedIcon
            style={{
              fontSize: "1rem",
              color: theme.text_color,
              marginLeft: ".4rem",
            }}
          />
        </div>
      ) : null;
    case "titleX":
      return props.options ? (
        <div className="EditTitleContainer" style={props.style}>
          <p>
            {
              // props.options.scales.x.title
              // ? props.options.scales.x.title.text
              // :
              stringFa.title
            }
          </p>
          <EditRoundedIcon
            style={{
              fontSize: "1rem",
              color: theme.text_color,
              marginLeft: ".4rem",
            }}
          />
        </div>
      ) : null;
    case "titleY":
      return props.options ? (
        <div className="EditTitleContainer" style={props.style}>
          <p>
            {
              // props.options.scales.y.title
              // ? props.options.scales.y.title.text
              // :
              stringFa.title
            }
          </p>
          <EditRoundedIcon
            style={{
              fontSize: "1rem",
              color: theme.text_color,
              marginLeft: ".4rem",
            }}
          />
        </div>
      ) : null;
    default:
      return null;
  }
};
export default EditTitle;
