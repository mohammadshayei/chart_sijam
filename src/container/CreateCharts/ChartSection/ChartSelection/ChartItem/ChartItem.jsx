import React ,{useEffect,useState}from "react";
import Button from "../../../../../component/UI/Button/Button";
import { lightTheme } from "../../../../../styles/theme";
const ChartItem = (props) => {
  const [clicked, setClicked] = useState(false)
  const [style, setStyle] = useState(null)
  useEffect(()=>{
    if(props.selected === props.data.id){
      setClicked(true)
      setStyle({
        background:`linear-gradient(150deg,${lightTheme.clicked_darken_color},${lightTheme.clicked_lighten_color})`
      })
    }else{
      setClicked(false)
      setStyle({
        background:'white'
      })
    }
  },[props.data,props.selected])
  const onMouseEnter = () => {
    if (!clicked) {
      setStyle({
        background: lightTheme.holding_menu_item_color,
        color: lightTheme.text_color,
      });
    }
  };
  const onMouseLeave = () => {
    if (!clicked) {
      setStyle({
        background: "white",
        color: lightTheme.text_color,
      });
    }
  };
  return (
    <Button
      rippleColor={lightTheme.clicked_darken_color}
      ButtonStyle={{
        marginLeft: ".3rem",
        padding: " .rem .5rem .rem 0rem",
        borderRadius: "0.2rem",
        height: "1.8rem",
        ...style
      }}
      onClick={() => props.onClick(props.data.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p
        style={{
          color:
            props.selected === props.data.id
              ? lightTheme.text_clicked_menu_color
              : lightTheme.text_menu_item_color,
          fontSize: 13,
          opacity: props.selected === props.data.id ? 1 : 0.7,
        }}
      >
        {props.data.title}
      </p>
    </Button>
  );
};
export default ChartItem;
