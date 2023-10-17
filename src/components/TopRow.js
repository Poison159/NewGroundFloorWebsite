
import ServicesCard from './ServicesCard';
import Grid from '@mui/material/Grid';
import CustomAccordion from './CustomAccordion';

export default function Toprow() {

  var items = [
    {imgPath: "https://img.stackshare.io/service/11331/asp.net-core.png", title:".Net C#", description:"We use C# for our bacend"},
    {imgPath: "https://th.bing.com/th/id/OIP.HLxLvGJV-6r8ZR8AK4F9KAHaEO?pid=ImgDet&rs=1", title:"React", description:"We use react for our frontend"},
    {imgPath: "https://cdn-images-1.medium.com/max/2400/1*FDNeKIUeUnf0XdqHmi7nsw.png", title:"Material ui", description:"We use material ui for our look and feel"}
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={12}>
        <ServicesCard
          imgUrl="https://cdn.dribbble.com/userupload/3105308/file/original-e451cc62b520510fe5e166f66791e7fb.png?compress=1&resize=840x630&vertical=top"
          title="Apps"
          description="We make mobile apss"
          onClick={() => alert("Hello")}
        />
        <CustomAccordion items={items}/>
      </Grid>
      <Grid item xs={12} md={4} sm={12}>
        <ServicesCard
          imgUrl="https://cdn.dribbble.com/users/15692/screenshots/1361195/attachments/194237/Flat-Dashboard-UI-real-pix.jpg?compress=1&resize=768x576&vertical=top"
          title="Websites"
          description="We also make websites"
        />
      </Grid>
      <Grid item xs={12} md={4} sm={12}>
        <ServicesCard
          imgUrl="https://th.bing.com/th/id/OIP.1hXL7NbhaoBHaUXd1kXQtAHaHT?pid=ImgDet&rs=1"
          title="Data Anylytics"
          description="We analyze data"
        />
      </Grid>
    </Grid>
  )
}