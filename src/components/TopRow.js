
import ServicesCard from './ServicesCard';
import Grid from '@mui/material/Grid';

export default function Toprow(){
return(
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <ServicesCard  
        imgUrl="https://zkhiphava.co.za/Content/imgs/86BEMCZIRQ.png"
        title="Apps"
        description="We make mobile apss"
        onClick={() => alert("Hello")}
      />
    </Grid>
    <Grid item xs={4}>
      <ServicesCard  
        imgUrl="https://zkhiphava.co.za/Content/imgs/XR9LOBZ9RR.png"
        title="Websites"
        description="We also make websites"
      />
    </Grid>
    <Grid item xs={4}>
      <ServicesCard  
        imgUrl="https://zkhiphava.co.za/Content/imgs/6SICX1BK95.png"
        title="Data Anylytics"
        description="We analyze data"
        />
    </Grid>
  </Grid>
)
}