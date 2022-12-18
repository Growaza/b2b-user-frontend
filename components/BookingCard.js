import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaymentIcon from "@mui/icons-material/Payment";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import myApi from '../axios';
import { useRouter } from "next/router";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function BookingCards({
  id,
  car,
  start,
  end,
  date,
  time,
  contact_person_location,
  contact_person,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async(id) => {
    console.log(id,'id')
    const response = await myApi.post('/api/v1/payment/payment-link-create/',{postbooking_id:id})
    console.log(response?.data?.payment_link,'response')
    router.push(response?.data?.payment_link)
  }

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="active:scale-90 transition duration-150 bg-yellow-400"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={"Booking No - "+id}
        subheader="Posted At: 10 April 2022 11:06 AM"
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {car}
        </Typography>
        <Typography>
          <EventAvailableIcon /> {start} To {end} Drop
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="flex justify-between">
            <Typography paragraph>
              <DirectionsCarIcon /> {date}, {time}
            </Typography>

            <div className="flex text-stone-700">
              <h2>Cash</h2>
              <PaymentIcon />
            </div>
          </div>
          <h1 className="text-base font-medium">{contact_person_location}</h1>

          {/* Contact Details */}
          <div className="flex justify-between">
            <span className="flex justify-between">
              <PersonIcon />
              <p>{contact_person}</p>
            </span>
            {/* <button className="border rounded-xl p-1 bg-red-500" onClick={()=>handleSubmit(id)}>
              Accept Booking <CallIcon fontSize="inherit" />
            </button> */}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default BookingCards;
